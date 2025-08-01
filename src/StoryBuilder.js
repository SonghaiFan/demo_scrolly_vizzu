export class StoryBuilder {
  constructor(scrollyVizzu) {
    this.scrollyVizzu = scrollyVizzu;
    this.chapters = [];
    this.currentChapter = null;
    this.stepIndex = 0;
  }

  addChapter(title, options = {}) {
    console.log("Adding chapter:", title);

    const chapter = {
      type: "chapter",
      title,
      content: options.content || "",
      layout: options.layout || "default",
      className: options.className || "",
      ...options,
    };

    this.chapters.push(chapter);
    this.currentChapter = chapter;

    console.log("Chapter added, returning scrollyVizzu instance");
    // Return the scrollyVizzu instance for chaining
    return this.scrollyVizzu;
  }

  addStep(content, options = {}) {
    if (!this.currentChapter) {
      throw new Error(
        "Cannot add step without a chapter. Call chapter() first."
      );
    }

    const step = {
      type: "step",
      content,
      chart: options.chart || null,
      className: options.className || "",
      ...options,
    };

    this.currentChapter.steps = this.currentChapter.steps || [];
    this.currentChapter.steps.push(step);
    this.stepIndex++;

    // Return the scrollyVizzu instance for chaining
    return this.scrollyVizzu;
  }

  addChart(config, options = {}) {
    const chartId = `chart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const chart = {
      id: chartId,
      config: config,
      style: options.style || {},
      container: options.container || chartId,
      ...options,
    };

    this.scrollyVizzu.charts.set(chartId, chart);

    // Return this for chaining
    return this;
  }

  build() {
    console.log("Building story...");
    this.generateDOM();
    console.log("DOM generated");
    this.initializeCharts();
    console.log("Charts initialized");

    // Setup navigation if enabled
    if (this.scrollyVizzu.options.navigation) {
      this.addNavigation();
    }
    console.log("Navigation setup");

    // Store all steps for animation manager
    this.scrollyVizzu.steps = this.getAllSteps();
    console.log("Story build complete");
  }

  generateDOM() {
    const container = this.scrollyVizzu.container;
    container.innerHTML = "";

    this.chapters.forEach((chapter, chapterIndex) => {
      // Create chapter element
      const chapterEl = document.createElement("div");
      chapterEl.className = `chapter ${chapter.className}`;
      chapterEl.setAttribute(
        "data-scrollama-index",
        this.getStepIndex(chapterIndex)
      );

      if (chapter.title) {
        const titleEl = document.createElement("h1");
        titleEl.textContent = chapter.title;
        chapterEl.appendChild(titleEl);
      }

      if (chapter.content) {
        const contentEl = document.createElement("p");
        contentEl.innerHTML = chapter.content;
        chapterEl.appendChild(contentEl);
      }

      container.appendChild(chapterEl);

      // Create scrolly container if chapter has steps
      if (chapter.steps && chapter.steps.length > 0) {
        const scrollyEl = document.createElement("div");
        scrollyEl.className = `scrolly ${chapter.layout}`;

        // Create article for steps
        const articleEl = document.createElement("article");

        chapter.steps.forEach((step, stepIndex) => {
          const stepEl = document.createElement("div");
          stepEl.className = `step ${step.className}`;
          stepEl.setAttribute(
            "data-scrollama-index",
            this.getStepIndex(chapterIndex, stepIndex)
          );

          const contentEl = document.createElement("p");
          contentEl.innerHTML = step.content;
          stepEl.appendChild(contentEl);

          articleEl.appendChild(stepEl);
        });

        scrollyEl.appendChild(articleEl);

        // Create figure for chart if exists
        if (chapter.steps.some((step) => step.chart)) {
          const figureEl = document.createElement("div");
          figureEl.className = "figure";
          figureEl.id = `fig${chapterIndex + 1}`;

          const placeholderEl = document.createElement("p");
          placeholderEl.textContent = "0";
          figureEl.appendChild(placeholderEl);

          scrollyEl.appendChild(figureEl);
        }

        container.appendChild(scrollyEl);
      }
    });

    // Add navigation if enabled
    if (this.scrollyVizzu.options.navigation) {
      this.addNavigation();
    }
  }

  addNavigation() {
    const navEl = document.createElement("div");
    navEl.id = "navbar";
    navEl.innerHTML = `
      <a href="#" id="previous">&laquo; Previous</a>
      <div id="dynamic_nav_container"></div>
      <a href="#" id="next">Next &raquo;</a>
    `;

    this.scrollyVizzu.container.appendChild(navEl);

    // Setup navigation dots
    this.scrollyVizzu.scrollManager.setupNavigation();
  }

  initializeCharts() {
    this.chapters.forEach((chapter, chapterIndex) => {
      if (chapter.steps && chapter.steps.length > 0) {
        const chartSteps = chapter.steps.filter((step) => step.chart);

        if (chartSteps.length > 0) {
          const chartId = `fig${chapterIndex + 1}`;
          const chartConfig = chartSteps[0].chart;

          // Initialize Vizzu chart using global Vizzu
          let VizzuConstructor = null;
          
          // Try different ways to get the Vizzu constructor
          if (typeof window.Vizzu === 'function') {
            VizzuConstructor = window.Vizzu;
          } else if (typeof window.VizzuChart === 'function') {
            VizzuConstructor = window.VizzuChart;
          } else if (typeof window.Vizzu !== 'undefined' && window.Vizzu.default) {
            VizzuConstructor = window.Vizzu.default;
          } else if (typeof Vizzu !== 'undefined') {
            VizzuConstructor = Vizzu;
          }
          
          if (!VizzuConstructor) {
            console.error('Vizzu constructor not found. Please ensure Vizzu is loaded before ScrollyVizzu.');
            console.log('Available Vizzu-related globals:', Object.keys(window).filter(key => key.toLowerCase().includes('vizzu')));
            return;
          }
          
          try {
            const chart = new VizzuConstructor(chartId, {
              data: this.scrollyVizzu.options.data,
            });
            
            // Store chart reference
            this.scrollyVizzu.charts.set(chartId, {
              instance: chart,
              config: chartConfig,
              steps: chartSteps,
            });
            
            // Initial chart setup
            chart.initializing.then(() => {
              chart.animate({
                style: chartConfig.style || {},
                config: chartConfig.config || {},
              });
            });
          } catch (error) {
            console.error('Failed to create Vizzu chart:', error);
          }
        }
      }
    });
  }

  getStepIndex(chapterIndex, stepIndex = null) {
    let index = chapterIndex;

    // Add steps from previous chapters
    for (let i = 0; i < chapterIndex; i++) {
      if (this.chapters[i].steps) {
        index += this.chapters[i].steps.length;
      }
    }

    // Add step index if provided
    if (stepIndex !== null) {
      index += stepIndex + 1;
    }

    return index;
  }

  getAllSteps() {
    const allSteps = [];

    this.chapters.forEach((chapter, chapterIndex) => {
      // Add chapter as a step
      allSteps.push(chapter);

      // Add chapter steps
      if (chapter.steps) {
        chapter.steps.forEach((step) => {
          allSteps.push(step);
        });
      }
    });

    return allSteps;
  }
}
