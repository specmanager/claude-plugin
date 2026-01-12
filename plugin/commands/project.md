---
description: Show current project info (auto-detected from git)
---

# Current Project

Show information about the current project based on the git repository.

## Instructions

1. Use `mcp__specmanager__list-projects` with:
   - `workingDir`: Current working directory

2. This will auto-detect the project from the git remote.

3. Display project details including:
   - Project name and ID
   - Linked GitHub repository
   - Task summary (pending/in-progress/done counts)

4. If no project is detected, suggest linking the repository in specmanager.
