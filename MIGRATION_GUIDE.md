# Migration Guide: From Current Implementation to ScrollyVizzu Library

This guide helps you migrate from your current scrollytelling implementation to the new ScrollyVizzu library.

## Before vs After Comparison

### Current Implementation (Before)

```javascript
// main.js - Current approach
import Vizzu from "https://cdn.jsdelivr.net/npm/vizzu@0.3.1/dist/vizzu.min.js";
import musicData from "../data/data.js";

// Manual chart initialization
let chart1 = new Vizzu("fig1", { data: musicData });
let chart2 = new Vizzu("fig2", { data: musicData });
let chart3 = new Vizzu("fig3", { data: musicData });

// Manual scrollama setup
const scroller = scrollama();
scroller.setup({
  step: ":is(.chapter,.step)",
  offset: 0.5,
  debug: true,
});

// Manual step trigger function
function stepTrigger(index) {
  switch (index) {
    case 0:
      chart1.animate({
        style: { fontFamily: "Raleway" },
        config: {
          title: "Music Revenue by Format 1973-2020",
          x: "Year",
          y: ["Format", "Revenue [m$]"],
          color: "Format",
          geometry: "area",
          align: "center",
        },
      });
      break;
    case 1:
      chart1.animate({
        config: {
          channels: {
            x: { set: ["Year"] },
            y: { set: ["Revenue [m$]", "Format"] },
            color: { set: ["Format"] },
          },
          title: "Music Revenue by Format (1973-2020)",
          geometry: "rectangle",
          split: false,
        },
      });
      break;
    // ... more cases
  }
}

// Manual event handling
function handleStepEnter({ element, direction, index }) {
  steps.classed("is-active", false);
  d3.select(element).classed("is-active", true);
  stepTrigger(index);
}

scroller.onStepEnter(handleStepEnter);
```

### New ScrollyVizzu Library (After)

```javascript
// main.js - New approach
import { ScrollyVizzu } from './src/lib/ScrollyVizzu.js';
import musicData from "../data/data.js";

// Declarative story building
const story = new ScrollyVizzu({
  container: '#app',
  data: musicData,
  theme: 'modern',
  navigation: true
});

story
  .chapter('The Golden Age of Vinyl 📀', {
    content: 'In the 1970s, vinyl records dominated the music industry...',
    layout: 'side'
  })
  .step('The 1970s marked the peak of vinyl dominance...', {
    chart: {
      config: {
        title: 'Music Revenue by Format 1973-2020',
        x: 'Year',
        y: ['Format', 'Revenue [m$]'],
        color: 'Format',
        geometry: 'area',
        align: 'center'
      },
      style: {
        fontFamily: 'Raleway'
      }
    }
  })
  .step('As we move into the 1980s...', {
    chart: {
      config: {
        channels: {
          x: { set: ['Year'] },
          y: { set: ['Revenue [m$]', 'Format'] },
          color: { set: ['Format'] }
        },
        title: 'Music Revenue by Format (1973-2020)',
        geometry: 'rectangle',
        split: false
      }
    }
  })
  .build();
```

## Step-by-Step Migration

### 1. Update HTML Structure

**Before:**
```html
<div class="chapter intro">
  <h1>The Evolution of Music Formats</h1>
  <p>From vinyl records to streaming services...</p>
</div>

<div class="scrolly side">
  <article>
    <div class="step">
      <p>The 1970s marked the peak...</p>
    </div>
    <div class="step">
      <p>As we move into the 1980s...</p>
    </div>
  </article>
  <div id="fig1" class="figure">
    <p>0</p>
  </div>
</div>
```

**After:**
```html
<div id="app"></div>
<!-- The library will generate all HTML automatically -->
```

### 2. Replace JavaScript Logic

**Before:**
```javascript
// Manual initialization
let chart1 = new Vizzu("fig1", { data: musicData });
let chart2 = new Vizzu("fig2", { data: musicData });
let chart3 = new Vizzu("fig3", { data: musicData });

// Manual scrollama setup
const scroller = scrollama();
scroller.setup({
  step: ":is(.chapter,.step)",
  offset: 0.5,
  debug: true,
});
```

**After:**
```javascript
// Single library initialization
const story = new ScrollyVizzu({
  container: '#app',
  data: musicData,
  theme: 'modern',
  navigation: true
});
```

### 3. Convert Step Triggers

**Before:**
```javascript
function stepTrigger(index) {
  switch (index) {
    case 0:
      chart1.animate({
        style: { fontFamily: "Raleway" },
        config: {
          title: "Music Revenue by Format 1973-2020",
          x: "Year",
          y: ["Format", "Revenue [m$]"],
          color: "Format",
          geometry: "area",
          align: "center",
        },
      });
      break;
    case 1:
      chart1.animate({
        config: {
          channels: {
            x: { set: ["Year"] },
            y: { set: ["Revenue [m$]", "Format"] },
            color: { set: ["Format"] },
          },
          title: "Music Revenue by Format (1973-2020)",
          geometry: "rectangle",
          split: false,
        },
      });
      break;
  }
}
```

**After:**
```javascript
story
  .step('The 1970s marked the peak...', {
    chart: {
      config: {
        title: 'Music Revenue by Format 1973-2020',
        x: 'Year',
        y: ['Format', 'Revenue [m$]'],
        color: 'Format',
        geometry: 'area',
        align: 'center'
      },
      style: {
        fontFamily: 'Raleway'
      }
    }
  })
  .step('As we move into the 1980s...', {
    chart: {
      config: {
        channels: {
          x: { set: ['Year'] },
          y: { set: ['Revenue [m$]', 'Format'] },
          color: { set: ['Format'] }
        },
        title: 'Music Revenue by Format (1973-2020)',
        geometry: 'rectangle',
        split: false
      }
    }
  });
```

### 4. Handle Event Listeners

**Before:**
```javascript
function handleStepEnter({ element, direction, index }) {
  steps.classed("is-active", false);
  d3.select(element).classed("is-active", true);
  figures.select("p").text(index);
  stepTrigger(index);
}

scroller.onStepEnter(handleStepEnter);
```

**After:**
```javascript
// Events are handled automatically by the library
// Optional: Add custom event listeners
story.onStepEnter((response) => {
  console.log('Entered step:', response.index);
});
```

### 5. Update CSS

**Before:**
```css
/* Manual CSS management */
.chapter {
  min-height: 75vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
}

.scrolly {
  position: relative;
  display: flex;
  background-color: #fafafa;
  padding: 0;
  max-width: 1400px;
  margin: 0 auto;
}
```

**After:**
```javascript
// CSS is handled by themes
const story = new ScrollyVizzu({
  theme: 'modern' // or 'default', 'dark', 'minimal'
});

// Optional: Add custom styles
story.styleManager.addCustomStyles(`
  .chapter {
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  }
`);
```

## Migration Checklist

- [ ] Install ScrollyVizzu library
- [ ] Replace HTML structure with single container
- [ ] Convert manual chart initialization to library initialization
- [ ] Transform stepTrigger function to declarative step definitions
- [ ] Replace manual scrollama setup with library configuration
- [ ] Update CSS to use built-in themes
- [ ] Test all animations and interactions
- [ ] Remove old manual event handlers
- [ ] Update any custom styling to use theme system

## Benefits of Migration

1. **Reduced Code**: ~70% less code to maintain
2. **Better Organization**: Declarative structure is easier to understand
3. **Built-in Features**: Navigation, themes, and responsive design included
4. **Type Safety**: Full TypeScript support
5. **Performance**: Optimized chart lifecycle management
6. **Maintainability**: Centralized configuration and easier debugging

## Common Migration Issues

### Issue: Charts not animating
**Solution:** Ensure chart configurations are properly nested under the `chart` property in step definitions.

### Issue: Styling conflicts
**Solution:** Remove old CSS files and rely on built-in themes, or use `addCustomStyles()` for specific overrides.

### Issue: Navigation not working
**Solution:** Ensure `navigation: true` is set in the library configuration.

### Issue: Responsive issues
**Solution:** The library handles responsive design automatically. Remove any custom responsive CSS that might conflict.

## Need Help?

If you encounter issues during migration:

1. Check the [API Reference](README.md#api-reference)
2. Review the [examples](examples/) directory
3. Open an issue on GitHub with your specific problem
4. Compare your implementation with the provided examples 