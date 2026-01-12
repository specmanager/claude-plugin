---
description: Set up specmanager MCP server connection
---

# Specmanager Setup

Configure the specmanager MCP server for Claude Code.

## Instructions

Guide the user through setting up the specmanager MCP server:

### 1. Check Current Configuration

Ask if they already have specmanager configured by checking if the MCP tools are available.

### 2. Provide Setup Instructions

If not configured, provide these instructions:

**Option A: Add to project settings (`.claude/settings.json`)**

```json
{
  "mcpServers": {
    "specmanager": {
      "command": "npx",
      "args": ["-y", "@specmanager/mcp-server"],
      "env": {
        "SPECMANAGER_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

**Option B: Add to user settings (`~/.claude/settings.json`)**

Same configuration, but applies to all projects.

### 3. Get API Key

Direct users to get their API key from:
- specmanager.ai dashboard → Settings → API Keys

### 4. Verify Connection

After setup, test by running `/projects` to verify the connection works.
