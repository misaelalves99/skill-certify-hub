import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const CURRENT_FILE = fileURLToPath(import.meta.url);
const DEFAULT_ROOT = path.resolve(path.dirname(CURRENT_FILE), "..");

const REQUIRED_IGNORE_RULES = [".env*", "*.pem", "*.key", "*.p12", "*.pfx"];

const TRACKED_SENSITIVE_PATTERNS = [
  {
    label: "tracked environment file",
    matches: (file) => /(^|\/)\.env(?:\.|$)/i.test(file),
  },
  {
    label: "tracked key/certificate material",
    matches: (file) => /\.(?:pem|key|p12|pfx)$/i.test(file),
  },
];

const APPLICATION_PATTERNS = [
  { label: "process.env usage", pattern: /\bprocess\.env\b/ },
  { label: "NEXT_PUBLIC_ usage", pattern: /\bNEXT_PUBLIC_[A-Z0-9_]*\b/ },
];

const WORKFLOW_PATTERNS = [
  { label: "GitHub Actions secrets context", pattern: /\bsecrets\./ },
  {
    label: "GitHub Actions environment binding",
    pattern: /^\s*environment\s*:/m,
  },
];

function normalizeRepositoryPath(file) {
  return file.replaceAll("\\", "/");
}

function activeIgnoreRules(gitignore) {
  return new Set(
    gitignore
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#")),
  );
}

export function evaluateConfigSecretPolicy({
  trackedFiles = [],
  gitignore = "",
  applicationFiles = {},
  workflowFiles = {},
}) {
  const violations = [];
  const ignoreRules = activeIgnoreRules(gitignore);

  for (const requiredRule of REQUIRED_IGNORE_RULES) {
    if (!ignoreRules.has(requiredRule)) {
      violations.push(`missing required .gitignore rule: ${requiredRule}`);
    }
  }

  for (const rawFile of trackedFiles) {
    const file = normalizeRepositoryPath(rawFile);

    for (const rule of TRACKED_SENSITIVE_PATTERNS) {
      if (rule.matches(file)) {
        violations.push(`${rule.label}: ${file}`);
      }
    }
  }

  for (const [rawFile, content] of Object.entries(applicationFiles)) {
    const file = normalizeRepositoryPath(rawFile);

    for (const rule of APPLICATION_PATTERNS) {
      if (rule.pattern.test(content)) {
        violations.push(`${rule.label} requires explicit policy review: ${file}`);
      }
    }
  }

  for (const [rawFile, content] of Object.entries(workflowFiles)) {
    const file = normalizeRepositoryPath(rawFile);

    for (const rule of WORKFLOW_PATTERNS) {
      if (rule.pattern.test(content)) {
        violations.push(`${rule.label} requires explicit policy review: ${file}`);
      }
    }
  }

  return violations;
}

async function listFilesRecursive(root, relativeDirectory) {
  const absoluteDirectory = path.join(root, relativeDirectory);

  if (!existsSync(absoluteDirectory)) {
    return [];
  }

  const entries = await readdir(absoluteDirectory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const relativePath = path.join(relativeDirectory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await listFilesRecursive(root, relativePath)));
    } else if (entry.isFile()) {
      files.push(relativePath);
    }
  }

  return files;
}

async function readFileMap(root, files) {
  const entries = await Promise.all(
    files.map(async (file) => [
      normalizeRepositoryPath(file),
      await readFile(path.join(root, file), "utf8"),
    ]),
  );

  return Object.fromEntries(entries);
}

function trackedFiles(root) {
  return execFileSync("git", ["ls-files"], {
    cwd: root,
    encoding: "utf8",
  })
    .split(/\r?\n/)
    .map((file) => file.trim())
    .filter(Boolean);
}

export async function inspectRepository(root = DEFAULT_ROOT) {
  const applicationExtensions = /\.(?:js|jsx|mjs|cjs|ts|tsx)$/i;
  const applicationFiles = (await listFilesRecursive(root, "app")).filter((file) =>
    applicationExtensions.test(file),
  );

  const nextConfigCandidates = [
    "next.config.ts",
    "next.config.js",
    "next.config.mjs",
    "next.config.cjs",
  ].filter((file) => existsSync(path.join(root, file)));

  const workflowFiles = (await listFilesRecursive(root, ".github/workflows")).filter(
    (file) => /\.ya?ml$/i.test(file),
  );

  const gitignore = await readFile(path.join(root, ".gitignore"), "utf8");

  return evaluateConfigSecretPolicy({
    trackedFiles: trackedFiles(root),
    gitignore,
    applicationFiles: await readFileMap(root, [
      ...applicationFiles,
      ...nextConfigCandidates,
    ]),
    workflowFiles: await readFileMap(root, workflowFiles),
  });
}

async function main() {
  const violations = await inspectRepository();

  if (violations.length === 0) {
    console.log("Config/secret policy guard: PASS");
    return;
  }

  console.error("Config/secret policy guard: FAIL");
  for (const violation of violations) {
    console.error(`- ${violation}`);
  }
  process.exitCode = 1;
}

const invokedFile = process.argv[1] ? path.resolve(process.argv[1]) : null;

if (invokedFile === CURRENT_FILE) {
  main().catch((error) => {
    console.error("Config/secret policy guard: ERROR");
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}
