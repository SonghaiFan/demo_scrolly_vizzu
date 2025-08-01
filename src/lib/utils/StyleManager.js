export class StyleManager {
  constructor(theme = 'default') {
    this.theme = theme;
    this.themes = {
      default: this.getDefaultTheme(),
      modern: this.getModernTheme(),
      dark: this.getDarkTheme(),
      minimal: this.getMinimalTheme()
    };
    
    this.applyTheme(theme);
  }
  
  applyTheme(themeName) {
    const theme = this.themes[themeName] || this.themes.default;
    this.injectStyles(theme);
  }
  
  injectStyles(styles) {
    // Remove existing theme styles
    const existingStyle = document.getElementById('scrolly-vizzu-theme');
    if (existingStyle) {
      existingStyle.remove();
    }
    
    // Inject new styles
    const styleElement = document.createElement('style');
    styleElement.id = 'scrolly-vizzu-theme';
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
  }
  
  getDefaultTheme() {
    return `
      /* Default theme styles */
      .chapter {
        min-height: 75vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 2rem;
      }
      
      .chapter h1 {
        font-size: 3rem;
        margin-bottom: 1rem;
        color: #333;
      }
      
      .chapter p {
        font-size: 1.2rem;
        max-width: 800px;
        line-height: 1.6;
        color: #666;
      }
      
      .scrolly {
        position: relative;
        display: flex;
        background-color: #fafafa;
        padding: 0;
        max-width: 1400px;
        margin: 0 auto;
      }
      
      .scrolly.side {
        align-items: flex-start;
      }
      
      .scrolly.overlay {
        align-items: center;
      }
      
      .scrolly article {
        position: relative;
        padding: 0 1rem;
        width: 40%;
      }
      
      .scrolly .step {
        margin: 0 auto 2rem auto;
        opacity: 0.3;
        transition: opacity 0.3s ease;
      }
      
      .scrolly .step.is-active {
        opacity: 1;
      }
      
      .scrolly .step p {
        text-align: left;
        font-weight: 300;
        font-size: 1rem;
        line-height: 1.6;
      }
      
      .scrolly .figure {
        position: sticky;
        width: 60%;
        margin: 0;
        top: 0;
        right: 0;
        z-index: 0;
      }
      
      .scrolly.overlay .figure {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        z-index: -1;
      }
      
      .scrolly.overlay article {
        position: relative;
        z-index: 1;
        width: 100%;
        max-width: 40rem;
        margin: 0 auto;
        padding: 1rem;
        background-color: rgba(255, 255, 255, 0.9);
      }
      
      #navbar {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(255, 255, 255, 0.9);
        padding: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        z-index: 1000;
      }
      
      #navbar a {
        text-decoration: none;
        color: #333;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        transition: background-color 0.3s ease;
      }
      
      #navbar a:hover {
        background-color: #f0f0f0;
      }
      
      #navbar a.is-active {
        background-color: #007bff;
        color: white;
      }
      
      #dynamic_nav_container {
        display: flex;
        gap: 0.5rem;
      }
      
      .header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background-color: #f0f0f0;
        z-index: 1001;
      }
      
      .progress-container {
        width: 100%;
        height: 100%;
      }
      
      .progress-bar {
        height: 100%;
        background-color: #007bff;
        width: 0%;
        transition: width 0.3s ease;
      }
      
      @media (max-width: 768px) {
        .scrolly {
          flex-direction: column;
        }
        
        .scrolly article {
          width: 100%;
          padding: 1rem;
        }
        
        .scrolly .figure {
          width: 100%;
          position: relative;
        }
        
        .chapter h1 {
          font-size: 2rem;
        }
        
        .chapter p {
          font-size: 1rem;
        }
      }
    `;
  }
  
  getModernTheme() {
    return `
      /* Modern theme with gradients and shadows */
      .chapter {
        min-height: 75vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 2rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
      }
      
      .chapter h1 {
        font-size: 3.5rem;
        margin-bottom: 1rem;
        color: white;
        text-shadow: 0 2px 4px rgba(0,0,0,0.3);
      }
      
      .chapter p {
        font-size: 1.3rem;
        max-width: 800px;
        line-height: 1.7;
        color: rgba(255,255,255,0.9);
      }
      
      .scrolly {
        position: relative;
        display: flex;
        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        padding: 0;
        max-width: 1400px;
        margin: 0 auto;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      }
      
      .scrolly article {
        position: relative;
        padding: 2rem;
        width: 40%;
        background: rgba(255,255,255,0.95);
        backdrop-filter: blur(10px);
      }
      
      .scrolly .step {
        margin: 0 auto 2rem auto;
        opacity: 0.4;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        transform: translateY(20px);
      }
      
      .scrolly .step.is-active {
        opacity: 1;
        transform: translateY(0);
      }
      
      .scrolly .step p {
        text-align: left;
        font-weight: 400;
        font-size: 1.1rem;
        line-height: 1.7;
        color: #2d3748;
      }
      
      .scrolly .figure {
        position: sticky;
        width: 60%;
        margin: 0;
        top: 0;
        right: 0;
        z-index: 0;
        background: white;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      }
      
      #navbar {
        position: fixed;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(255,255,255,0.95);
        backdrop-filter: blur(10px);
        padding: 1rem 2rem;
        border-radius: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        z-index: 1000;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      }
      
      #navbar a {
        text-decoration: none;
        color: #4a5568;
        padding: 0.75rem 1.5rem;
        border-radius: 25px;
        transition: all 0.3s ease;
        font-weight: 500;
      }
      
      #navbar a:hover {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        transform: translateY(-2px);
      }
      
      #navbar a.is-active {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
      }
    `;
  }
  
  getDarkTheme() {
    return `
      /* Dark theme */
      body {
        background-color: #1a1a1a;
        color: #ffffff;
      }
      
      .chapter {
        min-height: 75vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 2rem;
        background-color: #2d2d2d;
      }
      
      .chapter h1 {
        font-size: 3rem;
        margin-bottom: 1rem;
        color: #ffffff;
      }
      
      .chapter p {
        font-size: 1.2rem;
        max-width: 800px;
        line-height: 1.6;
        color: #cccccc;
      }
      
      .scrolly {
        position: relative;
        display: flex;
        background-color: #1a1a1a;
        padding: 0;
        max-width: 1400px;
        margin: 0 auto;
      }
      
      .scrolly article {
        position: relative;
        padding: 2rem;
        width: 40%;
        background-color: #2d2d2d;
      }
      
      .scrolly .step p {
        color: #cccccc;
      }
      
      .scrolly .figure {
        background-color: #2d2d2d;
      }
      
      #navbar {
        background-color: rgba(45, 45, 45, 0.95);
        backdrop-filter: blur(10px);
      }
      
      #navbar a {
        color: #cccccc;
      }
      
      #navbar a:hover {
        background-color: #404040;
      }
      
      #navbar a.is-active {
        background-color: #007bff;
        color: white;
      }
    `;
  }
  
  getMinimalTheme() {
    return `
      /* Minimal theme */
      .chapter {
        min-height: 75vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 2rem;
        background-color: #ffffff;
      }
      
      .chapter h1 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
        color: #000000;
        font-weight: 300;
      }
      
      .chapter p {
        font-size: 1.1rem;
        max-width: 600px;
        line-height: 1.6;
        color: #666666;
        font-weight: 300;
      }
      
      .scrolly {
        position: relative;
        display: flex;
        background-color: #ffffff;
        padding: 0;
        max-width: 1200px;
        margin: 0 auto;
      }
      
      .scrolly article {
        position: relative;
        padding: 1.5rem;
        width: 40%;
      }
      
      .scrolly .step p {
        font-weight: 300;
        color: #333333;
      }
      
      .scrolly .figure {
        background-color: #ffffff;
        border: 1px solid #e0e0e0;
      }
      
      #navbar {
        background-color: rgba(255, 255, 255, 0.9);
        border-top: 1px solid #e0e0e0;
      }
      
      #navbar a {
        color: #666666;
        font-weight: 300;
      }
      
      #navbar a:hover {
        background-color: #f5f5f5;
      }
      
      #navbar a.is-active {
        background-color: #000000;
        color: white;
      }
    `;
  }
  
  // Method to add custom styles
  addCustomStyles(styles) {
    const styleElement = document.createElement('style');
    styleElement.id = 'scrolly-vizzu-custom';
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
  }
  
  // Method to remove custom styles
  removeCustomStyles() {
    const customStyle = document.getElementById('scrolly-vizzu-custom');
    if (customStyle) {
      customStyle.remove();
    }
  }
} 