# eslint-plugin-eta
An ESLint plugin so you can lint Eta template files (forked from <https://github.com/bgub/eslint-plugin-eta>) with so much assistance from GitHub Copilot. 

<span align="center">


</span>

> Lint your embeddable Eta templates with ease

## Supported Environments

### Node.js Versions
- **Minimum**: Node.js 18.18.0 (required by ESLint 9)
- **Tested**: Node.js 18.18.0, 20.x, 24.x (current LTS)

### ESLint Versions
- **Minimum**: ESLint 9.x
- **Note**: ESLint 9 requires flat config format

### Eta Versions
- **Supported**: Eta v1.x, v2.x, v3.x, v4.x
- **Tested**: All versions in the peer dependency range

### Module Formats
- **ESM (ES Modules)**: ✅ Fully supported
- **CommonJS (CJS)**: ⚠️ See note below

> **Note**: CommonJS support is planned for v0.3.0. Currently, this plugin is ESM-only. If you need CommonJS support, please pin to a release that includes dual-module support, or use ESM in your project.

### Installation
Run `npm install --save-dev @jeffcaradona/eslint-plugin-eta` to install this ESLint plugin.

### Usage

#### ESM (Recommended)
Add this to your `eslint.config.js`:
```javascript
import eta from '@jeffcaradona/eslint-plugin-eta'

export default [
    {
        files: ['**/*.eta'],
        plugins: {
            eta
        },
        processor: 'eta/eta'
    }
]
```

#### CommonJS (v0.3.0+)
> Available in v0.3.0 and later

Add this to your `eslint.config.cjs`:
```javascript
const eta = require('@jeffcaradona/eslint-plugin-eta')

module.exports = [
    {
        files: ['**/*.eta'],
        plugins: {
            eta
        },
        processor: 'eta/eta'
    }
]
```

## Compatibility Matrix

| Node Version | ESLint 9 | Eta v1-v4 |
|--------------|----------|-----------|
| 18.18.0      | ✅       | ✅        |
| 20.x         | ✅       | ✅        |
| 24.x         | ✅       | ✅        |

## Troubleshooting

### Error: "Cannot find module" or "ERR_REQUIRE_ESM"

If you're getting module resolution errors:

1. **Ensure ESLint 9.x is installed**: `npm list eslint`
2. **Check Node.js version**: Must be 18.18.0 or higher
3. **Use flat config**: ESLint 9 requires `eslint.config.js` (not `.eslintrc.js`)

### Tests Failing

Run the full test suite to verify compatibility:
```bash
npm run test:prod
```

Test output includes linting, coverage, and all integration tests.

## Contributing

See [CHANGELOG.md](CHANGELOG.md) for version history and planned features.

For development setup, see the [documentation](documentation/) folder.