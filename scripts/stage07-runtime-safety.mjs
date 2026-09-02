import { randomUUID } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  POC_CONTRACT,
  createOpenAIEmbeddingClient,
  runGroundedRetrieval,
} from "./stage07-grounded-poc.mjs";

const CURRENT_FILE = fileURLToPath(import.meta.url);

export const RUNTIME_SAFETY_CONTRACT = Object.freeze({
  taskId: "task.skillcertify.07.005",
  sourceRef: POC_CONTRACT.sourceRef,
  providerRuntimeRef: POC_CONTRACT.providerRuntimeRef,
  providerEndpoint: POC_CONTRACT.providerEndpoint,
  providerModel: POC_CONTRACT.providerModel,
  timeoutMs: 5000,
  killSwitchFlag: "--disable-runtime",
  traceVersion: "trace.skillcertify.07.005.runtime-safety-v1",
  loggingMode: "metadata-allowlist-only",
  rawPayloadLogging: false,
  embeddingPersistence: false,
});

class RuntimeTimeoutError extends Error {
  constructor() {
    super("provider request exceeded bounded timeout");
    this.name = "RuntimeTimeoutError";
  }
}

class ProviderHttpError extends Error {
  constructor() {
    super("provider returned a non-success HTTP response");
    this.name = "ProviderHttpError";
  }
}

class ProviderResponseError extends Error {
  constructor() {
    super("provider response failed bounded validation");
    this.name = "ProviderResponseError";
  }
}

function classifyReasonFromErrorClass(errorClass) {
  if (errorClass === "RuntimeTimeoutError") return "runtime_timeout";
  if (errorClass === "ProviderHttpError") return "provider_http_error";
  if (errorClass === "ProviderResponseError") return "provider_response_invalid";
  return "runtime_unavailable";
}

export function createBoundedFetch({
  fetchImpl = globalThis.fetch,
  timeoutMs = RUNTIME_SAFETY_CONTRACT.timeoutMs,
} = {}) {
  if (typeof fetchImpl !== "function") {
    throw new TypeError("fetch implementation is required");
  }
  if (!Number.isInteger(timeoutMs) || timeoutMs <= 0) {
    throw new RangeError("timeoutMs must be a positive integer");
  }

  return async function boundedFetch(url, options = {}) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      return await fetchImpl(url, {
        ...options,
        signal: controller.signal,
      });
    } catch (error) {
      if (controller.signal.aborted || error?.name === "AbortError") {
        throw new RuntimeTimeoutError();
      }
      throw error;
    } finally {
      clearTimeout(timer);
    }
  };
}

export function createSafeOpenAIEmbeddingClient({
  apiKey,
  fetchImpl = globalThis.fetch,
  timeoutMs = RUNTIME_SAFETY_CONTRACT.timeoutMs,
} = {}) {
  const boundedFetch = createBoundedFetch({ fetchImpl, timeoutMs });
  const baseEmbed = createOpenAIEmbeddingClient({
    apiKey,
    fetchImpl: boundedFetch,
  });

  return async function safeEmbed(texts) {
    try {
      return await baseEmbed(texts);
    } catch (error) {
      if (error instanceof RuntimeTimeoutError) throw error;
      if (error instanceof TypeError || error instanceof RangeError) {
        throw new ProviderResponseError();
      }
      if (error instanceof Error && /embedding request failed with HTTP/i.test(error.message)) {
        throw new ProviderHttpError();
      }
      throw error;
    }
  };
}

function normalizeRuntimeResult(result, {
  traceId,
  runtimeEnabled,
  timeoutMs,
}) {
  const errorClass = result?.trace?.runtime_error_class ?? null;
  let reasonCode = result.reason_code;

  if (result.state === "abstain" && !runtimeEnabled && reasonCode === "runtime_unavailable") {
    reasonCode = "runtime_disabled";
  } else if (result.state === "abstain" && errorClass) {
    reasonCode = classifyReasonFromErrorClass(errorClass);
  }

  return {
    ...result,
    reason_code: reasonCode,
    trace: {
      ...result.trace,
      trace_version: RUNTIME_SAFETY_CONTRACT.traceVersion,
      trace_id: traceId,
      kill_switch_active: !runtimeEnabled,
      timeout_ms: timeoutMs,
      raw_payload_logged: false,
      embedding_values_persisted: false,
    },
  };
}

export async function runSafeGroundedRetrieval({
  query,
  embed,
  records,
  catalogBlobSha,
  executionMode = "simulated",
  runtimeEnabled = true,
  timeoutMs = RUNTIME_SAFETY_CONTRACT.timeoutMs,
  traceId = randomUUID(),
} = {}) {
  if (typeof traceId !== "string" || traceId.trim() === "") {
    throw new TypeError("traceId must be a non-empty string");
  }
  if (!Number.isInteger(timeoutMs) || timeoutMs <= 0) {
    throw new RangeError("timeoutMs must be a positive integer");
  }

  const result = await runGroundedRetrieval({
    query,
    embed: runtimeEnabled ? embed : undefined,
    ...(records === undefined ? {} : { records }),
    ...(catalogBlobSha === undefined ? {} : { catalogBlobSha }),
    executionMode,
  });

  return normalizeRuntimeResult(result, {
    traceId,
    runtimeEnabled,
    timeoutMs,
  });
}

export function buildSanitizedTraceEvent(result) {
  const trace = result?.trace ?? {};

  return {
    event_type: "stage07_runtime_safety_trace",
    trace_version: RUNTIME_SAFETY_CONTRACT.traceVersion,
    trace_id: trace.trace_id ?? null,
    state: result?.state ?? "unknown",
    reason_code: result?.reason_code ?? "unknown",
    query_case_id: trace.query_case_id ?? null,
    provider_runtime_ref: trace.provider_runtime_ref ?? POC_CONTRACT.providerRuntimeRef,
    provider_endpoint: trace.provider_endpoint ?? POC_CONTRACT.providerEndpoint,
    provider_model: trace.provider_model ?? POC_CONTRACT.providerModel,
    source_ref: trace.source_ref ?? null,
    source_blob_sha: trace.source_blob_sha ?? POC_CONTRACT.catalogBlobSha,
    execution_mode: trace.execution_mode ?? null,
    external_call_performed: trace.external_call_performed === true,
    input_count: Number.isInteger(trace.input_count) ? trace.input_count : null,
    fallback_activated: result?.state === "abstain",
    kill_switch_active: trace.kill_switch_active === true,
    timeout_ms: Number.isInteger(trace.timeout_ms) ? trace.timeout_ms : RUNTIME_SAFETY_CONTRACT.timeoutMs,
    runtime_error_class: trace.runtime_error_class ?? null,
    raw_payload_logged: false,
    embedding_values_persisted: false,
  };
}

async function main() {
  const args = process.argv.slice(2);
  const runtimeEnabled = !args.includes(RUNTIME_SAFETY_CONTRACT.killSwitchFlag);
  const query = args
    .filter((item) => item !== RUNTIME_SAFETY_CONTRACT.killSwitchFlag)
    .join(" ")
    .trim();

  if (!query) {
    console.error(
      `Usage: node scripts/stage07-runtime-safety.mjs [${RUNTIME_SAFETY_CONTRACT.killSwitchFlag}] <bounded synthetic query>`,
    );
    process.exitCode = 2;
    return;
  }

  const credential = process.env.OPENAI_API_KEY;
  const embed = runtimeEnabled && credential
    ? createSafeOpenAIEmbeddingClient({ apiKey: credential })
    : undefined;

  const result = await runSafeGroundedRetrieval({
    query,
    embed,
    executionMode: "external",
    runtimeEnabled,
  });

  console.log(JSON.stringify(buildSanitizedTraceEvent(result), null, 2));
  if (result.state === "abstain") process.exitCode = 2;
}

const invokedFile = process.argv[1] ? path.resolve(process.argv[1]) : null;
if (invokedFile === CURRENT_FILE) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.name : "UnknownError");
    process.exitCode = 1;
  });
}
