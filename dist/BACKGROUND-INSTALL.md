# EuniTheme Bulbasaur - Background Enhancement

## 🎨 What's Included

- **Editor Background CSS**: Subtle pokeball patterns for coding area
- **Watermark**: Small pokeball logo in corner
- **Cross-editor Support**: VS Code, Sublime Text, Atom, Vim

## 📁 Files Generated

- `editor-background.css` - Main background styles
- `background-demo.html` - Interactive demonstration

## 🚀 Installation

### VS Code
1. Copy `editor-background.css` to your extension folder
2. Add to your extension's webview HTML:
   ```html
   <link rel="stylesheet" href="./editor-background.css">
   ```
3. Add the CSS classes to your editor elements

### Sublime Text
1. Add CSS to your .sublime-theme file:
   ```css
   @import "editor-background.css";
   ```

### Atom
1. Include in your styles.less:
   ```less
   @import "editor-background.css";
   ```

### Web-based Editors
1. Include CSS file:
   ```html
   <link rel="stylesheet" href="editor-background.css">
   ```
2. Add classes to your editor container:
   ```html
   <div class="editor-background-pokeball">
     <div class="pokeball-pattern"></div>
     <div class="pokeball-watermark"></div>
   </div>
   ```

## 🎯 CSS Classes

### Background Containers
- `.editor-background-pokeball` - Main background container
- `.pokeball-pattern` - Animated pokeball patterns
- `.pokeball-watermark` - Corner watermark

### Editor Specific
- `.monaco-editor .editor-background` - VS Code/Monaco
- `.view-container` - Sublime Text
- `atom-text-editor` - Atom

## 🎨 Customization

### Change Colors
Edit the CSS variables:
```css
.monaco-editor .editor-background {
  background: #your-background-color !important;
}
```

### Adjust Opacity
Modify the opacity values:
```css
.pokeball-pattern {
  opacity: 0.1; /* Lower = more subtle */
}
```

### Change Animation Speed
Adjust the animation duration:
```css
@keyframes subtlePokeball {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.5; }
}

.monaco-editor .editor-background::before {
  animation: subtlePokeball 15s ease-in-out infinite; /* Slower = 20s */
}
```

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
