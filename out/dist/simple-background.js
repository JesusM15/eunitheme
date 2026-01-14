"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = require("vscode");
function activate(ctx) {
    console.log('[EuniTheme] Background activated');
    // Create status bar item
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.text = '$(zap) Bulbasaur BG';
    statusBarItem.tooltip = 'Bulbasaur Background Active';
    statusBarItem.show();
    ctx.subscriptions.push(statusBarItem);
    // Show information message
    vscode.window.showInformationMessage('🌱 EUniTheme Bulbasaur with background is active!');
    vscode.window.showInformationMessage('📍 Place pokeball.png in your media folder for the background effect');
}
function deactivate() {
    console.log('[EuniTheme] Background deactivated');
}
//# sourceMappingURL=simple-background.js.map