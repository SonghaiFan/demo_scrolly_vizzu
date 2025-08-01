export class AnimationManager {
  constructor(scrollyVizzu) {
    this.scrollyVizzu = scrollyVizzu;
    this.animations = new Map();
    this.currentAnimations = new Map();
  }
  
  registerAnimation(chartId, stepIndex, animation) {
    if (!this.animations.has(chartId)) {
      this.animations.set(chartId, new Map());
    }
    this.animations.get(chartId).set(stepIndex, animation);
  }
  
  triggerStep(stepIndex, stepData) {
    // Find which chart this step belongs to
    const chartId = this.findChartForStep(stepIndex);
    
    if (chartId) {
      const chartData = this.scrollyVizzu.charts.get(chartId);
      if (chartData && chartData.steps) {
        // Find the step within this chart's steps
        const stepInChart = chartData.steps.find(step => 
          this.scrollyVizzu.steps[stepIndex] === step
        );
        
        if (stepInChart && stepInChart.chart) {
          this.executeAnimation(chartId, stepInChart.chart);
        }
      }
    }
  }
  
  findChartForStep(stepIndex) {
    // This would need to be implemented based on your step-to-chart mapping
    // For now, we'll use a simple heuristic
    return `fig${Math.floor(stepIndex / 5) + 1}`;
  }
  
  executeAnimation(chartId, chartConfig) {
    const chart = this.getChartInstance(chartId);
    
    if (!chart) {
      console.warn(`Chart ${chartId} not found for animation`);
      return;
    }
    
    // Execute the animation
    if (typeof chartConfig === 'function') {
      chartConfig(chart);
    } else if (typeof chartConfig === 'object') {
      chart.animate(chartConfig);
    }
  }
  
  getChartInstance(chartId) {
    // Get the chart instance from the ScrollyVizzu instance
    const chartData = this.scrollyVizzu.charts.get(chartId);
    return chartData ? chartData.instance : null;
  }
  
  // Predefined animation presets
  static presets = {
    // Area chart animations
    areaToBar: (chart) => {
      chart.animate({
        config: {
          geometry: 'rectangle',
          split: false
        }
      });
    },
    
    areaToStacked: (chart) => {
      chart.animate({
        config: {
          channels: {
            y: { range: { max: '100%' } }
          },
          split: true
        }
      });
    },
    
    // Bar chart animations
    barToLine: (chart) => {
      chart.animate({
        config: {
          geometry: 'line'
        }
      });
    },
    
    // Data filtering animations
    filterData: (chart, filterFn) => {
      chart.animate({
        data: { filter: filterFn }
      });
    },
    
    // Coordinate system changes
    transpose: (chart) => {
      chart.animate({
        config: {
          channels: {
            x: { set: ['Revenue [m$]', 'Year'] },
            y: { detach: ['Revenue [m$]'] }
          },
          geometry: 'rectangle'
        }
      });
    },
    
    // Style animations
    updateStyle: (chart, style) => {
      chart.animate({
        style: style
      });
    }
  };
  
  // Helper method to create common animation sequences
  createSequence(chartId, steps) {
    steps.forEach((step, index) => {
      this.registerAnimation(chartId, index, step);
    });
  }
  
  // Method to create animations from your current stepTrigger logic
  createFromStepTrigger(stepTriggerFunction) {
    // This would parse your existing stepTrigger function
    // and convert it to the new animation system
    // Implementation would depend on how you want to structure this
  }
} 