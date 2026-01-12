# @specmanager/claude-plugin

Install the specmanager.ai Claude plugin with commands and agents for task management.

## Installation

Run in your project directory:

```bash
npx @specmanager/claude-plugin
```

The installer will:

1. Ask if you want to install the plugin in the current directory
2. Copy plugin files to `.claude-plugin/` directory
3. Optionally configure the specmanager MCP server for Claude Desktop

## What's Included

### Slash Commands

- `/project` - Get project information
- `/projects` - List all projects
- `/specs` - List specs for a project
- `/tasks` - List available tasks
- `/start` - Start working on a task
- `/status` - Check task status
- `/review` - Request code review
- `/setup` - Setup specmanager for a project

### Custom Agents

- `code-review` - Code review specialist
- `docker-specialist` - Docker configuration expert
- `git-specialist` - Git operations expert

## MCP Server

The installer can optionally add the specmanager MCP server to your Claude Desktop configuration. This enables Claude to:

- List and manage your specmanager projects
- View and track specs
- Start, complete, and report progress on tasks

Get your API key from: https://specmanager.ai/settings/api-keys

## Manual MCP Configuration

If you prefer to configure the MCP server manually, add this to your Claude Desktop config:

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
**Linux:** `~/.config/claude/claude_desktop_config.json`

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

## License

MIT
