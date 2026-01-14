#!/usr/bin/env node

/**
 * Nested Colors System for EuniTheme Bulbasaur
 * Creates different colors for nested properties like objeto.propiedad.propiedad
 */

const fs = require('fs');
const path = require('path');

class NestedColorsSystem {
  constructor() {
    this.outputDir = path.join(__dirname, 'dist');
    this.ensureOutputDir();
  }

  ensureOutputDir() {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  // Generate nested color levels
  generateNestedColors() {
    const colors = {
      // Nivel 1 - Propiedades principales
      level1: {
        variable: '#A1E3A1',      // Verde suave original
        function: '#ECE180',      // Amarillo suave
        property: '#A3D377',     // Verde menta
        keyword: '#ecdf94e1',   // Amarillo verdoso
        class: '#dfa9ffe7',     // Púrpura suave
        string: '#A3D377',      // Verde menta
        number: '#F7AA6C',      // Naranja suave
        operator: '#F26C6C'     // Rojo suave
      },
      
      // Nivel 2 - Segundo nivel de anidación
      level2: {
        variable: '#8FBC8F',      // Verde salvia
        function: '#FFD93D',     // Amarillo brillante
        property: '#61ffcaee',   // Cyan brillante
        keyword: '#9BEBC4',     // Verde menta
        class: '#C77DFF',       // Púrpura brillante
        string: '#98FB98',      // Verde pálido
        number: '#FF9F40',      // Naranja brillante
        operator: '#FF6B6B'     // Rojo brillante
      },
      
      // Nivel 3 - Tercer nivel de anidación
      level3: {
        variable: '#6B8E23',      // Verde bosque
        function: '#FFA500',     // Naranja oscuro
        property: '#4ECDC4',     // Cyan brillante
        keyword: '#00CED1',     // Turquesa
        class: '#9370DB',       // Púrpura medio
        string: '#90EE90',      // Verde claro
        number: '#FF8C00',      // Naranja oscuro
        operator: '#DC143C'     // Rojo oscuro
      },
      
      // Nivel 4+ - Cuarto nivel y más (reinicia ciclo)
      level4: {
        variable: '#A1E3A1',      // Vuelve al nivel 1
        function: '#ECE180',      // Vuelve al nivel 1
        property: '#A3D377',     // Vuelve al nivel 1
        keyword: '#ecdf94e1',   // Vuelve al nivel 1
        class: '#dfa9ffe7',     // Vuelve al nivel 1
        string: '#A3D377',      // Vuelve al nivel 1
        number: '#F7AA6C',      // Vuelve al nivel 1
        operator: '#F26C6C'     // Vuelve al nivel 1
      }
    };

    return colors;
  }

  // Generate CSS for nested colors
  generateNestedCSS() {
    const colors = this.generateNestedColors();
    
    const css = `/* EuniTheme Bulbasaur - Nested Colors System */

/* Nivel 1 - Propiedades principales */
.variable-level-1 { color: ${colors.level1.variable} !important; }
.function-level-1 { color: ${colors.level1.function} !important; }
.property-level-1 { color: ${colors.level1.property} !important; }
.keyword-level-1 { color: ${colors.level1.keyword} !important; }
.class-level-1 { color: ${colors.level1.class} !important; }
.string-level-1 { color: ${colors.level1.string} !important; }
.number-level-1 { color: ${colors.level1.number} !important; }
.operator-level-1 { color: ${colors.level1.operator} !important; }

/* Nivel 2 - Segundo nivel de anidación */
.variable-level-2 { color: ${colors.level2.variable} !important; }
.function-level-2 { color: ${colors.level2.function} !important; }
.property-level-2 { color: ${colors.level2.property} !important; }
.keyword-level-2 { color: ${colors.level2.keyword} !important; }
.class-level-2 { color: ${colors.level2.class} !important; }
.string-level-2 { color: ${colors.level2.string} !important; }
.number-level-2 { color: ${colors.level2.number} !important; }
.operator-level-2 { color: ${colors.level2.operator} !important; }

/* Nivel 3 - Tercer nivel de anidación */
.variable-level-3 { color: ${colors.level3.variable} !important; }
.function-level-3 { color: ${colors.level3.function} !important; }
.property-level-3 { color: ${colors.level3.property} !important; }
.keyword-level-3 { color: ${colors.level3.keyword} !important; }
.class-level-3 { color: ${colors.level3.class} !important; }
.string-level-3 { color: ${colors.level3.string} !important; }
.number-level-3 { color: ${colors.level3.number} !important; }
.operator-level-3 { color: ${colors.level3.operator} !important; }

/* Nivel 4+ - Reinicia ciclo (vuelve al nivel 1) */
.variable-level-4 { color: ${colors.level4.variable} !important; }
.function-level-4 { color: ${colors.level4.function} !important; }
.property-level-4 { color: ${colors.level4.property} !important; }
.keyword-level-4 { color: ${colors.level4.keyword} !important; }
.class-level-4 { color: ${colors.level4.class} !important; }
.string-level-4 { color: ${colors.level4.string} !important; }
.number-level-4 { color: ${colors.level4.number} !important; }
.operator-level-4 { color: ${colors.level4.operator} !important; }

/* Aplicación automática por profundidad */
/* objeto.propiedad (nivel 1) */
.object-property-1,
.meta.property-access .variable {
  color: ${colors.level1.variable} !important;
}

/* objeto.propiedad.propiedad (nivel 2) */
.object-property-2,
.meta.property-access .meta.property-access .variable {
  color: ${colors.level2.variable} !important;
}

/* objeto.propiedad.propiedad.propiedad (nivel 3) */
.object-property-3,
.meta.property-access .meta.property-access .meta.property-access .variable {
  color: ${colors.level3.variable} !important;
}

/* objeto.propiedad.propiedad.propiedad.propiedad (nivel 4+) */
.object-property-4,
.meta.property-access .meta.property-access .meta.property-access .meta.property-access .variable {
  color: ${colors.level4.variable} !important;
}

/* Funciones anidadas */
.function-call-1 .entity.name.function { color: ${colors.level1.function} !important; }
.function-call-2 .entity.name.function { color: ${colors.level2.function} !important; }
.function-call-3 .entity.name.function { color: ${colors.level3.function} !important; }
.function-call-4 .entity.name.function { color: ${colors.level4.function} !important; }

/* Clases anidadas */
.entity.name.class-1 { color: ${colors.level1.class} !important; }
.entity.name.class-2 { color: ${colors.level2.class} !important; }
.entity.name.class-3 { color: ${colors.level3.class} !important; }
.entity.name.class-4 { color: ${colors.level4.class} !important; }

/* Cadenas anidadas */
.string-1 { color: ${colors.level1.string} !important; }
.string-2 { color: ${colors.level2.string} !important; }
.string-3 { color: ${colors.level3.string} !important; }
.string-4 { color: ${colors.level4.string} !important; }

/* Transiciones suaves entre niveles */
.variable-level-1,
.variable-level-2,
.variable-level-3,
.variable-level-4 {
  transition: color 0.3s ease;
}

.function-level-1,
.function-level-2,
.function-level-3,
.function-level-4 {
  transition: color 0.3s ease;
}

.property-level-1,
.property-level-2,
.property-level-3,
.property-level-4 {
  transition: color 0.3s ease;
}

/* Indicador visual de nivel */
.nested-indicator::before {
  content: '';
  position: absolute;
  left: -2px;
  top: 0;
  width: 2px;
  height: 100%;
  background: currentColor;
  opacity: 0.3;
}

.variable-level-1 .nested-indicator::before { background: ${colors.level1.variable}; }
.variable-level-2 .nested-indicator::before { background: ${colors.level2.variable}; }
.variable-level-3 .nested-indicator::before { background: ${colors.level3.variable}; }
.variable-level-4 .nested-indicator::before { background: ${colors.level4.variable}; }
`;

    fs.writeFileSync(path.join(this.outputDir, 'nested-colors.css'), css);
  }

  // Generate VS Code theme with nested colors
  generateNestedTheme() {
    const colors = this.generateNestedColors();
    
    const theme = {
      name: "EuniTheme Bulbasaur Nested",
      colors: {
        "editor.background": "#1e2720",
        "editor.foreground": "#e6e9e9",
        "activityBarBadge.background": "#a51044",
        "sideBarTitle.foreground": "#bbbbbb",
        "statusBar.background": "#D31356",
        "statusBar.foreground": "#e6e9e9",
        "sideBar.background": "#153122"
      },
      tokenColors: [
        // Nivel 1
        {
          name: "Variable Level 1",
          scope: ["variable", "variable.other"],
          settings: { foreground: colors.level1.variable }
        },
        {
          name: "Function Level 1", 
          scope: ["entity.name.function", "support.function"],
          settings: { foreground: colors.level1.function }
        },
        {
          name: "Property Level 1",
          scope: ["support.type.property-name"],
          settings: { foreground: colors.level1.property }
        },
        {
          name: "Class Level 1",
          scope: ["entity.name.class", "support.class"],
          settings: { foreground: colors.level1.class }
        },
        {
          name: "String Level 1",
          scope: ["string"],
          settings: { foreground: colors.level1.string }
        },
        
        // Nivel 2
        {
          name: "Variable Level 2",
          scope: ["meta.property-access variable", "object.property-1 variable"],
          settings: { foreground: colors.level2.variable }
        },
        {
          name: "Function Level 2",
          scope: ["meta.function-call entity.name.function", "function-call-1 .entity.name.function"],
          settings: { foreground: colors.level2.function }
        },
        {
          name: "Property Level 2", 
          scope: ["meta.property-access support.type.property-name", "object-property-2 support.type.property-name"],
          settings: { foreground: colors.level2.property }
        },
        {
          name: "Class Level 2",
          scope: ["meta.class entity.name.class", "entity.name.class-1"],
          settings: { foreground: colors.level2.class }
        },
        {
          name: "String Level 2",
          scope: ["meta.string string", "string-1"],
          settings: { foreground: colors.level2.string }
        },
        
        // Nivel 3
        {
          name: "Variable Level 3",
          scope: ["meta.property-access meta.property-access variable", "object-property-2 variable"],
          settings: { foreground: colors.level3.variable }
        },
        {
          name: "Function Level 3",
          scope: ["meta.function-call meta.function-call entity.name.function", "function-call-2 .entity.name.function"],
          settings: { foreground: colors.level3.function }
        },
        {
          name: "Property Level 3",
          scope: ["meta.property-access meta.property-access support.type.property-name", "object-property-3 support.type.property-name"],
          settings: { foreground: colors.level3.property }
        },
        {
          name: "Class Level 3",
          scope: ["meta.class meta.class entity.name.class", "entity.name.class-2"],
          settings: { foreground: colors.level3.class }
        },
        {
          name: "String Level 3",
          scope: ["meta.string meta.string string", "string-2"],
          settings: { foreground: colors.level3.string }
        },
        
        // Nivel 4+ (reinicia)
        {
          name: "Variable Level 4+",
          scope: ["meta.property-access meta.property-access meta.property-access variable", "object-property-3 variable"],
          settings: { foreground: colors.level4.variable }
        },
        {
          name: "Function Level 4+",
          scope: ["meta.function-call meta.function-call meta.function-call entity.name.function", "function-call-3 .entity.name.function"],
          settings: { foreground: colors.level4.function }
        },
        {
          name: "Property Level 4+",
          scope: ["meta.property-access meta.property-access meta.property-access support.type.property-name", "object-property-4 support.type.property-name"],
          settings: { foreground: colors.level4.property }
        },
        {
          name: "Class Level 4+",
          scope: ["meta.class meta.class meta.class entity.name.class", "entity.name.class-3"],
          settings: { foreground: colors.level4.class }
        },
        {
          name: "String Level 4+",
          scope: ["meta.string meta.string meta.string string", "string-3"],
          settings: { foreground: colors.level4.string }
        }
      ]
    };

    fs.writeFileSync(
      path.join(this.outputDir, 'EuniTheme-Bulbasaur-Nested-color-theme.json'),
      JSON.stringify(theme, null, 2)
    );
  }

  // Generate demo HTML
  generateNestedDemo() {
    const colors = this.generateNestedColors();
    
    const html = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EuniTheme Bulbasaur - Colores Anidados</title>
    <link rel="stylesheet" href="./nested-colors.css">
    <style>
        body {
            margin: 0;
            padding: 20px;
            background: #1e2720;
            color: #e6e9e9;
            font-family: 'Consolas', 'Monaco', monospace;
            min-height: 100vh;
        }
        
        .demo-container {
            max-width: 900px;
            margin: 0 auto;
        }
        
        h1 {
            color: #A1EF8B;
            text-align: center;
            margin-bottom: 30px;
        }
        
        .level-section {
            margin: 30px 0;
            padding: 20px;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 10px;
            border-left: 4px solid #D31356;
        }
        
        .level-title {
            color: #FFD93D;
            font-size: 18px;
            margin-bottom: 15px;
        }
        
        .code-example {
            background: rgba(0, 0, 0, 0.3);
            padding: 15px;
            border-radius: 5px;
            margin: 10px 0;
            font-family: 'Consolas', monospace;
            position: relative;
        }
        
        .code-example .nested-indicator {
            position: relative;
            padding-left: 15px;
        }
        
        .color-legend {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 10px;
            margin: 20px 0;
        }
        
        .color-item {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 8px;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 5px;
        }
        
        .color-swatch {
            width: 20px;
            height: 20px;
            border-radius: 3px;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
    </style>
</head>
<body>
    <div class="demo-container">
        <h1>🌱 Sistema de Colores Anidados - EUniTheme Bulbasaur</h1>
        
        <div class="level-section">
            <h2 class="level-title">Nivel 1 - Propiedades Principales</h2>
            <div class="code-example">
                <div class="nested-indicator">objeto.propiedad</div>
                <div class="nested-indicator">function nombre()</div>
                <div class="nested-indicator">class NombreClase</div>
            </div>
        </div>
        
        <div class="level-section">
            <h2 class="level-title">Nivel 2 - Segundo Nivel</h2>
            <div class="code-example">
                <div class="nested-indicator">objeto.propiedad.propiedad</div>
                <div class="nested-indicator">objeto.metodo().propiedad</div>
                <div class="nested-indicator">class NombreClase.SubClase</div>
            </div>
        </div>
        
        <div class="level-section">
            <h2 class="level-title">Nivel 3 - Tercer Nivel</h2>
            <div class="code-example">
                <div class="nested-indicator">objeto.propiedad.propiedad.propiedad</div>
                <div class="nested-indicator">objeto.metodo().propiedad.propiedad</div>
                <div class="nested-indicator">class NombreClase.SubClase.SubSubClase</div>
            </div>
        </div>
        
        <div class="level-section">
            <h2 class="level-title">Nivel 4+ - Reinicia Ciclo</h2>
            <div class="code-example">
                <div class="nested-indicator">objeto.propiedad.propiedad.propiedad.propiedad</div>
                <div class="nested-indicator">objeto.metodo().propiedad.propiedad.propiedad</div>
                <div class="nested-indicator">class NombreClase.SubClase.SubSubClase.SubSubSubClase</div>
            </div>
        </div>
        
        <div class="level-section">
            <h2 class="level-title">Paleta de Colores por Nivel</h2>
            <div class="color-legend">
                <div class="color-item">
                    <div class="color-swatch" style="background: ${colors.level1.variable}"></div>
                    <span>Nivel 1 Variable</span>
                </div>
                <div class="color-item">
                    <div class="color-swatch" style="background: ${colors.level2.variable}"></div>
                    <span>Nivel 2 Variable</span>
                </div>
                <div class="color-item">
                    <div class="color-swatch" style="background: ${colors.level3.variable}"></div>
                    <span>Nivel 3 Variable</span>
                </div>
                <div class="color-item">
                    <div class="color-swatch" style="background: ${colors.level4.variable}"></div>
                    <span>Nivel 4+ Variable</span>
                </div>
            </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px; color: #A1EF8B;">
            🎮 Cada nivel de anidación tiene colores diferentes para mejor legibilidad
        </div>
    </div>
</body>
</html>`;

    fs.writeFileSync(path.join(this.outputDir, 'nested-demo.html'), html);
  }

  generateAll() {
    this.generateNestedCSS();
    this.generateNestedTheme();
    this.generateNestedDemo();
  }
}

// CLI interface
if (require.main === module) {
  const system = new NestedColorsSystem();
  system.generateAll();
}

module.exports = NestedColorsSystem;
