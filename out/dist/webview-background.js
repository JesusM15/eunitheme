"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = require("vscode");
const path = require("path");
function activate(ctx) {
    console.log('[EuniTheme] Creating webview background...');
    // Create webview panel for background
    const panel = vscode.window.createWebviewPanel('bulbasaurBackground', 'Bulbasaur Background', vscode.ViewColumn.One, {
        enableScripts: true,
        retainContextWhenHidden: true
    });
    // Set webview content
    panel.webview.html = `<!DOCTYPE html>
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
            background-image: url('${panel.webview.asWebviewUri(vscode.Uri.file(path.join(ctx.extensionPath, 'media', 'pokeball.png')))}');
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
</html>`;
    // Handle webview messages
    panel.webview.onDidReceiveMessage(message => {
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
    });
    // Show panel
    panel.reveal();
}
function deactivate() {
    console.log('[EuniTheme] Background webview deactivated');
}
//# sourceMappingURL=webview-background.js.map