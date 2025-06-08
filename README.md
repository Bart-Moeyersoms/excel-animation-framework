# 🎬 Excel Animation Framework

A powerful framework for creating interactive, animated Excel tutorials with multi-language support and export capabilities.

## ✨ Features

- 🌍 **Multi-language support** (Dutch, English, French)
- 🎨 **Multiple themes** (Excel 2019, Excel 365, Google Sheets)
- 🖱️ **Realistic mouse simulation**
- 📤 **Export to GIF/MP4**
- 🔧 **Modular animation system**
- 📱 **Responsive design**

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/excel-animation-framework.git
cd excel-animation-framework

# Install dependencies
npm install

# Start development server
npm start
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── framework/          # Core framework components
│   ├── scenarios/          # Predefined animation scenarios
│   └── ui/                # UI components
├── themes/                # Theme definitions
├── translations/          # Language files
├── types/                 # TypeScript type definitions
└── utils/                 # Utility functions
```

## 🎯 Creating New Scenarios

```typescript
// Example: Creating a SUM formula scenario
const sumScenario = {
  id: 'sum_formula',
  steps: [
    {
      description: 'Click on cell D2',
      actions: [
        { type: 'selectCell', cell: 'D2' },
        { type: 'typeText', text: '=SUM(A2:C2)' }
      ]
    }
  ]
};
```

## 🌍 Adding Translations

```typescript
// translations/es.ts
export const es = {
  student: 'Estudiante',
  grade: 'Nota',
  result: 'Resultado',
  // ... more translations
};
```

## 🎨 Creating Themes

```typescript
// themes/customTheme.ts
export const customTheme = {
  headerBg: '#your-color',
  cellBorder: '#your-border-color',
  selectedBg: '#your-selection-color',
  // ... more theme properties
};
```

## 📤 Export Options

- **GIF**: Perfect for embedding in documentation
- **MP4**: High quality for video tutorials
- **Interactive HTML**: For web-based training

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📋 Roadmap

- [ ] Visual scenario editor
- [ ] More spreadsheet functions (VLOOKUP, PIVOT, etc.)
- [ ] Advanced mouse movements
- [ ] PowerPoint integration
- [ ] Mobile app support

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Use Cases

- 📚 Training materials
- 📖 Documentation
- 🎥 Tutorial videos
- 🌐 Interactive websites
- 📱 Mobile learning apps

## 🔧 Tech Stack

- **React** + **TypeScript**
- **HTML5 Canvas** for animations
- **GIF.js** for GIF export
- **HTML2Canvas** for screenshots

---

Made with ❤️ for better Excel education