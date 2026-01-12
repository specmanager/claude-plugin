#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const os = require('os');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

function copyDirSync(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

const SPECMANAGER_PERMISSIONS = [
  'mcp__specmanager__list-projects',
  'mcp__specmanager__list-specs',
  'mcp__specmanager__list-tasks',
  'mcp__specmanager__get-task',
  'mcp__specmanager__start-task',
  'mcp__specmanager__complete-task',
  'mcp__specmanager__report-progress'
];

function addPermissionsToSettings(settingsPath) {
  const settingsDir = path.dirname(settingsPath);

  let settings = { permissions: { allow: [] } };

  // Ensure directory exists
  if (!fs.existsSync(settingsDir)) {
    fs.mkdirSync(settingsDir, { recursive: true });
  }

  // Read existing settings if they exist
  if (fs.existsSync(settingsPath)) {
    try {
      const content = fs.readFileSync(settingsPath, 'utf8');
      settings = JSON.parse(content);

      // Create backup before modifying
      const backupPath = settingsPath + '.backup';
      fs.writeFileSync(backupPath, content);
      console.log(`\n📋 Backup created: ${backupPath}`);

      if (!settings.permissions) {
        settings.permissions = { allow: [] };
      }
      if (!settings.permissions.allow) {
        settings.permissions.allow = [];
      }
    } catch (err) {
      console.log('\n⚠️  Could not parse existing settings.json, creating new one...');
      settings = { permissions: { allow: [] } };
    }
  }

  // Add specmanager permissions if not already present
  for (const perm of SPECMANAGER_PERMISSIONS) {
    if (!settings.permissions.allow.includes(perm)) {
      settings.permissions.allow.push(perm);
    }
  }

  // Write settings
  fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));

  return settingsPath;
}

async function addMcpServerToProject(apiKey, isGlobal = false) {
  const cwd = process.cwd();
  const homeDir = os.homedir();

  // Determine paths based on global or project scope
  const configPath = isGlobal
    ? path.join(homeDir, '.claude', '.mcp.json')
    : path.join(cwd, '.mcp.json');
  const settingsPath = isGlobal
    ? path.join(homeDir, '.claude', 'settings.json')
    : path.join(cwd, '.claude', 'settings.json');

  let config = { mcpServers: {} };

  // Ensure directory exists for config
  const configDir = path.dirname(configPath);
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }

  // Read existing config if it exists
  if (fs.existsSync(configPath)) {
    try {
      const content = fs.readFileSync(configPath, 'utf8');
      config = JSON.parse(content);
      if (!config.mcpServers) {
        config.mcpServers = {};
      }
    } catch (err) {
      console.log('\n⚠️  Could not parse existing .mcp.json, creating new one...');
      config = { mcpServers: {} };
    }
  }

  // Add specmanager MCP server
  config.mcpServers.specmanager = {
    command: 'npx',
    args: ['-y', '@specmanager/mcp-server'],
    env: {
      SPECMANAGER_API_KEY: apiKey
    }
  };

  // Write config
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

  // Add permissions to settings.json
  addPermissionsToSettings(settingsPath);

  console.log(`\n✅ MCP server configuration added to: ${configPath}`);
  console.log(`✅ Tool permissions added to: ${settingsPath}`);
  if (isGlobal) {
    console.log('\n📝 Note: This config applies globally to all Claude Code projects.');
  } else {
    console.log('\n📝 Note: This config applies to Claude Code in this project directory.');
  }
}

async function main() {
  console.log('\n🔌 specmanager.ai Claude Plugin Installer\n');
  console.log('This will install specmanager slash commands for Claude Code.\n');

  const cwd = process.cwd();
  const homeDir = os.homedir();

  console.log('Where would you like to install the commands?\n');
  console.log('  1. Project (.claude/commands/) - Only available in this project');
  console.log('  2. Global (~/.claude/commands/) - Available in all projects\n');

  const locationAnswer = await question('Choose location (1 or 2): ');

  const isGlobal = locationAnswer === '2';
  const commandsDest = isGlobal
    ? path.join(homeDir, '.claude', 'commands')
    : path.join(cwd, '.claude', 'commands');

  console.log(`\n📁 Target directory: ${commandsDest}\n`);

  // Ask to install commands
  const installAnswer = await question('Install commands? (y/n): ');

  if (installAnswer.toLowerCase() !== 'y' && installAnswer.toLowerCase() !== 'yes') {
    console.log('\n❌ Installation cancelled.\n');
    rl.close();
    process.exit(0);
  }

  // Copy command files (just the .md files, not the whole plugin structure)
  const commandsSrc = path.join(__dirname, '..', 'plugin', 'commands');

  try {
    copyDirSync(commandsSrc, commandsDest);
    console.log('\n✅ Commands installed successfully!\n');
    console.log('   Installed to:', commandsDest);

    // List installed commands
    const commandFiles = fs.readdirSync(commandsSrc).filter(f => f.endsWith('.md'));
    console.log('\n   Commands:');
    for (const file of commandFiles) {
      const name = file.replace('.md', '');
      console.log(`   - /${name}`);
    }
    console.log('');
  } catch (err) {
    console.error('\n❌ Error installing commands:', err.message);
    rl.close();
    process.exit(1);
  }

  // Ask about MCP server
  const mcpAnswer = await question('Would you like to add the specmanager MCP server to Claude Code? (y/n): ');

  if (mcpAnswer.toLowerCase() === 'y' || mcpAnswer.toLowerCase() === 'yes') {
    console.log('\n📡 MCP Server Configuration\n');
    console.log('Where would you like to configure the MCP server?\n');
    console.log('  1. Global (~/.claude/) - Available in all projects');
    console.log('  2. Project (.mcp.json + .claude/settings.json) - Only in this project\n');

    const mcpLocationAnswer = await question('Choose location (1 or 2): ');

    console.log('\nThe MCP server enables Claude to interact with specmanager.ai');
    console.log('to manage tasks, specs, and projects.\n');
    console.log('You can get your API key from: https://specmanager.ai/settings/api-keys\n');

    const apiKey = await question('Enter your specmanager API key: ');

    if (!apiKey.trim()) {
      console.log('\n⚠️  No API key provided. Skipping MCP server configuration.\n');
    } else {
      try {
        const mcpIsGlobal = mcpLocationAnswer !== '2';
        await addMcpServerToProject(apiKey.trim(), mcpIsGlobal);
      } catch (err) {
        console.error('\n❌ Error configuring MCP server:', err.message);
      }
    }
  }

  console.log('\n🎉 Setup complete!\n');
  console.log('Reload your Claude Code window to use the new commands.');
  console.log('Type / in Claude to see available commands.\n');

  rl.close();
}

main().catch((err) => {
  console.error('Error:', err);
  rl.close();
  process.exit(1);
});
