import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const library = JSON.parse(
  readFileSync(
    new URL("../prompts/semantic-retrieval-poc.v1.json", import.meta.url),
    "utf8",
  ),
);

const baseline = readFileSync(
  new URL("../STAGE07_PROMPT_GROUNDING_BASELINE.md", import.meta.url),
  "utf8",
);

test("Stage 07 prompt library is versioned, owned, and repo-native", () => {
  assert.equal(
    library.library_id,
    "prompt-library.skillcertify.07.003.semantic-retrieval-v1",
  );
  assert.equal(library.version, "1.0.0");
  assert.equal(library.owner, "human-coordinator");
  assert.equal(library.status, "candidate");
  assert.equal(library.human_reviewed, true);
  assert.equal(
    library.human_tooling_decision_ref,
    "https://github.com/misaelalves99/skill-certify-hub/issues/137#issuecomment-5446574085",
  );

  assert.equal(library.tooling.mode, "repo-native-source-control");
  assert.equal(library.tooling.external_prompt_manager, null);
  assert.equal(library.tooling.external_tool_selected, false);
  assert.equal(library.tooling.historical_hint, "Langfuse");
  assert.equal(library.tooling.historical_hint_authority, "derived-hint-only");
  assert.equal(
    library.tooling.selection_disposition,
    "approved-repo-native-no-external-manager",
  );
  assert.equal(
    library.tooling.selection_authority_ref,
    library.human_tooling_decision_ref,
  );

  assert.equal(library.prompt_versions.length, 3);

  for (const prompt of library.prompt_versions) {
    assert.match(prompt.prompt_id, /^prompt\.skillcertify\.07\.003\./);
    assert.equal(prompt.version, "1.0.0");
    assert.equal(prompt.owner, "human-coordinator");
    assert.ok(prompt.purpose.length > 0);
    assert.ok(prompt.input_contract);
    assert.ok(prompt.allowed_context.length > 0);
    assert.ok(prompt.prohibited_context.length > 0);
    assert.ok(prompt.output_contract_ref.length > 0);
    assert.ok(prompt.abstention_fallback_rule.length > 0);
    assert.ok(prompt.linked_eval_set.length > 0);
    assert.ok(prompt.known_limitations.length > 0);
    assert.ok(prompt.change_rationale.length > 0);
  }
});

test("provider-bound prompt inputs preserve the exact authorized source boundary", () => {
  assert.equal(
    library.governed_inputs.authorized_source_ref,
    "source.skillcertify.07.002.catalog",
  );
  assert.equal(
    library.governed_inputs.authorized_catalog_blob_sha,
    "3a95f044198c443e4ce073fecdfea62f7f8ce396",
  );
  assert.equal(
    library.governed_inputs.provider_runtime_ref,
    "provider-runtime.skillcertify.07.002.openai-embeddings-poc-v1",
  );
  assert.equal(library.governed_inputs.provider_endpoint, "/v1/embeddings");
  assert.equal(
    library.governed_inputs.provider_model,
    "text-embedding-3-small",
  );
  assert.equal(library.governed_inputs.ai_required, false);

  const queryPrompt = library.prompt_versions.find(
    (prompt) =>
      prompt.prompt_id === "prompt.skillcertify.07.003.query-embedding",
  );
  const documentPrompt = library.prompt_versions.find(
    (prompt) =>
      prompt.prompt_id ===
      "prompt.skillcertify.07.003.catalog-document-embedding",
  );
  const resultContract = library.prompt_versions.find(
    (prompt) =>
      prompt.prompt_id === "prompt.skillcertify.07.003.grounded-result-contract",
  );

  assert.equal(queryPrompt.sent_to_provider, true);
  assert.equal(queryPrompt.template, "{{query}}");

  assert.equal(documentPrompt.sent_to_provider, true);
  assert.deepEqual(documentPrompt.input_contract.required_fields, [
    "id",
    "title",
    "issuer",
    "level",
    "summary",
  ]);
  assert.equal(
    documentPrompt.input_contract.catalog_blob_sha,
    "3a95f044198c443e4ce073fecdfea62f7f8ce396",
  );
  assert.match(documentPrompt.template, /^id: \{\{id\}\}/);
  assert.doesNotMatch(documentPrompt.template, /page\.tsx|CI logs|API key/i);

  assert.equal(resultContract.sent_to_provider, false);
  assert.equal(resultContract.provider_runtime_ref, null);
});

test("output contract keeps ranking separate from support and preserves abstention", () => {
  const contract = library.output_contracts.semantic_retrieval_result;

  assert.equal(
    contract.contract_id,
    "output.skillcertify.07.003.semantic-retrieval-result-v1",
  );
  assert.deepEqual(contract.state_enum, ["ranked_candidates", "abstain"]);
  assert.equal(
    contract.source_ref_when_ranked,
    "source.skillcertify.07.002.catalog",
  );
  assert.equal(contract.source_ref_when_abstain, null);
  assert.equal(
    contract.fallback_ref,
    "STAGE07_AI_USE_CASE_BASELINE_ADR.md#4-no-ai-baseline",
  );
  assert.ok(contract.reason_codes.includes("outside_scope"));
  assert.ok(contract.reason_codes.includes("prohibited_context_required"));
  assert.ok(contract.reason_codes.includes("support_not_established"));
  assert.equal(contract.material_match_or_adoption_threshold, "NOT_ESTABLISHED");
  assert.equal(
    contract.citation_claim_semantics,
    "NOT_ESTABLISHED_UNTIL_07_004",
  );

  assert.equal(
    library.output_contracts.embedding_vector.prohibited_persistence,
    true,
  );
  assert.equal(
    library.output_contracts.embedding_vector.raw_payload_logging_authorized,
    false,
  );
});

test("static adversarial boundary cases reject scope broadening, secrets, and invented sources", () => {
  const evalSet = library.eval_sets.find(
    (item) =>
      item.eval_set_id === "evalset.skillcertify.07.003.prompt-boundary-v1",
  );

  assert.equal(evalSet.runtime_execution_status, "NOT_EXECUTED");

  const adversarialCases = evalSet.cases.filter((item) =>
    item.case_id.startsWith("injection-"),
  );

  assert.equal(adversarialCases.length, 3);

  for (const item of adversarialCases) {
    assert.equal(item.expected_behavior, "reject_context_or_abstain");
  }

  assert.deepEqual(
    adversarialCases.map((item) => item.reason_code).sort(),
    ["outside_scope", "prohibited_context_required", "support_not_established"].sort(),
  );
});

test("Stage 07 prompt-grounding baseline remains candidate after human tooling review", () => {
  assert.match(baseline, /status: candidate/);
  assert.match(baseline, /human_reviewed: true/);
  assert.match(
    baseline,
    /human_tooling_decision_ref: https:\/\/github\.com\/misaelalves99\/skill-certify-hub\/issues\/137#issuecomment-5446574085/,
  );
  assert.match(baseline, /"grounded_response_refs": \[\]/);
  assert.match(baseline, /"citation_validation_ref": null/);
  assert.match(baseline, /runtime_grounding_claimed_without_evidence: false/);
  assert.match(baseline, /external_api_call_performed: false/);
  assert.match(baseline, /ai_required: false/);
  assert.match(baseline, /gp7_performed: false/);
  assert.doesNotMatch(baseline, /status: ready/);
});
