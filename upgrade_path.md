# Upgrade Path (ESLint 9 target)

Target: move to ESLint 9.x (flat config support) while stepping dependencies through patch/minor before majors. Keep Node on a supported version for ESLint 9 (>=18.18.0; aim for 22.x as the long-term target, 20.x acceptable while upgrading).

## Order of operations
- Patch/minor only: coveralls, eslint-plugin-import, existing majors at latest patch. 

- ESLint family to 9.x: migrate config to flat-config (or maintain legacy via eslint-compat if desired), upgrade eslint, eslint-plugin-node (or eslint-plugin-n), eslint-plugin-promise, eslint-plugin-standard, @typescript-eslint/eslint-plugin.

- Eta to chosen major (recommended 4.x after staged checks below).
- Tooling majors: jest, prettier, typescript.
- Final sweep: rerun lint/test/format, update peer ranges and docs.

## Component paths

### ESLint core and plugins
- eslint 7.11.0 → 7.32.0 (latest 7.x) → 8.x.latest → 9.x.latest. Migrate to flat config on the 9 jump; consider eslint-compat to bridge eslintrc if needed.
- eslint-plugin-import 2.22.1 → 2.32.0 (patch/minor only); re-run lint for new rules/options.
- eslint-plugin-promise 4.2.1 → 4.x.latest → 5.x → 6.x → 7.2.1; watch for rule defaults changing severity/options.
- eslint-plugin-standard 4.0.1 → 4.x.latest → 5.0.0; update any extended configs if rules moved.
- eslint-plugin-node 11.1.0 → 11.x.latest; consider migrating to eslint-plugin-n if/when rules move; ensure Node version map matches runtime.
- @typescript-eslint/eslint-plugin 4.5.0 → 4.x.latest → 5.x → 6.x → 7.x → 8.50.0; ensure parser version aligns with ESLint 9 support matrix.
- Peer ranges: set eslint to ">=9 <10" and align @typescript-eslint peer if required by chosen major.

### Eta processor
- Current usage: Eta.parse with options {parse: {exec:"", interpolate:"=", raw:"~"}, tags:["<%","%>"]}, filtering tokens where t ∈ {r,i,e} and using val strings.
- Path: 1.11.0 → 1.x.latest → 2.x → 3.x → 4.5.0.
- Checks per jump: confirm parse() signature and token schema (t/val/line), option names (tags, parse, autoEscape/includeLineNo) unchanged, and CommonJS require still supported; add/adjust tests that snapshot parse output for representative templates.
- If Eta becomes ESM-only, add an import shim (dynamic import or esm proxy) before moving on.
- Update peer range to match chosen Eta major once validated.

### Tooling and formatters
- jest 26.6.0 → 27.x.latest → 28.x.latest → 29.x.latest → 30.2.0; update fake timers config and watch ESM defaults if used. Until Jest is on 29+, keep a moduleNameMapper for `^node:(.*)$` → `$1`.
- prettier 2.1.2 → 2.8.8 → 3.7.4; expect formatting churn—run format after Prettier 3 bump and commit separately.
- typescript 4.0.3 → 4.9.5 → 5.9.3; adjust tsconfig lib/target as needed; ensure @typescript-eslint major matches.
- coveralls 3.1.0 → 3.1.1 (patch).

## Verification checkpoints
- After each stage, run: npm test, npm run lint, npm run format (post-Prettier 3) to isolate regressions.
- Add processor-focused tests to lock Eta.parse output and ensure extracted JS matches expectations.
- Update README usage to note supported ESLint 9.x and Eta major once validated.