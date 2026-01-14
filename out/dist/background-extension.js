"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = require("vscode");
const path = require("path");
function activate(ctx) {
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
            const range = new vscode.Range(activeEditor.document.positionAt(0), activeEditor.document.positionAt(activeEditor.document.getText().length));
            activeEditor.setDecorations(backgroundDecoration, [{
                    range: range,
                    hoverMessage: 'Bulbasaur Theme Background'
                }]);
        }
    };
    // Apply to current editor
    applyBackground();
    // Apply when switching editors
    ctx.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(applyBackground));
    // Apply when document changes
    ctx.subscriptions.push(vscode.workspace.onDidChangeTextDocument(applyBackground));
    // Create status bar item
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.text = '$(zap) Bulbasaur BG';
    statusBarItem.tooltip = 'Pokeball background enabled';
    statusBarItem.command = 'eunitheme.toggleBackground';
    statusBarItem.show();
    // Toggle background command
    ctx.subscriptions.push(vscode.commands.registerCommand('eunitheme.toggleBackground', () => {
        vscode.window.showInformationMessage('🌱 Pokeball background is active!');
    }));
    ctx.subscriptions.push(statusBarItem);
}
function deactivate() {
    console.log('[EuniTheme] Background deactivated');
}
//# sourceMappingURL=background-extension.js.map