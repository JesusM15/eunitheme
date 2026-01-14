# EUniTheme Bulbasaur - Background Installation Guide

## 🎨 Methods to Show Background

### Method 1: Webview Background (Recommended)
```typescript
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
  
  panel.webview.html = `<!DOCTYPE html>
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
            background-image: url('${panel.webview.asWebviewUri(
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
</html>`;
  
  panel.reveal();
}
```

### Method 2: CSS Injection
```typescript
// Create .vscode/bulbasaur-background.css in your workspace
body {
  background: #1e2720 url('./media/pokeball.png') center/contain no-repeat !important;
  background-attachment: fixed !important;
  background-size: 300px 300px !important;
}
```

### Method 3: Editor Decoration
```typescript
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
```

## 🚀 Quick Installation

### Option 1: Use Generated Files
1. Copy `pokeball.png` to your `media/` folder
2. Replace `extension.ts` with `background-extension.ts`
3. Compile: `npm run compile`
4. Reload VS Code

### Option 2: Manual CSS
1. Create file: `.vscode/bulbasaur-background.css`
2. Add this CSS:
```css
body {
  background: #1e2720 url('./media/pokeball.png') center/contain no-repeat !important;
  background-attachment: fixed !important;
  background-size: 300px 300px !important;
}
```
3. Restart VS Code

### Option 3: Workspace Settings
Add to your VS Code settings.json:
```json
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
```

## 🔧 Troubleshooting

### Background not showing:
1. **Check file path**: Ensure `pokeball.png` exists in `media/` folder
2. **File permissions**: Make sure the extension can read the image
3. **CSS specificity**: Use `!important` declarations
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
