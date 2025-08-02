import Vizzu from "https://cdn.jsdelivr.net/npm/vizzu@0.3.1/dist/vizzu.min.js";
import musicData from "../data/data.js";
import { storyConfig, getStepByIndex, getTotalSteps } from "./story-config.js";

const figures = d3.selectAll(".figure");
const steps = d3.selectAll(".step");
const chapters = d3.selectAll(".chapter");
const navbar = d3.select("#navbar");

// initialize the scrollama (using global scrollama from script tag)
const scroller = scrollama();

// Chart instances
const charts = {};
let chartsInitialized = false;

// Initialize charts based on story config
async function initializeCharts() {
  try {
    console.log("Initializing charts...");

    for (const chapter of storyConfig.chapters) {
      if (chapter.type === "scrolly") {
        console.log(`Initializing chart: ${chapter.chartId}`);

        const chart = new Vizzu(chapter.chartId, { data: musicData });
        charts[chapter.chartId] = chart;

        // Wait for chart to be ready
        await chart.initializing;
        console.log(`Chart ${chapter.chartId} initialized successfully`);
      }
    }

    chartsInitialized = true;
    console.log("All charts initialized successfully");
  } catch (error) {
    console.error("Error initializing charts:", error);
  }
}

function stepTrigger(index) {
  if (!chartsInitialized) {
    console.warn("Charts not yet initialized, skipping step trigger");
    return;
  }

  const stepInfo = getStepByIndex(index);
  if (!stepInfo) {
    console.warn(`No step info found for index: ${index}`);
    return;
  }

  const { chapter, step } = stepInfo;
  const chart = charts[chapter.chartId];

  if (!chart) {
    console.error(`Chart not found for chapter: ${chapter.chartId}`);
    return;
  }

  if (!step.animation) {
    console.warn(`No animation found for step: ${step.id}`);
    return;
  }

  try {
    console.log(`Triggering animation for step ${index}: ${step.id}`);

    // Prepare animation configuration
    const animationConfig = {
      ...step.animation,
      style: {
        ...storyConfig.globalStyle,
        ...step.animation.style,
      },
    };

    // Execute the animation
    chart.animate(animationConfig);
    console.log(`Animation triggered successfully for step ${index}`);
  } catch (error) {
    console.error(`Error triggering animation for step ${index}:`, error);
  }
}

// generic window resize listener event
function handleResize() {
  // 1. update height of step elements
  const stepH = Math.floor(window.innerHeight * 0.75);
  steps.style("min-height", stepH + "px");
  chapters.style("min-height", stepH + "px");

  const figureHeight = window.innerHeight * 0.8;
  const figureMarginTop = (window.innerHeight - figureHeight) / 3;

  figures
    .style("height", figureHeight + "px")
    .style("top", figureMarginTop + "px");

  // 3. tell scrollama to update new element dimensions
  scroller.resize();
}

// scrollama event handlers
function handleStepEnter({ element, direction, index }) {
  console.log(`Step entered: ${index}, direction: ${direction}`);

  // add color to current step only
  steps.classed("is-active", false);
  d3.select(element).classed("is-active", true);

  // update graphic based on step
  figures.select("p").text(index);

  // Update navigation
  const totalSteps = getTotalSteps();
  if (index > 0) {
    navbar.select("#previous").attr("href", `#scrollama_step_${index - 1}`);
  } else {
    navbar.select("#previous").attr("href", "#");
  }

  if (index < totalSteps - 1) {
    navbar.select("#next").attr("href", `#scrollama_step_${index + 1}`);
  } else {
    navbar.select("#next").attr("href", "#");
  }

  // Update navigation indicators
  d3.select("#dynamic_nav_container")
    .selectAll("a")
    .classed("is-active", false);

  const currentNavItem = d3.select(`#scrollama_step_tag_${index}`);
  if (!currentNavItem.empty()) {
    currentNavItem.classed("is-active", true);
  }

  // Trigger the animation
  stepTrigger(index);
}

function setStepNavigationBar() {
  console.log("Setting up step navigation bar...");

  d3.selectAll(":is(.chapter,.step)").each(function (d, i) {
    const element = d3.select(this);
    const scrololama_index = element.attr("data-scrollama-index");

    if (scrololama_index) {
      element.attr("id", `scrollama_step_${scrololama_index}`);

      const isStep = element.classed("step");
      const symbol = isStep ? "●" : "■";

      d3.select("#dynamic_nav_container")
        .append("a")
        .text(symbol)
        .attr("id", `scrollama_step_tag_${scrololama_index}`)
        .attr("href", `#scrollama_step_${scrololama_index}`)
        .attr(
          "title",
          isStep ? `Step ${scrololama_index}` : `Chapter ${scrololama_index}`
        );
    }
  });

  console.log("Step navigation bar setup complete");
}

async function init() {
  console.log("Initializing scrollytelling application...");

  try {
    // Initialize charts first
    await initializeCharts();

    // 1. force a resize on load to ensure proper dimensions are sent to scrollama
    handleResize();

    // 2. setup the scroller passing options
    scroller.setup({
      step: ":is(.chapter,.step)",
      offset: 0.5,
      debug: true,
    });

    // 3. bind scrollama event handlers
    scroller.onStepEnter(handleStepEnter);

    // 4. setup navigation
    setStepNavigationBar();

    console.log("Application initialized successfully");
  } catch (error) {
    console.error("Error during initialization:", error);
  }
}

function renderScrollProcessBar() {
  const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;

  const progressBar = document.getElementById("top-progress-bar");
  if (progressBar) {
    progressBar.style.width = scrolled + "%";
  }
}

// kick things off
window.onload = init();
window.onscroll = function () {
  renderScrollProcessBar();
};
window.addEventListener("resize", handleResize);

// Export for debugging
window.scrollyVizz = {
  charts,
  storyConfig,
  getStepByIndex,
  getTotalSteps,
  stepTrigger,
};
