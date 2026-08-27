import assert from "node:assert/strict";
import test from "node:test";

import {
  entryBaselineCandidate,
  evaluatePromotionCandidate,
  PromotionEligibilityState,
} from "../scripts/promotion-eligibility.mjs";

const FULL_SHA = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

function eligibleCandidate() {
  return {
    source: {
      repository: "misaelalves99/skill-certify-hub",
      sha: FULL_SHA,
    },
    traceability: {
      required: true,
      task: "task.skillcertify.06.007",
      pr: 999,
    },
    quality: {
      sourceSha: FULL_SHA,
      conclusion: "success",
      runId: 1,
    },
    hardStops: [],
    target: { status: "established", id: "synthetic-target" },
    provider: {
      status: "not_applicable",
      basis: "synthetic providerless eligibility fixture",
    },
    mechanism: { status: "established", id: "synthetic-mechanism" },
    credentialPolicy: {
      status: "not_applicable",
      basis: "synthetic fixture uses no credential",
    },
    authority: {
      status: "approved",
      actor: "synthetic-human-reviewer",
      basis: "synthetic approval fixture",
    },
  };
}

test("promotion evaluator keeps the real entry baseline BLOCKED", () => {
  const result = evaluatePromotionCandidate(entryBaselineCandidate);
  assert.equal(result.state, PromotionEligibilityState.BLOCKED);
  assert.equal(result.eligible, false);
  assert.ok(result.blocked.includes("target_not_established"));
  assert.ok(result.blocked.includes("mechanism_not_established"));
  assert.ok(result.blocked.includes("provider_not_established"));
  assert.ok(result.blocked.includes("authority_not_established"));
});

test("promotion evaluator can classify a fully synthetic candidate ELIGIBLE", () => {
  const result = evaluatePromotionCandidate(eligibleCandidate());
  assert.equal(result.state, PromotionEligibilityState.ELIGIBLE);
  assert.equal(result.eligible, true);
  assert.equal(result.reasons.length, 0);
  assert.notEqual(result.state, "PROMOTED");
});

test("promotion evaluator rejects a short or ambiguous source SHA", () => {
  const candidate = eligibleCandidate();
  candidate.source.sha = "abc1234";
  const result = evaluatePromotionCandidate(candidate);
  assert.equal(result.state, PromotionEligibilityState.INELIGIBLE);
  assert.ok(result.failed.includes("source_sha_must_be_full_40_hex"));
});

test("promotion evaluator rejects quality evidence bound to another SHA", () => {
  const candidate = eligibleCandidate();
  candidate.quality.sourceSha = "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb";
  const result = evaluatePromotionCandidate(candidate);
  assert.equal(result.state, PromotionEligibilityState.INELIGIBLE);
  assert.ok(result.failed.includes("quality_source_sha_mismatch"));
});

test("promotion evaluator rejects failed quality evidence", () => {
  const candidate = eligibleCandidate();
  candidate.quality.conclusion = "failure";
  const result = evaluatePromotionCandidate(candidate);
  assert.equal(result.state, PromotionEligibilityState.INELIGIBLE);
  assert.ok(result.failed.includes("quality_not_success"));
});

test("promotion evaluator rejects unresolved hard stops", () => {
  const candidate = eligibleCandidate();
  candidate.hardStops = ["synthetic-hard-stop"];
  const result = evaluatePromotionCandidate(candidate);
  assert.equal(result.state, PromotionEligibilityState.INELIGIBLE);
  assert.ok(result.failed.includes("unresolved_hard_stops"));
});

test("promotion evaluator blocks when target identity is not established", () => {
  const candidate = eligibleCandidate();
  candidate.target = { status: "not_established" };
  const result = evaluatePromotionCandidate(candidate);
  assert.equal(result.state, PromotionEligibilityState.BLOCKED);
  assert.ok(result.blocked.includes("target_not_established"));
});

test("promotion evaluator blocks when promotion mechanism is not established", () => {
  const candidate = eligibleCandidate();
  candidate.mechanism = { status: "not_established" };
  const result = evaluatePromotionCandidate(candidate);
  assert.equal(result.state, PromotionEligibilityState.BLOCKED);
  assert.ok(result.blocked.includes("mechanism_not_established"));
});

test("promotion evaluator blocks when human authority evidence is missing", () => {
  const candidate = eligibleCandidate();
  candidate.authority = { status: "required" };
  const result = evaluatePromotionCandidate(candidate);
  assert.equal(result.state, PromotionEligibilityState.BLOCKED);
  assert.ok(result.blocked.includes("authority_not_established"));
});

test("promotion evaluator blocks when provider applicability is unresolved", () => {
  const candidate = eligibleCandidate();
  candidate.provider = { status: "not_established" };
  const result = evaluatePromotionCandidate(candidate);
  assert.equal(result.state, PromotionEligibilityState.BLOCKED);
  assert.ok(result.blocked.includes("provider_not_established"));
});
