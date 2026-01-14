#!/usr/bin/env node

/**
 * Visual Enhancer for EuniTheme Bulbasaur
 * Generates visual assets and configurations for adding Bulbasaur graphics to themes
 */

const fs = require('fs');
const path = require('path');

class VisualEnhancer {
  constructor() {
    this.outputDir = path.join(__dirname, 'dist', 'visuals');
    this.ensureOutputDir();
  }

  ensureOutputDir() {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  // Generate SVG Bulbasaur graphics
  generateBulbasaurSVGs() {
    const svgs = {
      'bulbasaur-simple.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
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
</svg>`,
      
      'bulbasaur-minimal.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
  <circle cx="25" cy="25" r="20" fill="#A1EF8B" opacity="0.8"/>
  <circle cx="18" cy="20" r="3" fill="#D31356"/>
  <circle cx="32" cy="20" r="3" fill="#D31356"/>
  <path d="M20 30 Q25 35 30 30" stroke="#1e2720" stroke-width="2" fill="none"/>
</svg>`,
      
      'bulbasaur-head.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60">
  <ellipse cx="30" cy="35" rx="20" ry="18" fill="#A1EF8B"/>
  <circle cx="22" cy="30" r="4" fill="#ffffff"/>
  <circle cx="38" cy="30" r="4" fill="#ffffff"/>
  <circle cx="22" cy="30" r="2" fill="#000000"/>
  <circle cx="38" cy="30" r="2" fill="#000000"/>
  <circle cx="18" cy="38" r="3" fill="#D31356"/>
  <circle cx="42" cy="38" r="3" fill="#D31356"/>
  <path d="M25 42 Q30 46 35 42" stroke="#000000" stroke-width="1.5" fill="none"/>
</svg>`,
      
      'bulbasaur-spot.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
  <ellipse cx="10" cy="10" rx="8" ry="6" fill="#D31356" opacity="0.7"/>
  <ellipse cx="10" cy="10" rx="5" ry="3" fill="#D31356" opacity="0.5"/>
</svg>`,
      
      'bulbasaur-pokeball.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
  <circle cx="20" cy="20" r="18" fill="#ffffff" stroke="#000000" stroke-width="2"/>
  <path d="M20 2 A18 18 0 0 1 20 38" fill="#ff0000"/>
  <circle cx="20" cy="20" r="6" fill="#ffffff" stroke="#000000" stroke-width="1"/>
  <circle cx="20" cy="20" r="3" fill="#000000"/>
</svg>`
    };

    for (const [filename, svg] of Object.entries(svgs)) {
      fs.writeFileSync(path.join(this.outputDir, filename), svg);
    }
  }

  // Generate CSS animations for Bulbasaur
  generateAnimationsCSS() {
    const css = `/* Bulbasaur Visual Animations */

/* Floating Bulbasaur background */
.bulbasaur-float {
  position: fixed;
  top: 10%;
  right: 5%;
  width: 120px;
  height: 120px;
  background: url('./bulbasaur-simple.svg') no-repeat center;
  background-size: contain;
  opacity: 0.1;
  pointer-events: none;
  z-index: 1;
  animation: bulbasaurFloat 8s ease-in-out infinite;
}

@keyframes bulbasaurFloat {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg) scale(1); 
    opacity: 0.1; 
  }
  25% { 
    transform: translateY(-30px) rotate(5deg) scale(1.1); 
    opacity: 0.15; 
  }
  50% { 
    transform: translateY(-50px) rotate(-3deg) scale(1.05); 
    opacity: 0.2; 
  }
  75% { 
    transform: translateY(-20px) rotate(2deg) scale(1.02); 
    opacity: 0.12; 
  }
}

/* Walking Bulbasaur corner mascot */
.bulbasaur-walk {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  background: url('./bulbasaur-minimal.svg') no-repeat center;
  background-size: contain;
  opacity: 0.8;
  pointer-events: none;
  z-index: 1000;
  animation: bulbasaurWalk 3s linear infinite;
}

@keyframes bulbasaurWalk {
  0% { 
    transform: translateX(-10px) rotate(-5deg); 
  }
  25% { 
    transform: translateX(0px) rotate(0deg); 
  }
  50% { 
    transform: translateX(10px) rotate(5deg); 
  }
  75% { 
    transform: translateX(0px) rotate(0deg); 
  }
  100% { 
    transform: translateX(-10px) rotate(-5deg); 
  }
}

/* Bulbasaur spots pattern */
.bulbasaur-spots {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    url('./bulbasaur-spot.svg'),
    url('./bulbasaur-spot.svg'),
    url('./bulbasaur-spot.svg');
  background-position: 
    10% 20%,
    80% 10%,
    50% 80%;
  background-size: 30px 20px;
  background-repeat: no-repeat;
  opacity: 0.03;
  pointer-events: none;
  z-index: 0;
  animation: spotsFade 10s ease-in-out infinite alternate;
}

@keyframes spotsFade {
  0% { opacity: 0.01; }
  100% { opacity: 0.05; }
}

/* Bulbasaur loading spinner */
.bulbasaur-loader {
  display: inline-block;
  width: 50px;
  height: 50px;
  background: url('./bulbasaur-head.svg') no-repeat center;
  background-size: contain;
  animation: bulbasaurSpin 2s linear infinite;
}

@keyframes bulbasaurSpin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Bulbasaur status indicator */
.bulbasaur-status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  background: linear-gradient(135deg, #1e2720, #153122);
  border: 2px solid #A1EF8B;
  border-radius: 25px;
  color: #e6e9e9;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(161, 239, 139, 0.3);
  transition: all 0.3s ease;
}

.bulbasaur-status:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(161, 239, 139, 0.5);
  border-color: #D31356;
}

.bulbasaur-status::before {
  content: '';
  width: 16px;
  height: 16px;
  background: url('./bulbasaur-minimal.svg') no-repeat center;
  background-size: contain;
  animation: bulbasaurPulse 2s ease-in-out infinite;
}

@keyframes bulbasaurPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

/* Bulbasaur button */
.bulbasaur-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  background: linear-gradient(135deg, #A1EF8B, #9BEBC4);
  border: none;
  border-radius: 8px;
  color: #1e2720;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.bulbasaur-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(211, 19, 86, 0.3), transparent);
  transition: left 0.5s ease;
}

.bulbasaur-btn:hover::before {
  left: 100%;
}

.bulbasaur-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(161, 239, 139, 0.4);
}

.bulbasaur-btn:active {
  transform: translateY(0);
}

/* Bulbasaur card/container */
.bulbasaur-card {
  background: linear-gradient(135deg, #1e2720, #153122);
  border: 1px solid #A1EF8B;
  border-radius: 12px;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.bulbasaur-card::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(161, 239, 139, 0.1) 0%, transparent 70%);
  animation: bulbasaurRotate 20s linear infinite;
}

@keyframes bulbasaurRotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.bulbasaur-card::after {
  content: '';
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  background: url('./bulbasaur-minimal.svg') no-repeat center;
  background-size: contain;
  opacity: 0.3;
}

/* Responsive design */
@media (max-width: 768px) {
  .bulbasaur-float {
    width: 80px;
    height: 80px;
    top: 5%;
    right: 2%;
  }
  
  .bulbasaur-walk {
    width: 40px;
    height: 40px;
    bottom: 20px;
    right: 20px;
  }
  
  .bulbasaur-spots {
    background-size: 20px 15px;
  }
}
`;

    fs.writeFileSync(path.join(this.outputDir, 'bulbasaur-animations.css'), css);
  }

  // Generate HTML demo page
  generateDemoHTML() {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EuniTheme Bulbasaur - Visual Demo</title>
    <link rel="stylesheet" href="./bulbasaur-animations.css">
    <style>
        body {
            margin: 0;
            padding: 20px;
            background: #1e2720;
            color: #e6e9e9;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            min-height: 100vh;
            position: relative;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            position: relative;
            z-index: 2;
        }
        
        h1 {
            text-align: center;
            color: #A1EF8B;
            margin-bottom: 30px;
        }
        
        .demo-section {
            margin: 30px 0;
            padding: 20px;
        }
        
        .demo-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }
        
        .code-example {
            background: #153122;
            border: 1px solid #A1EF8B;
            border-radius: 8px;
            padding: 15px;
            margin: 10px 0;
            font-family: 'Courier New', monospace;
        }
    </style>
</head>
<body>
    <!-- Background effects -->
    <div class="bulbasaur-spots"></div>
    <div class="bulbasaur-float"></div>
    <div class="bulbasaur-walk"></div>
    
    <div class="container">
        <h1>🌱 EuniTheme Bulbasaur Visual Demo</h1>
        
        <div class="demo-section">
            <h2>Status Indicators</h2>
            <div class="demo-grid">
                <div class="bulbasaur-status">Bulbasaur Ready</div>
                <div class="bulbasaur-status">Theme Active</div>
                <div class="bulbasaur-status">Grass Type</div>
            </div>
        </div>
        
        <div class="demo-section">
            <h2>Buttons</h2>
            <div class="demo-grid">
                <button class="bulbasaur-btn">🌱 Activate</button>
                <button class="bulbasaur-btn">⚡ Power Up</button>
                <button class="bulbasaur-btn">🎨 Customize</button>
            </div>
        </div>
        
        <div class="demo-section">
            <h2>Cards</h2>
            <div class="demo-grid">
                <div class="bulbasaur-card">
                    <h3>Theme Info</h3>
                    <p>Bulbasaur-inspired dark theme with beautiful green accents.</p>
                </div>
                <div class="bulbasaur-card">
                    <h3>Features</h3>
                    <ul>
                        <li>Universal compatibility</li>
                        <li>Visual enhancements</li>
                        <li>Custom animations</li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div class="demo-section">
            <h2>Loading Animation</h2>
            <div style="text-align: center;">
                <div class="bulbasaur-loader"></div>
                <p>Loading Bulbasaur theme...</p>
            </div>
        </div>
        
        <div class="demo-section">
            <h2>Usage Examples</h2>
            <div class="code-example">
                &lt;div class="bulbasaur-status"&gt;Status Text&lt;/div&gt;
            </div>
            <div class="code-example">
                &lt;button class="bulbasaur-btn"&gt;Button Text&lt;/button&gt;
            </div>
            <div class="code-example">
                &lt;div class="bulbasaur-card"&gt;Content&lt;/div&gt;
            </div>
        </div>
    </div>
</body>
</html>`;

    fs.writeFileSync(path.join(this.outputDir, 'demo.html'), html);
  }

  // Generate VS Code extension enhancements
  generateVSCodeEnhancements() {
    const enhancement = {
      "visualEnhancements": {
        "enabled": true,
        "elements": {
          "sidebarMascot": {
            "enabled": true,
            "position": "bottom-right",
            "size": "medium",
            "animation": "walk"
          },
          "backgroundDecoration": {
            "enabled": true,
            "opacity": 0.05,
            "animation": "float"
          },
          "statusIndicators": {
            "enabled": true,
            "showThemeStatus": true,
            "showFileType": true
          }
        },
        "customColors": {
          "mascotPrimary": "#A1EF8B",
          "mascotSecondary": "#D31356",
          "mascotBackground": "#1e2720"
        }
      }
    };

    fs.writeFileSync(
      path.join(this.outputDir, 'vscode-enhancements.json'),
      JSON.stringify(enhancement, null, 2)
    );
  }

  // Generate installation guide
  generateInstallationGuide() {
    const guide = `# Bulbasaur Visual Elements Installation Guide

## 🎨 What's Included

- **SVG Graphics**: Various Bulbasaur illustrations
- **CSS Animations**: Floating, walking, and spinning effects
- **HTML Demo**: Interactive demonstration page
- **VS Code Enhancements**: Configuration for visual elements

## 📁 Files Generated

### Graphics
- \`bulbasaur-simple.svg\` - Full body illustration
- \`bulbasaur-minimal.svg\` - Minimalist design
- \`bulbasaur-head.svg\` - Head only
- \`bulbasaur-spot.svg\` - Bulbasaur spot pattern
- \`bulbasaur-pokeball.svg\` - Pokéball design

### Styles
- \`bulbasaur-animations.css\` - All animations and visual effects

### Demo
- \`demo.html\` - Interactive demonstration

### Configuration
- \`vscode-enhancements.json\` - VS Code specific settings

## 🚀 Usage

### Web-based Editors
1. Copy \`bulbasaur-animations.css\` to your project
2. Include the CSS file: \`<link rel="stylesheet" href="bulbasaur-animations.css">\`
3. Add HTML elements with the appropriate classes

### VS Code Extension
1. Copy the SVG files to your \`media\` folder
2. Use the configuration in \`vscode-enhancements.json\`
3. Update your extension.ts to reference the new assets

### Other Editors
- **Sublime Text**: Add CSS to your .sublime-theme file
- **Atom**: Include in your styles.less
- **Vim/Neovim**: Use terminal statusline indicators
- **JetBrains**: Add to your theme's UI configuration

## 🎯 CSS Classes Available

### Background Effects
- \`.bulbasaur-float\` - Floating mascot in background
- \`.bulbasaur-spots\` - Spot pattern overlay
- \`.bulbasaur-walk\` - Walking corner mascot

### UI Elements
- \`.bulbasaur-status\` - Status indicator with icon
- \`.bulbasaur-btn\` - Themed button
- \`.bulbasaur-card\` - Container with background effect
- \`.bulbasaur-loader\` - Loading animation

## 🔧 Customization

### Modify Colors
Edit the CSS variables in \`bulbasaur-animations.css\`:
\`\`\`css
.bulbasaur-status {
  background: linear-gradient(135deg, #your-color, #your-color);
  border-color: #your-accent;
}
\`\`\`

### Adjust Animations
Modify the \`@keyframes\` definitions:
\`\`\`css
@keyframes bulbasaurFloat {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-30px); }
  100% { transform: translateY(0px); }
}
\`\`\`

### Change Graphics
Replace the SVG files with your own designs while keeping the same filenames.

## 📱 Responsive Design

All visual elements are responsive and will adapt to different screen sizes:
- Mobile: Smaller, less intrusive animations
- Desktop: Full-size animations and effects
- Tablet: Balanced experience

## 🎭 Animation Types

### Subtle
- Gentle floating
- Slow pulsing
- Fade effects

### Interactive
- Hover effects on buttons
- Click animations
- Status changes

### Background
- Spot patterns
- Floating elements
- Gradient animations

## 🔍 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox
- CSS Custom Properties
- SVG animations

## 🐛 Troubleshooting

### Animations not working
- Check CSS file inclusion
- Verify browser compatibility
- Check for conflicting styles

### Graphics not displaying
- Ensure SVG files are accessible
- Check file paths
- Verify server configuration

### Performance issues
- Reduce animation complexity
- Limit number of animated elements
- Use CSS transforms instead of position changes

## 🎨 Design Tips

1. **Less is More**: Use subtle animations for professional environments
2. **Performance**: Limit animations to avoid distraction
3. **Accessibility**: Respect prefers-reduced-motion settings
4. **Consistency**: Keep visual style consistent across elements

Enjoy your Bulbasaur-enhanced coding experience! 🌱
`;

    fs.writeFileSync(path.join(this.outputDir, 'INSTALLATION.md'), guide);
  }

  generateAll() {
    this.generateBulbasaurSVGs();
    this.generateAnimationsCSS();
    this.generateDemoHTML();
    this.generateVSCodeEnhancements();
    this.generateInstallationGuide();
  }
}

// CLI interface
if (require.main === module) {
  const enhancer = new VisualEnhancer();
  enhancer.generateAll();
}

module.exports = VisualEnhancer;
