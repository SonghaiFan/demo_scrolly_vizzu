# Declarative Story Creation Guide

## Overview

This guide explains the new declarative approach to creating scrollytelling visualizations with Vizzu. Instead of managing separate HTML, CSS, and JavaScript files, everything is now centralized in a single configuration file (`story-config.js`).

## Key Benefits

1. **Single Source of Truth**: All story content, animations, and structure in one place
2. **No Mismatches**: Text content and chart animations are always in sync
3. **Easy Maintenance**: Change content or animations without touching multiple files
4. **Declarative**: Describe what you want, not how to implement it
5. **Reusable**: Story configuration can be easily modified or extended

## File Structure

```
prototype/
├── js/
│   ├── main.js              # Main application logic
│   └── story-config.js      # Story configuration (single source of truth)
├── template.html            # HTML template
├── generate-html.js         # HTML generator script
└── index.html              # Generated HTML (auto-generated)
```

## Story Configuration Structure

The `story-config.js` file contains everything needed to create the story:

### Global Configuration

```javascript
export const storyConfig = {
  // Global styling for all charts
  globalStyle: {
    fontFamily: "Raleway",
    plot: {
      xAxis: { label: { fontSize: 9, angle: 2.0 } },
      marker: {
        colorPalette: "#b74c20FF #c47f58FF #1c9761FF...",
      },
    },
  },
  
  // Story chapters and steps
  chapters: [...]
};
```

### Chapter Types

#### 1. Text Chapters (`type: "chapter"`)
Simple text sections with title and content:

```javascript
{
  id: "intro",
  type: "chapter",
  title: "The Evolution of Music Formats 1973-2020 📀🎵",
  content: "From vinyl records to streaming services...",
  scrollIndicator: "Scroll to explore...", // Optional
  footer: "🎵📀💿🎧" // Optional
}
```

#### 2. Scrollytelling Chapters (`type: "scrolly"`)
Interactive sections with charts and step-by-step animations:

```javascript
{
  id: "chart1",
  type: "scrolly",
  chartId: "fig1",           // HTML element ID for the chart
  layout: "side",            // "side" or "overlay"
  steps: [
    {
      id: "step1",
      content: "The 1970s marked the peak of vinyl dominance...",
      animation: {
        config: {
          title: "Music Revenue by Format 1973-2020",
          x: "Year",
          y: ["Format", "Revenue [m$]"],
          color: "Format",
          geometry: "area",
          align: "center",
        }
      }
    }
  ]
}
```

## Creating Your Story

### Step 1: Define Chapters

Start by defining your story structure:

```javascript
chapters: [
  {
    id: "intro",
    type: "chapter",
    title: "Your Story Title",
    content: "Introduction text..."
  },
  {
    id: "first-chart",
    type: "scrolly",
    chartId: "fig1",
    layout: "side",
    steps: [...]
  }
]
```

### Step 2: Define Steps

For each scrollytelling chapter, define the steps:

```javascript
steps: [
  {
    id: "step1",
    content: "This text appears when the user scrolls to this step",
    animation: {
      config: {
        title: "Chart Title",
        x: "Year",
        y: ["Format", "Revenue [m$]"],
        geometry: "area"
      },
      data: {
        filter: (record) => record.Format === "Vinyl" // Optional filter
      },
      style: {
        // Optional custom styling for this step
      }
    }
  }
]
```

### Step 3: Define Animations

Each step can have different animation configurations:

#### Basic Animation
```javascript
animation: {
  config: {
    title: "New Title",
    geometry: "line"
  }
}
```

#### Data Filtering
```javascript
animation: {
  data: {
    filter: (record) => record.Format === "Vinyl" || record.Format === "Streaming"
  },
  config: {
    title: "Filtered View"
  }
}
```

#### Complex Configuration
```javascript
animation: {
  config: {
    channels: {
      x: { set: ["Revenue [m$]", "Year"] },
      y: { detach: ["Revenue [m$]"] },
    },
    geometry: "rectangle",
    split: false,
  },
  style: {
    plot: {
      yAxis: { label: { fontSize: 10 } }
    }
  }
}
```

## Animation Configuration Options

### Chart Types
- `geometry: "area"` - Area chart
- `geometry: "line"` - Line chart  
- `geometry: "rectangle"` - Bar chart

### Alignments
- `align: "center"` - Standard alignment
- `align: "stretch"` - 100% stacked
- `align: "none"` - No alignment

### Data Filtering
```javascript
data: {
  filter: (record) => {
    // Return true to include, false to exclude
    return record.Format === "Vinyl";
  }
}
```

### Channel Configuration
```javascript
channels: {
  x: { set: ["Year"] },           // Set x-axis
  y: { set: ["Revenue [m$]"] },   // Set y-axis
  color: { set: ["Format"] },     // Set color
  label: { attach: ["Revenue [m$]"] } // Add labels
}
```

## Workflow

### 1. Edit Story Configuration
Modify `js/story-config.js` to change content, animations, or structure.

### 2. Generate HTML
Run the generator to create the HTML:

```bash
node generate-html.js
```

### 3. Test and Iterate
Open `index.html` in your browser to see the changes.

## Best Practices

### 1. Story Structure
- Start with an introduction chapter
- Use scrollytelling chapters for interactive visualizations
- End with a conclusion chapter
- Keep related content together

### 2. Step Progression
- Each step should build on the previous
- Use progressive disclosure (overview → details → focus)
- Return to full context periodically
- Vary chart types for visual interest

### 3. Animation Design
- Start with simple configurations
- Use filters to focus attention
- Change geometry types for different insights
- Keep animations smooth and logical

### 4. Content Writing
- Write clear, engaging text
- Keep steps concise but informative
- Connect text to visual changes
- Use consistent tone and style

## Advanced Features

### Custom Styling
Override global styles for specific steps:

```javascript
animation: {
  config: { ... },
  style: {
    plot: {
      marker: { label: { fontSize: 12 } }
    }
  }
}
```

### Complex Data Filtering
```javascript
data: {
  filter: (record) => {
    return record.Year >= 2000 && 
           (record.Format === "Streaming" || record.Format === "Download");
  }
}
```

### Multiple Chart Types
```javascript
// Area chart
animation: { config: { geometry: "area" } }

// Line chart  
animation: { config: { geometry: "line" } }

// Bar chart
animation: { config: { geometry: "rectangle" } }
```

## Troubleshooting

### Common Issues

1. **Chart not updating**: Check that `chartId` matches HTML element ID
2. **Animation not working**: Verify animation configuration syntax
3. **Text not syncing**: Ensure step content matches animation intent
4. **Layout issues**: Check `layout` property ("side" vs "overlay")

### Debugging Tips

1. Check browser console for JavaScript errors
2. Verify story configuration syntax
3. Test individual animations
4. Check HTML generation output

## Extending the System

### Adding New Chart Types
1. Add new geometry types to Vizzu configuration
2. Update story configuration with new options
3. Test with different data types

### Adding New Layouts
1. Create new CSS classes for layouts
2. Update `generateScrollyHTML()` function
3. Add layout options to story configuration

### Adding New Features
1. Extend story configuration structure
2. Update HTML generation functions
3. Modify main.js to handle new features

This declarative approach makes story creation much more intuitive and maintainable, allowing you to focus on the content and narrative rather than implementation details. 