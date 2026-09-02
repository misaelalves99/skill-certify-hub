import { performance } from "node:perf_hooks";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { POC_CONTRACT } from "./stage07-grounded-poc.mjs";
import {
  RUNTIME_SAFETY_CONTRACT,
  buildSanitizedTraceEvent,
  createSafeOpenAIEmbeddingClient,
  runSafeGroundedRetrieval,
} from "./stage07-runtime-safety.mjs";

const CURRENT_FILE = fileURLToPath(import.meta.url);

export const STAGE07_TELEMETRY_CONTRACT = Object.freeze({
  taskId: "task.skillcertify.07.008",
  traceVersion: "trace.skillcertify.07.008.token-latency-cost-v1",
  providerRuntimeRef: POC_CONTRACT.providerRuntimeRef,
  providerEndpoint: POC_CONTRACT.providerEndpoint,
  providerModel: POC_CONTRACT.providerModel,
  inputPriceUsdPerMillionTokens: 0.02,
  pricingUnit: "USD_PER_1M_INPUT_TOKENS",
  pricingSource: "https://developers.openai.com/api/docs/models/text-embedding-3-small",
  pricingSnapshotDate: "2026-09-02",
  actualBilledCostStatus: "NOT_ESTABLISHED",
  loggingMode: "metadata-allowlist-only",
  rawPayloadLogging: false,
  embeddingPersistence: false,
});

function asNonNegativeInteger(value) {
  return Number.isInteger(value) && value >= 0 ? value : null;
}

export function normalizeProviderUsage(usage) {
  const promptTokens = asNonNegativeInteger(usage?.prompt_tokens);
  const totalTokens = asNonNegativeInteger(usage?.total_tokens);

  return {
    availability: promptTokens === null && totalTokens === null ? "unavailable" : "provider_reported",
    prompt_tokens: promptTokens,
    total_tokens: totalTokens,
  };
}

export function estimateEmbeddingInputCostUsd(
  promptTokens,
  inputPriceUsdPerMillionTokens = STAGE07_TELEMETRY_CONTRACT.inputPriceUsdPerMillionTokens,
) {
  if (!Number.isInteger(promptTokens) || promptTokens < 0) return null;
  if (typeof inputPriceUsdPerMillionTokens !== "number" || !Number.isFinite(inputPriceUsdPerMillionTokens) || inputPriceUsdPerMillionTokens < 0) {
    throw new RangeError("inputPriceUsdPerMillionTokens must be a finite non-negative number");
  }

  return Number(((promptTokens * inputPriceUsdPerMillionTokens) / 1_000_000).toFixed(12));
}

export function createUsageCapturingFetch({
  fetchImpl = globalThis.fetch,
  onUsage = () => {},
} = {}) {
  if (typeof fetchImpl !== "function") throw new TypeError("fetch implementation is required");
  if (typeof onUsage !== "function") throw new TypeError("onUsage must be a function");

  return async function usageCapturingFetch(url, options = {}) {
    const response = await fetchImpl(url, options);

    return {
      ok: response.ok,
      status: response.status,
      headers: response.headers,
      async json() {
        const payload = await response.json();
        onUsage({
          usage: normalizeProviderUsage(payload?.usage),
          response_model: typeof payload?.model === "string" ? payload.model : null,
        });
        return payload;
      },
    };
  };
}

export function buildSanitizedTelemetryEvent({
  result,
  taskLatencyMs,
  providerUsage,
} = {}) {
  if (typeof taskLatencyMs !== "number" || !Number.isFinite(taskLatencyMs) || taskLatencyMs < 0) {
    throw new RangeError("taskLatencyMs must be a finite non-negative number");
  }

  const safeTrace = buildSanitizedTraceEvent(result);
  const normalizedUsage = providerUsage?.usage ?? normalizeProviderUsage(null);
  const promptTokens = normalizedUsage.prompt_tokens;
  const estimatedCostUsd = estimateEmbeddingInputCostUsd(promptTokens);

  return {
    event_type: "stage07_token_latency_cost_trace",
    trace_version: STAGE07_TELEMETRY_CONTRACT.traceVersion,
    trace_id: safeTrace.trace_id,
    state: safeTrace.state,
    reason_code: safeTrace.reason_code,
    query_case_id: safeTrace.query_case_id,
    provider_runtime_ref: safeTrace.provider_runtime_ref,
    provider_endpoint: safeTrace.provider_endpoint,
    provider_model: safeTrace.provider_model,
    provider_response_model: providerUsage?.response_model ?? null,
    source_ref: safeTrace.source_ref,
    source_blob_sha: safeTrace.source_blob_sha,
    execution_mode: safeTrace.execution_mode,
    external_call_performed: safeTrace.external_call_performed,
    input_count: safeTrace.input_count,
    task_latency_ms: Number(taskLatencyMs.toFixed(3)),
    latency_scope: "bounded_task_end_to_end",
    provider_usage_source: normalizedUsage.availability,
    prompt_tokens: promptTokens,
    total_tokens: normalizedUsage.total_tokens,
    estimated_input_cost_usd: estimatedCostUsd,
    estimated_cost_basis: estimatedCostUsd === null
      ? "UNAVAILABLE_WITHOUT_PROVIDER_PROMPT_TOKENS"
      : "provider-reported prompt_tokens multiplied by official model input price snapshot",
    input_price_usd_per_million_tokens: STAGE07_TELEMETRY_CONTRACT.inputPriceUsdPerMillionTokens,
    pricing_unit: STAGE07_TELEMETRY_CONTRACT.pricingUnit,
    pricing_source: STAGE07_TELEMETRY_CONTRACT.pricingSource,
    pricing_snapshot_date: STAGE07_TELEMETRY_CONTRACT.pricingSnapshotDate,
    actual_billed_cost_usd: null,
    actual_billed_cost_status: STAGE07_TELEMETRY_CONTRACT.actualBilledCostStatus,
    fallback_activated: safeTrace.fallback_activated,
    kill_switch_active: safeTrace.kill_switch_active,
    timeout_ms: safeTrace.timeout_ms,
    runtime_error_class: safeTrace.runtime_error_class,
    raw_payload_logged: false,
    embedding_values_persisted: false,
  };
}

export async function runTelemetryProbe({
  query,
  apiKey,
  fetchImpl = globalThis.fetch,
  timeoutMs = RUNTIME_SAFETY_CONTRACT.timeoutMs,
  traceId,
  runtimeEnabled = true,
  clock = () => performance.now(),
} = {}) {
  if (typeof clock !== "function") throw new TypeError("clock must be a function");

  let providerUsage = null;
  const usageFetch = createUsageCapturingFetch({
    fetchImpl,
    onUsage(metadata) {
      providerUsage = metadata;
    },
  });

  const embed = runtimeEnabled
    ? createSafeOpenAIEmbeddingClient({ apiKey, fetchImpl: usageFetch, timeoutMs })
    : undefined;

  const startedAt = clock();
  const result = await runSafeGroundedRetrieval({
    query,
    embed,
    executionMode: "external",
    runtimeEnabled,
    timeoutMs,
    ...(traceId === undefined ? {} : { traceId }),
  });
  const finishedAt = clock();

  return buildSanitizedTelemetryEvent({
    result,
    taskLatencyMs: finishedAt - startedAt,
    providerUsage,
  });
}

async function main() {
  const query = process.argv.slice(2).join(" ").trim();
  if (!query) {
    console.error("Usage: node scripts/stage07-telemetry.mjs <bounded synthetic query>");
    process.exitCode = 2;
    return;
  }

  const credential = process.env.OPENAI_API_KEY;
  if (!credential) {
    console.error("OPENAI_API_KEY unavailable for bounded external telemetry execution");
    process.exitCode = 2;
    return;
  }

  const event = await runTelemetryProbe({
    query,
    apiKey: credential,
  });

  console.log(JSON.stringify(event, null, 2));
  if (event.state === "abstain") process.exitCode = 2;
}

const invokedFile = process.argv[1] ? path.resolve(process.argv[1]) : null;
if (invokedFile === CURRENT_FILE) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.name : "UnknownError");
    process.exitCode = 1;
  });
}
