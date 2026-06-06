import { describe, expect, it } from "vitest";
import fixture from "../fixtures/modernization-ledger.json" with { type: "json" };
import { buildModernizationSummary, postureFor, scoreAsset } from "../src/index.js";

describe("govtech modernization ledger", () => {
  it("prioritizes the COBOL eligibility system", () => {
    const summary = buildModernizationSummary(fixture);
    expect(summary.findings[0].systemId).toBe("benefits-eligibility-mainframe");
    expect(summary.findings[0].posture).toBe("urgent");
    expect(summary.urgentSystems).toBe(1);
    expect(summary.cobolSystems).toBe(1);
  });

  it("scores and classifies systems deterministically", () => {
    expect(postureFor(72)).toBe("urgent");
    expect(postureFor(42)).toBe("sequence");
    expect(postureFor(10)).toBe("ready");
    expect(scoreAsset(fixture.assets[2])).toBeLessThan(scoreAsset(fixture.assets[0]));
  });
});
