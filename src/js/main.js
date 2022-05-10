import Vizzu from "https://cdn.jsdelivr.net/npm/vizzu@0.3.1/dist/vizzu.min.js";
import { data } from "https://lib.vizzuhq.com/test/integration/test_data/chart_types_eu.js";

const figures = d3.selectAll(".figure");
const steps = d3.selectAll(".step");
const chapters = d3.selectAll(".chapter");
const navbar = d3.select("#navbar");

// initialize the scrollama
const scroller = scrollama();

// preparation for rendering

let chart1 = new Vizzu("fig1");
let chart2 = new Vizzu("fig2");

// chart1.animate({
//   style: {
//     fontFamily: "Raleway",
//   },
//   data: Object.assign(data, {
//     filter: (record) =>
//       [
//         "AT",
//         "BE",
//         "CY",
//         "DE",
//         "DK",
//         "EE",
//         "EL",
//         "ES",
//         "FI",
//         "FR",
//         "IT",
//         "NL",
//         "SE",
//       ].includes(record.Country_code),
//   }),
// });

chart2.animate({
  style: {
    fontFamily: "Raleway",
  },
});

function stepTrigger(index) {
  switch (index) {
    case 0:
      break;
    case 1:
      break;
    case 2:
      // chart1.animate({
      //   config: {
      //     channels: {
      //       x: { set: ["Year"] },
      //       y: { set: ["Value 2 (+)", "Country"] },
      //       /* The noop channel splits the markers as all the other channels
      //           but will have no effect on the markers’ appearance. */
      //       noop: { set: ["Country"] },
      //       color: { set: null },
      //     },
      //     title: "Column Chart",
      //     geometry: "rectangle",
      //     split: false,
      //   },
      // });

      break;
    case 3:
      // chart1.animate({
      //   config: {
      //     channels: {
      //       y: {
      //         /* Making the chart elements fill the whole of the y-axis
      //               as the default value is now 110% */
      //         range: {
      //           max: "100%",
      //         },
      //       },
      //       color: { set: ["Country"] },
      //       noop: { set: null },
      //     },
      //     title: "Trellis Column Chart",
      //     split: true,
      //   },
      // });
      break;
    case 4:
      // chart1.animate({
      //   config: {
      //     channels: {
      //       y: {
      //         /* Setting back the y-axis range to the default value. */
      //         range: {
      //           max: "auto",
      //         },
      //       },
      //     },
      //     title: "Stacked Column Chart",
      //     split: false,
      //     align: "none",
      //   },
      // });
      break;
    case 5:
      // chart1.animate({
      //   config: {
      //     title: "100% Column Chart",
      //     align: "stretch",
      //   },
      // });
      break;
    case 6:
      // fig2
      break;
    case 7:
      chart2.animate({
        data: data,
        config: {
          channels: {
            x: { set: ["Year"] },
            y: { set: ["Country", "Value 2 (+)"] },
            color: { set: ["Country"] },
          },
          title: "Stacked Area Chart",
          geometry: "area",
          split: false,
        },
        style: {
          tooltip: {
            layout: "multiLine",
            dropShadow: "5",
            arrowSize: "8",
            seriesName: "Country",
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
              /* Making the chart elements fill the whole of
                       the y-axis as the default value is now 110% */
              range: {
                max: "100%",
              },
            },
          },
          title: "Trellis Area Chart",
          split: true,
        },
      });
      break;
    case 9:
      chart2.animate(
        {
          config: {
            channels: {
              x: { set: ["Value 2 (+)", "Year"] },
              y: { detach: ["Value 2 (+)"] },
            },
            title: "Bar Chart",
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
          /* Setting a custom rhythm for the animation
            to assist the viewer in following it. */
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
            label: { attach: ["Value 2 (+)"] },
          },
        },
      });
      break;
    case 11:
      // fig3
      break;
    case 12:
      break;
    case 13:
      break;
    case 14:
      break;
    case 15:
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
