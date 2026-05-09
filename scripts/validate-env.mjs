#!/usr/bin/env node
// Fails the build if required env vars are missing or malformed.
// Run automatically via the `prebuild` npm hook.

import fs from "node:fs";
import path from "node:path";

const REQUIRED = [
  {
    name: "NEXT_PUBLIC_SITE_URL",
    check: (v) => /^https?:\/\//.test(v),
    hint: "must start with http:// or https://",
  },
  {
    name: "NEXT_PUBLIC_SUPABASE_URL",
    check: (v) => /^https:\/\/.+\.supabase\.co/.test(v),
    hint: "must be the Supabase project URL (https://<ref>.supabase.co)",
  },
  { name: "NEXT_PUBLIC_SUPABASE_ANON_KEY" },
  { name: "SUPABASE_SERVICE_ROLE_KEY" },
];

// Optional groups: if any one is set, all must be set.
const GROUPS = [
  {
    name: "Resend",
    vars: ["RESEND_API_KEY", "LEAD_NOTIFICATION_TO", "LEAD_NOTIFICATION_FROM"],
  },
];

function loadDotEnv() {
  // Minimal .env loader so this script works without `dotenv` installed.
  // Next.js loads .env at build time anyway; this is just for the prebuild step.
  const file = path.join(process.cwd(), ".env");
  if (!fs.existsSync(file)) return;
  const text = fs.readFileSync(file, "utf8");
  for (const line of text.split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    const [, key, raw] = m;
    if (process.env[key] !== undefined) continue;
    let value = raw.trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
}

loadDotEnv();

const errors = [];

for (const v of REQUIRED) {
  const value = process.env[v.name];
  if (!value || value.trim() === "") {
    errors.push(`Missing ${v.name}`);
    continue;
  }
  if (v.check && !v.check(value)) {
    errors.push(`Invalid ${v.name}: ${v.hint ?? "wrong format"}`);
  }
}

for (const group of GROUPS) {
  const present = group.vars.filter(
    (n) => process.env[n] && process.env[n].trim() !== ""
  );
  if (present.length > 0 && present.length < group.vars.length) {
    const missing = group.vars.filter((n) => !present.includes(n));
    errors.push(
      `${group.name}: partial config — set all of [${group.vars.join(", ")}] or none. Missing: ${missing.join(", ")}`
    );
  }
}

if (errors.length > 0) {
  console.error("\nEnvironment validation failed:");
  for (const e of errors) console.error("  - " + e);
  console.error("\nFix the .env file (or your deployment env) and rerun the build.\n");
  process.exit(1);
}

console.log("Environment OK.");
