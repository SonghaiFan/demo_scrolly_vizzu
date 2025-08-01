# ScrollyVizzu

A lightweight JavaScript library for creating beautiful scrollytelling data visualizations with Vizzu charts. Transform your data stories into engaging, interactive experiences with minimal code.

## ✨ Features

- **Declarative API**: Build complex scrollytelling stories with simple, chainable methods
- **Vizzu Integration**: Seamless integration with Vizzu's animated charts
- **Multiple Themes**: Built-in themes (default, modern, dark, minimal) with easy customization
- **Responsive Design**: Automatically adapts to different screen sizes
- **Navigation**: Built-in navigation with progress indicators
- **Animation Presets**: Pre-built animation sequences for common chart transitions
- **TypeScript Support**: Full TypeScript definitions included
- **Lightweight**: Minimal bundle size with no heavy dependencies

## 🚀 Quick Start

### Installation

```bash
npm install scrolly-vizzu
```

### Basic Usage

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Scrollytelling Story</title>
    <script src="https://unpkg.com/scrollama"></script>
    <script src="https://d3js.org/d3.v7.min.js"></script>
</head>
<body>
    <div id="app"></div>
    
    <script type="module">
        import { ScrollyVizzu } from 'scrolly-vizzu';
        
        const story = new ScrollyVizzu({
            container: '#app',
            data: yourData,
            theme: 'modern'
        });
        
        story
            .chapter('Introduction', {
                content: 'Welcome to our data story!'
            })
            .step('First insight', {
                content: 'Here\'s what the data shows...',
                chart: {
                    config: {
                        title: 'My Chart',
                        x: 'Category',
                        y: 'Value',
                        geometry: 'rectangle'
                    }
                }
            })
            .build();
    </script>
</body>
</html>
```

## 📖 API Reference

### Constructor Options

```javascript
const story = new ScrollyVizzu({
    container: '#app',           // CSS selector for the container
    data: yourData,              // Your data object
    theme: 'modern',             // Theme: 'default', 'modern', 'dark', 'minimal'
    navigation: true,            // Enable/disable navigation
    debug: false,                // Enable debug mode
    offset: 0.5                  // Scrollama offset (0-1)
});
```

### Story Building Methods

#### `.chapter(title, options)`
Creates a new chapter section.

```javascript
story.chapter('My Chapter', {
    content: 'Chapter description...',
    layout: 'side',              // 'side', 'overlay', 'default'
    className: 'custom-class'
});
```

#### `.step(content, options)`
Adds a step to the current chapter.

```javascript
story.step('Step content...', {
    chart: {
        config: {
            title: 'Chart Title',
            x: 'X Axis',
            y: 'Y Axis',
            geometry: 'rectangle'  // 'rectangle', 'area', 'line', 'circle'
        },
        style: {
            fontFamily: 'Arial',
            plot: {
                marker: {
                    colorPalette: '#ff0000 #00ff00 #0000ff'
                }
            }
        }
    }
});
```

#### `.build()`
Finalizes and renders the story.

```javascript
story.build();
```

## 🎨 Themes

### Available Themes

- **default**: Clean, minimal design
- **modern**: Gradient backgrounds with shadows
- **dark**: Dark mode with high contrast
- **minimal**: Ultra-minimal with thin fonts

### Custom Themes

```javascript
// Add custom styles
story.styleManager.addCustomStyles(`
    .chapter {
        background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    }
`);
```

## 📊 Chart Animations

### Built-in Animation Presets

```javascript
// Use predefined animations
AnimationManager.presets.areaToBar(chart);
AnimationManager.presets.barToLine(chart);
AnimationManager.presets.filterData(chart, (record) => record.value > 100);
```

### Custom Animations

```javascript
story.step('Custom animation', {
    chart: {
        config: {
            title: 'Initial State',
            geometry: 'area'
        },
        animation: (chart) => {
            chart.animate({
                config: {
                    geometry: 'rectangle',
                    split: true
                }
            });
        }
    }
});
```

## 📱 Responsive Design

The library automatically handles responsive design:

- **Desktop**: Side-by-side layout with sticky charts
- **Tablet**: Adjusted spacing and font sizes
- **Mobile**: Stacked layout with full-width charts

## 🔧 Advanced Usage

### Data Filtering

```javascript
story.step('Filtered view', {
    chart: {
        data: {
            filter: (record) => record.year >= 2020
        },
        config: {
            title: 'Recent Data'
        }
    }
});
```

### Multiple Charts

```javascript
story
    .step('Chart 1', {
        chart: { config: { title: 'Chart 1' } }
    })
    .step('Chart 2', {
        chart: { config: { title: 'Chart 2' } }
    });
```

### Event Handling

```javascript
story.onStepEnter((response) => {
    console.log('Entered step:', response.index);
});

story.onStepExit((response) => {
    console.log('Exited step:', response.index);
});
```

## 🛠️ Development

### Building from Source

```bash
git clone https://github.com/yourusername/scrolly-vizzu.git
cd scrolly-vizzu
npm install
npm run build
```

### Running Examples

```bash
npm run example
# Open http://localhost:8000
```

### Testing

```bash
npm test
```

## 📦 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Vizzu](https://vizzu.io/) for the amazing chart library
- [Scrollama](https://github.com/russellgoldenberg/scrollama) for scroll-based animations
- [D3.js](https://d3js.org/) for data manipulation utilities

## 📞 Support

- 📧 Email: your.email@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/scrolly-vizzu/issues)
- 📖 Documentation: [Full Documentation](https://yourusername.github.io/scrolly-vizzu)

---

Made with ❤️ by Songhai Fan 