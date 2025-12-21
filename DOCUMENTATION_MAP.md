# Documentation Map

```
┌─────────────────────────────────────────────────────────────────┐
│                    Documentation Overview                         │
│                                                                   │
│  START HERE → PLANNING_DOCS_README.md (5KB)                      │
│               └─ Index and quick navigation guide                │
└─────────────────────────────────────────────────────────────────┘
                              ↓
        ┌─────────────────────┴─────────────────────┐
        ↓                     ↓                      ↓
┌───────────────┐    ┌───────────────┐    ┌────────────────┐
│  STRATEGY     │    │  WORKFLOW     │    │  ACTION        │
│               │    │               │    │                │
│  CLEANUP_AND  │    │  BRANCHING_   │    │  NEXT_STEPS.md │
│  COMMONJS_    │    │  STRATEGY.md  │    │                │
│  PLAN.md      │    │               │    │  (8KB)         │
│               │    │  (9KB)        │    │                │
│  (13KB)       │    │               │    │  ⭐ Start here │
│               │    │  - Branch     │    │   to code      │
│  - Current    │    │    types      │    │                │
│    state      │    │  - Git        │    │  - Commands    │
│  - Dual-      │    │    workflow   │    │  - Decision    │
│    module     │    │  - Version    │    │    points      │
│    strategy   │    │    strategy   │    │  - Success     │
│  - tsup       │    │  - sid/       │    │    criteria    │
│    config     │    │    branches   │    │  - Pitfalls    │
│  - 6 phases   │    │  - Examples   │    │                │
│  - Testing    │    │               │    │                │
│  - Timeline   │    │               │    │                │
└───────────────┘    └───────────────┘    └────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    Reference Documents                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  upgrade_path.md (3KB)                                           │
│  └─ Historical: ESLint 7→9, Eta 1→4 migration                   │
│     Status: ✅ Complete                                          │
│                                                                   │
│  ETA_V4_API_RESEARCH.md (5KB)                                    │
│  └─ Technical: Eta v4 API changes                               │
│     Status: ✅ Complete, implemented                             │
│                                                                   │
│  README.md (621B)                                                │
│  └─ User-facing: Installation and usage                         │
│     Status: Current, shows ESM usage                             │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    Quick Reference                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  QUESTION                          → READ THIS                   │
│  ────────────────────────────────────────────────                │
│  What's the current state?         → CLEANUP_AND_COMMONJS_PLAN   │
│  How do we support CommonJS?       → CLEANUP_AND_COMMONJS_PLAN   │
│  What is tsup and why use it?      → CLEANUP_AND_COMMONJS_PLAN   │
│  What are the implementation       → CLEANUP_AND_COMMONJS_PLAN   │
│    phases?                                                        │
│                                                                   │
│  What are sid/ branches?           → BRANCHING_STRATEGY          │
│  How do I create a feature         → BRANCHING_STRATEGY          │
│    branch?                                                        │
│  What's the version strategy?      → BRANCHING_STRATEGY          │
│  Git workflow examples?            → BRANCHING_STRATEGY          │
│                                                                   │
│  How do I start coding?            → NEXT_STEPS                  │
│  What commands do I run?           → NEXT_STEPS                  │
│  What decisions need to be made?   → NEXT_STEPS                  │
│  What are common mistakes?         → NEXT_STEPS                  │
│                                                                   │
│  How did we get to ESLint 9?       → upgrade_path.md             │
│  What changed in Eta v4?           → ETA_V4_API_RESEARCH.md      │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    Implementation Flow                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  1. Read PLANNING_DOCS_README.md                                 │
│     └─ Get oriented                                              │
│                                                                   │
│  2. Read NEXT_STEPS.md                                           │
│     └─ Understand what to do                                     │
│                                                                   │
│  3. Read CLEANUP_AND_COMMONJS_PLAN.md (relevant sections)        │
│     └─ Understand why and how                                    │
│                                                                   │
│  4. Read BRANCHING_STRATEGY.md (relevant sections)               │
│     └─ Understand git workflow                                   │
│                                                                   │
│  5. Create sid/ branch                                           │
│     git checkout -b sid/dual-module-implementation               │
│                                                                   │
│  6. Start Phase 2 (Cleanup) from CLEANUP_AND_COMMONJS_PLAN.md   │
│                                                                   │
│  7. Continue through phases, referencing docs as needed          │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    Document Statistics                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Total Documentation: ~43KB                                      │
│  Total Lines: ~1,700 lines                                       │
│                                                                   │
│  Planning Documents (New):                                       │
│    - CLEANUP_AND_COMMONJS_PLAN.md:   13KB  (490 lines)          │
│    - BRANCHING_STRATEGY.md:           9KB  (378 lines)          │
│    - PLANNING_DOCS_README.md:         5KB  (173 lines)          │
│    - NEXT_STEPS.md:                   8KB  (376 lines)          │
│                                                                   │
│  Reference Documents (Existing):                                 │
│    - upgrade_path.md:                 3KB  (Historical)          │
│    - ETA_V4_API_RESEARCH.md:          5KB  (Technical)           │
│    - README.md:                      621B  (User-facing)         │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    Key Decisions Made                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ✅ Build Tool: tsup (fast, zero-config, dual-format)           │
│  ✅ Node Support: 18.18+ (matches ESLint 9)                     │
│  ✅ Version: v0.3.0 (backwards compatible)                      │
│  ✅ Source Format: ESM (build CJS from it)                      │
│  ✅ Branch Prefix: sid/ for experimental work                   │
│  ✅ Strategy: Conditional exports in package.json               │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    Open Questions                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  See "Open Questions for Discussion" in                          │
│  CLEANUP_AND_COMMONJS_PLAN.md for:                               │
│                                                                   │
│  - Exact version number (v0.3.0 vs v1.0.0)                      │
│  - Eta peer dependency range strategy                            │
│  - Version deprecation timeline                                  │
│  - TypeScript definitions timing                                 │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    Success Criteria                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ✅ ESM import works (no breaking changes)                       │
│  ✅ CJS require works (new capability)                           │
│  ✅ Tests pass on Node 18, 20, 22                               │
│  ✅ Both dist/index.cjs and dist/index.js exist                 │
│  ✅ Documentation updated for both formats                       │
│  ✅ Published package works in both contexts                     │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

## File Organization

```
eslint-plugin-eta/
├── README.md                          # User guide (ESM usage)
├── package.json                       # Config (type: module)
│
├── lib/                               # Source code (ESM)
│   ├── index.js
│   └── processors/
│       └── eta.js
│
├── test/                              # Tests
│   └── lib/
│       ├── index.spec.js
│       └── processors/
│           └── eta.spec.js
│
├── PLANNING_DOCS_README.md           # �� START HERE
├── NEXT_STEPS.md                     # ⭐ IMPLEMENTATION GUIDE
├── CLEANUP_AND_COMMONJS_PLAN.md      # 📋 STRATEGY
├── BRANCHING_STRATEGY.md             # 🔀 GIT WORKFLOW
├── DOCUMENTATION_MAP.md              # 🗺️ THIS FILE
│
├── upgrade_path.md                   # 📚 Reference (history)
└── ETA_V4_API_RESEARCH.md           # 📚 Reference (Eta v4)
```

## Future File Structure (After Implementation)

```
eslint-plugin-eta/
├── dist/                             # Built output (gitignored)
│   ├── index.cjs                     # CommonJS build
│   ├── index.js                      # ESM build
│   └── processors/
│       ├── eta.cjs
│       └── eta.js
│
├── lib/                              # Source (ESM)
├── test/
│   ├── lib/
│   └── module-formats/               # NEW: Format tests
│       ├── esm.spec.js
│       └── cjs.spec.js
│
├── tsup.config.js                    # NEW: Build config
├── CHANGELOG.md                      # NEW: Version history
└── [all planning docs remain]
```

---

**How to Use This Map**

1. **First time here?** Read PLANNING_DOCS_README.md
2. **Ready to code?** Read NEXT_STEPS.md
3. **Need details?** Check the relevant section in the strategy/workflow docs
4. **Lost?** Come back to this map

---

**Last Updated**: 2025-12-21
**Status**: Planning complete, ready for implementation
