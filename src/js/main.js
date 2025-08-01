import Vizzu from "https://cdn.jsdelivr.net/npm/vizzu@0.3.1/dist/vizzu.min.js";
import musicData from "../data/data.js";

const figures = d3.selectAll(".figure");
const steps = d3.selectAll(".step");
const chapters = d3.selectAll(".chapter");
const navbar = d3.select("#navbar");

// initialize the scrollama (using global scrollama from script tag)
const scroller = scrollama();

// preparation for rendering

let chart1 = new Vizzu("fig1", { data: musicData });
let chart2 = new Vizzu("fig2", { data: musicData });
let chart3 = new Vizzu("fig3", { data: musicData });

// Remove initial animations - all animations will be triggered in stepTrigger
chart1.initializing.then((chart) => {
  // Chart is ready but no animation yet
});

chart2.initializing.then((chart) => {
  // Chart is ready but no animation yet
});

chart3.initializing.then((chart) => {
  // Chart is ready but no animation yet
});

function stepTrigger(index) {
  switch (index) {
    case 0:
      // Initial setup for chart1 (fig1 section)
      chart1.animate({
        style: {
          fontFamily: "Raleway",
          plot: {
            xAxis: { label: { fontSize: 9, angle: 2.0 } },
            marker: {
              colorPalette:
                "#b74c20FF #c47f58FF #1c9761FF #ea4549FF #875792FF #3562b6FF #ee7c34FF #efae3aFF",
            },
          },
        },
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
      // Chart1 continues in fig1 section
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
    case 2:
      chart1.animate({
        config: {
          channels: {
            y: {
              range: {
                max: "100%",
              },
            },
            color: { set: ["Format"] },
          },
          title: "Music Revenue Distribution (%)",
          split: true,
        },
      });
      break;
    case 3:
      chart1.animate({
        config: {
          channels: {
            y: {
              range: {
                max: "auto",
              },
            },
          },
          title: "Stacked Column Chart",
          split: false,
          align: "none",
        },
      });
      break;
    case 4:
      chart1.animate({
        config: {
          title: "100% Stacked Column Chart",
          align: "stretch",
        },
      });
      break;
    case 5:
      // Chart1 final animation in fig1 section
      chart1.animate({
        config: {
          title: "Final Chart1 Animation",
          align: "center",
        },
      });
      break;
    case 6:
      // Initial setup for chart2 (fig2 section)
      chart2.animate({
        style: {
          fontFamily: "Raleway",
          plot: {
            xAxis: { label: { fontSize: 9, angle: 2.0 } },
            marker: {
              colorPalette:
                "#b74c20FF #c47f58FF #1c9761FF #ea4549FF #875792FF #3562b6FF #ee7c34FF #efae3aFF",
            },
          },
        },
        config: {
          title: "Music Revenue Evolution",
          x: "Year",
          y: ["Format", "Revenue [m$]"],
          color: "Format",
          geometry: "area",
          align: "center",
        },
      });
      break;
    case 7:
      chart2.animate({
        data: musicData,
        config: {
          channels: {
            x: { set: ["Year"] },
            y: { set: ["Format", "Revenue [m$]"] },
            color: { set: ["Format"] },
          },
          title: "Music Revenue Evolution - Area Chart",
          geometry: "area",
          split: false,
        },
        style: {
          tooltip: {
            layout: "multiLine",
            dropShadow: "5",
            arrowSize: "8",
            seriesName: "Format",
            borderRadius: "5",
          },
        },
      });
      break;
    case 8:
      chart2.animate({
        config: {
          channels: {
            y: {
              range: {
                max: "100%",
              },
            },
          },
          title: "Music Revenue Evolution - Trellis Area Chart",
          split: true,
        },
      });
      break;
    case 9:
      chart2.animate(
        {
          config: {
            channels: {
              x: { set: ["Revenue [m$]", "Year"] },
              y: { detach: ["Revenue [m$]"] },
            },
            title: "Music Revenue by Year - Bar Chart",
            geometry: "rectangle",
            split: false,
          },
          style: {
            plot: {
              yAxis: {
                label: {
                  paddingRight: 10,
                  fontSize: 10,
                },
              },
              marker: {
                label: { fontSize: 10 },
              },
            },
          },
        },
        {
          geometry: { delay: 0, duration: 1 },
          y: {
            delay: 0,
            duration: 1,
          },
          x: {
            delay: 0,
            duration: 1,
          },
        }
      );
      break;
    case 10:
      chart2.animate({
        config: {
          channels: {
            x: { detach: ["Year"] },
            label: { attach: ["Revenue [m$]"] },
          },
        },
      });
      break;
    case 11:
      // Initial setup for chart3 (fig3 section)
      chart3.animate({
        style: {
          fontFamily: "Raleway",
          plot: {
            xAxis: { label: { fontSize: 9, angle: 2.0 } },
            marker: {
              colorPalette:
                "#b74c20FF #c47f58FF #1c9761FF #ea4549FF #875792FF #3562b6FF #ee7c34FF #efae3aFF",
            },
          },
        },
        config: {
          title: "Streaming & Vinyl Comparison",
          x: "Year",
          y: ["Format", "Revenue [m$]"],
          color: "Format",
          geometry: "area",
          align: "center",
        },
      });
      break;
    case 12:
      // Chart3 continues in fig3 section
      chart3.animate({
        data: {
          filter: (record) => {
            return (
              record.Format === "Streaming" || record.Format === "Download"
            );
          },
        },
        config: {
          channels: {
            x: { set: ["Year"] },
            y: { set: ["Revenue [m$]", "Format"] },
            color: { set: ["Format"] },
          },
          title: "Digital Music Growth",
          geometry: "area",
          split: false,
        },
      });
      break;
    case 13:
      chart3.animate({
        data: {
          filter: (record) => {
            return record.Format === "Vinyl";
          },
        },
        config: {
          channels: {
            x: { set: ["Year"] },
            y: { set: ["Revenue [m$]"] },
            color: { set: ["Format"] },
          },
          title: "Vinyl's Remarkable Comeback",
          geometry: "line",
          split: false,
        },
      });
      break;
    case 14:
      chart3.animate({
        data: {
          filter: (record) => {
            return record.Format === "Vinyl" || record.Format === "Streaming";
          },
        },
        config: {
          channels: {
            x: { set: ["Year"] },
            y: { set: ["Revenue [m$]", "Format"] },
            color: { set: ["Format"] },
          },
          title: "Streaming vs Vinyl: The Modern Era",
          geometry: "area",
          split: false,
        },
      });
      break;
    case 15:
      // Chart3 final animation in fig3 section
      chart3.animate({
        data: musicData,
        config: {
          channels: {
            x: { set: ["Year"] },
            y: { set: ["Revenue [m$]", "Format"] },
            color: { set: ["Format"] },
          },
          title: "The Complete Music Format Journey",
          geometry: "area",
          split: false,
        },
      });
      break;
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
  // 1. force a resize on load to ensure proper dimensions are sent to scrollama
  handleResize();

  // 2. setup the scroller passing options
  // 		this will also initialize trigger observations

  scroller.setup({
    step: ":is(.chapter,.step)",
    offset: 0.6,
    debug: false,
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
