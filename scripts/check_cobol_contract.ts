import { readFileSync } from "node:fs";

const source = readFileSync("cobol/MODERNIZATION-POSTURE.cbl", "utf8");
const required = [
  "IDENTIFICATION DIVISION",
  "PROGRAM-ID. MODERNIZATION-POSTURE",
  "MODERNIZATION-RISK-SCORE",
  "BENEFITS-ELIGIBILITY-MAINFRAME",
  "POSTURE="
];
const missing = required.filter((marker) => !source.includes(marker));
if (missing.length > 0) {
  throw new Error(`COBOL contract missing: ${missing.join(", ")}`);
}
console.log("cobol contract ok");
