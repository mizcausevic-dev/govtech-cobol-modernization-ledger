import { readFileSync } from "node:fs";

const html = readFileSync("site/index.html", "utf8");
const required = [
  "<title>GovTech COBOL Modernization Ledger</title>",
  "Legacy public systems become visible before modernization spend moves.",
  "benefits-eligibility-mainframe",
  "tax-disbursement-orchestrator"
];
const missing = required.filter((marker) => !html.includes(marker));
if (missing.length > 0) {
  throw new Error(`Smoke check missing: ${missing.join(", ")}`);
}
console.log("smoke ok");
