---
description: List tasks from specmanager for current project
argument-hint: [status] [--spec <id>]
---

# List Tasks

List tasks from specmanager for the current project.

## Parameters
- Status filter: $1 (pending|in-progress|done|all - default: pending)
- Spec filter: --spec $2 (optional - filter by spec ID)

## Instructions

1. Parse arguments:
   - If $1 is a status value (pending/in-progress/done/all), use it as status
   - If --spec is provided, extract the spec ID

2. Use the `mcp__specmanager__list-tasks` tool with:
   - `workingDir`: Current working directory (auto-detects project from git remote)
   - `status`: The status filter (default: "pending")
   - `specId`: The spec ID if --spec was provided

3. Display tasks in a clear format showing:
   - Task number (e.g., [1.1])
   - Task title
   - Spec name (in parentheses)
   - Current status
   - Files to modify

4. If no tasks found, inform the user and suggest:
   - Checking other statuses
   - Using `/specs` to see available specs

5. Tips:
   - Use `/start <id>` to begin working on a specific task
   - Use `/specs` to see specs with task counts
