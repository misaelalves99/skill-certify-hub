import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  buildStage07EvalReport,
  loadStage07EvalDataset,
  validateStage07EvalDataset,
} from "../scripts/stage07-eval.mjs";

const dataset = loadStage07EvalDataset();
const evalBaseline = readFileSync(
  new URL("../STAGE07_EVAL_BASELINE.md", import.meta.url),
  "utf8",
);

test("07.006 eval dataset is versioned, source-bound, and repo-native", () => {
  assert.equal(validateStage07EvalDataset(dataset), true);
  assert.equal(dataset.dataset_id, "evalset.skillcertify.07.006.semantic-retrieval-v1");
  assert.equal(dataset.version, "1.0.0");
  assert.equal(dataset.tooling.mode, "repo-native-node");
  assert.equal(dataset.tooling.external_eval_tool_selected, false);
  assert.equal(dataset.tooling.historical_hint, "Promptfoo");
  assert.equal(dataset.rubric.material_semantic_quality_threshold, "NOT_ESTABLISHED");
  assert.equal(dataset.rubric.adoption_threshold, "NOT_ESTABLISHED");
  assert.equal(dataset.governed_inputs.ai_required, false);
  assert.equal(dataset.governed_inputs.production_ai_authorized, false);
});

test("07.006 eval coverage extends beyond happy paths", () => {
  assert.equal(dataset.cases.length, 15);

  const categories = new Set(dataset.cases.map((item) => item.category));
  for (const required of [
    "semantic-observation",
    "common-task",
    "unknown-no-source",
    "injection-adversarial",
    "safety-sensitive",
    "unsupported-citation",
    "conflicting-source",
    "citation-support",
    "outdated-source",
    "refusal-fallback",
    "runtime-failure",
    "format-violation",
  ]) {
    assert.equal(categories.has(required), true, `missing eval coverage category: ${required}`);
  }
});

test("07.006 dataset preserves the real 07.004 semantic miss exactly", () => {
  const semanticCases = dataset.cases.filter((item) => item.execution === "recorded-external-evidence");
  assert.equal(semanticCases.length, 3);
  assert.equal(semanticCases.filter((item) => item.observed_target_top1_match).length, 2);

  const miss = semanticCases.find((item) => item.case_id === "semantic-core-website-skills-observed-miss");
  assert.equal(miss.input, "core website skills");
  assert.equal(miss.target_certification_id, "cert-frontend-foundations");
  assert.equal(miss.observed_top1_certification_id, "cert-web-platform");
  assert.equal(miss.observed_top1_score, "0.464248118835");
  assert.equal(miss.target_record_rank, 2);
  assert.equal(miss.target_record_score, "0.42249907457");
  assert.equal(miss.observed_target_top1_match, false);
  assert.equal(miss.semantic_miss_must_remain_preserved, true);
});

test("07.006 repo-native eval report is deterministic and requires no provider network call", async () => {
  const report = await buildStage07EvalReport(dataset);

  assert.equal(report.execution_mode, "ci-deterministic-no-network");
  assert.equal(report.external_provider_network_call_performed, false);
  assert.equal(report.external_eval_tool_selected, false);
  assert.equal(report.deterministic_contract.cases, 12);
  assert.equal(report.deterministic_contract.passed, 12);
  assert.equal(report.deterministic_contract.failed, 0);
  assert.equal(report.recorded_semantic_evidence.cases, 3);
  assert.equal(report.recorded_semantic_evidence.evidence_integrity_passed, 3);
  assert.equal(report.recorded_semantic_evidence.target_top1_matches, 2);
  assert.equal(report.recorded_semantic_evidence.target_top1_misses, 1);
  assert.equal(report.recorded_semantic_evidence.observed_match_rate, "2/3");
  assert.deepEqual(report.recorded_semantic_evidence.semantic_miss_case_ids, [
    "semantic-core-website-skills-observed-miss",
  ]);
  assert.equal(report.recorded_semantic_evidence.material_semantic_quality_threshold, "NOT_ESTABLISHED");
  assert.equal(report.recorded_semantic_evidence.adoption_threshold, "NOT_ESTABLISHED");
  assert.equal(report.recorded_semantic_evidence.gating_semantics, "EVIDENCE_ONLY_NOT_ADOPTION_GATE");
  assert.equal(report.ci_contract_status, "pass");
  assert.equal(report.ai_required, false);
  assert.equal(report.production_ai_authorized, false);
  assert.equal(report.gp7_performed, false);
});

test("07.006 CI green semantics cannot be interpreted as AI-value or adoption PASS", async () => {
  const report = await buildStage07EvalReport(dataset);
  assert.equal(report.ci_contract_status, "pass");
  assert.match(report.ci_contract_meaning, /does not mean semantic quality, AI value, adoption, production readiness, or G-P7 passed/);
  assert.equal(report.recorded_semantic_evidence.target_top1_misses, 1);
});

test("07.006 reviewed eval baseline remains ready only for the current POC scope", () => {
  assert.match(evalBaseline, /status: ready/);
  assert.match(evalBaseline, /human_reviewed: true/);
  assert.match(
    evalBaseline,
    /human_eval_review_ref: https:\/\/github\.com\/misaelalves99\/skill-certify-hub\/issues\/143#issuecomment-5514170474/,
  );
  assert.match(evalBaseline, /review_scope: CURRENT_POC_ONLY/);
  assert.match(evalBaseline, /repo_native_tooling_approved: true/);
  assert.match(evalBaseline, /fifteen_case_coverage_approved: true/);
  assert.match(evalBaseline, /observed_match_rate: 2\/3/);
  assert.match(evalBaseline, /semantic_miss_preserved: true/);
  assert.match(evalBaseline, /material_semantic_quality_threshold: NOT_ESTABLISHED/);
  assert.match(evalBaseline, /adoption_threshold: NOT_ESTABLISHED/);
  assert.match(evalBaseline, /production_authorization_included: false/);
  assert.match(evalBaseline, /production_residual_risk_acceptance_included: false/);
  assert.match(evalBaseline, /ai_adoption_decision_included: false/);
  assert.match(evalBaseline, /ai_required: false/);
  assert.match(evalBaseline, /production_ai_authorized: false/);
  assert.match(evalBaseline, /gp7_performed: false/);
});
