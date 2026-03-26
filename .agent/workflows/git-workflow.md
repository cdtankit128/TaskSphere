---
description: Standard Git Workflow for this project
---

# Git Workflow Guide

This guide ensures a consistent and clean repository state.

## 1. Sync with Main
Run these commands to start from a clean state:
```bash
git checkout main
git pull ci-cd main
```

## 2. Create Feature Branch
Always work in a descriptive feature branch:
```bash
git checkout -b feature/[new-feature-name]
```

## 3. Pull Request (PR) Flow
1. Commit and push your changes to your feature branch.
2. Open a PR to merge into `main`.
3. After merging, delete the feature branch.

## 4. Repository Cleanup
Delete merged branches to keep the repo clean:
```bash
git branch -d [branch-name]
git push ci-cd --delete [branch-name]
```
