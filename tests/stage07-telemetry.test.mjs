import assert from "node:assert/strict";
import test from "node:test";

import {
  STAGE07_TELEMETRY_CONTRACT,
  buildSanitizedTelemetryEvent,
  estimateEmbeddingInputCostUsd,
  normalizeProviderUsage,
  runTelemetryProbe,
} from "../scripts/stage07-telemetry.mjs";

function fakeEmbeddingResponse({ usage = { prompt_tokens: 42, total_tokens: 42 } } = {}) {
  return {
    ok: true,
    status: 200,
    headers: new Map(),
    async json() {
      return {
        object: "list",
        model: "text-embedding-3-small",
        data: [
          { index: 0, embedding: [1, 0] },
          { index: 1, embedding: [0, 1] },
          { index: 2, embedding: [1, 0] },
          { index: 3, embedding: [0.5, 0.5] },
        ],
        ...(usage === undefined ? {} : { usage }),
      };
    },
  };
}

function sequenceClock(...values) {
  let index = 0;
  return () => values[Math.min(index++, values.length - 1)];
}

test("07.008 telemetry contract pins the bounded model and official price snapshot", () => {
  assert.equal(STAGE07_TELEMETRY_CONTRACT.providerModel, "text-embedding-3-small");
  assert.equal(STAGE07_TELEMETRY_CONTRACT.inputPriceUsdPerMillionTokens, 0.02);
  assert.equal(STAGE07_TELEMETRY_CONTRACT.pricingUnit, "USD_PER_1M_INPUT_TOKENS");
  assert.match(STAGE07_TELEMETRY_CONTRACT.pricingSource, /^https:\/\/developers\.openai\.com\//);
  assert.equal(STAGE07_TELEMETRY_CONTRACT.actualBilledCostStatus, "NOT_ESTABLISHED");
});

test("provider usage normalization preserves only bounded integer metadata", () => {
  assert.deepEqual(normalizeProviderUsage({ prompt_tokens: 9, total_tokens: 9 }), {
    availability: "provider_reported",
    prompt_tokens: 9,
    total_tokens: 9,
  });
  assert.deepEqual(normalizeProviderUsage({ prompt_tokens: "9", total_tokens: -1 }), {
    availability: "unavailable",
    prompt_tokens: null,
    total_tokens: null,
  });
});

test("embedding input cost is an explicit estimate, never an actual billed cost", () => {
  assert.equal(estimateEmbeddingInputCostUsd(1_000_000), 0.02);
  assert.equal(estimateEmbeddingInputCostUsd(1_000), 0.00002);
  assert.equal(estimateEmbeddingInputCostUsd(null), null);
});

test("bounded telemetry records provider usage and end-to-end task latency without raw payload", async () => {
  const event = await runTelemetryProbe({
    query: "web standards",
    apiKey: "test-only-placeholder",
    fetchImpl: async () => fakeEmbeddingResponse(),
    traceId: "trace-07-008-test",
    clock: sequenceClock(100, 112.3456),
  });

  assert.equal(event.state, "ranked_candidates");
  assert.equal(event.trace_id, "trace-07-008-test");
  assert.equal(event.external_call_performed, true);
  assert.equal(event.task_latency_ms, 12.346);
  assert.equal(event.latency_scope, "bounded_task_end_to_end");
  assert.equal(event.provider_usage_source, "provider_reported");
  assert.equal(event.prompt_tokens, 42);
  assert.equal(event.total_tokens, 42);
  assert.equal(event.estimated_input_cost_usd, 0.00000084);
  assert.equal(event.actual_billed_cost_usd, null);
  assert.equal(event.actual_billed_cost_status, "NOT_ESTABLISHED");
  assert.equal(event.raw_payload_logged, false);
  assert.equal(event.embedding_values_persisted, false);

  const serialized = JSON.stringify(event);
  assert.doesNotMatch(serialized, /test-only-placeholder/);
  assert.doesNotMatch(serialized, /"embedding"/);
});

test("missing provider usage remains unavailable and does not fabricate token or cost values", async () => {
  const event = await runTelemetryProbe({
    query: "web standards",
    apiKey: "test-only-placeholder",
    fetchImpl: async () => fakeEmbeddingResponse({ usage: undefined }),
    traceId: "trace-07-008-no-usage",
    clock: sequenceClock(10, 11),
  });

  assert.equal(event.provider_usage_source, "unavailable");
  assert.equal(event.prompt_tokens, null);
  assert.equal(event.total_tokens, null);
  assert.equal(event.estimated_input_cost_usd, null);
  assert.equal(event.estimated_cost_basis, "UNAVAILABLE_WITHOUT_PROVIDER_PROMPT_TOKENS");
  assert.equal(event.actual_billed_cost_usd, null);
});

test("disabled runtime records bounded telemetry without provider execution or cost inference", async () => {
  let fetchCalled = false;
  const event = await runTelemetryProbe({
    query: "web standards",
    runtimeEnabled: false,
    fetchImpl: async () => {
      fetchCalled = true;
      throw new Error("must not execute");
    },
    traceId: "trace-07-008-disabled",
    clock: sequenceClock(5, 5.25),
  });

  assert.equal(fetchCalled, false);
  assert.equal(event.state, "abstain");
  assert.equal(event.reason_code, "runtime_disabled");
  assert.equal(event.external_call_performed, false);
  assert.equal(event.kill_switch_active, true);
  assert.equal(event.provider_usage_source, "unavailable");
  assert.equal(event.estimated_input_cost_usd, null);
  assert.equal(event.actual_billed_cost_status, "NOT_ESTABLISHED");
});

test("sanitized telemetry builder rejects invalid latency instead of inventing measurements", () => {
  assert.throws(
    () => buildSanitizedTelemetryEvent({ result: { state: "abstain", trace: {} }, taskLatencyMs: -1 }),
    /taskLatencyMs must be a finite non-negative number/,
  );
});
