# EuniTheme Bulbasaur - Universal Theme Adapter

🌱 **A beautiful Bulbasaur-inspired dark theme that works across all your favorite editors!**

## 🎨 Theme Colors

Inspired by everyone's favorite Grass/Poison starter Pokémon, this theme features:

- **Background**: Deep forest green (`#1e2720`)
- **Foreground**: Soft light gray (`#e6e9e9`)
- **Accent**: Bulbasaur's signature pink/red (`#D31356`)
- **Syntax**: Carefully balanced colors for optimal readability

## 🚀 Supported Editors

### ✅ Currently Supported
- **Visual Studio Code** (original theme)
- **Sublime Text 3/4**
- **Atom**
- **Vim / Neovim**
- **JetBrains IDEs** (IntelliJ, PyCharm, WebStorm, etc.)
- **Web-based editors** (CodeMirror, Monaco Editor)

### 🔄 Easy to Extend
The theme adapter is designed to be easily extended to support additional editors.

## 📦 Installation

### Using the Theme Adapter

1. **Clone or download this repository**
2. **Install Node.js** (if not already installed)
3. **Generate themes for your preferred editor**:

```bash
# Generate themes for all supported editors
node theme-adapter.js all

# Or generate for a specific editor
node theme-adapter.js sublime    # Sublime Text
node theme-adapter.js atom       # Atom
node theme-adapter.js vim        # Vim/Neovim
node theme-adapter.js jetbrains  # JetBrains IDEs
node theme-adapter.js web        # Web-based editors
```

4. **Install the generated theme files** (see editor-specific instructions below)

---

## 🛠️ Editor-Specific Installation

### Visual Studio Code
Already included in the extension! Just install "EuniTheme Bulbasaur Edition" from the VS Code Marketplace.

### Sublime Text
1. Run `node theme-adapter.js sublime`
2. Copy `dist/EuniTheme-Bulbasaur.sublime-theme` to:
   - **Windows**: `%APPDATA%\Sublime Text 3\Packages\User\`
   - **macOS**: `~/Library/Application Support/Sublime Text 3/Packages/User/`
   - **Linux**: `~/.config/sublime-text-3/Packages/User/`
3. Go to `Preferences > Theme > EuniTheme-Bulbasaur`

### Atom
1. Run `node theme-adapter.js atom`
2. Create a folder in `~/.atom/packages/` called `eunitheme-bulbasaur-syntax`
3. Copy the contents of `dist/` to that folder
4. Restart Atom and go to `Settings > Themes > Syntax Theme > EuniTheme Bulbasaur`

### Vim / Neovim
1. Run `node theme-adapter.js vim`
2. Copy `dist/eunitheme-bulbasaur.vim` to:
   - **Vim**: `~/.vim/colors/`
   - **Neovim**: `~/.config/nvim/colors/`
3. Add to your config:
   ```vim
   colorscheme eunitheme-bulbasaur
   ```

### JetBrains IDEs (IntelliJ, PyCharm, etc.)
1. Run `node theme-adapter.js jetbrains`
2. Go to `File > Import Settings`
3. Select `dist/EuniTheme-Bulbasaur.theme.json`
4. Restart the IDE
5. Go to `Settings > Appearance & Behavior > Appearance > Theme`

### Web-based Editors
1. Run `node theme-adapter.js web`
2. Include `dist/eunitheme-bulbasaur-web.css` in your project
3. Add the CSS class `cm-s-eunitheme` to your CodeMirror instance
4. For Monaco Editor, the CSS will automatically apply the theme

---

## 🎯 Features

### Syntax Highlighting
- **Comments**: Italicized gray for easy distinction
- **Keywords**: Bold yellow-green for control structures
- **Strings**: Soft green for literals
- **Functions**: Light yellow for method names
- **Variables**: Pink-purple for identifiers
- **Numbers**: Orange for numeric literals
- **Operators**: Red for punctuation and operators

### UI Elements
- **Caret**: Bulbasaur pink accent color
- **Selection**: Semi-transparent overlay
- **Line numbers**: Subtle gray with active line highlighting
- **Sidebar**: Darker green for file explorer

### Bulbasaur Easter Eggs
- The VS Code extension includes an animated Bulbasaur in the explorer panel
- Color palette inspired by Bulbasaur's design
- Walking animation in the sidebar view

---

## 🔧 Customization

### Modifying Colors
Edit the `BULBASAUR_COLORS` object in `theme-adapter.js`:

```javascript
const BULBASAUR_COLORS = {
  background: '#1e2720',     // Change background color
  accent: '#D31356',         // Change accent color
  // ... other colors
};
```

### Adding New Editor Support
1. Add a new method to the `ThemeAdapter` class:
```javascript
generateNewEditorTheme() {
  // Your theme generation logic here
}
```

2. Update the CLI interface to include your new editor
3. Add installation instructions to this README

---

## 🐛 Troubleshooting

### Common Issues

**Theme not appearing after installation**
- Restart your editor completely
- Check that theme files are in the correct directory
- Verify file permissions

**Colors look different than expected**
- Some editors may override certain colors
- Check your editor's color settings
- Try disabling other color customizations

**Syntax highlighting not working**
- Ensure the theme file is correctly formatted
- Check that file associations are correct
- Try with a simple test file first

### Getting Help
- Open an issue on the GitHub repository
- Include your editor name and version
- Share any error messages you see

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Add support for new editors**
2. **Improve color contrast and accessibility**
3. **Add new syntax highlighting rules**
4. **Fix bugs and improve documentation**
5. **Share screenshots of the theme in action**

### Development Setup
```bash
git clone https://github.com/yourusername/eunitheme.git
cd eunitheme
npm install
node theme-adapter.js all
```

---

## 📄 License

MIT License - feel free to use this theme in your projects!

---

## 🌟 Show Your Support

If you love this theme:
- ⭐ Star the repository
- 🐦 Share screenshots on social media
- 📝 Write about it in blog posts
- 🎮 Use it in your coding streams

---

*Made with ❤️ and Bulbasaur inspiration*
