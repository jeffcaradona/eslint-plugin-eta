# Branching Strategy

## Overview
This document outlines the branching strategy for the eslint-plugin-eta project, with a focus on managing experimental work and maintaining multiple versions.

Uses GitFlow strategy since we will have long lived maintenance branches to maintain existing version while also developing new versions and maintaining compatibility.

---

## Branch Types

### Main Branches

#### `main`
- **Purpose**: Primary development branch
- **Current version**: v0.2.3 (ESM-only)
- **Status**: Protected, requires reviews
- **Merges from**: Feature branches, release branches

#### `maintain/v0.2.x`
- **Purpose**: Maintenance branch for v0.2.x releases (ESM-only version)
- **Status**: To be created before v0.3.0 work begins
- **Receives**: Critical bug fixes, security patches
- **Example**: `maintain/v0.2.x` for v0.2.3, v0.2.4, etc.

---

### Experimental Branches (`sid/`)

**Naming convention**: `sid/<descriptive-name>`

**Purpose**: Research, prototyping, and experimental work that needs thorough documentation before merging.

**Characteristics**:
- Can be long-lived
- May never merge to main (if experiment fails)
- Should be well-documented
- Can be shared with collaborators for review
- No direct commits to main from `sid/` branches

**Examples**:
```bash
sid/dual-module-research          # Research dual-module packaging
sid/build-tooling-prototype       # Prototype tsup/rollup builds
sid/commonjs-compat-tests         # Test CommonJS compatibility
sid/node18-compatibility          # Test Node 18 support
sid/eta-version-matrix            # Test all Eta versions
```

**Workflow**:
1. Create branch: `git checkout -b sid/feature-name`
2. Experiment and document thoroughly
3. When ready, create a regular feature branch for implementation
4. Merge feature branch to main (not the sid/ branch directly)
5. Keep sid/ branch for reference or delete if no longer needed

---

### Feature Branches

**Naming convention**: `feature/<descriptive-name>` or `<username>/<feature-name>`

**Purpose**: Implementing approved features or changes

**Examples**:
```bash
feature/add-commonjs-build
feature/update-documentation
jeffcaradona/fix-processor-bug
```

**Workflow**:
1. Branch from `main`
2. Implement feature
3. Add tests
4. Update documentation
5. Create PR to `main`
6. Delete after merge

---

### Release Branches

**Naming convention**: `release/v<version>`

**Purpose**: Prepare releases, final testing, changelog updates

**Examples**:
```bash
release/v0.3.0
release/v1.0.0
```

**Workflow**:
1. Branch from `main` when ready for release
2. Version bump in package.json
3. Update CHANGELOG.md
4. Final testing
5. Merge to `main` and tag
6. If maintaining previous major/minor, also create maintenance branch

---

### Hotfix Branches

**Naming convention**: `hotfix/<issue-description>`

**Purpose**: Critical fixes that need immediate release

**Examples**:
```bash
hotfix/security-vulnerability
hotfix/critical-processor-bug
```

**Workflow**:
1. Branch from affected maintenance branch or main
2. Fix issue
3. Add tests
4. PR to maintenance branch
5. Cherry-pick or merge to main if applicable
6. Release patch version immediately

---

## Version Strategy

### Semantic Versioning (semver)

**Format**: `MAJOR.MINOR.PATCH`

**Examples**:
- `0.2.3` → `0.2.4`: Patch (bug fixes)
- `0.2.4` → `0.3.0`: Minor (new features, backwards compatible)
- `0.3.x` → `1.0.0`: Major (breaking changes)

### Version Branches

| Version Range | Branch | Status | Module Format |
|---------------|--------|--------|---------------|
| v0.2.x | `maintain/v0.2.x` | Maintenance | ESM only |
| v0.3.x | `main` (future) | Active development | ESM + CJS |
| v1.0.x | TBD | Future stable | ESM + CJS |

---

## Proposed Workflow for Dual-Module Implementation

### Step 1: Create Experimental Branch
```bash
git checkout main
git pull origin main
git checkout -b sid/dual-module-complete
git push -u origin sid/dual-module-complete
```

**Purpose**: Document the complete approach, research tools, prototype solutions

**Deliverables**:
- Proof-of-concept builds with tsup
- Test cases for both module formats
- Documentation of approach
- Risk assessment

### Step 2: Create Maintenance Branch for Current Version
```bash
git checkout main
git checkout -b maintain/v0.2.x
git push -u origin maintain/v0.2.x
```

**Purpose**: Preserve ESM-only version for users who need it

### Step 3: Implement in Feature Branch
```bash
git checkout main
git checkout -b feature/add-dual-module-support
```

**Purpose**: Implement the approved approach from sid/ research

**Tasks**:
- Install tsup
- Configure build
- Update package.json exports
- Add tests for both formats
- Update documentation

### Step 4: Create Release Branch
```bash
git checkout main
git merge feature/add-dual-module-support
git checkout -b release/v0.3.0
```

**Tasks**:
- Bump version to v0.3.0
- Update CHANGELOG.md
- Final testing
- Update README

### Step 5: Merge and Tag
```bash
git checkout main
git merge release/v0.3.0
git tag -a v0.3.0 -m "Release v0.3.0: Add CommonJS support"
git push origin main --tags
```

---

## Branch Protection Rules (Recommended)

### For `main`:
- ✅ Require pull request reviews (1+ approver)
- ✅ Require status checks to pass
  - Tests pass on Node 18, 20, 22
  - Linting passes
  - Build succeeds
- ✅ Require branches to be up to date
- ✅ Do not allow force pushes
- ✅ Do not allow deletions

### For `maintain/v0.2.x`:
- ✅ Require pull request reviews
- ✅ Require status checks to pass
- ✅ Do not allow force pushes
- ✅ Do not allow deletions

### For `sid/*` and feature branches:
- ❌ No protection (allows force push for rebasing/cleanup)
- ⚠️ Document work thoroughly in commits and PRs

---

## Examples of Branch Usage

### Example 1: Researching Build Tools
```bash
# Create experimental branch
git checkout -b sid/build-tool-comparison

# Try different tools
npm install --save-dev tsup
# ... test tsup ...

npm uninstall tsup
npm install --save-dev rollup
# ... test rollup ...

# Document findings in CLEANUP_AND_COMMONJS_PLAN.md

# Decision made: use tsup
# Create feature branch for implementation
git checkout main
git checkout -b feature/setup-tsup-build

# Implement approved solution
# ... add config, update package.json, etc ...

# PR to main
# sid/build-tool-comparison can remain for reference or be deleted
```

### Example 2: Fixing Critical Bug in v0.2.x
```bash
# Branch from maintenance branch
git checkout maintain/v0.2.x
git checkout -b hotfix/processor-crash-on-empty-file

# Fix bug
# ... edit lib/processors/eta.js ...
git commit -m "Fix processor crash on empty files"

# PR to maintain/v0.2.x
# After merge, release v0.2.4

# Also fix in main if applicable
git checkout main
git cherry-pick <commit-hash>
# Or merge the fix manually
```

### Example 3: Adding New Feature (Future)
```bash
# Research phase
git checkout -b sid/custom-tag-support
# Document requirements, test approach

# Implementation phase
git checkout main
git checkout -b feature/custom-tag-support
# Implement feature

# PR to main
# Will be in next minor release (v0.4.0)
```

---

## Git Commands Reference

### Creating Branches
```bash
# Always start from updated main
git checkout main
git pull origin main

# Experimental branch
git checkout -b sid/<name>

# Feature branch
git checkout -b feature/<name>

# Maintenance branch
git checkout -b maintain/v<major>.<minor>.x

# Release branch
git checkout -b release/v<version>
```

### Switching Branches
```bash
git checkout main
git checkout sid/dual-module-complete
git checkout maintain/v0.2.x
```

### Updating Branches
```bash
# Update current branch with latest main
git checkout feature/my-feature
git fetch origin
git rebase origin/main
# or
git merge origin/main
```

### Cleaning Up
```bash
# Delete local branch
git branch -d feature/completed-feature

# Delete remote branch
git push origin --delete feature/completed-feature

# List all branches
git branch -a
```

---

## FAQ

### Q: When should I use a `sid/` branch?
**A**: Use `sid/` when you're researching or prototyping something that:
- May not be implemented (experimental)
- Needs extensive documentation before approval
- Requires testing multiple approaches
- Is a significant architectural change

### Q: Can I merge `sid/` branches to main?
**A**: No, create a feature branch based on the research, then merge that. This keeps main's history clean.

### Q: How long should I keep `sid/` branches?
**A**: Keep them as long as they provide value for reference. Delete if the experiment failed or was completed.

### Q: What if I need to fix a bug in v0.2.x after v0.3.0 is released?
**A**: Branch from `maintain/v0.2.x`, fix the bug, PR back to that branch, release as v0.2.5.

### Q: Should I create a `sid/` branch for this dual-module work?
**A**: Yes, `sid/dual-module-complete` is recommended to prototype and document before implementing.

---

## Summary

**Experimental work** → `sid/` branches (document thoroughly)  
**Approved implementation** → Feature branches → Main  
**Maintenance** → `maintain/v<major>.<minor>.x` branches  
**Critical fixes** → Hotfix branches  
**Releases** → Release branches → Tag → Merge to main  

This strategy allows safe experimentation while maintaining a clean main branch and supporting multiple versions.
