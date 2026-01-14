"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = require("vscode");
const path = require("path");
function activate(ctx) {
    console.log('[EuniTheme] Activating...');
    const provider = new BulbaProvider(ctx);
    ctx.subscriptions.push(vscode.window.registerWebviewViewProvider('eunitheme.bulbaView', provider));
}
class BulbaProvider {
    constructor(ctx) {
        this.ctx = ctx;
    }
    resolveWebviewView(view) {
        console.log('[EuniTheme] Resolving Bulbasaur view...');
        view.webview.options = {
            enableScripts: true,
            localResourceRoots: [vscode.Uri.file(path.join(this.ctx.extensionPath, 'media'))]
        };
        const gif = vscode.Uri.file(path.join(this.ctx.extensionPath, 'media', 'bulbasaur.gif'));
        const src = view.webview.asWebviewUri(gif);
        view.webview.html = `
      <html><head><style>
        body {
          margin: 0;
          background: #1e1e1e;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        img {
          height: 40px;
          image-rendering: pixelated;
          animation: walk 2s linear infinite;
        }
        @keyframes walk {
          0% { transform: translateX(-10px) }
          50% { transform: translateX(10px) }
          100% { transform: translateX(-10px) }
        }
      </style></head>
      <body>
        <img src="${src}" alt="Bulbasaur">
      </body></html>`;
    }
}
function deactivate() {
    console.log('[EuniTheme] Deactivated');
}
//# sourceMappingURL=extension.js.map