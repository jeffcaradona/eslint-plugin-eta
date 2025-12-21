# Eta v4.5.0 API Research Findings

## Overview
Eta v4 is a significant rewrite. The current code uses `Eta.parse()` which is a static function on the old API. In v4, the API changed to an instance-based approach.

## 1. Parse Method Replacement

**Old API (v3):**
```javascript
const result = Eta.parse(text, config)
```

**New API (v4.5.0):**
```javascript
const eta = new Eta(config)
const result = eta.parse(text)
```

**Key Change:** `parse()` is now an **instance method**, not a static method. Config must be passed to the constructor.

### Source Evidence
From `src/internal.ts`:
```typescript
export class Eta {
  constructor(customConfig?: Partial<EtaConfig>) {
    if (customConfig) {
      this.config = { ...defaultConfig, ...customConfig };
    } else {
      this.config = { ...defaultConfig };
    }
  }
  
  parse = parse;  // parse is an instance method
  compile = compile;
  compileToString = compileToString;
  // ... other methods
}
```

## 2. Token Schema - UNCHANGED ✓

The token schema remains the same:
```typescript
export interface TemplateObject {
  t: TagType;        // Tag type: "r" (raw), "e" (exec), "i" (interpolate), "" (text)
  val: string;       // Token value/content
  lineNo?: number;   // Line number (optional, when debug: true)
}
```

**In v4, the schema uses `lineNo` instead of `line` for the debug property:**
- Old: `{t, val, line}`
- New: `{t, val, lineNo}`

Note: Current ESLint processor code doesn't use lineNo, so minimal change needed here.

## 3. Tag/Config Option Names - MOSTLY UNCHANGED ✓

The parsing configuration structure is preserved in v4:

```typescript
// From src/config.ts
parse: {
  exec: string;        // Prefix for code execution (default: "")
  interpolate: string; // Prefix for interpolation (default: "=")
  raw: string;         // Prefix for raw output (default: "~")
}

tags: [string, string]; // Delimiters (default: ["<%", "%>"])
```

**These are identical to v3 usage.** No changes needed for tag/delimiter configuration.

Additional relevant config options (same as v3):
- `debug`: boolean - enables `lineNo` in tokens
- `autoEscape`: boolean (default: true)
- `autoFilter`: boolean (default: false)
- `rmWhitespace`: boolean (default: false)
- `varName`: string (default: "it")
- `useWith`: boolean (default: false)

## 4. Main Export and Available Methods

**Eta class (v4.5.0) instance methods:**

Core methods:
- `parse(str)` → returns `Array<AstObject>` - Parses template string to AST
- `compile(str, options?)` → returns `TemplateFunction` - Compiles to function
- `compileToString(str, options?)` → returns `string` - Returns JS code as string
- `render(name, data, options?)` - Render from cache/file
- `renderAsync(name, data, options?)` - Async render
- `renderString(str, data, options?)` - Render inline string
- `renderStringAsync(str, data, options?)` - Async render inline

Configuration methods:
- `configure(customConfig)` - Update config on existing instance
- `withConfig(customConfig)` - Return new instance with config

Template management:
- `loadTemplate(name, template, options?)` - Cache a template function

## 5. How to Adapt the ESLint Processor

**Current code:**
```javascript
const Eta = require('eta')

module.exports = {
  preprocess: (text, filename) => {
    let result = Eta.parse(text, {
      parse: { exec: '', interpolate: '=', raw: '~' },
      tags: ['<%', '%>']
    })
```

**Updated code:**
```javascript
const { Eta } = require('eta')  // Import Eta class

module.exports = {
  preprocess: (text, filename) => {
    const eta = new Eta({  // Create instance with config
      parse: { exec: '', interpolate: '=', raw: '~' },
      tags: ['<%', '%>']
    })
    let result = eta.parse(text)  // Call parse on instance
```

**Changes needed:**
1. `const Eta = require('eta')` → `const { Eta } = require('eta')`
2. `Eta.parse(text, config)` → Create instance then `eta.parse(text)`
3. Optional: Handle `lineNo` instead of `line` if used (not applicable to current code)

## Summary Table

| Aspect | Old (v3) | New (v4.5.0) | Status |
|--------|----------|--------------|--------|
| Parse API | `Eta.parse(str, config)` | `new Eta(config).parse(str)` | **CHANGED** |
| Import | `const Eta = require('eta')` | `const { Eta } = require('eta')` | **CHANGED** |
| Token schema | `{t, val, line}` | `{t, val, lineNo}` | ✓ Compatible |
| Tag config | `tags: ['<%', '%>']` | `tags: ['<%', '%>']` | ✓ Same |
| Parse options | `parse: {exec, interpolate, raw}` | `parse: {exec, interpolate, raw}` | ✓ Same |
| Token types | `r`, `e`, `i`, `` | `r`, `e`, `i`, `` | ✓ Same |

## Implementation Priority

**Critical:** Update parse call from static to instance method
**Low Priority:** Handle `lineNo` field (current code doesn't use it)
**Optional:** Use new instance methods like `renderString()` if needed
