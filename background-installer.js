#!/usr/bin/env node

/**
 * Background Installer for EuniTheme Bulbasaur
 * Installs the pokeball background correctly for VS Code
 */

const fs = require('fs');
const path = require('path');

class BackgroundInstaller {
  constructor() {
    this.outputDir = path.join(__dirname, 'dist');
    this.ensureOutputDir();
  }

  ensureOutputDir() {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  // Generate VS Code extension with background
  generateVSCodeBackground() {
    const extensionCode = `import * as vscode from 'vscode';
import * as path from 'path';

export function activate(ctx: vscode.ExtensionContext) {
  console.log('[EuniTheme] Installing background...');

  // Create background decoration
  const backgroundDecoration = vscode.window.createTextEditorDecorationType({
    key: 'pokeball-background',
    overviewRulerColor: 'transparent',
    dark: {
      backgroundColor: 'transparent',
      after: {
        contentIconPath: ctx.asAbsolutePath(path.join('media', 'pokeball.png')),
        margin: '0 0 0 0'
      }
    }
  });

  // Apply background to all active editors
  const applyBackground = () => {
    const activeEditor = vscode.window.activeTextEditor;
    if (activeEditor) {
      const range = new vscode.Range(
        activeEditor.document.positionAt(0),
        activeEditor.document.positionAt(activeEditor.document.getText().length)
      );
      
      activeEditor.setDecorations(backgroundDecoration, [{
        range: range,
        hoverMessage: 'Bulbasaur Theme Background'
      }]);
    }
  };

  // Apply to current editor
  applyBackground();

  // Apply when switching editors
  ctx.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor(applyBackground)
  );

  // Apply when document changes
  ctx.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument(applyBackground)
  );

  // Create status bar item
  const statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right, 
    100
  );
  statusBarItem.text = '$(zap) Bulbasaur BG';
  statusBarItem.tooltip = 'Pokeball background enabled';
  statusBarItem.command = 'eunitheme.toggleBackground';
  statusBarItem.show();

  // Toggle background command
  ctx.subscriptions.push(
    vscode.commands.registerCommand('eunitheme.toggleBackground', () => {
      vscode.window.showInformationMessage('🌱 Pokeball background is active!');
    })
  );

  ctx.subscriptions.push(statusBarItem);
}

export function deactivate() {
  console.log('[EuniTheme] Background deactivated');
}
`;

    fs.writeFileSync(path.join(this.outputDir, 'background-extension.ts'), extensionCode);
  }

  // Generate webview-based background
  generateWebviewBackground() {
    const webviewCode = `import * as vscode from 'vscode';
import * as path from 'path';

export function activate(ctx: vscode.ExtensionContext) {
  console.log('[EuniTheme] Creating webview background...');

  // Create webview panel for background
  const panel = vscode.window.createWebviewPanel(
    'bulbasaurBackground',
    'Bulbasaur Background',
    vscode.ViewColumn.One,
    {
      enableScripts: true,
      retainContextWhenHidden: true
    }
  );

  // Set webview content
  panel.webview.html = \`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bulbasaur Background</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            width: 100vw;
            height: 100vh;
            background: #1e2720;
            overflow: hidden;
            position: relative;
        }
        
        .pokeball-container {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 400px;
            height: 400px;
            z-index: 9999;
            pointer-events: none;
        }
        
        .pokeball {
            width: 100%;
            height: 100%;
            background-image: url('\${panel.webview.asWebviewUri(
              vscode.Uri.file(path.join(ctx.extensionPath, 'media', 'pokeball.png'))
            )}');
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
            opacity: 0.1;
            animation: pokeballFloat 20s ease-in-out infinite;
        }
        
        @keyframes pokeballFloat {
            0%, 100% { 
                transform: scale(1) rotate(0deg); 
                opacity: 0.08; 
            }
            50% { 
                transform: scale(1.1) rotate(180deg); 
                opacity: 0.12; 
            }
        }
        
        .pokeball-spots {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: 
                radial-gradient(circle at 30% 30%, rgba(211, 19, 86, 0.1) 50px, transparent 50px),
                radial-gradient(circle at 70% 70%, rgba(211, 19, 86, 0.08) 60px, transparent 60px),
                radial-gradient(circle at 50% 50%, rgba(211, 19, 86, 0.05) 80px, transparent 80px);
            background-size: 200px 200px, 300px 300px, 400px 400px;
            background-position: 0 0, 100px 100px, 200px 200px;
            background-repeat: no-repeat;
            animation: spotsFloat 15s ease-in-out infinite;
        }
        
        @keyframes spotsFloat {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.5; }
        }
    </style>
</head>
<body>
    <div class="pokeball-container">
        <div class="pokeball"></div>
        <div class="pokeball-spots"></div>
    </div>
</body>
</html>\`;

  // Handle webview messages
  panel.webview.onDidReceiveMessage(
    message => {
      switch (message.command) {
        case 'updateOpacity':
          if (message.opacity !== undefined) {
            panel.webview.postMessage({
              command: 'setOpacity',
              opacity: message.opacity
            });
          }
          break;
      }
    }
  );

  // Show panel
  panel.reveal();
}

export function deactivate() {
  console.log('[EuniTheme] Background webview deactivated');
}
`;

    fs.writeFileSync(path.join(this.outputDir, 'webview-background.ts'), webviewCode);
  }

  // Generate CSS injection method
  generateCSSInjection() {
    const cssInjector = `import * as vscode from 'vscode';

export function activate(ctx: vscode.ExtensionContext) {
  console.log('[EuniTheme] Injecting background CSS...');

  // Inject CSS into the workspace
  const injectBackgroundCSS = () => {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (workspaceFolders && workspaceFolders.length > 0) {
      const cssPath = path.join(workspaceFolders[0].uri.fsPath, '.vscode', 'bulbasaur-background.css');
      
      // Create CSS file if it doesn't exist
      if (!fs.existsSync(cssPath)) {
        const css = \`
/* EuniTheme Bulbasaur Background */
body, .monaco-editor {
  background: #1e2720 url('file://\${ctx.asAbsolutePath(path.join('media', 'pokeball.png'))}') center/contain no-repeat !important;
  background-attachment: fixed !important;
  background-size: 300px 300px !important;
  position: relative !important;
}

body::before, .monaco-editor::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 50%, rgba(211, 19, 86, 0.05) 100px, transparent 100%);
  z-index: -1;
  pointer-events: none;
}

/* Ensure pokeball is visible */
.monaco-editor .editor-background {
  background: transparent !important;
}

/* VS Code specific */
.vscode-dark {
  background: #1e2720 url('file://\${ctx.asAbsolutePath(path.join('media', 'pokeball.png'))}') center/contain no-repeat !important;
}
        \`;
        
        // Ensure .vscode directory exists
        const vscodeDir = path.dirname(cssPath);
        if (!fs.existsSync(vscodeDir)) {
          fs.mkdirSync(vscodeDir, { recursive: true });
        }
        
        fs.writeFileSync(cssPath, css);
      }
    }
  };

  // Inject CSS on activation
  injectBackgroundCSS();

  // Watch for workspace changes
  ctx.subscriptions.push(
    vscode.workspace.onDidChangeWorkspaceFolders(injectBackgroundCSS)
  );

  // Command to manually inject
  ctx.subscriptions.push(
    vscode.commands.registerCommand('eunitheme.injectBackground', () => {
      injectBackgroundCSS();
      vscode.window.showInformationMessage('🌱 Background CSS injected!');
    })
  );

  // Status bar item
  const statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );
  statusBarItem.text = '$(zap) BG Injected';
  statusBarItem.tooltip = 'Bulbasaur background CSS injected';
  statusBarItem.command = 'eunitheme.injectBackground';
  statusBarItem.show();

  ctx.subscriptions.push(statusBarItem);
}

export function deactivate() {
  console.log('[EuniTheme] CSS injector deactivated');
}
`;

    fs.writeFileSync(path.join(this.outputDir, 'css-injector.ts'), cssInjector);
  }

  // Generate installation instructions
  generateInstallationGuide() {
    const guide = `# EUniTheme Bulbasaur - Background Installation Guide

## 🎨 Methods to Show Background

### Method 1: Webview Background (Recommended)
\`\`\`typescript
// Replace your extension.ts with this code
import * as vscode from 'vscode';
import * as path from 'path';

export function activate(ctx: vscode.ExtensionContext) {
  const panel = vscode.window.createWebviewPanel(
    'bulbasaurBackground',
    'Bulbasaur Background',
    vscode.ViewColumn.One,
    { enableScripts: true }
  );
  
  panel.webview.html = \`<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            background: #1e2720;
            position: relative;
        }
        .pokeball {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 300px;
            height: 300px;
            background-image: url('\${panel.webview.asWebviewUri(
              vscode.Uri.file(path.join(ctx.extensionPath, 'media', 'pokeball.png'))
            )}');
            background-size: contain;
            opacity: 0.1;
            animation: float 20s infinite;
        }
        @keyframes float {
            0%, 100% { transform: translate(-50%, -50%) scale(1); }
            50% { transform: translate(-50%, -50%) scale(1.1); }
        }
    </style>
</head>
<body>
    <div class="pokeball"></div>
</body>
</html>\`;
  
  panel.reveal();
}
\`\`\`

### Method 2: CSS Injection
\`\`\`typescript
// Create .vscode/bulbasaur-background.css in your workspace
body {
  background: #1e2720 url('./media/pokeball.png') center/contain no-repeat !important;
  background-attachment: fixed !important;
  background-size: 300px 300px !important;
}
\`\`\`

### Method 3: Editor Decoration
\`\`\`typescript
// Use text editor decorations
const backgroundDecoration = vscode.window.createTextEditorDecorationType({
  dark: {
    after: {
      contentIconPath: ctx.asAbsolutePath(path.join('media', 'pokeball.png')),
      margin: '0 0 0 0'
    }
  }
});

editor.setDecorations(backgroundDecoration, [{
  range: new vscode.Range(0, 0, editor.document.lineCount, 0)
}]);
\`\`\`

## 🚀 Quick Installation

### Option 1: Use Generated Files
1. Copy \`pokeball.png\` to your \`media/\` folder
2. Replace \`extension.ts\` with \`background-extension.ts\`
3. Compile: \`npm run compile\`
4. Reload VS Code

### Option 2: Manual CSS
1. Create file: \`.vscode/bulbasaur-background.css\`
2. Add this CSS:
\`\`\`css
body {
  background: #1e2720 url('./media/pokeball.png') center/contain no-repeat !important;
  background-attachment: fixed !important;
  background-size: 300px 300px !important;
}
\`\`\`
3. Restart VS Code

### Option 3: Workspace Settings
Add to your VS Code settings.json:
\`\`\`json
{
  "editor.background": "#1e2720",
  "background.coverage.enabled": true,
  "background.style": {
    "content": "'./media/pokeball.png'",
    "size": "300px 300px",
    "position": "center center",
    "repeat": "no-repeat",
    "attachment": "fixed"
  }
}
\`\`\`

## 🔧 Troubleshooting

### Background not showing:
1. **Check file path**: Ensure \`pokeball.png\` exists in \`media/\` folder
2. **File permissions**: Make sure the extension can read the image
3. **CSS specificity**: Use \`!important\` declarations
4. **VS Code version**: Some versions may have different background handling

### Image not loading:
1. **File format**: Use PNG, not JPG or other formats
2. **File size**: Keep image under 1MB for performance
3. **Path issues**: Use absolute paths, not relative
4. **Clear cache**: Restart VS Code after changes

### Performance issues:
1. **Reduce image size**: Optimize PNG file
2. **Lower opacity**: Use 0.05-0.1 instead of higher values
3. **Disable animations**: Remove animation if causing lag
4. **Hardware acceleration**: Ensure GPU acceleration is enabled

## 🎮 Best Practices

1. **Use webview method** for most reliable results
2. **Test with different screen sizes** for responsiveness
3. **Provide toggle option** for users to disable background
4. **Document the feature** in your README
5. **Consider accessibility** with reduced motion preferences

Choose the method that works best for your extension architecture!
`;

    fs.writeFileSync(path.join(this.outputDir, 'BACKGROUND-INSTALLATION.md'), guide);
  }

  generateAll() {
    this.generateVSCodeBackground();
    this.generateWebviewBackground();
    this.generateCSSInjection();
    this.generateInstallationGuide();
  }
}

// CLI interface
if (require.main === module) {
  const installer = new BackgroundInstaller();
  installer.generateAll();
}

module.exports = BackgroundInstaller;
