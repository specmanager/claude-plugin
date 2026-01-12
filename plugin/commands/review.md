---
description: Perform a code review on recent changes or specified files
argument-hint: [files-or-scope]
---

# Code Review

Perform a comprehensive code review using the code-review agent.

## Parameters
- Scope: $1 (optional - specific files, directory, or "staged", "branch", "pr" - default: recent changes)

## Context
- Git status: !`git status --short`
- Current branch: !`git branch --show-current`
- Recent commits: !`git log --oneline -5`

## Instructions

Use the **code-review** agent to perform a thorough review.

### Determine Review Scope

Based on $1:
- If empty or "recent": Review `git diff HEAD~1`
- If "staged": Review `git diff --cached`
- If "branch": Review all changes on current branch vs main/master
- If "pr": Review changes that would be in a PR to main/master
- If file/directory path: Review that specific path

### Review Checklist

The code-review agent should analyze:

1. **Code Quality**
   - Readability and clarity
   - Proper naming conventions
   - Code organization and structure
   - DRY principles

2. **Security**
   - Input validation
   - SQL injection / XSS vulnerabilities
   - Sensitive data exposure
   - Authentication/authorization issues

3. **Performance**
   - Inefficient algorithms
   - N+1 queries
   - Memory leaks
   - Unnecessary computations

4. **Best Practices**
   - Error handling
   - Edge cases
   - Type safety
   - Testing considerations

### Output Format

Provide findings organized by severity:
- **Critical**: Must fix before merge
- **Warning**: Should address
- **Suggestion**: Nice to have improvements
- **Note**: Observations and minor points
