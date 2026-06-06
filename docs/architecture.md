# Architecture

The ledger has four proof lanes:

1. TypeScript builds the executive-facing scorecard and static page.
2. Java validates the scoring shape for modernization service boundaries.
3. COBOL records the legacy posture contract for mainframe-facing readers.
4. SQL exposes risk and board-posture views for reporting marts.

The public page is generated from `fixtures/modernization-ledger.json` by `scripts/prerender.ts`.

The COBOL lane is source-contract checked because a COBOL compiler is not assumed in local or GitHub runner environments. If GnuCOBOL is available, `cobol/MODERNIZATION-POSTURE.cbl` can be compiled independently.
