import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

export const PromotionEligibilityState = Object.freeze({
  ELIGIBLE: "ELIGIBLE",
  INELIGIBLE: "INELIGIBLE",
  BLOCKED: "BLOCKED",
});

const FULL_SHA_PATTERN = /^[0-9a-f]{40}$/i;
const TASK_PATTERN = /^task\.skillcertify\.\d{2}\.\d{3}$/;

export const entryBaselineCandidate = Object.freeze({
  source: {
    repository: "misaelalves99/skill-certify-hub",
    sha: "1dd2e4f03f847618618ecca8b9963d09468f64d1",
  },
  traceability: {
    required: true,
    task: "task.skillcertify.06.006",
    pr: 120,
  },
  quality: {
    sourceSha: "1dd2e4f03f847618618ecca8b9963d09468f64d1",
    conclusion: "success",
    runId: 33071128970,
  },
  hardStops: [],
  target: { status: "not_established" },
  provider: { status: "not_established" },
  mechanism: { status: "not_established" },
  credentialPolicy: { status: "not_established" },
  authority: { status: "required" },
});

function hasText(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function addBlocked(blocked, code) {
  blocked.push(code);
}

function addFailed(failed, code) {
  failed.push(code);
}

function evaluateEstablishedCapability(value, name, blocked, failed) {
  if (!value || value.status === "not_established") {
    addBlocked(blocked, `${name}_not_established`);
    return;
  }

  if (value.status !== "established") {
    addFailed(failed, `${name}_status_invalid`);
    return;
  }

  if (!hasText(value.id)) {
    addFailed(failed, `${name}_identity_invalid`);
  }
}

function evaluateOptionalCapability(value, name, blocked, failed) {
  if (!value || value.status === "not_established") {
    addBlocked(blocked, `${name}_not_established`);
    return;
  }

  if (value.status === "established") {
    if (!hasText(value.id)) {
      addFailed(failed, `${name}_identity_invalid`);
    }
    return;
  }

  if (value.status === "not_applicable") {
    if (!hasText(value.basis)) {
      addFailed(failed, `${name}_not_applicable_basis_missing`);
    }
    return;
  }

  addFailed(failed, `${name}_status_invalid`);
}

export function evaluatePromotionCandidate(candidate = {}) {
  const failed = [];
  const blocked = [];

  const source = candidate.source ?? {};
  if (!hasText(source.repository)) {
    addBlocked(blocked, "source_repository_missing");
  }

  if (!hasText(source.sha)) {
    addBlocked(blocked, "source_sha_missing");
  } else if (!FULL_SHA_PATTERN.test(source.sha)) {
    addFailed(failed, "source_sha_must_be_full_40_hex");
  }

  const traceability = candidate.traceability ?? {};
  if (traceability.required === true) {
    if (!hasText(traceability.task)) {
      addBlocked(blocked, "traceability_task_missing");
    } else if (!TASK_PATTERN.test(traceability.task)) {
      addFailed(failed, "traceability_task_invalid");
    }

    if (traceability.pr == null) {
      addBlocked(blocked, "traceability_pr_missing");
    } else if (!Number.isInteger(traceability.pr) || traceability.pr <= 0) {
      addFailed(failed, "traceability_pr_invalid");
    }
  }

  const quality = candidate.quality;
  if (!quality) {
    addBlocked(blocked, "quality_evidence_missing");
  } else {
    if (!hasText(quality.sourceSha)) {
      addBlocked(blocked, "quality_source_sha_missing");
    } else if (!FULL_SHA_PATTERN.test(quality.sourceSha)) {
      addFailed(failed, "quality_source_sha_invalid");
    } else if (FULL_SHA_PATTERN.test(source.sha ?? "") && quality.sourceSha !== source.sha) {
      addFailed(failed, "quality_source_sha_mismatch");
    }

    if (!hasText(quality.conclusion)) {
      addBlocked(blocked, "quality_conclusion_missing");
    } else if (quality.conclusion !== "success") {
      addFailed(failed, "quality_not_success");
    }
  }

  if (!Object.hasOwn(candidate, "hardStops")) {
    addBlocked(blocked, "hard_stop_evidence_missing");
  } else if (!Array.isArray(candidate.hardStops)) {
    addFailed(failed, "hard_stops_must_be_array");
  } else if (candidate.hardStops.length > 0) {
    addFailed(failed, "unresolved_hard_stops");
  }

  evaluateEstablishedCapability(candidate.target, "target", blocked, failed);
  evaluateOptionalCapability(candidate.provider, "provider", blocked, failed);
  evaluateEstablishedCapability(candidate.mechanism, "mechanism", blocked, failed);
  evaluateOptionalCapability(
    candidate.credentialPolicy,
    "credential_policy",
    blocked,
    failed,
  );

  const authority = candidate.authority;
  if (!authority || authority.status === "required" || authority.status === "not_established") {
    addBlocked(blocked, "authority_not_established");
  } else if (authority.status === "denied") {
    addFailed(failed, "authority_denied");
  } else if (authority.status !== "approved") {
    addFailed(failed, "authority_status_invalid");
  } else {
    if (!hasText(authority.actor)) {
      addFailed(failed, "authority_actor_invalid");
    }
    if (!hasText(authority.basis)) {
      addFailed(failed, "authority_basis_invalid");
    }
  }

  const state =
    failed.length > 0
      ? PromotionEligibilityState.INELIGIBLE
      : blocked.length > 0
        ? PromotionEligibilityState.BLOCKED
        : PromotionEligibilityState.ELIGIBLE;

  return {
    state,
    eligible: state === PromotionEligibilityState.ELIGIBLE,
    sourceSha: hasText(source.sha) ? source.sha : null,
    failed,
    blocked,
    reasons: [...failed, ...blocked],
  };
}

async function loadCandidateFromArgs(args) {
  if (args.length === 0 || args[0] === "--baseline") {
    return entryBaselineCandidate;
  }

  if (args[0] === "--file" && hasText(args[1]) && args.length === 2) {
    return JSON.parse(await readFile(args[1], "utf8"));
  }

  throw new Error("usage: --baseline | --file <candidate.json> [--require-eligible]");
}

async function main() {
  const args = process.argv.slice(2);
  const requireEligibleIndex = args.indexOf("--require-eligible");
  const requireEligible = requireEligibleIndex >= 0;
  if (requireEligible) {
    args.splice(requireEligibleIndex, 1);
  }

  try {
    const candidate = await loadCandidateFromArgs(args);
    const result = evaluatePromotionCandidate(candidate);
    console.log(JSON.stringify(result, null, 2));

    if (requireEligible && result.state !== PromotionEligibilityState.ELIGIBLE) {
      process.exitCode =
        result.state === PromotionEligibilityState.INELIGIBLE ? 1 : 2;
    }
  } catch (error) {
    console.error(`Promotion eligibility input error: ${error.message}`);
    process.exitCode = 64;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
