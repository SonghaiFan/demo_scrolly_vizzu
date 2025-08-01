import { StoryBuilder } from "./StoryBuilder.js";
import { AnimationManager } from "./AnimationManager.js";
import { ScrollManager } from "./ScrollManager.js";
import { StyleManager } from "./utils/StyleManager.js";

export class ScrollyVizzu {
  constructor(options = {}) {
    this.options = {
      container: "#app",
      data: null,
      theme: "default",
      navigation: true,
      debug: false,
      offset: 0.5,
      ...options,
    };

    this.container = null;
    this.story = null;
    this.animationManager = null;
    this.scrollManager = null;
    this.styleManager = null;
    this.charts = new Map();
    this.steps = [];
    this.currentStep = 0;

    this.init();
  }

  init() {
    this.container = document.querySelector(this.options.container);
    if (!this.container) {
      throw new Error(`Container ${this.options.container} not found`);
    }

    this.styleManager = new StyleManager(this.options.theme);
    this.animationManager = new AnimationManager(this);
    this.scrollManager = new ScrollManager(this.options);
    this.story = new StoryBuilder(this);

    this.setupEventListeners();
  }

  setupEventListeners() {
    window.addEventListener("resize", this.handleResize.bind(this));
    this.scrollManager.onStepEnter(this.handleStepEnter.bind(this));
  }

  handleResize() {
    this.scrollManager.resize();
    this.charts.forEach((chart) => {
      if (chart.instance) {
        chart.instance.resize();
      }
    });
  }

  handleStepEnter({ element, direction, index }) {
    this.currentStep = index;
    this.animationManager.triggerStep(index, this.steps[index]);
  }

  // Public API methods
  chapter(title, options = {}) {
    return this.story.addChapter(title, options);
  }

  step(content, options = {}) {
    return this.story.addStep(content, options);
  }

  chart(config, options = {}) {
    return this.story.addChart(config, options);
  }

  build() {
    this.story.build();
    this.scrollManager.setup();
    return this;
  }

  // Utility methods
  getChart(id) {
    return this.charts.get(id);
  }

  updateData(newData) {
    this.options.data = newData;
    this.charts.forEach((chart) => {
      if (chart.instance) {
        chart.instance.animate({ data: newData });
      }
    });
  }

  destroy() {
    this.charts.forEach((chart) => {
      if (chart.instance) {
        chart.instance.disconnect();
      }
    });
    this.scrollManager.destroy();
    this.charts.clear();
  }
}

// Export for global use
if (typeof window !== "undefined") {
  window.ScrollyVizzu = ScrollyVizzu;
}
