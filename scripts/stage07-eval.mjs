import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  POC_CONTRACT,
  resolveQueryBoundary,
  runGroundedRetrieval,
  strengthenedLexicalFallback,
  validateCandidateSupport,
} from "./stage07-grounded-poc.mjs";
import {
  createSafeOpenAIEmbeddingClient,
  runSafeGroundedRetrieval,
} from "./stage07-runtime-safety.mjs";

const CURRENT_FILE = fileURLToPath(import.meta.url);
const ROOT = path.resolve(path.dirname(CURRENT_FILE), "..");
const DATASET_PATH = path.join(ROOT, "evals", "stage07-semantic-retrieval.eval.v1.json");

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"));
}

function trackedBlobSha(repoPath) {
  return execFileSync("git", ["rev-parse", `HEAD:${repoPath}`], {
    cwd: ROOT,
    encoding: "utf8",
  }).trim();
}

function evidenceText(repoPath) {
  return readFileSync(path.join(ROOT, repoPath), "utf8");
}

function assertArrayEqual(actual, expected) {
  assert.deepEqual(actual, expected);
}

export function loadStage07EvalDataset() {
  return readJson(DATASET_PATH);
}

export function validateStage07EvalDataset(dataset = loadStage07EvalDataset()) {
  assert.equal(dataset.dataset_id, "evalset.skillcertify.07.006.semantic-retrieval-v1");
  assert.equal(dataset.version, "1.0.0");
  assert.equal(dataset.stage_id, "stage.skillcertify.07");
  assert.equal(dataset.task_id, "task.skillcertify.07.006");
  assert.equal(dataset.data_class, "publico");
  assert.equal(dataset.tooling.mode, "repo-native-node");
  assert.equal(dataset.tooling.external_eval_tool_selected, false);
  assert.equal(dataset.rubric.material_semantic_quality_threshold, "NOT_ESTABLISHED");
  assert.equal(dataset.rubric.adoption_threshold, "NOT_ESTABLISHED");
  assert.equal(dataset.rubric.llm_as_judge, false);
  assert.equal(dataset.governed_inputs.ai_required, false);
  assert.equal(dataset.governed_inputs.production_ai_authorized, false);
  assert.equal(dataset.governed_inputs.authorized_source_ref, POC_CONTRACT.sourceRef);
  assert.equal(dataset.governed_inputs.provider_endpoint, POC_CONTRACT.providerEndpoint);
  assert.equal(dataset.governed_inputs.provider_model, POC_CONTRACT.providerModel);

  const bindings = [
    [dataset.governed_inputs.prompt_library_path, dataset.governed_inputs.prompt_library_blob_sha],
    [dataset.governed_inputs.grounded_runtime_evidence_path, dataset.governed_inputs.grounded_runtime_evidence_blob_sha],
    [dataset.governed_inputs.prompt_grounding_baseline_path, dataset.governed_inputs.prompt_grounding_baseline_blob_sha],
    [dataset.governed_inputs.runtime_safety_baseline_path, dataset.governed_inputs.runtime_safety_baseline_blob_sha],
  ];

  for (const [repoPath, expectedBlob] of bindings) {
    assert.equal(trackedBlobSha(repoPath), expectedBlob, `stale eval evidence binding: ${repoPath}`);
  }

  const caseIds = dataset.cases.map((item) => item.case_id);
  assert.equal(new Set(caseIds).size, caseIds.length, "eval case ids must be unique");
  assert.equal(dataset.cases.length, 15, "Stage 07 eval dataset must preserve all 15 bounded cases");

  return true;
}

function checkSemanticObservation(caseDef, runtimeEvidence) {
  const computedMatch =
    caseDef.target_certification_id === caseDef.observed_top1_certification_id &&
    caseDef.target_record_rank === 1;

  assert.equal(computedMatch, caseDef.observed_target_top1_match);
  assert.match(runtimeEvidence, new RegExp(caseDef.input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.match(runtimeEvidence, new RegExp(caseDef.target_certification_id));
  assert.match(runtimeEvidence, new RegExp(caseDef.observed_top1_certification_id));
  assert.match(runtimeEvidence, new RegExp(caseDef.observed_top1_score.replaceAll(".", "\\.")));

  if (caseDef.target_record_score) {
    assert.match(runtimeEvidence, new RegExp(caseDef.target_record_score.replaceAll(".", "\\.")));
  }

  if (caseDef.observed_target_top1_match === false) {
    assert.equal(caseDef.semantic_miss_must_remain_preserved, true);
  }
}

async function evaluateDeterministicCase(caseDef) {
  switch (caseDef.evaluator) {
    case "lexical-fallback": {
      assertArrayEqual(strengthenedLexicalFallback(caseDef.input), caseDef.expected_certification_ids);
      break;
    }

    case "query-boundary": {
      const boundary = resolveQueryBoundary(caseDef.input);
      assert.equal(boundary.allowed, caseDef.expected_allowed);
      assert.equal(boundary.reasonCode, caseDef.expected_reason_code);
      break;
    }

    case "support-source-conflict": {
      assert.throws(
        () =>
          validateCandidateSupport({
            certification_id: caseDef.certification_id,
            similarity_score: 0.5,
            source_ref: caseDef.conflicting_source_ref,
          }),
        new RegExp(caseDef.expected_error_pattern),
      );
      break;
    }

    case "citation-support": {
      const candidate = validateCandidateSupport({
        certification_id: caseDef.certification_id,
        similarity_score: 0.5,
        source_ref: caseDef.expected_source_ref,
      });
      assert.equal(candidate.citation.source_ref, caseDef.expected_source_ref);
      assert.equal(candidate.citation.certification_id, caseDef.certification_id);
      assert.equal(candidate.citation.supported_fields.title, caseDef.expected_title);
      break;
    }

    case "stale-source": {
      let calls = 0;
      const result = await runGroundedRetrieval({
        query: caseDef.input,
        catalogBlobSha: caseDef.stale_catalog_blob_sha,
        embed: async () => {
          calls += 1;
          return [];
        },
      });
      assert.equal(result.state, caseDef.expected_state);
      assert.equal(result.reason_code, caseDef.expected_reason_code);
      assert.equal(calls, caseDef.expected_provider_calls);
      break;
    }

    case "kill-switch": {
      let calls = 0;
      const result = await runSafeGroundedRetrieval({
        query: caseDef.input,
        runtimeEnabled: false,
        traceId: `eval-${caseDef.case_id}`,
        embed: async () => {
          calls += 1;
          return [];
        },
      });
      assert.equal(result.state, caseDef.expected_state);
      assert.equal(result.reason_code, caseDef.expected_reason_code);
      assert.equal(result.fallback.strategy, caseDef.expected_fallback_strategy);
      assert.equal(calls, caseDef.expected_provider_calls);
      assert.equal(result.trace.kill_switch_active, true);
      break;
    }

    case "timeout": {
      const fetchImpl = async (_url, options) =>
        new Promise((_resolve, reject) => {
          options.signal.addEventListener("abort", () => {
            const error = new Error("synthetic timeout detail must remain private");
            error.name = "AbortError";
            reject(error);
          });
        });
      const embed = createSafeOpenAIEmbeddingClient({
        apiKey: "synthetic-eval-token",
        fetchImpl,
        timeoutMs: caseDef.synthetic_timeout_ms,
      });
      const result = await runSafeGroundedRetrieval({
        query: caseDef.input,
        embed,
        executionMode: "external",
        timeoutMs: caseDef.synthetic_timeout_ms,
        traceId: `eval-${caseDef.case_id}`,
      });
      assert.equal(result.state, caseDef.expected_state);
      assert.equal(result.reason_code, caseDef.expected_reason_code);
      assert.equal(result.trace.runtime_error_class, caseDef.expected_error_class);
      assert.equal(result.trace.raw_payload_logged, false);
      break;
    }

    case "provider-http": {
      const embed = createSafeOpenAIEmbeddingClient({
        apiKey: "synthetic-eval-token",
        fetchImpl: async () => ({
          ok: false,
          status: caseDef.synthetic_http_status,
          text: async () => "provider body must not enter eval output",
        }),
      });
      const result = await runSafeGroundedRetrieval({
        query: caseDef.input,
        embed,
        executionMode: "external",
        traceId: `eval-${caseDef.case_id}`,
      });
      assert.equal(result.state, caseDef.expected_state);
      assert.equal(result.reason_code, caseDef.expected_reason_code);
      assert.equal(result.trace.runtime_error_class, caseDef.expected_error_class);
      assert.doesNotMatch(JSON.stringify(result), /provider body must not enter eval output/);
      break;
    }

    case "invalid-payload": {
      const embed = createSafeOpenAIEmbeddingClient({
        apiKey: "synthetic-eval-token",
        fetchImpl: async () => ({
          ok: true,
          status: 200,
          json: async () => ({ data: null, internal: "must-not-escape" }),
        }),
      });
      const result = await runSafeGroundedRetrieval({
        query: caseDef.input,
        embed,
        executionMode: "external",
        traceId: `eval-${caseDef.case_id}`,
      });
      assert.equal(result.state, caseDef.expected_state);
      assert.equal(result.reason_code, caseDef.expected_reason_code);
      assert.equal(result.trace.runtime_error_class, caseDef.expected_error_class);
      assertArrayEqual(result.fallback.certification_ids, caseDef.expected_fallback_certification_ids);
      assert.doesNotMatch(JSON.stringify(result), /must-not-escape/);
      break;
    }

    default:
      throw new Error(`unsupported eval evaluator: ${caseDef.evaluator}`);
  }
}

export async function buildStage07EvalReport(dataset = loadStage07EvalDataset()) {
  validateStage07EvalDataset(dataset);

  const runtimeEvidence = evidenceText(dataset.governed_inputs.grounded_runtime_evidence_path);
  const semanticCases = dataset.cases.filter((item) => item.execution === "recorded-external-evidence");
  const deterministicCases = dataset.cases.filter((item) => item.execution === "deterministic-ci");

  const semanticResults = [];
  for (const caseDef of semanticCases) {
    try {
      checkSemanticObservation(caseDef, runtimeEvidence);
      semanticResults.push({
        case_id: caseDef.case_id,
        evidence_integrity: "pass",
        target_top1_match: caseDef.observed_target_top1_match,
      });
    } catch (error) {
      semanticResults.push({
        case_id: caseDef.case_id,
        evidence_integrity: "fail",
        target_top1_match: caseDef.observed_target_top1_match,
        error_class: error instanceof Error ? error.name : "UnknownError",
      });
    }
  }

  const deterministicResults = [];
  for (const caseDef of deterministicCases) {
    try {
      await evaluateDeterministicCase(caseDef);
      deterministicResults.push({ case_id: caseDef.case_id, status: "pass" });
    } catch (error) {
      deterministicResults.push({
        case_id: caseDef.case_id,
        status: "fail",
        error_class: error instanceof Error ? error.name : "UnknownError",
      });
    }
  }

  const semanticIntegrityPassed = semanticResults.filter((item) => item.evidence_integrity === "pass").length;
  const targetMatches = semanticCases.filter((item) => item.observed_target_top1_match === true).length;
  const targetMisses = semanticCases.length - targetMatches;
  const deterministicPassed = deterministicResults.filter((item) => item.status === "pass").length;
  const deterministicFailed = deterministicResults.length - deterministicPassed;
  const semanticMissCaseIds = semanticCases
    .filter((item) => item.observed_target_top1_match === false)
    .map((item) => item.case_id);
  const categories = [...new Set(dataset.cases.map((item) => item.category))].sort();

  const ciContractPass =
    deterministicFailed === 0 &&
    semanticIntegrityPassed === semanticCases.length &&
    semanticMissCaseIds.includes("semantic-core-website-skills-observed-miss");

  return {
    report_id: "eval-report.skillcertify.07.006.semantic-retrieval-v1",
    dataset_id: dataset.dataset_id,
    dataset_version: dataset.version,
    execution_mode: "ci-deterministic-no-network",
    external_provider_network_call_performed: false,
    external_eval_tool_selected: false,
    deterministic_contract: {
      cases: deterministicResults.length,
      passed: deterministicPassed,
      failed: deterministicFailed,
      results: deterministicResults,
    },
    recorded_semantic_evidence: {
      cases: semanticCases.length,
      evidence_integrity_passed: semanticIntegrityPassed,
      target_top1_matches: targetMatches,
      target_top1_misses: targetMisses,
      observed_match_rate: `${targetMatches}/${semanticCases.length}`,
      semantic_miss_case_ids: semanticMissCaseIds,
      material_semantic_quality_threshold: "NOT_ESTABLISHED",
      adoption_threshold: "NOT_ESTABLISHED",
      gating_semantics: "EVIDENCE_ONLY_NOT_ADOPTION_GATE",
      results: semanticResults,
    },
    coverage_categories: categories,
    ci_contract_status: ciContractPass ? "pass" : "fail",
    ci_contract_meaning:
      "pass means dataset/evidence integrity and deterministic safety/grounding contracts are reproducible; it does not mean semantic quality, AI value, adoption, production readiness, or G-P7 passed",
    ai_required: false,
    production_ai_authorized: false,
    gp7_performed: false,
  };
}

async function main() {
  const report = await buildStage07EvalReport();
  console.log(JSON.stringify(report, null, 2));
  if (report.ci_contract_status !== "pass") process.exitCode = 1;
}

const invokedFile = process.argv[1] ? path.resolve(process.argv[1]) : null;
if (invokedFile === CURRENT_FILE) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.name : "UnknownError");
    process.exitCode = 1;
  });
}
