// Declarative Story Configuration for Music Format Evolution
// This file centralizes all story content, chart animations, and step definitions

export const storyConfig = {
  // Global chart styling
  globalStyle: {
    fontFamily: "Raleway",
    plot: {
      xAxis: { label: { fontSize: 9, angle: 2.0 } },
      marker: {
        colorPalette:
          "#b74c20FF #c47f58FF #1c9761FF #ea4549FF #875792FF #3562b6FF #ee7c34FF #efae3aFF",
      },
    },
  },

  // Story chapters and steps
  chapters: [
    {
      id: "intro",
      type: "chapter",
      title: "The Evolution of Music Formats 1973-2020 📀🎵",
      content:
        "From vinyl records to streaming services, the music industry has undergone dramatic transformations over the past 50 years. This scrollytelling visualization explores how different music formats have risen, fallen, and sometimes made unexpected comebacks.",
      scrollIndicator:
        "Scroll to explore the music format evolution @ Songhai Fan. ⬇️",
    },
    {
      id: "vinyl-era",
      type: "chapter",
      title: "The Golden Age of Vinyl 📀",
      content:
        "In the 1970s, vinyl records dominated the music industry. With their warm, analog sound and large album artwork, vinyl records became the primary format for music consumption. The format's popularity peaked in the late 1970s, with artists like Pink Floyd, Led Zeppelin, and The Beatles releasing their most iconic albums on vinyl. However, the introduction of new formats would soon challenge vinyl's dominance.",
    },
    {
      id: "chart1",
      type: "scrolly",
      chartId: "fig1",
      layout: "side",
      steps: [
        {
          id: "step1",
          content:
            "The 1970s marked the peak of vinyl dominance. With revenue reaching over $10 billion annually, vinyl records were the undisputed king of music formats. The format's success was driven by its superior sound quality and the cultural significance of album artwork and liner notes.",
          animation: {
            config: {
              title: "Music Revenue by Format 1973-2020",
              x: "Year",
              y: ["Format", "Revenue [m$]"],
              color: "Format",
              geometry: "area",
              align: "center",
            },
          },
        },
        {
          id: "step2",
          content:
            "As we move into the 1980s, we see the rise of cassette tapes and the introduction of CDs. Cassettes offered portability and the ability to record, while CDs promised digital clarity and durability. This period marked the beginning of vinyl's decline.",
          animation: {
            config: {
              title: "Music Revenue by Format 1973-2020 (%)",
              align: "stretch",
            },
          },
        },
        {
          id: "step3",
          content:
            "The 1990s saw CDs become the dominant format, with vinyl sales plummeting to near zero. The digital revolution was in full swing, and the music industry was adapting to new consumer preferences for convenience and portability.",
          animation: {
            config: {
              title: "Music Revenue by Format 1973-2020",
              align: "center",
            },
          },
        },
        {
          id: "step4",
          content:
            "By the 2000s, the landscape had completely changed. CDs were still strong, but digital downloads and streaming were emerging as new formats. The music industry was entering a period of unprecedented transformation.",
          animation: {
            config: {
              split: true,
            },
          },
        },
        {
          id: "step5",
          content:
            "The story of music formats is one of constant evolution. Each format brought unique advantages - vinyl's warmth, CD's clarity, streaming's convenience. Today, we see an interesting coexistence where digital streaming dominates while vinyl experiences a nostalgic revival.",
          animation: {
            data: {
              filter: (record) =>
                record.Format === "Vinyl" || record.Format === "Streaming",
            },
            config: {
              title: "Revenue of Vinyl & Streaming 1973-2020",
            },
          },
        },
        {
          id: "step6",
          content:
            "Looking at the complete journey from 1973 to 2020, we can see how each format served its time and purpose. The music industry's resilience and adaptability have allowed it to thrive through multiple technological revolutions.",
          animation: {
            data: { filter: null },
            config: {
              title: "Music Revenue by Format 1973-2020",
              split: false,
            },
          },
        },
        {
          id: "step7",
          content:
            "The line chart reveals the dramatic shifts in format popularity over time. Each format's rise and fall tells a story of technological innovation and changing consumer preferences.",
          animation: {
            config: {
              x: "Year",
              y: "Revenue [m$]",
              noop: "Format",
              align: "none",
              geometry: "line",
            },
          },
        },
      ],
    },
    {
      id: "digital-revolution",
      type: "chapter",
      title: "The Digital Revolution 💿",
      content:
        "The introduction of the Compact Disc (CD) in 1982 marked the beginning of the digital music era. CDs offered superior sound quality, durability, and the ability to skip tracks instantly. This new format would eventually replace both vinyl and cassette tapes as the dominant music format.",
    },
    {
      id: "chart2",
      type: "scrolly",
      chartId: "fig2",
      layout: "side",
      steps: [
        {
          id: "step8",
          content:
            "The CD era began in the early 1980s and quickly gained momentum. By the mid-1990s, CDs had become the dominant format, with sales reaching over $16 billion annually. The digital revolution was transforming how people consumed music.",
          animation: {
            config: {
              title: "The Digital Revolution: CD Era",
              x: "Year",
              y: ["Format", "Revenue [m$]"],
              color: "Format",
              geometry: "area",
              align: "center",
            },
          },
        },
        {
          id: "step9",
          content:
            "The late 1990s and early 2000s saw the emergence of digital downloads. Services like iTunes and Napster changed the game, allowing consumers to purchase individual tracks rather than entire albums. This marked the beginning of the digital music revolution.",
          animation: {
            data: {
              filter: (record) =>
                record.Format === "CD" ||
                record.Format === "Vinyl" ||
                record.Format === "Cassette",
            },
            config: {
              title: "CD vs Vinyl vs Cassette (1980-2000)",
            },
          },
        },
        {
          id: "step10",
          content:
            "Streaming services emerged in the late 2000s and early 2010s, fundamentally changing the music industry. Services like Spotify, Apple Music, and YouTube Music offered unlimited access to vast libraries of music for a monthly subscription fee.",
          animation: {
            data: {
              filter: (record) =>
                record.Format === "CD" ||
                record.Format === "Download" ||
                record.Format === "Streaming",
            },
            config: {
              title: "Digital Transformation: CD to Download to Streaming",
            },
          },
        },
        {
          id: "step11",
          content:
            "By 2020, streaming had become the dominant format, accounting for over 80% of music industry revenue. The transformation from physical formats to digital streaming was complete, marking one of the most dramatic shifts in music industry history.",
          animation: {
            config: {
              channels: {
                x: { set: ["Revenue [m$]", "Year"] },
                y: { detach: ["Revenue [m$]"] },
              },
              title: "Revenue Comparison by Year",
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
        },
        {
          id: "step12",
          content:
            "The bar chart reveals the year-by-year revenue patterns, showing how different formats competed for market share. The data tells a story of continuous innovation and adaptation.",
          animation: {
            config: {
              channels: {
                x: { detach: ["Year"] },
                label: { attach: ["Revenue [m$]"] },
              },
            },
          },
        },
      ],
    },
    {
      id: "streaming-era",
      type: "chapter",
      title: "The Streaming Era & Vinyl's Comeback 🎵",
      content:
        "The 2010s marked the rise of streaming services and an unexpected resurgence of vinyl records. While streaming became the dominant format, vinyl experienced a remarkable comeback, driven by nostalgia, superior sound quality, and the tactile experience of physical media. This section explores these contrasting trends and their implications for the future of music consumption.",
    },
    {
      id: "chart3",
      type: "scrolly",
      chartId: "fig3",
      layout: "overlay",
      steps: [
        {
          id: "step13",
          content:
            "The streaming revolution began in earnest in the late 2000s. Services like Spotify, launched in 2008, offered unlimited access to millions of songs for a monthly fee. This model fundamentally changed how people consumed music, moving from ownership to access.",
          animation: {
            config: {
              title: "The Streaming Era & Vinyl's Comeback",
              x: "Year",
              y: ["Format", "Revenue [m$]"],
              color: "Format",
              geometry: "area",
              align: "center",
            },
          },
        },
        {
          id: "step14",
          content:
            "By the mid-2010s, streaming had overtaken digital downloads as the primary digital format. The convenience of having entire music libraries available on mobile devices drove rapid adoption among consumers worldwide.",
          animation: {
            data: {
              filter: (record) =>
                record.Format === "Streaming" || record.Format === "Download",
            },
            config: {
              title: "Digital Music Growth: Streaming vs Downloads",
            },
          },
        },
        {
          id: "step15",
          content:
            "Meanwhile, vinyl records experienced an unexpected resurgence. Starting in the late 2000s, vinyl sales began to grow again, driven by nostalgia, superior sound quality, and the tactile experience of physical media. By 2020, vinyl had become a significant niche market.",
          animation: {
            data: {
              filter: (record) => record.Format === "Vinyl",
            },
            config: {
              title: "Vinyl's Remarkable Comeback (2008-2020)",
              geometry: "line",
            },
          },
        },
        {
          id: "step16",
          content:
            "The contrast between streaming's dominance and vinyl's comeback illustrates the diverse ways people consume music today. While streaming offers convenience and discovery, vinyl provides a premium, intentional listening experience. Both formats coexist in the modern music ecosystem.",
          animation: {
            data: {
              filter: (record) =>
                record.Format === "Vinyl" || record.Format === "Streaming",
            },
            config: {
              title: "Streaming vs Vinyl: The Modern Era",
              geometry: "area",
            },
          },
        },
        {
          id: "step17",
          content:
            "Looking at the complete journey from 1973 to 2020, we can see how each format served its time and purpose. The music industry's resilience and adaptability have allowed it to thrive through multiple technological revolutions, always finding new ways to deliver music to listeners.",
          animation: {
            data: { filter: null },
            config: {
              title: "The Complete Music Format Journey",
            },
          },
        },
      ],
    },
    {
      id: "outro",
      type: "chapter",
      title: "The Future of Music Formats 🎵",
      content:
        "The evolution of music formats over the past 50 years demonstrates the industry's remarkable ability to adapt to technological change. From vinyl's dominance to streaming's ubiquity, each format has shaped how we experience music. As we look to the future, the coexistence of digital convenience and analog quality suggests that diversity in music consumption will continue to thrive.",
      footer: "🎵📀💿🎧",
    },
  ],
};

// Helper function to get step by index
export function getStepByIndex(index) {
  let stepIndex = 0;
  for (const chapter of storyConfig.chapters) {
    if (chapter.type === "scrolly") {
      for (const step of chapter.steps) {
        if (stepIndex === index) {
          return { chapter, step, stepIndex };
        }
        stepIndex++;
      }
    }
  }
  return null;
}

// Helper function to get total number of steps
export function getTotalSteps() {
  let total = 0;
  for (const chapter of storyConfig.chapters) {
    if (chapter.type === "scrolly") {
      total += chapter.steps.length;
    }
  }
  return total;
}

// Helper function to generate HTML from story config
export function generateHTML() {
  let html = "";

  for (const chapter of storyConfig.chapters) {
    if (chapter.type === "chapter") {
      html += generateChapterHTML(chapter);
    } else if (chapter.type === "scrolly") {
      html += generateScrollyHTML(chapter);
    }
  }

  return html;
}

function generateChapterHTML(chapter) {
  const isIntro = chapter.id === "intro";
  const isOutro = chapter.id === "outro";

  let html = `<div class="chapter${isIntro ? " intro" : ""}${
    isOutro ? " outro" : ""
  }">`;
  html += `<h1>${chapter.title}</h1>`;
  html += `<p>${chapter.content}</p>`;

  if (isIntro && chapter.scrollIndicator) {
    html += `<br /><div class="scroll_indicator">${chapter.scrollIndicator}</div>`;
  }

  if (isOutro && chapter.footer) {
    html += `<p><br /><a href="#top">Jump to top of page</a><br />${chapter.footer}</p>`;
  }

  html += "</div>";
  return html;
}

function generateScrollyHTML(chapter) {
  const isOverlay = chapter.layout === "overlay";

  let html = `<div class="scrolly ${chapter.layout}">`;

  if (isOverlay) {
    html += `<div id="${chapter.chartId}" class="figure"></div>`;
    html += "<article>";
  } else {
    html += "<article>";
  }

  for (const step of chapter.steps) {
    html += `<div class="step" data-step-id="${step.id}">`;
    html += `<p>${step.content}</p>`;
    html += "</div>";
  }

  html += "</article>";

  if (!isOverlay) {
    html += `<div id="${chapter.chartId}" class="figure"></div>`;
  }

  html += "</div>";
  return html;
}
