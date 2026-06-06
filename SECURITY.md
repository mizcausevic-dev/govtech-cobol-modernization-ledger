# Security

This repository uses synthetic modernization data only. Do not commit live agency system names, citizen data, credentials, extracts, hostnames, SSH keys, FTP credentials, or internal file paths.

Before publishing changes, run:

```bash
npm run verify
rg -n "<local-path-or-secret-pattern>" .
```

Modernization evidence packets should be redacted before public use.
