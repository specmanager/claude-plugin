---
description: Show all in-progress tasks across projects
---

# Task Status

Show all tasks currently in progress.

## Instructions

1. Use `mcp__specmanager__list-tasks` with:
   - `workingDir`: Current working directory
   - `status`: "in-progress"

2. Display in-progress tasks showing:
   - Task ID and title
   - Project name
   - When it was started (if available)

3. If no in-progress tasks, inform the user and suggest using `/next` to start one.

4. If there are in-progress tasks, remind the user to:
   - Use `/progress <message>` to report updates
   - Use `/done` when complete
