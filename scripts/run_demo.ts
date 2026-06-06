import { readFileSync } from "node:fs";
import { buildModernizationSummary, type ModernizationInput } from "../src/index.js";

const input = JSON.parse(readFileSync("fixtures/modernization-ledger.json", "utf8")) as ModernizationInput;
const summary = buildModernizationSummary(input);
console.log(`estate=${summary.estate}`);
console.log(`risk=${summary.aggregateModernizationRisk}`);
console.log(`urgent=${summary.urgentSystems}`);
console.log(`recommendation=${summary.primaryRecommendation}`);
