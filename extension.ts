import * as vscode from 'vscode';
import * as path from 'path';

export function activate(ctx: vscode.ExtensionContext) {
  const provider = new BulbaProvider(ctx);

  ctx.subscriptions.push(
    vscode.window.registerWebviewViewProvider('eunitheme.bulbaView', provider) 
  );

  // Register command to generate visual enhancements
  ctx.subscriptions.push(
    vscode.commands.registerCommand('eunitheme.generateThemes', () => {
      const { exec } = require('child_process');
      exec('node theme-adapter.js all', { cwd: ctx.extensionPath }, (error: any) => {
        if (error) {
          vscode.window.showErrorMessage('Failed to generate themes: ' + error.message);
        } else {
          vscode.window.showInformationMessage('🌱 Universal themes generated successfully!');
        }
      });
    })
  );

  // Register command to generate visual enhancements
  ctx.subscriptions.push(
    vscode.commands.registerCommand('eunitheme.generateVisuals', () => {
      const { exec } = require('child_process');
      exec('node visual-enhancer.js', { cwd: ctx.extensionPath }, (error: any) => {
        if (error) {
          vscode.window.showErrorMessage('Failed to generate visual enhancements: ' + error.message);
        } else {
          vscode.window.showInformationMessage('🎨 Visual enhancements generated successfully!');
        }
      });
    })
  );

  // Add status bar item with Bulbasaur indicator
  const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  statusBarItem.text = '$(zap) Bulbasaur Theme';
  statusBarItem.tooltip = 'EuniTheme Bulbasaur Edition - Click for options';
  statusBarItem.command = 'eunitheme.generateThemes';
  statusBarItem.show();
  ctx.subscriptions.push(statusBarItem);
}

class BulbaProvider implements vscode.WebviewViewProvider {
  constructor(private ctx: vscode.ExtensionContext) {}

  resolveWebviewView(view: vscode.WebviewView) {
    view.webview.options = {
      enableScripts: true,
      localResourceRoots: [vscode.Uri.file(path.join(this.ctx.extensionPath, 'media'))]
    };

    // Check if GIF exists, fallback to SVG if not
    const gifPath = path.join(this.ctx.extensionPath, 'media', 'bulbasaur.gif');
    const pokeballPath = path.join(this.ctx.extensionPath, 'media', 'pokeball.png');
    let bulbasaurSrc: string;
    
    try {
      const gif = vscode.Uri.file(gifPath);
      bulbasaurSrc = view.webview.asWebviewUri(gif).toString();
    } catch (error) {
      // Fallback to embedded SVG if GIF doesn't exist
      bulbasaurSrc = 'data:image/svg+xml;base64,' + Buffer.from(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <ellipse cx="50" cy="60" rx="35" ry="30" fill="#1e2720"/>
          <ellipse cx="50" cy="40" rx="25" ry="20" fill="#A1EF8B"/>
          <circle cx="40" cy="35" r="5" fill="#ffffff"/>
          <circle cx="60" cy="35" r="5" fill="#ffffff"/>
          <circle cx="40" cy="35" r="3" fill="#000000"/>
          <circle cx="60" cy="35" r="3" fill="#000000"/>
          <circle cx="35" cy="45" r="4" fill="#D31356"/>
          <circle cx="65" cy="45" r="4" fill="#D31356"/>
          <path d="M45 50 Q50 55 55 50" stroke="#000000" stroke-width="2" fill="none"/>
          <path d="M30 70 Q50 80 70 70" stroke="#A1EF8B" stroke-width="3" fill="none"/>
        </svg>
      `).toString('base64');
    }

    // Get pokeball image for background
    let pokeballSrc: string;
    try {
      const pokeball = vscode.Uri.file(pokeballPath);
      pokeballSrc = view.webview.asWebviewUri(pokeball).toString();
    } catch (error) {
      pokeballSrc = '';
    }

    view.webview.html = `
      <html><head><style>
        body {
          margin: 0;
          background: linear-gradient(135deg, #1e2720, #153122);
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
        }
        
        /* Pokeball background decoration */
        body::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: ${pokeballSrc ? `url('${pokeballSrc}')` : 'none'};
          background-size: 30px 30px;
          background-position: right center;
          background-repeat: no-repeat;
          opacity: 0.1;
          z-index: 1;
        }
        
        /* Bulbasaur spots background pattern */
        body::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(circle at 20% 30%, rgba(211, 19, 86, 0.1) 2px, transparent 2px),
            radial-gradient(circle at 80% 70%, rgba(211, 19, 86, 0.1) 3px, transparent 3px),
            radial-gradient(circle at 60% 20%, rgba(161, 239, 139, 0.1) 2px, transparent 2px);
          background-size: 20px 20px, 25px 25px, 15px 15px;
          opacity: 0.3;
          z-index: 0;
        }
        
        .bulbasaur-img {
          height: 40px;
          image-rendering: pixelated;
          animation: walk 2s linear infinite;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
          z-index: 2;
          position: relative;
        }
        
        @keyframes walk {
          0% { transform: translateX(-10px) rotate(-2deg); }
          25% { transform: translateX(0px) rotate(0deg); }
          50% { transform: translateX(10px) rotate(2deg); }
          75% { transform: translateX(0px) rotate(0deg); }
          100% { transform: translateX(-10px) rotate(-2deg); }
        }
        
        /* Floating Bulbasaur icon */
        .bulbasaur-icon {
          position: absolute;
          top: 5px;
          right: 5px;
          width: 16px;
          height: 16px;
          background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="%23A1EF8B"/><circle cx="7" cy="8" r="2" fill="%23D31356"/><circle cx="13" cy="8" r="2" fill="%23D31356"/></svg>') no-repeat center;
          background-size: contain;
          animation: pulse 2s ease-in-out infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        /* Theme info tooltip */
        .theme-info {
          position: absolute;
          bottom: 2px;
          left: 5px;
          font-size: 8px;
          color: #A1EF8B;
          opacity: 0.7;
          font-family: monospace;
        }
      </style></head>
      <body>
        <img class="bulbasaur-img" src="${bulbasaurSrc}" alt="Bulbasaur">
        <div class="bulbasaur-icon"></div>
        <div class="theme-info">v1.0.0</div>
      </body></html>`;
  }
}

export function deactivate() {
  // Cleanup if needed
}
