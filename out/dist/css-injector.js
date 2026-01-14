"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = require("vscode");
function activate(ctx) {
    console.log('[EuniTheme] Injecting background CSS...');
    // Inject CSS into the workspace
    const injectBackgroundCSS = () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (workspaceFolders && workspaceFolders.length > 0) {
            const cssPath = path.join(workspaceFolders[0].uri.fsPath, '.vscode', 'bulbasaur-background.css');
            // Create CSS file if it doesn't exist
            if (!fs.existsSync(cssPath)) {
                const css = `
/* EuniTheme Bulbasaur Background */
body, .monaco-editor {
  background: #1e2720 url('file://${ctx.asAbsolutePath(path.join('media', 'pokeball.png'))}') center/contain no-repeat !important;
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
  background: #1e2720 url('file://${ctx.asAbsolutePath(path.join('media', 'pokeball.png'))}') center/contain no-repeat !important;
}
        `;
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
    ctx.subscriptions.push(vscode.workspace.onDidChangeWorkspaceFolders(injectBackgroundCSS));
    // Command to manually inject
    ctx.subscriptions.push(vscode.commands.registerCommand('eunitheme.injectBackground', () => {
        injectBackgroundCSS();
        vscode.window.showInformationMessage('🌱 Background CSS injected!');
    }));
    // Status bar item
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.text = '$(zap) BG Injected';
    statusBarItem.tooltip = 'Bulbasaur background CSS injected';
    statusBarItem.command = 'eunitheme.injectBackground';
    statusBarItem.show();
    ctx.subscriptions.push(statusBarItem);
}
function deactivate() {
    console.log('[EuniTheme] CSS injector deactivated');
}
//# sourceMappingURL=css-injector.js.map