---
description: List specs for current project with task counts
argument-hint: [--all]
---

# List Specs

List specs for the current project with their task counts.

## Parameters
- --all: $1 (optional - include completed specs)

## Instructions

1. Use `mcp__specmanager__list-specs` with:
   - `workingDir`: Current working directory
   - `includeCompleted`: true if $1 is "--all", otherwise false

2. Display specs in a clear format:
   ```
   Specs for [Project Name]:

   1. [Spec Title]
      Stage: tasks
      Tasks: 5 pending, 1 in-progress, 3 done (9 total)

   2. [Another Spec] [DONE]
      Stage: tasks
      Tasks: 0 pending, 0 in-progress, 7 done (7 total)
   ```

3. Show summary:
   - Total specs with pending work
   - Total pending tasks across all specs

4. Tip: Use `/start` to begin working on a spec's tasks.
