import { readFileSync } from "node:fs";

const sql = readFileSync("sql/modernization_risk_views.sql", "utf8");
const required = [
  "public_sector.modernization_asset_risk",
  "public_sector.board_modernization_posture",
  "modernization_risk_score",
  "modernization_posture",
  "raw_modernization_ledger"
];
const missing = required.filter((marker) => !sql.includes(marker));
if (missing.length > 0) {
  throw new Error(`SQL contract missing: ${missing.join(", ")}`);
}
console.log("sql contract ok");
