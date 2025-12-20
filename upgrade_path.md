# Upgrade Path (ESLint 8 target)

Target: move to ESLint 8.x while stepping dependencies through patch/minor before majors. Keep Node on a supported version for ESLint 8 (>=12.22.0; prefer 16+ to match newer tooling).

## Order of operations
- Patch/minor only: coveralls, eslint-plugin-import, existing majors at latest patch.
- ESLint family to 8.x: eslint, eslint-plugin-node, eslint-plugin-promise, eslint-plugin-standard, @typescript-eslint/eslint-plugin.
- Eta to chosen major (recommended 4.x after staged checks below).
- Tooling majors: jest, prettier, typescript.
- Final sweep: rerun lint/test/format, update peer ranges and docs.

## Component paths

### ESLint core and plugins
- eslint 7.11.0 → 7.32.0 (latest 7.x) → 8.x.latest. Migrate config only if needed; keep eslintrc format (flat config not required on 8).
- eslint-plugin-import 2.22.1 → 2.32.0 (patch/minor only); re-run lint for new rules/options.
- eslint-plugin-promise 4.2.1 → 4.x.latest → 5.x → 6.x → 7.2.1; watch for rule defaults changing severity/options.
- eslint-plugin-standard 4.0.1 → 4.x.latest → 5.0.0; update any extended configs if rules moved.
- eslint-plugin-node 11.1.0 → 11.x.latest (compatible with ESLint 8); confirm Node version map matches target runtime.
- @typescript-eslint/eslint-plugin 4.5.0 → 4.x.latest → 5.x → 6.x → 7.x → 8.50.0; ensure parser version aligns with plugin major and ESLint 8 support matrix.
- Peer ranges: set eslint to ">=8 <9" and align @typescript-eslint peer if required by chosen major.

### Eta processor
- Current usage: Eta.parse with options {parse: {exec:"", interpolate:"=", raw:"~"}, tags:["<%","%>"]}, filtering tokens where t ∈ {r,i,e} and using val strings.
- Path: 1.11.0 → 1.x.latest → 2.x → 3.x → 4.5.0.
- Checks per jump: confirm parse() signature and token schema (t/val/line), option names (tags, parse, autoEscape/includeLineNo) unchanged, and CommonJS require still supported; add/adjust tests that snapshot parse output for representative templates.
- If Eta becomes ESM-only, add an import shim (dynamic import or esm proxy) before moving on.
- Update peer range to match chosen Eta major once validated.

### Tooling and formatters
- jest 26.6.0 → 27.x.latest → 28.x.latest → 29.x.latest → 30.2.0; update fake timers config and watch ESM defaults if used.
- prettier 2.1.2 → 2.8.8 → 3.7.4; expect formatting churn—run format after Prettier 3 bump and commit separately.
- typescript 4.0.3 → 4.9.5 → 5.9.3; adjust tsconfig lib/target as needed; ensure @typescript-eslint major matches.
- coveralls 3.1.0 → 3.1.1 (patch).

## Verification checkpoints
- After each stage, run: npm test, npm run lint, npm run format (post-Prettier 3) to isolate regressions.
- Add processor-focused tests to lock Eta.parse output and ensure extracted JS matches expectations.
- Update README usage to note supported ESLint 8.x and Eta major once validated.Checking E:\Users\jeffc\Source\Repos\GitHub\eslint-plugin-eta\package.json
[====================] 12/12 100%

 @typescript-eslint/eslint-plugin   ^4.5.0  →  ^8.50.0
 coveralls                          ^3.1.0  →   ^3.1.1 - Completed
 eslint                            ^7.11.0  →  ^9.39.2
 eslint-plugin-import              ^2.22.1  →  ^2.32.0
 eslint-plugin-promise              ^4.2.1  →   ^7.2.1
 eslint-plugin-standard             ^4.0.1  →   ^5.0.0
 eta                               ^1.11.0  →   ^4.5.0
 jest                              ^26.6.0  →  ^30.2.0
 prettier                           ^2.1.2  →   ^3.7.4
 typescript                         ^4.0.3  →   ^5.9.3