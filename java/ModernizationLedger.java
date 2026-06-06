public final class ModernizationLedger {
  private ModernizationLedger() {}

  static double score(
      String language,
      double citizenImpact,
      double batchWindowHours,
      double defectBacklog,
      double auditGaps,
      double interfaceCount,
      double dataContractAgeMonths,
      double fundingReadiness) {
    double raw =
        citizenImpact * 0.24
            + batchWindowHours * 2.1
            + defectBacklog * 1.35
            + auditGaps * 5.4
            + interfaceCount * 2.2
            + dataContractAgeMonths * 0.85
            - fundingReadiness * 0.28;
    double multiplier = "COBOL".equalsIgnoreCase(language) ? 1.18 : 1.0;
    return Math.max(0, Math.min(100, raw * multiplier));
  }

  static String posture(double score) {
    if (score >= 72) {
      return "urgent";
    }
    if (score >= 42) {
      return "sequence";
    }
    return "ready";
  }

  public static void main(String[] args) {
    double risk = score("COBOL", 94, 16, 21, 7, 14, 38, 42);
    if (!"urgent".equals(posture(risk))) {
      throw new IllegalStateException("Expected urgent posture for COBOL eligibility system");
    }
    System.out.printf("system=benefits-eligibility-mainframe%n");
    System.out.printf("risk=%.2f%n", risk);
    System.out.printf("posture=%s%n", posture(risk));
  }
}
