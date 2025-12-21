# Cleanup and CommonJS/ESM Compatibility Plan

## Current State Analysis

### Module System
- **Current format**: ES Modules (ESM) only
- **package.json**: `"type": "module"`
- **Entry point**: `lib/index.js` with ESM syntax (`import`/`export`)
- **Target**: Node.js 22 (via Babel configuration)

### Dependencies
- **ESLint**: v9.x (peer dependency >=9 <10) - flat config only
- **Eta**: v4.5.0 (peer dependency >=1.0.0 <5.0.0) - supports both ESM and CJS
- **Build/Test**: Babel + Jest (transforms ESM to CJS for testing)

### What This Means
The plugin currently:
1. ✅ Works perfectly in ESM contexts (modern Node.js, ESLint 9 flat configs)
2. ❌ Cannot be used via `require()` in CommonJS projects without workarounds
3. ❌ Not compatible with older Node.js versions that lack full ESM support

---

## Problem Statement

Users may need to:
1. Use this plugin in CommonJS-based projects (legacy codebases)
2. Support earlier Node.js versions (LTS versions like 18.x, 20.x)
3. Have a clear migration path between CommonJS and ESM

Current ESLint 9 requires Node.js >= 18.18.0, but many projects are still on Node 18.x LTS or using CommonJS exclusively.

---

## Cleanup Required Before Dual-Module Support

### 1. Code Cleanup
- [ ] **Remove unnecessary files**: Check for any temporary/unused files from previous migrations
- [ ] **Consolidate documentation**: We have `upgrade_path.md` and `ETA_V4_API_RESEARCH.md` - consider archiving or consolidating
- [ ] **Review dependencies**: Audit dev dependencies - some may be unused after ESLint 9 migration
  - `eslint-plugin-node` - consider replacing with `eslint-plugin-n`
  - `@eslint/compat` - may no longer be needed if not using legacy configs

### 2. Test Coverage Gaps
- [ ] **Module format tests**: Add tests that verify both CJS and ESM work (once dual-mode is implemented)
- [ ] **Node version tests**: CI should test against multiple Node versions (18.x, 20.x, 22.x)
- [ ] **Eta version tests**: Test against Eta v1, v2, v3, and v4 (per peer dependency range)

### 3. Documentation Cleanup
- [ ] **README.md**: Clearly state supported environments (Node versions, ESLint versions, module formats)
- [ ] **CHANGELOG.md**: Currently missing - should track version history
- [ ] **Migration guides**: Document how to use the plugin in different contexts

---

## Strategy: Dual-Module Package (CommonJS + ESM)

### Recommended Approach: Dual Package with Conditional Exports

**Goal**: Ship both CommonJS and ESM builds, let Node.js pick the right one automatically.

```json
{
  "type": "module",
  "main": "./dist/cjs/index.cjs",      // CJS entry for old environments
  "module": "./dist/esm/index.js",      // ESM entry for bundlers
  "exports": {
    ".": {
      "import": "./dist/esm/index.js",  // ESM import
      "require": "./dist/cjs/index.cjs" // CJS require
    }
  }
}
```

### Why This Approach?
1. **Backwards compatible**: Old projects using `require()` still work
2. **Future-proof**: New projects using `import` get native ESM
3. **Ecosystem standard**: Used by major libraries (Chalk, Yocto-Queue, etc.)
4. **No runtime detection**: Node.js handles it automatically

---

## Implementation Options

### Option 1: Build-Based (Recommended) ⭐
Use a build tool to generate both formats from a single ESM source.

**Tools**: Choose one
- **tsup** - Zero-config, based on esbuild (fast, simple)
- **rollup** - Highly configurable, industry standard
- **esbuild** - Fastest, minimal config

**Example with tsup**:
```bash
npm install --save-dev tsup
```

```javascript
// tsup.config.js
export default {
  entry: ['lib/index.js'],
  format: ['cjs', 'esm'],
  dts: false, // not TypeScript
  outDir: 'dist',
  clean: true,
  splitting: false,
  sourcemap: true
}
```

**Pros**:
- Clean separation of source and build artifacts
- Can optimize/minify during build
- Easier to manage `.npmignore` (only ship `dist/`)

**Cons**:
- Adds build step to workflow
- Need to build before publishing

### Option 2: Babel Transform (Alternative)
Continue using Babel to transform ESM → CJS at build time.

**Current Setup**: Already have `@babel/preset-env` configured for Jest

**Changes Needed**:
- Add build script: `babel lib --out-dir dist/cjs`
- Configure Babel to output CJS format
- Use conditional exports

**Pros**:
- Already using Babel
- Familiar tooling

**Cons**:
- Babel adds complexity
- Slower than esbuild/tsup
- Dual builds require more config

### Option 3: Runtime Detection (Not Recommended)
Use `.mjs` and `.cjs` file extensions with runtime checks.

**Why Not**:
- More complex file structure
- Harder to maintain
- No clear benefit over build approach

---

## Recommended Build Tool: tsup

**Why tsup?**
1. **Zero config** for simple packages
2. **Fast** (uses esbuild under the hood)
3. **Dual format** built-in
4. **Source maps** out of the box
5. **Small footprint** (~5MB vs Rollup's ~20MB)

**Installation**:
```bash
npm install --save-dev tsup
```

**Configuration** (`tsup.config.js`):
```javascript
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['lib/index.js', 'lib/processors/eta.js'],
  format: ['cjs', 'esm'],
  outDir: 'dist',
  clean: true,
  sourcemap: true,
  splitting: false,
  dts: false, // no TypeScript definitions
  outExtension({ format }) {
    return {
      js: format === 'cjs' ? '.cjs' : '.js'
    }
  }
})
```

**package.json changes**:
```json
{
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./processors/eta": {
      "import": "./dist/processors/eta.js",
      "require": "./dist/processors/eta.cjs"
    }
  },
  "scripts": {
    "build": "tsup",
    "prepublishOnly": "npm run build"
  },
  "files": [
    "dist"
  ]
}
```

---

## Node.js Version Support Strategy

### Current Constraints
- **ESLint 9**: Requires Node.js >= 18.18.0
- **Eta 4**: Works on Node.js >= 12 (supports both CJS and ESM)
- **Babel target**: Currently Node 22

### Recommended Support Matrix

| Node Version | Support Level | Notes |
|--------------|---------------|-------|
| Node 18.18+  | ✅ Full support | Minimum for ESLint 9 |
| Node 20.x    | ✅ Full support | Current LTS |
| Node 22.x    | ✅ Full support | Current release |
| Node 16.x    | ❌ Not supported | EOL April 2024 |

### Implementation
1. Update `.babelrc.json`:
```json
{
  "presets": [
    ["@babel/preset-env", { "targets": { "node": "18.18" } }]
  ]
}
```

2. Update `package.json`:
```json
{
  "engines": {
    "node": ">=18.18.0"
  }
}
```

3. Add CI test matrix (`.github/workflows/test.yml`):
```yaml
strategy:
  matrix:
    node-version: [18.18, 20.x, 22.x]
```

---

## Version and Branching Strategy

### For Major Changes (Breaking)

**Create a maintenance branch for current version**:
```bash
git checkout -b maintain/v0.2.x
git push -u origin maintain/v0.2.x
```

Then implement dual-module on `main` as v0.3.0 or v1.0.0.

### For Experimental Work

**Use feature branches with `sid/` prefix** (as requested):
```bash
git checkout -b sid/dual-module-research
git checkout -b sid/build-tooling-prototype
git checkout -b sid/commonjs-compat-tests
```

**Purpose**: Allows experimentation without affecting main development.

### Semantic Versioning Plan

- **v0.2.x** (current): ESM-only, ESLint 9, Eta 4
- **v0.3.0** (proposed): Add CommonJS build, maintain ESM primary
- **v1.0.0** (future): Stable dual-module API

**Breaking changes that would warrant v1.0.0**:
- Dropping support for older Eta versions
- Changing processor API
- Changing export structure

---

## Testing Strategy for Dual-Module

### 1. Import/Require Tests
Create tests that verify both module formats work:

```javascript
// test/module-formats/esm.spec.js
import { describe, it, expect } from 'jest'
import plugin from '../../dist/index.js'

describe('ESM import', () => {
  it('should load plugin via ESM import', () => {
    expect(plugin).toBeDefined()
    expect(plugin.processors.eta).toBeDefined()
  })
})
```

```javascript
// test/module-formats/cjs.spec.js
const plugin = require('../../dist/index.cjs')

describe('CJS require', () => {
  it('should load plugin via CommonJS require', () => {
    expect(plugin).toBeDefined()
    expect(plugin.processors.eta).toBeDefined()
  })
})
```

### 2. Node Version Testing
Use CI matrix to test multiple Node versions:
- Node 18.18 (minimum)
- Node 20.x (LTS)
- Node 22.x (current)

### 3. Integration Testing
Test the plugin in actual ESLint configurations:

```javascript
// test/integration/eslint-flat-config.spec.js
import { ESLint } from 'eslint'
import plugin from '../../dist/index.js'

describe('ESLint integration', () => {
  it('should work in flat config', async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: [{
        files: ['**/*.eta'],
        plugins: { eta: plugin },
        processor: 'eta/eta'
      }]
    })
    // Test linting an .eta file
  })
})
```

---

## Migration Path for Users

### Current Users (ESM)
**No changes required** - ESM import will continue to work:
```javascript
import eta from '@jeffcaradona/eslint-plugin-eta'
```

### New Users (CommonJS)
After dual-module implementation:
```javascript
const eta = require('@jeffcaradona/eslint-plugin-eta')
```

### Documentation Updates Needed
1. **README.md**: Add "Module Format Support" section
2. **Migration guide**: How to switch between formats if needed
3. **Troubleshooting**: Common issues (e.g., "ERR_REQUIRE_ESM")

---

## Implementation Timeline (Proposed)

### Phase 1: Research and Planning (Current) ✓
- [x] Document current state
- [x] Research dual-module approaches
- [x] Choose build tool (tsup)
- [x] Define Node.js support matrix

### Phase 2: Cleanup (1-2 days)
- [ ] Remove unused dependencies
- [ ] Consolidate documentation
- [ ] Add CHANGELOG.md
- [ ] Update README with current limitations

### Phase 3: Build Setup (2-3 days)
- [ ] Install and configure tsup
- [ ] Set up build scripts
- [ ] Configure package.json exports
- [ ] Update .gitignore and .npmignore
- [ ] Test builds locally

### Phase 4: Testing (2-3 days)
- [ ] Add module format tests
- [ ] Add integration tests
- [ ] Set up CI for multiple Node versions
- [ ] Verify both CJS and ESM work

### Phase 5: Documentation (1-2 days)
- [ ] Update README
- [ ] Write migration guide
- [ ] Update CHANGELOG
- [ ] Add examples for both formats

### Phase 6: Release (1 day)
- [ ] Version bump (v0.3.0)
- [ ] Publish to npm
- [ ] Tag release
- [ ] Announce changes

**Total estimated time**: 1-2 weeks

---

## Rollback Plan

If dual-module causes issues:

1. **Keep v0.2.x branch**: Users can pin to `@jeffcaradona/eslint-plugin-eta@0.2.3`
2. **Publish patches**: Fix critical bugs on both v0.2.x and v0.3.x
3. **Document workarounds**: Provide ESM-only fallback instructions

---

## Open Questions for Discussion

1. **Version bump**: Should dual-module be v0.3.0 or v1.0.0?
   - Recommendation: v0.3.0 (not breaking for existing ESM users)

2. **Peer dependency range for Eta**: Keep wide range (1.x-4.x) or narrow to 4.x?
   - Recommendation: Keep wide range, test all versions

3. **Drop Node 18.18 support?**: ESLint 9 minimum is 18.18.0
   - Recommendation: Keep 18.18.0 as minimum (matches ESLint 9)

4. **Deprecate old versions?**: Should we add deprecation notice to v0.2.x?
   - Recommendation: No, keep both maintained for 6 months

5. **TypeScript definitions?**: Should we add .d.ts files?
   - Recommendation: Not in phase 1, consider for v1.0.0

---

## References and Resources

### Dual-Module Guides
- [Node.js Packages: Dual CommonJS/ES module packages](https://nodejs.org/api/packages.html#dual-commonjses-module-packages)
- [Pure ESM package guide](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c)
- [ESLint: Package Exports](https://eslint.org/docs/latest/extend/ways-to-extend)

### Build Tools
- [tsup documentation](https://tsup.egoist.dev/)
- [Rollup documentation](https://rollupjs.org/)
- [esbuild documentation](https://esbuild.github.io/)

### Compatibility
- [Eta v4 migration guide](https://eta.js.org/docs/migrating)
- [ESLint 9 migration guide](https://eslint.org/docs/latest/use/migrate-to-9.0.0)

---

## Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2025-12-21 | Use tsup for dual builds | Simple, fast, zero-config |
| 2025-12-21 | Target Node 18.18+ | Matches ESLint 9 minimum |
| 2025-12-21 | Keep ESM as source | Future-proof, cleaner syntax |
| 2025-12-21 | Use sid/ branch prefix | Requested for experimental work |

---

## Summary

**Current State**: ESM-only, works great in modern environments

**Goal**: Support both ESM and CommonJS without breaking existing users

**Approach**: Build both formats using tsup, ship with conditional exports

**Timeline**: 1-2 weeks for full implementation

**Risk**: Low - ESM users unaffected, CJS users gain compatibility

**Next Steps**: 
1. Get approval on this plan
2. Create `sid/dual-module-prototype` branch
3. Start with Phase 2 (Cleanup)
