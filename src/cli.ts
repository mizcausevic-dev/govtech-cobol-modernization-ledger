import { readFileSync } from "node:fs";
import { buildModernizationSummary, type ModernizationInput } from "./index.js";

const path = process.argv[2] ?? "fixtures/modernization-ledger.json";
const input = JSON.parse(readFileSync(path, "utf8")) as ModernizationInput;
console.log(JSON.stringify(buildModernizationSummary(input), null, 2));
