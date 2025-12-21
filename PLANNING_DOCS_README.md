# Planning Documents Index

This directory contains planning and strategy documents for the eslint-plugin-eta project's evolution.

## Current Planning Documents

### 1. [CLEANUP_AND_COMMONJS_PLAN.md](./CLEANUP_AND_COMMONJS_PLAN.md)
**Comprehensive guide for CommonJS/ESM dual-module support**

**Contents**:
- Current state analysis (ESM-only, Node 22 target)
- Problem statement and requirements
- Cleanup tasks needed before implementation
- Dual-module packaging strategy (tsup-based approach)
- Node.js version support matrix
- Testing strategy for both module formats
- Migration path for users
- Implementation timeline (6 phases)
- Rollback plan
- Open questions and decisions

**Key Recommendations**:
- Use tsup for building both CJS and ESM outputs
- Target Node.js 18.18+ (ESLint 9 minimum)
- Version as v0.3.0 (backwards compatible for ESM users)
- Maintain v0.2.x branch for ESM-only version

### 2. [BRANCHING_STRATEGY.md](./BRANCHING_STRATEGY.md)
**Branching model and git workflow**

**Contents**:
- Branch types (main, maintenance, feature, sid/, release, hotfix)
- Version strategy (semver, version branches)
- Workflow for dual-module implementation
- Branch protection rules
- Examples and git commands reference
- FAQ

**Key Concepts**:
- `sid/` prefix for experimental/research branches
- Separate feature branches for actual implementation
- Maintenance branches for previous versions
- Clear merge and release processes

### 3. [upgrade_path.md](./upgrade_path.md)
**Historical upgrade path from ESLint 7 to 9**

**Status**: ✅ Completed
- Documents the upgrade from ESLint 7 → 8 → 9
- Covers Eta 1.x → 4.x migration
- Tracks tooling updates (Jest, Prettier, TypeScript)

### 4. [ETA_V4_API_RESEARCH.md](./ETA_V4_API_RESEARCH.md)
**Eta v4 API changes and migration guide**

**Status**: ✅ Completed and implemented
- Documents Eta v3 → v4 API changes
- Shows how parse() became an instance method
- Implementation guidance for processor updates

---

## Quick Start: What To Read First

### If you want to understand the current state:
1. Read the **Current State Analysis** section in `CLEANUP_AND_COMMONJS_PLAN.md`
2. Check `upgrade_path.md` for how we got here

### If you want to implement dual-module support:
1. Read `CLEANUP_AND_COMMONJS_PLAN.md` sections:
   - Strategy: Dual-Module Package
   - Recommended Build Tool: tsup
   - Implementation Timeline
2. Read `BRANCHING_STRATEGY.md` section:
   - Proposed Workflow for Dual-Module Implementation

### If you want to understand version management:
1. Read `BRANCHING_STRATEGY.md` sections:
   - Version Strategy
   - Branch Types

### If you want to start experimenting:
1. Create a `sid/` branch (see `BRANCHING_STRATEGY.md`)
2. Follow Phase 3 in `CLEANUP_AND_COMMONJS_PLAN.md` (Build Setup)

---

## Decision Quick Reference

| Decision | Status | Document |
|----------|--------|----------|
| Use tsup for dual builds | ✅ Recommended | CLEANUP_AND_COMMONJS_PLAN.md |
| Target Node 18.18+ | ✅ Decided | CLEANUP_AND_COMMONJS_PLAN.md |
| Version as v0.3.0 | ⏳ Proposed | CLEANUP_AND_COMMONJS_PLAN.md |
| Use sid/ for experiments | ✅ Adopted | BRANCHING_STRATEGY.md |
| Maintain v0.2.x branch | ⏳ Proposed | BRANCHING_STRATEGY.md |

---

## Next Steps

Based on the problem statement, here's what to do next:

### Immediate Actions
1. **Review the plans**: Read through both documents and provide feedback
2. **Create experimental branch**: 
   ```bash
   git checkout -b sid/dual-module-research
   ```
3. **Start Phase 2** (Cleanup) from CLEANUP_AND_COMMONJS_PLAN.md:
   - Audit dependencies
   - Consolidate documentation
   - Add CHANGELOG.md

### Discussion Topics
Review the "Open Questions for Discussion" section in CLEANUP_AND_COMMONJS_PLAN.md:
- Should v0.3.0 or v1.0.0 be used?
- What's the Eta peer dependency range strategy?
- Node version support boundaries
- TypeScript definitions timing

---

## Document Maintenance

### When to Update These Docs

**CLEANUP_AND_COMMONJS_PLAN.md**:
- When decisions are made on open questions
- After completing each implementation phase
- When new issues or considerations arise

**BRANCHING_STRATEGY.md**:
- When branch protection rules change
- When new branch types are needed
- After completing version transitions

### Status Tracking

Use these markers in the documents:
- ✅ Completed
- ⏳ In progress
- ⛔ Blocked
- 📋 Planned
- ❓ Under discussion

---

## Contributing to Planning

### Adding New Information
1. Update the relevant document
2. Add entry to the Decision Log (in CLEANUP_AND_COMMONJS_PLAN.md)
3. Update this index if adding new documents

### Proposing Changes
1. Create a `sid/` branch with your proposal
2. Update the relevant planning document
3. Discuss in issue/PR comments

---

## Questions or Feedback?

If you have questions about the plan:
1. Check the FAQ section in BRANCHING_STRATEGY.md
2. Review "Open Questions" in CLEANUP_AND_COMMONJS_PLAN.md
3. Open an issue for discussion

---

**Last Updated**: 2025-12-21  
**Status**: Initial planning phase complete, awaiting review and approval
