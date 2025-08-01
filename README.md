# ScrollyVizzu Project

This repository contains the **ScrollyVizzu** JavaScript library for creating scrollytelling data visualizations with Vizzu charts, along with a demo showcasing its capabilities.

## 📁 Project Structure

```
demo_scrolly_vizzu/
├── src/                    # Library source code
│   ├── index.js           # Main entry point
│   ├── ScrollyVizzu.js    # Core library class
│   ├── StoryBuilder.js    # Story construction logic
│   ├── AnimationManager.js # Chart animation management
│   ├── ScrollManager.js   # Scroll event handling
│   └── utils/
│       └── StyleManager.js # Theme and styling management
├── dist/                   # Built library files
│   ├── scrolly-vizzu.umd.js
│   ├── scrolly-vizzu.esm.js
│   └── scrolly-vizzu.min.js
├── demo/                   # Demo application
│   ├── index.html         # Demo HTML file
│   └── data/              # Sample data
├── package.json           # Library package configuration
├── rollup.config.js       # Build configuration
└── README.md              # This file
```

## 🚀 Quick Start

### For Library Users

The ScrollyVizzu library is designed to be used as a dependency in other projects. See the [Library Documentation](src/README.md) for detailed usage instructions.

### For Demo/Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the library:**
   ```bash
   npm run build
   ```

3. **Run the demo:**
   ```bash
   # Start a local server
   python3 -m http.server 8000
   # or
   npx serve .
   ```

4. **Open the demo:**
   - Navigate to `http://localhost:8000/demo/`
   - View the scrollytelling story in action

## 📖 Library Features

- **Declarative API**: Build complex scrollytelling stories with simple, chainable methods
- **Vizzu Integration**: Seamless integration with Vizzu's animated charts
- **Multiple Themes**: Built-in themes (default, modern, dark, minimal) with easy customization
- **Responsive Design**: Automatically adapts to different screen sizes
- **Navigation**: Built-in navigation with progress indicators
- **Animation Presets**: Pre-built animation sequences for common chart transitions
- **Lightweight**: Minimal bundle size with external dependencies

## 🔧 Development

### Building the Library

```bash
npm run build
```

This creates three versions of the library:
- `dist/scrolly-vizzu.umd.js` - Universal Module Definition (for browsers)
- `dist/scrolly-vizzu.esm.js` - ES Module (for modern bundlers)
- `dist/scrolly-vizzu.min.js` - Minified UMD (for CDN usage)

### Development Mode

```bash
npm run dev
```

This watches for changes and rebuilds automatically.

## 📦 Publishing

The library is designed to be published to npm and available via CDN:

- **npm**: `npm install scrolly-vizzu`
- **CDN**: `https://unpkg.com/scrolly-vizzu@latest/dist/scrolly-vizzu.min.js`

## 🎯 Demo

The demo showcases a complete scrollytelling story about the evolution of vinyl records in the music industry. It demonstrates:

- Chapter and step creation
- Chart animations and transitions
- Custom styling and themes
- Responsive design
- Navigation features

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

Made with ❤️ by Songhai Fan
