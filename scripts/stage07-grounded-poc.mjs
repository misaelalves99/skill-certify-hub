import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { certifications } from "../app/certifications/catalog.ts";

const CURRENT_FILE = fileURLToPath(import.meta.url);
const ROOT = path.resolve(path.dirname(CURRENT_FILE), "..");
const LIBRARY_PATH = path.join(ROOT, "prompts", "semantic-retrieval-poc.v1.json");
const CATALOG_PATH = path.join(ROOT, "app", "certifications", "catalog.ts");

const library = JSON.parse(readFileSync(LIBRARY_PATH, "utf8"));
const governed = library.governed_inputs;
const resultContract = library.output_contracts.semantic_retrieval_result;
const evalCases = library.eval_sets.flatMap((evalSet) => evalSet.cases ?? []);

export const POC_CONTRACT = Object.freeze({
  sourceRef: governed.authorized_source_ref,
  catalogBlobSha: governed.authorized_catalog_blob_sha,
  providerRuntimeRef: governed.provider_runtime_ref,
  providerEndpoint: governed.provider_endpoint,
  providerModel: governed.provider_model,
  fallbackRef: resultContract.fallback_ref,
});

const allowedCases = new Map(
  evalCases
    .filter((item) => item.expected_behavior !== "reject_context_or_abstain")
    .map((item) => [item.input, item]),
);

const rejectedCases = new Map(
  evalCases
    .filter((item) => item.expected_behavior === "reject_context_or_abstain")
    .map((item) => [item.input, item]),
);

const SEARCH_FIELDS = ["title", "issuer", "level", "summary"];

function normalizeText(value) {
  return String(value ?? "").trim().toLocaleLowerCase("en-US");
}

export function currentCatalogBlobSha() {
  return execFileSync("git", ["hash-object", CATALOG_PATH], {
    cwd: ROOT,
    encoding: "utf8",
  }).trim();
}

export function catalogBoundaryStatus(blobSha = currentCatalogBlobSha()) {
  return {
    expected: POC_CONTRACT.catalogBlobSha,
    actual: blobSha,
    matches: blobSha === POC_CONTRACT.catalogBlobSha,
  };
}

export function serializeCatalogRecord(record) {
  const requiredFields = ["id", "title", "issuer", "level", "summary"];
  for (const field of requiredFields) {
    if (typeof record?.[field] !== "string" || record[field].trim() === "") {
      throw new TypeError(`catalog record missing required string field: ${field}`);
    }
  }

  return [
    `id: ${record.id}`,
    `title: ${record.title}`,
    `issuer: ${record.issuer}`,
    `level: ${record.level}`,
    `summary: ${record.summary}`,
  ].join("\n");
}

export function strengthenedLexicalFallback(query, records = certifications) {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) return [];

  return records
    .filter((record) =>
      SEARCH_FIELDS.some((field) =>
        normalizeText(record[field]).includes(normalizedQuery),
      ),
    )
    .map((record) => record.id);
}

export function resolveQueryBoundary(query) {
  if (rejectedCases.has(query)) {
    const item = rejectedCases.get(query);
    return {
      allowed: false,
      caseId: item.case_id,
      reasonCode: item.reason_code,
    };
  }

  if (allowedCases.has(query)) {
    return {
      allowed: true,
      caseId: allowedCases.get(query).case_id,
      reasonCode: null,
    };
  }

  return {
    allowed: false,
    caseId: null,
    reasonCode: "outside_scope",
  };
}

function assertFiniteVector(vector, label) {
  if (!Array.isArray(vector) || vector.length === 0) {
    throw new TypeError(`${label} must be a non-empty numeric vector`);
  }

  for (const value of vector) {
    if (typeof value !== "number" || !Number.isFinite(value)) {
      throw new TypeError(`${label} contains a non-finite value`);
    }
  }
}

export function cosineSimilarity(left, right) {
  assertFiniteVector(left, "left vector");
  assertFiniteVector(right, "right vector");

  if (left.length !== right.length) {
    throw new RangeError("vectors must have equal dimensions");
  }

  let dot = 0;
  let leftNorm = 0;
  let rightNorm = 0;

  for (let index = 0; index < left.length; index += 1) {
    dot += left[index] * right[index];
    leftNorm += left[index] ** 2;
    rightNorm += right[index] ** 2;
  }

  if (leftNorm === 0 || rightNorm === 0) {
    throw new RangeError("zero-magnitude vectors cannot be compared");
  }

  return dot / (Math.sqrt(leftNorm) * Math.sqrt(rightNorm));
}

function citationFor(record) {
  return {
    citation_id: `${POC_CONTRACT.sourceRef}:${record.id}`,
    source_ref: POC_CONTRACT.sourceRef,
    certification_id: record.id,
    supported_fields: {
      title: record.title,
      issuer: record.issuer,
      level: record.level,
      summary: record.summary,
    },
  };
}

export function validateCandidateSupport(candidate, records = certifications) {
  const record = records.find((item) => item.id === candidate.certification_id);
  if (!record) {
    throw new Error(`candidate is not present in the authorized catalog: ${candidate.certification_id}`);
  }

  if (candidate.source_ref !== POC_CONTRACT.sourceRef) {
    throw new Error("candidate source_ref does not match the authorized source");
  }

  return {
    ...candidate,
    citation: citationFor(record),
  };
}

export function rankCandidates(queryVector, documentVectors, records = certifications) {
  assertFiniteVector(queryVector, "query vector");

  if (!Array.isArray(documentVectors) || documentVectors.length !== records.length) {
    throw new RangeError("document vector count must match the authorized catalog record count");
  }

  return records
    .map((record, index) => {
      const similarity = cosineSimilarity(queryVector, documentVectors[index]);
      return validateCandidateSupport(
        {
          certification_id: record.id,
          similarity_score: Number(similarity.toFixed(12)),
          source_ref: POC_CONTRACT.sourceRef,
        },
        records,
      );
    })
    .sort(
      (left, right) =>
        right.similarity_score - left.similarity_score ||
        left.certification_id.localeCompare(right.certification_id),
    );
}

function abstainResult(query, reasonCode, records = certifications, trace = {}) {
  return {
    query,
    state: "abstain",
    candidates: [],
    source_ref: null,
    fallback_ref: POC_CONTRACT.fallbackRef,
    reason_code: reasonCode,
    fallback: {
      strategy: "strengthened-no-ai",
      certification_ids: strengthenedLexicalFallback(query, records),
    },
    trace: {
      trace_version: "trace.skillcertify.07.004.grounded-poc-v1",
      provider_runtime_ref: POC_CONTRACT.providerRuntimeRef,
      provider_endpoint: POC_CONTRACT.providerEndpoint,
      provider_model: POC_CONTRACT.providerModel,
      source_ref: POC_CONTRACT.sourceRef,
      source_blob_sha: POC_CONTRACT.catalogBlobSha,
      raw_payload_logged: false,
      embedding_values_persisted: false,
      ...trace,
    },
  };
}

export async function runGroundedRetrieval({
  query,
  embed,
  records = certifications,
  catalogBlobSha = currentCatalogBlobSha(),
  executionMode = "simulated",
}) {
  const boundary = resolveQueryBoundary(query);
  if (!boundary.allowed) {
    return abstainResult(query, boundary.reasonCode, records, {
      query_case_id: boundary.caseId,
      external_call_performed: false,
      execution_mode: executionMode,
    });
  }

  const sourceBoundary = catalogBoundaryStatus(catalogBlobSha);
  if (!sourceBoundary.matches) {
    return abstainResult(query, "source_authority_stale", records, {
      query_case_id: boundary.caseId,
      external_call_performed: false,
      execution_mode: executionMode,
      observed_source_blob_sha: sourceBoundary.actual,
    });
  }

  if (typeof embed !== "function") {
    return abstainResult(query, "runtime_unavailable", records, {
      query_case_id: boundary.caseId,
      external_call_performed: false,
      execution_mode: executionMode,
    });
  }

  const documents = records.map(serializeCatalogRecord);
  const inputs = [query, ...documents];

  try {
    const vectors = await embed(inputs);
    if (!Array.isArray(vectors) || vectors.length !== inputs.length) {
      throw new RangeError("embedding result count must match provider input count");
    }

    const [queryVector, ...documentVectors] = vectors;
    const candidates = rankCandidates(queryVector, documentVectors, records);

    return {
      query,
      state: "ranked_candidates",
      candidates,
      source_ref: POC_CONTRACT.sourceRef,
      fallback_ref: POC_CONTRACT.fallbackRef,
      reason_code: "bounded_ranking_available",
      trace: {
        trace_version: "trace.skillcertify.07.004.grounded-poc-v1",
        query_case_id: boundary.caseId,
        provider_runtime_ref: POC_CONTRACT.providerRuntimeRef,
        provider_endpoint: POC_CONTRACT.providerEndpoint,
        provider_model: POC_CONTRACT.providerModel,
        source_ref: POC_CONTRACT.sourceRef,
        source_blob_sha: POC_CONTRACT.catalogBlobSha,
        input_count: inputs.length,
        external_call_performed: executionMode === "external",
        execution_mode: executionMode,
        raw_payload_logged: false,
        embedding_values_persisted: false,
      },
    };
  } catch (error) {
    return abstainResult(query, "runtime_unavailable", records, {
      query_case_id: boundary.caseId,
      external_call_performed: executionMode === "external",
      execution_mode: executionMode,
      runtime_error_class: error instanceof Error ? error.name : "UnknownError",
    });
  }
}

export function createOpenAIEmbeddingClient({ apiKey, fetchImpl = globalThis.fetch }) {
  if (typeof apiKey !== "string" || apiKey.trim() === "") {
    throw new TypeError("a non-empty API credential is required for external execution");
  }

  if (typeof fetchImpl !== "function") {
    throw new TypeError("fetch implementation is required");
  }

  return async function embed(texts) {
    if (!Array.isArray(texts) || texts.length === 0 || texts.some((text) => typeof text !== "string" || text.trim() === "")) {
      throw new TypeError("embedding input must be a non-empty array of non-empty strings");
    }

    const response = await fetchImpl("https://api.openai.com/v1/embeddings", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: POC_CONTRACT.providerModel,
        input: texts,
      }),
    });

    if (!response.ok) {
      throw new Error(`embedding request failed with HTTP ${response.status}`);
    }

    const payload = await response.json();
    const vectors = payload?.data?.map((item) => item?.embedding);
    if (!Array.isArray(vectors)) {
      throw new TypeError("embedding response does not contain a data array");
    }

    for (const [index, vector] of vectors.entries()) {
      assertFiniteVector(vector, `embedding ${index}`);
    }

    return vectors;
  };
}

async function main() {
  const query = process.argv.slice(2).join(" ").trim();
  if (!query) {
    console.error("Usage: node scripts/stage07-grounded-poc.mjs <bounded synthetic query>");
    process.exitCode = 2;
    return;
  }

  const credential = process.env.OPENAI_API_KEY;
  if (!credential) {
    const result = abstainResult(query, "runtime_unavailable", certifications, {
      external_call_performed: false,
      execution_mode: "external",
      credential_present: false,
    });
    console.log(JSON.stringify(result, null, 2));
    process.exitCode = 2;
    return;
  }

  const embed = createOpenAIEmbeddingClient({ apiKey: credential });
  const result = await runGroundedRetrieval({
    query,
    embed,
    executionMode: "external",
  });

  console.log(JSON.stringify(result, null, 2));
  if (result.state === "abstain") process.exitCode = 2;
}

const invokedFile = process.argv[1] ? path.resolve(process.argv[1]) : null;
if (invokedFile === CURRENT_FILE) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}
