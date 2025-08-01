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

// Initialize charts based on story config
function initializeCharts() {
  for (const chapter of storyConfig.chapters) {
    if (chapter.type === "scrolly") {
      const chart = new Vizzu(chapter.chartId, { data: musicData });
      charts[chapter.chartId] = chart;

      // Remove initial animations - all animations will be triggered in stepTrigger
      chart.initializing.then((chart) => {
        // Chart is ready but no animation yet
      });
    }
  }
}

function stepTrigger(index) {
  const stepInfo = getStepByIndex(index);
  if (!stepInfo) return;

  const { chapter, step } = stepInfo;
  const chart = charts[chapter.chartId];

  if (!chart || !step.animation) return;

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
  // add color to current step only
  steps.classed("is-active", false);
  d3.select(element).classed("is-active", true);

  // update graphic based on step
  figures.select("p").text(index);

  navbar.select("#next").attr("href", `#scrollama_step_${index + 1}`);
  navbar.select("#previous").attr("href", `#scrollama_step_${index - 1}`);

  d3.select("#dynamic_nav_container")
    .selectAll("a")
    .classed("is-active", false);
  d3.select(`#scrollama_step_tag_${index}`).classed("is-active", true);

  stepTrigger(index);
}

function setStepNavigationBar() {
  d3.selectAll(":is(.chapter,.step)").each(function () {
    const scrololama_index = d3.select(this).attr("data-scrollama-index");

    d3.select(this).attr("id", `scrollama_step_${scrololama_index}`);

    const symbol = d3.select(this).attr("class") == "step" ? "●" : "■";

    d3.select("#dynamic_nav_container")
      .append("a")
      .text(symbol)
      .attr("id", `scrollama_step_tag_${scrololama_index}`)
      .attr("href", `#scrollama_step_${scrololama_index}`);
  });
}

function init() {
  // Initialize charts
  initializeCharts();

  // 1. force a resize on load to ensure proper dimensions are sent to scrollama
  handleResize();

  // 2. setup the scroller passing options
  // 		this will also initialize trigger observations
  scroller.setup({
    step: ":is(.step)",
    offset: 0.5,
    debug: true,
  });

  // 3. bind scrollama event handlers (this can be chained like below)
  scroller.onStepEnter(handleStepEnter);

  setStepNavigationBar();
}

function renderScrollProcessBar() {
  const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById("top-progress-bar").style.width = scrolled + "%";
}

// kick things off
window.onload = init();
window.onscroll = function () {
  renderScrollProcessBar();
};
window.addEventListener("resize", handleResize);
