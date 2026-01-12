---
description: Start working on a task (specific ID or next pending)
argument-hint: [task-id]
---

# Start Task

Start working on a task. If no ID provided, shows specs with pending work and lets you choose.

## Parameters
- Task ID: $1 (optional - specific task UUID)

## Instructions

### If task ID provided ($1):

1. Use `mcp__specmanager__get-task` with taskId: "$1"
2. Display task details
3. Use `mcp__specmanager__start-task` to mark as in-progress
4. Begin implementing

### If no task ID - Spec Selection Flow:

1. **Detect project**: Use `mcp__specmanager__list-specs` with:
   - `workingDir`: Current working directory
   - `includeCompleted`: false

2. **Handle project not found**: If no project detected, use `mcp__specmanager__list-projects` to show available projects and ask the user which one to use.

3. **Check specs with pending work**:
   - If 0 specs have pending tasks → Inform user "All specs completed!"
   - If 1 spec has pending tasks → Auto-select that spec
   - If multiple specs have pending tasks → Show list with task counts and ask user to choose

4. **Display spec selection** (if multiple):
   ```
   Multiple specs have pending tasks. Which would you like to work on?

   1. [Spec Title] - 5 pending, 1 in-progress
   2. [Another Spec] - 3 pending
   ...
   ```

5. **Get tasks for chosen spec**: Use `mcp__specmanager__list-tasks` with:
   - `workingDir`: Current working directory
   - `status`: "pending"
   - `specId`: The chosen spec's ID

6. **Start first pending task**:
   - Get task details with `mcp__specmanager__get-task`
   - Display task info and ask for confirmation
   - If confirmed, use `mcp__specmanager__start-task`
   - Begin implementing according to task specifications
