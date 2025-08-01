import { ScrollyVizzu } from '../src/lib/ScrollyVizzu.js';
import musicData from '../src/data/data.js';

// Example implementation using the new ScrollyVizzu library
const story = new ScrollyVizzu({
  container: '#app',
  data: musicData,
  theme: 'modern',
  navigation: true,
  debug: false
});

// Build the story using the new declarative API
story
  .chapter('The Evolution of Music Formats', {
    content: 'From vinyl records to streaming services, the music industry has undergone dramatic transformations over the past 50 years. This scrollytelling visualization explores how different music formats have risen, fallen, and sometimes made unexpected comebacks.',
    className: 'intro'
  })
  
  .chapter('The Golden Age of Vinyl 📀', {
    content: 'In the 1970s, vinyl records dominated the music industry. With their warm, analog sound and large album artwork, vinyl records became the primary format for music consumption.',
    layout: 'side'
  })
  .step('The 1970s marked the peak of vinyl dominance. With revenue reaching over $10 billion annually, vinyl records were the undisputed king of music formats.', {
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
        fontFamily: 'Raleway',
        plot: {
          xAxis: { label: { fontSize: 9, angle: 2.0 } },
          marker: {
            colorPalette: '#b74c20FF #c47f58FF #1c9761FF #ea4549FF #875792FF #3562b6FF #ee7c34FF #efae3aFF'
          }
        }
      }
    }
  })
  .step('As we move into the 1980s, we see the rise of cassette tapes and the introduction of CDs. Cassettes offered portability and the ability to record, while CDs promised digital clarity and durability.', {
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
  .step('The 1990s saw CDs become the dominant format, with vinyl sales plummeting to near zero. The digital revolution was in full swing.', {
    chart: {
      config: {
        channels: {
          y: { range: { max: '100%' } },
          color: { set: ['Format'] }
        },
        title: 'Music Revenue Distribution (%)',
        split: true
      }
    }
  })
  .step('By the 2000s, the landscape had completely changed. CDs were still strong, but digital downloads and streaming were emerging as new formats.', {
    chart: {
      config: {
        channels: {
          y: { range: { max: 'auto' } }
        },
        title: 'Stacked Column Chart',
        split: false,
        align: 'none'
      }
    }
  })
  
  .chapter('The Digital Revolution 💿', {
    content: 'The introduction of the Compact Disc (CD) in 1982 marked the beginning of the digital music era. CDs offered superior sound quality, durability, and the ability to skip tracks instantly.',
    layout: 'side'
  })
  .step('The CD era began in the early 1980s and quickly gained momentum. By the mid-1990s, CDs had become the dominant format, with sales reaching over $16 billion annually.', {
    chart: {
      config: {
        channels: {
          x: { set: ['Year'] },
          y: { set: ['Format', 'Revenue [m$]'] },
          color: { set: ['Format'] }
        },
        title: 'Music Revenue Evolution - Area Chart',
        geometry: 'area',
        split: false
      },
      style: {
        tooltip: {
          layout: 'multiLine',
          dropShadow: '5',
          arrowSize: '8',
          seriesName: 'Format',
          borderRadius: '5'
        }
      }
    }
  })
  .step('The late 1990s and early 2000s saw the emergence of digital downloads. Services like iTunes and Napster changed the game.', {
    chart: {
      config: {
        channels: {
          y: { range: { max: '100%' } }
        },
        title: 'Music Revenue Evolution - Trellis Area Chart',
        split: true
      }
    }
  })
  .step('Streaming services emerged in the late 2000s and early 2010s, fundamentally changing the music industry.', {
    chart: {
      config: {
        channels: {
          x: { set: ['Revenue [m$]', 'Year'] },
          y: { detach: ['Revenue [m$]'] }
        },
        title: 'Music Revenue by Year - Bar Chart',
        geometry: 'rectangle',
        split: false
      }
    }
  })
  
  .chapter('The Streaming Era & Vinyl\'s Comeback 🎵', {
    content: 'The 2010s marked the rise of streaming services and an unexpected resurgence of vinyl records. While streaming became the dominant format, vinyl experienced a remarkable comeback.',
    layout: 'overlay'
  })
  .step('The streaming revolution began in earnest in the late 2000s. Services like Spotify, launched in 2008, offered unlimited access to millions of songs for a monthly fee.', {
    chart: {
      config: {
        title: 'Streaming & Vinyl Comparison',
        x: 'Year',
        y: ['Format', 'Revenue [m$]'],
        color: 'Format',
        geometry: 'area',
        align: 'center'
      }
    }
  })
  .step('By the mid-2010s, streaming had overtaken digital downloads as the primary digital format.', {
    chart: {
      data: {
        filter: (record) => record.Format === 'Streaming' || record.Format === 'Download'
      },
      config: {
        channels: {
          x: { set: ['Year'] },
          y: { set: ['Revenue [m$]', 'Format'] },
          color: { set: ['Format'] }
        },
        title: 'Digital Music Growth',
        geometry: 'area',
        split: false
      }
    }
  })
  .step('Meanwhile, vinyl records experienced an unexpected resurgence. Starting in the late 2000s, vinyl sales began to grow again.', {
    chart: {
      data: {
        filter: (record) => record.Format === 'Vinyl'
      },
      config: {
        channels: {
          x: { set: ['Year'] },
          y: { set: ['Revenue [m$]'] },
          color: { set: ['Format'] }
        },
        title: 'Vinyl\'s Remarkable Comeback',
        geometry: 'line',
        split: false
      }
    }
  })
  .step('The contrast between streaming\'s dominance and vinyl\'s comeback illustrates the diverse ways people consume music today.', {
    chart: {
      data: {
        filter: (record) => record.Format === 'Vinyl' || record.Format === 'Streaming'
      },
      config: {
        channels: {
          x: { set: ['Year'] },
          y: { set: ['Revenue [m$]', 'Format'] },
          color: { set: ['Format'] }
        },
        title: 'Streaming vs Vinyl: The Modern Era',
        geometry: 'area',
        split: false
      }
    }
  })
  
  .chapter('The Future of Music Formats 🎵', {
    content: 'The evolution of music formats over the past 50 years demonstrates the industry\'s remarkable ability to adapt to technological change. From vinyl\'s dominance to streaming\'s ubiquity, each format has shaped how we experience music.',
    className: 'outro'
  })
  
  .build();

// Export for use in other files
export default story; 