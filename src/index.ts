export interface ModernizationAsset {
  systemId: string;
  owner: string;
  language: "COBOL" | "Java" | "SQL" | string;
  citizenImpact: number;
  batchWindowHours: number;
  defectBacklog: number;
  auditGaps: number;
  interfaceCount: number;
  dataContractAgeMonths: number;
  fundingReadiness: number;
  nextAction: string;
}

export interface ModernizationInput {
  estate: string;
  assets: ModernizationAsset[];
}

export interface ModernizationFinding extends ModernizationAsset {
  modernizationRiskScore: number;
  posture: "urgent" | "sequence" | "ready";
  boardNarrative: string;
}

export interface ModernizationSummary {
  estate: string;
  aggregateModernizationRisk: number;
  urgentSystems: number;
  cobolSystems: number;
  findings: ModernizationFinding[];
  primaryRecommendation: string;
}

const clamp = (value: number) => Math.max(0, Math.min(100, value));

export function scoreAsset(asset: ModernizationAsset): number {
  const legacyMultiplier = asset.language.toLowerCase() === "cobol" ? 1.18 : 1;
  const raw =
    asset.citizenImpact * 0.24 +
    asset.batchWindowHours * 2.1 +
    asset.defectBacklog * 1.35 +
    asset.auditGaps * 5.4 +
    asset.interfaceCount * 2.2 +
    asset.dataContractAgeMonths * 0.85 -
    asset.fundingReadiness * 0.28;

  return Number(clamp(raw * legacyMultiplier).toFixed(2));
}

export function postureFor(score: number): ModernizationFinding["posture"] {
  if (score >= 72) return "urgent";
  if (score >= 42) return "sequence";
  return "ready";
}

export function buildModernizationSummary(input: ModernizationInput): ModernizationSummary {
  const findings = input.assets
    .map((asset) => {
      const modernizationRiskScore = scoreAsset(asset);
      const posture = postureFor(modernizationRiskScore);
      return {
        ...asset,
        modernizationRiskScore,
        posture,
        boardNarrative: `${asset.systemId} carries ${posture} modernization posture because citizen impact, batch windows, audit gaps, and interface count resolve into a ${modernizationRiskScore} risk score.`
      };
    })
    .sort((a, b) => b.modernizationRiskScore - a.modernizationRiskScore);

  const aggregateModernizationRisk = Number(
    (findings.reduce((total, asset) => total + asset.modernizationRiskScore, 0) / Math.max(1, findings.length)).toFixed(2)
  );
  const urgentSystems = findings.filter((asset) => asset.posture === "urgent").length;
  const cobolSystems = findings.filter((asset) => asset.language.toLowerCase() === "cobol").length;
  const primaryRecommendation =
    findings[0]?.nextAction ?? "No systems were supplied. Add COBOL, Java, and SQL assets before board modernization review.";

  return { estate: input.estate, aggregateModernizationRisk, urgentSystems, cobolSystems, findings, primaryRecommendation };
}
