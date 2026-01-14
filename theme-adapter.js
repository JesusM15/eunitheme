#!/usr/bin/env node

/**
 * Universal Theme Adapter for EuniTheme Bulbasaur Edition
 * Converts the VS Code theme to formats compatible with various editors
 */

const fs = require('fs');
const path = require('path');

// Core Bulbasaur theme colors extracted from VS Code theme
const BULBASAUR_COLORS = {
  // Background colors
  background: '#1a1f1a', // Softer dark green
  foreground: '#e8e8e8',
  sidebar: '#1a1f1a',
  
  // Accent colors (Bulbasaur-inspired)
  accent: '#D31356',      // Pink/red (like Bulbasaur's spots)
  accentSecondary: '#a51044',
  
  // Syntax colors
  comment: '#686b6d',
  variable: '#FF6B9D',
  keyword: '#FFD93D',
  string: '#98FB98', // Pale green, easy on eyes
  function: '#4ECDC4',
  number: '#FF9F40',
  operator: '#FF6B6B',
  class: '#C77DFF',
  
  // Traditional green palette (Bulbasaur's primary color)
  green1: '#8FBC8F',      // Traditional sage green
  green2: '#9ACD32',      // Traditional yellow-green
  green3: '#98FB98',      // Pale green, easy on eyes
  
  // Additional colors
  punctuation: '#555555',
  tag: '#f07178',
  boolean: '#fd8484ea'
};

class ThemeAdapter {
  constructor() {
    this.outputDir = path.join(__dirname, 'dist');
    this.ensureOutputDir();
  }

  ensureOutputDir() {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  // Generate Sublime Text theme
  generateSublimeTheme() {
    const theme = {
      name: "EuniTheme Bulbasaur",
      variables: {
        "background": BULBASAUR_COLORS.background,
        "foreground": BULBASAUR_COLORS.foreground,
        "accent": BULBASAUR_COLORS.accent
      },
      globals: {
        "foreground": "var(foreground)",
        "background": "var(background)",
        "caret": "var(accent)",
        "block_caret": "var(accent)",
        "line_highlight": "#2a342c",
        "selection": "#3a443c",
        "selection_border": "#4a545c",
        "inactive_selection": "#2a342c",
        "misspelling": BULBASAUR_COLORS.accent,
        "accent": "var(accent)"
      },
      rules: [
        {
          name: "Comments",
          scope: ["comment", "punctuation.definition.comment"],
          foreground: BULBASAUR_COLORS.comment,
          font_style: "italic"
        },
        {
          name: "Variables",
          scope: ["variable", "variable.other"],
          foreground: BULBASAUR_COLORS.variable
        },
        {
          name: "Keywords",
          scope: ["keyword", "storage.type", "storage.modifier"],
          foreground: BULBASAUR_COLORS.keyword,
          font_style: "bold"
        },
        {
          name: "Strings",
          scope: ["string", "constant.other.symbol"],
          foreground: BULBASAUR_COLORS.string
        },
        {
          name: "Functions",
          scope: ["entity.name.function", "support.function"],
          foreground: BULBASAUR_COLORS.function
        },
        {
          name: "Numbers",
          scope: ["constant.numeric"],
          foreground: BULBASAUR_COLORS.number
        },
        {
          name: "Operators",
          scope: ["keyword.operator", "punctuation"],
          foreground: BULBASAUR_COLORS.operator
        },
        {
          name: "Classes",
          scope: ["entity.name.class", "support.class", "support.type"],
          foreground: BULBASAUR_COLORS.class
        }
      ]
    };

    fs.writeFileSync(
      path.join(this.outputDir, 'EuniTheme-Bulbasaur.sublime-theme'),
      JSON.stringify(theme, null, 2)
    );
  }

  // Generate Atom theme
  generateAtomTheme() {
    const theme = {
      name: "EuniTheme Bulbasaur",
      theme: "syntax",
      version: "1.0.0",
      description: "Bulbasaur-inspired dark theme",
      keywords: ["syntax", "theme", "bulbasaur", "dark"],
      repository: "https://github.com/yourusername/eunitheme",
      license: "MIT",
      engines: {
        atom: ">=1.0.0 <2.0.0"
      }
    };

    const styles = `
/* EuniTheme Bulbasaur for Atom */
.syntax--comment {
  color: ${BULBASAUR_COLORS.comment};
  font-style: italic;
}

.syntax--variable {
  color: ${BULBASAUR_COLORS.variable};
}

.syntax--keyword {
  color: ${BULBASAUR_COLORS.keyword};
  font-weight: bold;
}

.syntax--string {
  color: ${BULBASAUR_COLORS.string};
}

.syntax--function .syntax--name {
  color: ${BULBASAUR_COLORS.function};
}

.syntax--constant .syntax--numeric {
  color: ${BULBASAUR_COLORS.number};
}

.syntax--keyword .syntax--operator {
  color: ${BULBASAUR_COLORS.operator};
}

.syntax--entity .syntax--name .syntax--class,
.syntax--support .syntax--type {
  color: ${BULBASAUR_COLORS.class};
}

atom-text-editor {
  background-color: ${BULBASAUR_COLORS.background};
  color: ${BULBASAUR_COLORS.foreground};
}

atom-text-editor .cursor {
  border-color: ${BULBASAUR_COLORS.accent};
}

atom-text-editor .selection .region {
  background-color: rgba(211, 19, 86, 0.3);
}
`;

    fs.writeFileSync(
      path.join(this.outputDir, 'package.json'),
      JSON.stringify(theme, null, 2)
    );
    
    fs.writeFileSync(
      path.join(this.outputDir, 'styles.less'),
      styles
    );
  }

  // Generate Vim/Neovim theme
  generateVimTheme() {
    const vimTheme = `
" EuniTheme Bulbasaur for Vim/Neovim
set background=dark
hi clear
if exists('syntax_on')
  syntax reset
endif
let g:colors_name = 'eunitheme-bulbasaur'

" Background colors
hi Normal guibg=${BULBASAUR_COLORS.background} guifg=${BULBASAUR_COLORS.foreground}
hi CursorLine guibg=#2a342c
hi CursorColumn guibg=#2a342c
hi ColorColumn guibg=#2a342c

" Selection
hi Visual guibg=#3a443c
hi VisualNOS guibg=#2a342c

" Syntax highlighting
hi Comment guifg=${BULBASAUR_COLORS.comment} gui=italic
hi Constant guifg=${BULBASAUR_COLORS.number}
hi String guifg=${BULBASAUR_COLORS.string}
hi Character guifg=${BULBASAUR_COLORS.string}
hi Number guifg=${BULBASAUR_COLORS.number}
hi Boolean guifg=${BULBASAUR_COLORS.boolean}
hi Float guifg=${BULBASAUR_COLORS.number}

hi Identifier guifg=${BULBASAUR_COLORS.variable}
hi Function guifg=${BULBASAUR_COLORS.function}

hi Statement guifg=${BULBASAUR_COLORS.keyword} gui=bold
hi Conditional guifg=${BULBASAUR_COLORS.keyword} gui=bold
hi Repeat guifg=${BULBASAUR_COLORS.keyword} gui=bold
hi Label guifg=${BULBASAUR_COLORS.keyword}
hi Operator guifg=${BULBASAUR_COLORS.operator}
hi Keyword guifg=${BULBASAUR_COLORS.keyword} gui=bold
hi Exception guifg=${BULBASAUR_COLORS.accent}

hi PreProc guifg=${BULBASAUR_COLORS.green1}
hi Include guifg=${BULBASAUR_COLORS.green1}
hi Define guifg=${BULBASAUR_COLORS.green1}
hi Macro guifg=${BULBASAUR_COLORS.green1}

hi Type guifg=${BULBASAUR_COLORS.class}
hi StorageClass guifg=${BULBASAUR_COLORS.keyword}
hi Structure guifg=${BULBASAUR_COLORS.class}
hi Typedef guifg=${BULBASAUR_COLORS.class}

hi Special guifg=${BULBASAUR_COLORS.accent}
hi SpecialChar guifg=${BULBASAUR_COLORS.accent}
hi Tag guifg=${BULBASAUR_COLORS.tag}
hi Delimiter guifg=${BULBASAUR_COLORS.punctuation}

" UI elements
hi Cursor guibg=${BULBASAUR_COLORS.accent}
hi lCursor guibg=${BULBASAUR_COLORS.accent}
hi MatchParen guibg=${BULBASAUR_COLORS.accent} guifg=${BULBASAUR_COLORS.background}
hi Search guibg=${BULBASAUR_COLORS.accent} guifg=${BULBASAUR_COLORS.background}
hi IncSearch guibg=${BULBASAUR_COLORS.keyword} guifg=${BULBASAUR_COLORS.background}

" Status line
hi StatusLine guibg=${BULBASAUR_COLORS.accent} guifg=${BULBASAUR_COLORS.foreground}
hi StatusLineNC guibg=#2a342c guifg=${BULBASAUR_COLORS.foreground}

" Line numbers
hi LineNr guifg=#686b6d guibg=${BULBASAUR_COLORS.background}
hi CursorLineNr guifg=${BULBASAUR_COLORS.accent} guibg=#2a342c
`;

    fs.writeFileSync(
      path.join(this.outputDir, 'eunitheme-bulbasaur.vim'),
      vimTheme
    );
  }

  // Generate JetBrains IDEs theme
  generateJetBrainsTheme() {
    const jetbrainsTheme = {
      name: "EuniTheme Bulbasaur",
      dark: true,
      author: "EuniTheme",
      editor: {
        background: BULBASAUR_COLORS.background,
        foreground: BULBASAUR_COLORS.foreground,
        caret: BULBASAUR_COLORS.accent,
        selectionBackground: "#3a443c",
        selectionForeground: BULBASAUR_COLORS.foreground,
        lineNumbers: "#686b6d",
        lineNumbersActive: BULBASAUR_COLORS.accent
      },
      syntax: {
        comment: {
          foreground: BULBASAUR_COLORS.comment,
          fontStyle: "italic"
        },
        keyword: {
          foreground: BULBASAUR_COLORS.keyword,
          fontStyle: "bold"
        },
        string: {
          foreground: BULBASAUR_COLORS.string
        },
        number: {
          foreground: BULBASAUR_COLORS.number
        },
        identifier: {
          foreground: BULBASAUR_COLORS.variable
        },
        function: {
          foreground: BULBASAUR_COLORS.function
        },
        class: {
          foreground: BULBASAUR_COLORS.class
        },
        operator: {
          foreground: BULBASAUR_COLORS.operator
        }
      },
      ui: {
        background: BULBASAUR_COLORS.background,
        foreground: BULBASAUR_COLORS.foreground,
        accent: BULBASAUR_COLORS.accent,
        secondaryBackground: "#2a342c",
        border: "#3a443c"
      }
    };

    fs.writeFileSync(
      path.join(this.outputDir, 'EuniTheme-Bulbasaur.theme.json'),
      JSON.stringify(jetbrainsTheme, null, 2)
    );
  }

  // Generate CSS for web-based editors with Bulbasaur visuals
  generateWebTheme() {
    const css = `
/* EuniTheme Bulbasaur for Web-based Editors (CodeMirror, Monaco, etc.) */

:root {
  --bulbasaur-bg: ${BULBASAUR_COLORS.background};
  --bulbasaur-fg: ${BULBASAUR_COLORS.foreground};
  --bulbasaur-accent: ${BULBASAUR_COLORS.accent};
  --bulbasaur-sidebar: ${BULBASAUR_COLORS.sidebar};
  --bulbasaur-comment: ${BULBASAUR_COLORS.comment};
  --bulbasaur-variable: ${BULBASAUR_COLORS.variable};
  --bulbasaur-keyword: ${BULBASAUR_COLORS.keyword};
  --bulbasaur-string: ${BULBASAUR_COLORS.string};
  --bulbasaur-function: ${BULBASAUR_COLORS.function};
  --bulbasaur-number: ${BULBASAUR_COLORS.number};
  --bulbasaur-operator: ${BULBASAUR_COLORS.operator};
  --bulbasaur-class: ${BULBASAUR_COLORS.class};
}

/* Bulbasaur background decoration */
.bulbasaur-bg {
  position: fixed;
  top: 0;
  right: 0;
  width: 200px;
  height: 200px;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="%23A1EF8B" opacity="0.1"/><circle cx="35" cy="40" r="8" fill="%23D31356" opacity="0.2"/><circle cx="65" cy="40" r="8" fill="%23D31356" opacity="0.2"/><path d="M40 60 Q50 70 60 60" stroke="%23A1EF8B" stroke-width="2" fill="none" opacity="0.3"/></svg>') no-repeat;
  background-size: contain;
  opacity: 0.05;
  pointer-events: none;
  z-index: 1;
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}

/* Bulbasaur corner mascot */
.bulbasaur-mascot {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 80px;
  height: 80px;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><ellipse cx="50" cy="60" rx="35" ry="30" fill="%231e2720"/><ellipse cx="50" cy="40" rx="25" ry="20" fill="%23A1EF8B"/><circle cx="40" cy="35" r="5" fill="%23ffffff"/><circle cx="60" cy="35" r="5" fill="%23ffffff"/><circle cx="40" cy="35" r="3" fill="%23000000"/><circle cx="60" cy="35" r="3" fill="%23000000"/><circle cx="35" cy="45" r="4" fill="%23D31356"/><circle cx="65" cy="45" r="4" fill="%23D31356"/><path d="M45 50 Q50 55 55 50" stroke="%23000000" stroke-width="2" fill="none"/><path d="M30 70 Q50 80 70 70" stroke="%23A1EF8B" stroke-width="3" fill="none"/></svg>') no-repeat center;
  background-size: contain;
  opacity: 0.7;
  pointer-events: none;
  z-index: 1000;
  animation: bounce 3s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

/* Bulbasaur status indicator */
.bulbasaur-status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 12px;
  background: ${BULBASAUR_COLORS.sidebar};
  border: 1px solid ${BULBASAUR_COLORS.accent};
  border-radius: 20px;
  color: ${BULBASAUR_COLORS.foreground};
  font-size: 12px;
}

.bulbasaur-status::before {
  content: '';
  width: 12px;
  height: 12px;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="%23A1EF8B"/><circle cx="7" cy="8" r="2" fill="%23D31356"/><circle cx="13" cy="8" r="2" fill="%23D31356"/></svg>') no-repeat center;
  background-size: contain;
}

/* CodeMirror specific */
.cm-s-eunitheme {
  background-color: var(--bulbasaur-bg);
  color: var(--bulbasaur-fg);
  font-family: 'Fira Code', 'Consolas', monospace;
  position: relative;
}

.cm-s-eunitheme::before {
  content: '';
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="%23A1EF8B" opacity="0.3"/><circle cx="7" cy="8" r="1.5" fill="%23D31356" opacity="0.5"/><circle cx="13" cy="8" r="1.5" fill="%23D31356" opacity="0.5"/></svg>') no-repeat center;
  background-size: contain;
  opacity: 0.5;
  pointer-events: none;
}

.cm-s-eunitheme .cm-comment {
  color: var(--bulbasaur-comment);
  font-style: italic;
}

.cm-s-eunitheme .cm-keyword {
  color: var(--bulbasaur-keyword);
  font-weight: bold;
}

.cm-s-eunitheme .cm-string {
  color: var(--bulbasaur-string);
}

.cm-s-eunitheme .cm-number {
  color: var(--bulbasaur-number);
}

.cm-s-eunitheme .cm-variable {
  color: var(--bulbasaur-variable);
}

.cm-s-eunitheme .cm-def {
  color: var(--bulbasaur-function);
}

.cm-s-eunitheme .cm-operator {
  color: var(--bulbasaur-operator);
}

.cm-s-eunitheme .cm-tag {
  color: var(--bulbasaur-accent);
}

.cm-s-eunitheme .cm-attribute {
  color: var(--bulbasaur-class);
}

/* Selection and cursor */
.cm-s-eunitheme .cm-cursor {
  border-left: 2px solid var(--bulbasaur-accent);
}

.cm-s-eunitheme .cm-selection {
  background-color: rgba(211, 19, 86, 0.3);
}

/* Monaco Editor specific */
.monaco-editor.vs-dark {
  background-color: var(--bulbasaur-bg) !important;
  color: var(--bulbasaur-fg) !important;
  position: relative;
}

.monaco-editor.vs-dark::after {
  content: '';
  position: absolute;
  top: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><ellipse cx="20" cy="25" rx="15" ry="12" fill="%23A1EF8B" opacity="0.2"/><circle cx="15" cy="20" r="3" fill="%23D31356" opacity="0.4"/><circle cx="25" cy="20" r="3" fill="%23D31356" opacity="0.4"/><path d="M15 30 Q20 35 25 30" stroke="%23A1EF8B" stroke-width="2" fill="none" opacity="0.5"/></svg>') no-repeat center;
  background-size: contain;
  opacity: 0.3;
  pointer-events: none;
  z-index: 1;
}

.monaco-editor.vs-dark .token.comment {
  color: var(--bulbasaur-comment) !important;
  font-style: italic !important;
}

.monaco-editor.vs-dark .token.keyword {
  color: var(--bulbasaur-keyword) !important;
  font-weight: bold !important;
}

.monaco-editor.vs-dark .token.string {
  color: var(--bulbasaur-string) !important;
}

.monaco-editor.vs-dark .token.number {
  color: var(--bulbasaur-number) !important;
}

.monaco-editor.vs-dark .token.identifier {
  color: var(--bulbasaur-variable) !important;
}

.monaco-editor.vs-dark .token.function {
  color: var(--bulbasaur-function) !important;
}

.monaco-editor.vs-dark .token.class {
  color: var(--bulbasaur-class) !important;
}

.monaco-editor.vs-dark .token.operator {
  color: var(--bulbasaur-operator) !important;
}

/* Bulbasaur loading animation */
.bulbasaur-loading {
  display: inline-block;
  width: 40px;
  height: 40px;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><ellipse cx="20" cy="25" rx="15" ry="12" fill="%231e2720"/><ellipse cx="20" cy="15" rx="10" ry="8" fill="%23A1EF8B"/><circle cx="15" cy="12" r="2" fill="%23ffffff"/><circle cx="25" cy="12" r="2" fill="%23ffffff"/><circle cx="15" cy="12" r="1" fill="%23000000"/><circle cx="25" cy="12" r="1" fill="%23000000"/><circle cx="12" cy="18" r="1.5" fill="%23D31356"/><circle cx="28" cy="18" r="1.5" fill="%23D31356"/><path d="M17 22 Q20 25 23 22" stroke="%23000000" stroke-width="1" fill="none"/></svg>') no-repeat center;
  background-size: contain;
  animation: walk 2s linear infinite;
}

@keyframes walk {
  0% { transform: translateX(-5px) rotate(-5deg); }
  50% { transform: translateX(5px) rotate(5deg); }
  100% { transform: translateX(-5px) rotate(-5deg); }
}
`;

    fs.writeFileSync(
      path.join(this.outputDir, 'eunitheme-bulbasaur-web.css'),
      css
    );
  }

  generateAll() {
    this.generateSublimeTheme();
    this.generateAtomTheme();
    this.generateVimTheme();
    this.generateJetBrainsTheme();
    this.generateWebTheme();
  }
}

// CLI interface
if (require.main === module) {
  const adapter = new ThemeAdapter();
  
  const command = process.argv[2];
  
  if (!command || command === 'all') {
    adapter.generateAll();
  } else {
    switch (command) {
      case 'sublime':
        adapter.generateSublimeTheme();
        break;
      case 'atom':
        adapter.generateAtomTheme();
        break;
      case 'vim':
        adapter.generateVimTheme();
        break;
      case 'jetbrains':
        adapter.generateJetBrainsTheme();
        break;
      case 'web':
        adapter.generateWebTheme();
        break;
      default:
        process.exit(1);
    }
  }
}

module.exports = ThemeAdapter;
