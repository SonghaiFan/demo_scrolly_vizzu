export class ScrollManager {
  constructor(options) {
    this.options = options;
    this.scroller = null;
    this.stepEnterCallbacks = [];
    this.stepExitCallbacks = [];
    this.stepProgressCallbacks = [];
    
    // Initialize scrollama if available
    if (typeof scrollama !== 'undefined') {
      this.scroller = scrollama();
    } else {
      console.warn('Scrollama not found. Please include scrollama library.');
    }
  }
  
  setup() {
    if (!this.scroller) {
      console.warn('Scrollama not available, skipping scroll setup');
      return;
    }
    
    // Update step heights
    this.updateStepHeights();
    
    // Setup scrollama
    this.scroller.setup({
      step: ':is(.chapter,.step)',
      offset: this.options.offset,
      debug: this.options.debug
    });
    
    // Bind event handlers
    this.scroller.onStepEnter(this.handleStepEnter.bind(this));
    this.scroller.onStepExit(this.handleStepExit.bind(this));
    this.scroller.onStepProgress(this.handleStepProgress.bind(this));
    
    console.log('ScrollManager setup complete');
  }
  
  updateStepHeights() {
    const stepH = Math.floor(window.innerHeight * 0.75);
    const steps = document.querySelectorAll('.step, .chapter');
    const figures = document.querySelectorAll('.figure');
    
    // Update step heights
    steps.forEach(step => {
      step.style.minHeight = stepH + 'px';
    });
    
    // Update figure heights
    const figureHeight = window.innerHeight * 0.8;
    const figureMarginTop = (window.innerHeight - figureHeight) / 3;
    
    figures.forEach(figure => {
      figure.style.height = figureHeight + 'px';
      figure.style.top = figureMarginTop + 'px';
    });
  }
  
  handleStepEnter(response) {
    const { element, direction, index } = response;
    
    // Update active step styling
    document.querySelectorAll('.step').forEach(step => {
      step.classList.remove('is-active');
    });
    element.classList.add('is-active');
    
    // Update navigation
    this.updateNavigation(index);
    
    // Call registered callbacks
    this.stepEnterCallbacks.forEach(callback => {
      callback(response);
    });
  }
  
  handleStepExit(response) {
    this.stepExitCallbacks.forEach(callback => {
      callback(response);
    });
  }
  
  handleStepProgress(response) {
    this.stepProgressCallbacks.forEach(callback => {
      callback(response);
    });
  }
  
  updateNavigation(index) {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    const nextBtn = navbar.querySelector('#next');
    const prevBtn = navbar.querySelector('#previous');
    const navContainer = navbar.querySelector('#dynamic_nav_container');
    
    // Update previous/next links
    if (prevBtn) {
      prevBtn.href = `#scrollama_step_${index - 1}`;
    }
    if (nextBtn) {
      nextBtn.href = `#scrollama_step_${index + 1}`;
    }
    
    // Update active navigation dot
    if (navContainer) {
      navContainer.querySelectorAll('a').forEach(link => {
        link.classList.remove('is-active');
      });
      
      const activeLink = navContainer.querySelector(`#scrollama_step_tag_${index}`);
      if (activeLink) {
        activeLink.classList.add('is-active');
      }
    }
  }
  
  setupNavigation() {
    const elements = document.querySelectorAll(':is(.chapter,.step)');
    const navContainer = document.getElementById('dynamic_nav_container');
    
    if (!navContainer) return;
    
    elements.forEach((element, index) => {
      const scrollamaIndex = element.getAttribute('data-scrollama-index');
      element.id = `scrollama_step_${scrollamaIndex}`;
      
      const symbol = element.classList.contains('step') ? '●' : '■';
      
      const navLink = document.createElement('a');
      navLink.textContent = symbol;
      navLink.id = `scrollama_step_tag_${scrollamaIndex}`;
      navLink.href = `#scrollama_step_${scrollamaIndex}`;
      
      navContainer.appendChild(navLink);
    });
  }
  
  // Event registration methods
  onStepEnter(callback) {
    this.stepEnterCallbacks.push(callback);
  }
  
  onStepExit(callback) {
    this.stepExitCallbacks.push(callback);
  }
  
  onStepProgress(callback) {
    this.stepProgressCallbacks.push(callback);
  }
  
  // Utility methods
  resize() {
    if (this.scroller) {
      this.updateStepHeights();
      this.scroller.resize();
    }
  }
  
  destroy() {
    if (this.scroller) {
      // Clean up scrollama if it has a destroy method
      if (typeof this.scroller.destroy === 'function') {
        this.scroller.destroy();
      }
    }
    
    this.stepEnterCallbacks = [];
    this.stepExitCallbacks = [];
    this.stepProgressCallbacks = [];
  }
  
  // Progress bar functionality
  setupProgressBar() {
    window.addEventListener('scroll', this.updateProgressBar.bind(this));
  }
  
  updateProgressBar() {
    const progressBar = document.getElementById('top-progress-bar');
    if (!progressBar) return;
    
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    progressBar.style.width = scrolled + '%';
  }
} 