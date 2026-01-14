#!/usr/bin/env node

/**
 * Background Enhancer for EuniTheme Bulbasaur
 * Adds pokeball background to the main editor area
 */

const fs = require('fs');
const path = require('path');

class BackgroundEnhancer {
  constructor() {
    this.outputDir = path.join(__dirname, 'dist');
    this.ensureOutputDir();
  }

  ensureOutputDir() {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  // Generate CSS for editor background with centered pokeball
  generateBackgroundCSS() {
    const css = `/* EuniTheme Bulbasaur - Editor Background Enhancement */

/* Main editor background with centered pokeball */
.editor-background-pokeball {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #1e2720;
  z-index: -1;
  pointer-events: none;
}

/* Centered pokeball background - MAIN EDITOR AREA */
.pokeball-centered {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  background-image: url('./pokeball.png');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.03;
  z-index: -1;
  pointer-events: none;
  animation: pokeballCenterFloat 25s ease-in-out infinite;
}

@keyframes pokeballCenterFloat {
  0%, 100% { 
    transform: translate(-50%, -50%) scale(1) rotate(0deg); 
    opacity: 0.02; 
  }
  25% { 
    transform: translate(-50%, -50%) scale(1.1) rotate(90deg); 
    opacity: 0.04; 
  }
  50% { 
    transform: translate(-50%, -50%) scale(1.05) rotate(180deg); 
    opacity: 0.03; 
  }
  75% { 
    transform: translate(-50%, -50%) scale(1.02) rotate(270deg); 
    opacity: 0.025; 
  }
}

/* Multiple pokeballs pattern */
.pokeball-pattern-multiple {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(211, 19, 86, 0.08) 60px, transparent 60px),
    radial-gradient(circle at 75% 75%, rgba(211, 19, 86, 0.05) 80px, transparent 80px),
    radial-gradient(circle at 50% 50%, rgba(211, 19, 86, 0.03) 100px, transparent 100px),
    radial-gradient(circle at 15% 85%, rgba(211, 19, 86, 0.04) 40px, transparent 40px),
    radial-gradient(circle at 85% 15%, rgba(211, 19, 86, 0.04) 40px, transparent 40px);
  background-size: 300px 300px, 400px 400px, 500px 500px, 200px 200px, 200px 200px;
  background-position: 50% 50%, 100px 100px, 200px 200px, 0 0, 100% 100%;
  background-repeat: no-repeat;
  animation: pokeballMultipleFloat 30s ease-in-out infinite;
  z-index: -1;
  pointer-events: none;
}

@keyframes pokeballMultipleFloat {
  0%, 100% { 
    opacity: 0.05; 
    transform: scale(1); 
  }
  33% { 
    opacity: 0.08; 
    transform: scale(1.02); 
  }
  66% { 
    opacity: 0.06; 
    transform: scale(1.01); 
  }
}

/* VS Code specific - Centered pokeball in main editor */
.monaco-editor .editor-background {
  background: #1e2720 !important;
  position: relative;
}

.monaco-editor .editor-background::before {
  content: '';
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 250px;
  height: 250px;
  background-image: url('./pokeball.png');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.02;
  z-index: 0;
  pointer-events: none;
  animation: vscodePokeballFloat 20s ease-in-out infinite;
}

@keyframes vscodePokeballFloat {
  0%, 100% { 
    transform: translate(-50%, -50%) scale(1) rotate(0deg); 
    opacity: 0.015; 
  }
  50% { 
    transform: translate(-50%, -50%) scale(1.1) rotate(180deg); 
    opacity: 0.025; 
  }
}

/* Sublime Text specific */
.view-container {
  background: #1e2720 !important;
}

.view-container::before {
  content: '';
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 280px;
  height: 280px;
  background-image: url('./pokeball.png');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.025;
  z-index: 0;
  pointer-events: none;
  animation: sublimePokeballFloat 22s ease-in-out infinite;
}

@keyframes sublimePokeballFloat {
  0%, 100% { opacity: 0.02; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.03; transform: translate(-50%, -50%) scale(1.05); }
}

/* Atom specific */
atom-text-editor {
  background: #1e2720 !important;
}

atom-text-editor::before {
  content: '';
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  background-image: url('./pokeball.png');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.02;
  z-index: 0;
  pointer-events: none;
  animation: atomPokeballFloat 18s ease-in-out infinite;
}

@keyframes atomPokeballFloat {
  0%, 100% { opacity: 0.015; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.025; transform: translate(-50%, -50%) scale(1.03); }
}

/* Fallback pattern if pokeball.png doesn't exist */
.pokeball-fallback {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, rgba(211, 19, 86, 0.1) 30%, transparent 70%);
  border-radius: 50%;
  z-index: -1;
  pointer-events: none;
  animation: fallbackPulse 15s ease-in-out infinite;
}

@keyframes fallbackPulse {
  0%, 100% { opacity: 0.05; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.1; transform: translate(-50%, -50%) scale(1.1); }
}

/* Responsive adjustments */
@media (max-width: 1200px) {
  .pokeball-centered {
    width: 250px;
    height: 250px;
  }
  
  .monaco-editor .editor-background::before {
    width: 200px;
    height: 200px;
  }
}

@media (max-width: 768px) {
  .pokeball-centered {
    width: 180px;
    height: 180px;
    opacity: 0.02;
  }
  
  .monaco-editor .editor-background::before {
    width: 150px;
    height: 150px;
    opacity: 0.015;
  }
  
  .pokeball-pattern-multiple {
    opacity: 0.03;
  }
}
`;

    fs.writeFileSync(path.join(this.outputDir, 'editor-background.css'), css);
  }

  // Generate HTML demo for background
  generateBackgroundDemo() {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EuniTheme Bulbasaur - Background Demo</title>
    <link rel="stylesheet" href="./editor-background.css">
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: 'Consolas', 'Monaco', monospace;
            color: #e8e8e8;
            min-height: 100vh;
            position: relative;
        }
        
        .demo-content {
            position: relative;
            z-index: 10;
            max-width: 800px;
            margin: 0 auto;
            background: rgba(26, 31, 26, 0.8);
            padding: 30px;
            border-radius: 10px;
            border: 1px solid rgba(161, 239, 139, 0.3);
        }
        
        .code-sample {
            background: rgba(0, 0, 0, 0.3);
            padding: 15px;
            border-radius: 5px;
            margin: 10px 0;
            border-left: 3px solid #D31356;
        }
        
        h1 {
            color: #8FBC8F;
            text-align: center;
            margin-bottom: 30px;
        }
        
        .keyword { color: #FFD93D; font-weight: bold; }
        .string { color: #98FB98; }
        .function { color: #4ECDC4; }
        .variable { color: #FF6B9D; }
        .comment { color: #686b6d; font-style: italic; }
    </style>
</head>
<body>
    <div class="editor-background-pokeball"></div>
    <div class="pokeball-pattern"></div>
    <div class="pokeball-watermark"></div>
    
    <div class="demo-content">
        <h1>🌱 EuniTheme Bulbasaur Background Demo</h1>
        
        <div class="code-sample">
<span class="keyword">function</span> <span class="function">bulbasaurTheme</span>(<span class="variable">options</span>) {
    <span class="comment">// Traditional green colors that are easy on the eyes</span>
    <span class="keyword">const</span> <span class="variable">colors</span> = {
        <span class="string">background</span>: <span class="string">'#1a1f1a'</span>,
        <span class="string">foreground</span>: <span class="string">'#e8e8e8'</span>,
        <span class="string">accent</span>: <span class="string">'#D31356'</span>
    };
    
    <span class="keyword">return</span> <span class="variable">colors</span>;
}
        </div>
        
        <div class="code-sample">
<span class="comment">// Pokeball background decoration</span>
<span class="keyword">class</span> <span class="function">PokeballBackground</span> {
    <span class="function">constructor</span>() {
        <span class="keyword">this</span>.<span class="variable">opacity</span> = <span class="string">0.1</span>;
        <span class="keyword">this</span>.<span class="variable">animation</span> = <span class="string">'float'</span>;
    }
    
    <span class="function">render</span>() {
        <span class="keyword">return</span> <span class="string">'<div class="pokeball-pattern"></div>'</span>;
    }
}
        </div>
        
        <p style="text-align: center; margin-top: 30px; color: #8FBC8F;">
            🎮 Background with subtle pokeball patterns and traditional green colors
        </p>
    </div>
</body>
</html>`;

    fs.writeFileSync(path.join(this.outputDir, 'background-demo.html'), html);
  }

  // Generate installation instructions
  generateBackgroundInstructions() {
    const instructions = `# EuniTheme Bulbasaur - Background Enhancement

## 🎨 What's Included

- **Editor Background CSS**: Subtle pokeball patterns for coding area
- **Watermark**: Small pokeball logo in corner
- **Cross-editor Support**: VS Code, Sublime Text, Atom, Vim

## 📁 Files Generated

- \`editor-background.css\` - Main background styles
- \`background-demo.html\` - Interactive demonstration

## 🚀 Installation

### VS Code
1. Copy \`editor-background.css\` to your extension folder
2. Add to your extension's webview HTML:
   \`\`\`html
   <link rel="stylesheet" href="./editor-background.css">
   \`\`\`
3. Add the CSS classes to your editor elements

### Sublime Text
1. Add CSS to your .sublime-theme file:
   \`\`\`css
   @import "editor-background.css";
   \`\`\`

### Atom
1. Include in your styles.less:
   \`\`\`less
   @import "editor-background.css";
   \`\`\`

### Web-based Editors
1. Include CSS file:
   \`\`\`html
   <link rel="stylesheet" href="editor-background.css">
   \`\`\`
2. Add classes to your editor container:
   \`\`\`html
   <div class="editor-background-pokeball">
     <div class="pokeball-pattern"></div>
     <div class="pokeball-watermark"></div>
   </div>
   \`\`\`

## 🎯 CSS Classes

### Background Containers
- \`.editor-background-pokeball\` - Main background container
- \`.pokeball-pattern\` - Animated pokeball patterns
- \`.pokeball-watermark\` - Corner watermark

### Editor Specific
- \`.monaco-editor .editor-background\` - VS Code/Monaco
- \`.view-container\` - Sublime Text
- \`atom-text-editor\` - Atom

## 🎨 Customization

### Change Colors
Edit the CSS variables:
\`\`\`css
.monaco-editor .editor-background {
  background: #your-background-color !important;
}
\`\`\`

### Adjust Opacity
Modify the opacity values:
\`\`\`css
.pokeball-pattern {
  opacity: 0.1; /* Lower = more subtle */
}
\`\`\`

### Change Animation Speed
Adjust the animation duration:
\`\`\`css
@keyframes subtlePokeball {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.5; }
}

.monaco-editor .editor-background::before {
  animation: subtlePokeball 15s ease-in-out infinite; /* Slower = 20s */
}
\`\`\`

## 🎭 Effects

### Subtle Mode
- Lower opacity (0.05-0.1)
- Slower animations (15-20s)
- Minimal visual distraction

### Standard Mode
- Medium opacity (0.1-0.2)
- Normal animations (10-15s)
- Balanced visibility

### Prominent Mode
- Higher opacity (0.2-0.3)
- Faster animations (5-10s)
- More visual presence

## 📱 Responsive Design

The background automatically adjusts:
- **Desktop**: Full-size patterns and animations
- **Tablet**: Medium patterns, reduced opacity
- **Mobile**: Small patterns, minimal opacity

## 🔧 Performance Tips

1. **Use CSS transforms** instead of position changes
2. **Limit animation complexity** for better performance
3. **Reduce opacity** on older hardware
4. **Test with large files** for performance impact

## 🐛 Troubleshooting

### Background not showing
- Check CSS file inclusion
- Verify file paths
- Ensure z-index is correct

### Animations lagging
- Reduce animation complexity
- Lower opacity values
- Use hardware acceleration

### Conflicts with other themes
- Check for CSS specificity
- Use !important sparingly
- Test with different themes

Enjoy your enhanced Bulbasaur coding experience! 🌱⚡
`;

    fs.writeFileSync(path.join(this.outputDir, 'BACKGROUND-INSTALL.md'), instructions);
  }

  generateAll() {
    this.generateBackgroundCSS();
    this.generateBackgroundDemo();
    this.generateBackgroundInstructions();
  }
}

// CLI interface
if (require.main === module) {
  const enhancer = new BackgroundEnhancer();
  enhancer.generateAll();
}

module.exports = BackgroundEnhancer;
