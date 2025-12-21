# Next Steps: Implementing Dual-Module Support

## Quick Overview

This repository currently supports **ES Modules (ESM) only**. The planning documents outline a strategy to add **CommonJS support** while maintaining backwards compatibility.

**Status**: ✅ Planning complete, ready for implementation

---

## Where We Are Now

✅ **Completed**:
- Current state analyzed (v0.2.3, ESM-only, ESLint 9, Eta 4)
- Comprehensive planning documents created
- Build tool selected (tsup)
- Branching strategy defined
- Node.js version support decided (18.18+)

📋 **Next**: Begin implementation

---

## Recommended Implementation Path

### Option A: Full Implementation (Recommended)

Follow the 6-phase plan in `CLEANUP_AND_COMMONJS_PLAN.md`:

#### Phase 1: ✅ Complete
Research and planning done.

#### Phase 2: Cleanup (Start Here) 
**Estimated time**: 1-2 days

```bash
# Create experimental branch
git checkout -b sid/dual-module-implementation
```

**Tasks**:
1. Audit and remove unused dependencies
2. Add CHANGELOG.md
3. Update README with current limitations
4. Document current module format clearly

**Commands**:
```bash
# Check for unused dependencies
npm install -g depcheck
depcheck

# Review what's installed
npm list --depth=0
```

#### Phase 3: Build Setup
**Estimated time**: 2-3 days

**Tasks**:
1. Install tsup: `npm install --save-dev tsup`
2. Create `tsup.config.js`
3. Update `package.json` with exports
4. Configure build scripts
5. Test builds locally

**Verification**:
```bash
npm run build
# Should create dist/index.cjs and dist/index.js

# Test CJS
node -e "const plugin = require('./dist/index.cjs'); console.log(plugin)"

# Test ESM
node --input-type=module -e "import plugin from './dist/index.js'; console.log(plugin)"
```

#### Phase 4: Testing
**Estimated time**: 2-3 days

**Tasks**:
1. Add module format tests
2. Add integration tests
3. Set up CI for Node 18, 20, 22
4. Test with different Eta versions

#### Phase 5: Documentation
**Estimated time**: 1-2 days

**Tasks**:
1. Update README with usage examples
2. Write migration guide
3. Update CHANGELOG
4. Add troubleshooting section

#### Phase 6: Release
**Estimated time**: 1 day

**Tasks**:
1. Create `maintain/v0.2.x` branch
2. Bump version to v0.3.0
3. Publish to npm
4. Tag release
5. Announce changes

**Total time**: ~1-2 weeks

---

### Option B: Quick Prototype (Alternative)

Skip cleanup, go straight to prototyping:

```bash
# Create prototype branch
git checkout -b sid/tsup-prototype

# Install tsup
npm install --save-dev tsup

# Create minimal config
cat > tsup.config.js << 'EOL'
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['lib/index.js'],
  format: ['cjs', 'esm'],
  outDir: 'dist',
  clean: true,
  sourcemap: true,
  splitting: false,
  dts: false
})
EOL

# Add build script to package.json manually
# Then run:
npm run build

# Test the outputs
node -e "console.log(require('./dist/index.cjs'))"
node --input-type=module -e "import('./dist/index.js').then(console.log)"
```

If prototype works, move to full implementation.

---

## Decision Points

Before starting, decide:

### 1. Version Number
- **v0.3.0**: Minor bump (recommended - backwards compatible)
- **v1.0.0**: Major bump (if you consider this a breaking change)

**Recommendation**: v0.3.0
- ESM users see no breaking changes
- CJS support is additive, not breaking

### 2. Maintenance Strategy
- **Option A**: Maintain both v0.2.x (ESM-only) and v0.3.x (dual-mode)
- **Option B**: Move everyone to v0.3.x, deprecate v0.2.x

**Recommendation**: Option A for 6 months, then deprecate v0.2.x

### 3. Peer Dependency Range for Eta
- **Wide range**: `>=1.0.0 <5.0.0` (current)
- **Narrow range**: `>=4.0.0 <5.0.0`

**Recommendation**: Keep wide range, but add CI tests for v1, v2, v3, v4

### 4. TypeScript Definitions
- **Now**: Add .d.ts files in v0.3.0
- **Later**: Add in v1.0.0

**Recommendation**: Later (v1.0.0) - not critical for JavaScript plugin

---

## Commands Cheat Sheet

### Starting Work
```bash
# Create experimental branch
git checkout main
git pull origin main
git checkout -b sid/dual-module-implementation

# Install dependencies
npm install

# Run tests to verify current state
npm test
npm run lint
```

### Prototyping with tsup
```bash
# Install tsup
npm install --save-dev tsup

# Create config (see CLEANUP_AND_COMMONJS_PLAN.md for full config)
vim tsup.config.js

# Add build script to package.json
# "build": "tsup"

# Build
npm run build

# Test CJS output
node -e "const p = require('./dist/index.cjs'); console.log(p)"

# Test ESM output  
node -e "import('./dist/index.js').then(m => console.log(m.default))"
```

### Testing Module Formats
```bash
# Create test files
mkdir -p test/module-formats

# ESM test
cat > test/module-formats/esm.spec.js << 'EOL'
import plugin from '../../dist/index.js'
describe('ESM import', () => {
  it('loads plugin', () => {
    expect(plugin).toBeDefined()
  })
})
EOL

# CJS test  
cat > test/module-formats/cjs.spec.js << 'EOL'
const plugin = require('../../dist/index.cjs')
describe('CJS require', () => {
  it('loads plugin', () => {
    expect(plugin).toBeDefined()
  })
})
EOL

# Run tests
npm test
```

### Git Workflow
```bash
# Commit progress
git add .
git commit -m "Add tsup configuration for dual builds"

# Push to GitHub
git push -u origin sid/dual-module-implementation

# When ready for full implementation
git checkout main
git checkout -b feature/add-dual-module-support
# ... implement based on sid/ findings ...
```

---

## Files to Reference

### Planning (Read First)
1. `PLANNING_DOCS_README.md` - Start here
2. `CLEANUP_AND_COMMONJS_PLAN.md` - Full strategy
3. `BRANCHING_STRATEGY.md` - Git workflow

### Technical Details
4. `upgrade_path.md` - How we got here (ESLint 7→9, Eta 1→4)
5. `ETA_V4_API_RESEARCH.md` - Eta API changes

### Code
6. `lib/index.js` - Main entry point (ESM)
7. `lib/processors/eta.js` - Processor implementation (ESM)
8. `package.json` - Current configuration

---

## Success Criteria

You'll know the implementation is complete when:

✅ **Build**:
- `npm run build` generates both `dist/index.cjs` and `dist/index.js`
- Both files export the plugin correctly

✅ **Tests**:
- All existing tests still pass
- New tests verify CJS `require()` works
- New tests verify ESM `import` works
- Tests pass on Node 18, 20, and 22

✅ **Integration**:
- Plugin works in ESLint 9 flat config (ESM)
- Plugin works in ESLint 9 flat config (CJS)
- No errors or warnings about module format

✅ **Documentation**:
- README shows both ESM and CJS usage
- CHANGELOG documents the change
- Migration guide exists if needed

✅ **Publishing**:
- Package.json has correct `exports` field
- `"files": ["dist"]` in package.json includes only build output
- Published package installs and works

---

## Common Pitfalls to Avoid

❌ **Don't** change `"type": "module"` to `"type": "commonjs"`
- Keep ESM as the source format
- Build CJS from ESM source

❌ **Don't** use `.mjs` and `.cjs` in source code
- Use `.js` for source (ESM)
- Let tsup generate `.cjs` for CommonJS build

❌ **Don't** forget to configure published files correctly
- Use `"files": ["dist"]` in package.json to include only built output
- This excludes source (`lib/`) from published package
- Alternatively, use `.npmignore` to exclude `lib/`, `test/`, etc.

❌ **Don't** break existing ESM users
- Test that current usage still works
- `import eta from '@jeffcaradona/eslint-plugin-eta'` must continue working

❌ **Don't** forget Node version testing
- Test on Node 18.18, 20.x, and 22.x
- Use GitHub Actions matrix for CI

---

## Questions?

- Check the FAQ in `BRANCHING_STRATEGY.md`
- Review open questions in `CLEANUP_AND_COMMONJS_PLAN.md`
- Look at examples in the planning documents

---

## Ready to Start?

```bash
# 1. Review planning docs
cat PLANNING_DOCS_README.md

# 2. Create experimental branch
git checkout -b sid/dual-module-implementation

# 3. Start with Phase 2 (Cleanup)
#    - Audit dependencies
#    - Add CHANGELOG.md
#    - Update README

# 4. Move to Phase 3 (Build Setup)
#    - Install tsup
#    - Configure builds
#    - Test locally

# 5. Continue through remaining phases
```

**Good luck! 🚀**

---

**Last Updated**: 2025-12-21  
**Status**: Ready for implementation  
**Estimated Time**: 1-2 weeks for full implementation
