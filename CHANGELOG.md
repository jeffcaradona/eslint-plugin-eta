# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


## [0.3.1] - Unreleased

### Changed
- Repo only update. No changes to dist, just devDependencies
- Updated .gitignore to allow tracking of package-lock.json 
- Added npm overrides to package.json to enforce "test-exclude": "^7.0.1" or better
- Remove dependencies on glob@7.2.3 and inflight@1.0.6


## [0.3.0] - Released

### Added
- Dual module support (CommonJS + ESM) via conditional exports
- CI workflow for testing against multiple Node versions (18.18.0, 20.x, 24.x)
- CI workflow for testing against multiple Eta versions (v1, v2, v3, v4)
- Module format tests (ESM and CommonJS)
- Support documentation for environments and module formats

### Changed
- Updated Eta peer dependency from v4.5.0 to v3.5.0 for Node 18 compatibility
- Updated Node.js minimum version to 18.18.0 (matching ESLint 9 requirement)
- Updated Babel target from Node 22 to Node 18.18

### Fixed
- Resolved Node 18 compatibility issues

### Planned
- Build setup with tsup for dual format generation
- Full integration testing

## [0.2.3] - 2024-XX-XX

### Added
- Initial ESM-only support
- ESLint 9 flat config support
- Eta v4 compatibility

### Fixed
- Various integration issues with ESLint 9

## Unreleased Changes

### Architecture
- Source files remain in ESM format in `lib/`
- Build process will generate both ESM (`dist/index.js`) and CommonJS (`dist/index.cjs`) outputs
- Package exports configured for automatic module selection

---

## Migration Guide

### For Users Upgrading to v0.3.0

If you're currently using `@jeffcaradona/eslint-plugin-eta@0.2.x`:

**ESM users**: No changes required
```javascript
// This continues to work exactly as before
import eta from '@jeffcaradona/eslint-plugin-eta'
```

**CommonJS users**: Now supported (new in v0.3.0)
```javascript
// New in v0.3.0: CommonJS is now supported
const eta = require('@jeffcaradona/eslint-plugin-eta')
```

### Supported Environments

| Environment | v0.2.x | v0.3.0+ |
|-------------|--------|---------|
| Node 18.18+ (ESM) | ✅ | ✅ |
| Node 18.18+ (CJS) | ❌ | ✅ |
| Node 20.x (ESM) | ✅ | ✅ |
| Node 20.x (CJS) | ❌ | ✅ |
| Node 24.x (ESM) | ✅ | ✅ |
| Node 24.x (CJS) | ❌ | ✅ |
| Eta v1-v3 | ✅ | ✅ |
| Eta v4 | ✅ | ✅ |

---

## Historical Versions

For information about earlier versions, see the [git history](https://github.com/jeffcaradona/eslint-plugin-eta/commits/main).
