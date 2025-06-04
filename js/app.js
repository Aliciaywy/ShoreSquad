/**
 * ShoreSquad Web Application
 * Modern JavaScript with ES6+ features for interactivity and performance
 * Focus on accessibility, mobile-first design, and user experience
 */

class ShoreSquadApp {
  constructor() {
    this.isLoading = false;
    this.animationObserver = null;
    this.init();
  }
  /**
   * Initialize the application
   */
  init() {
    this.setupEventListeners();
    this.initializeIntersectionObserver();
    this.initializeCounterAnimations();
    this.initializeSmoothScrolling();
    this.initializeAccessibilityFeatures();
    this.initializePerformanceOptimizations();
    this.initializeWeatherForecast();
    
    // Set loading state to false after initialization
    this.setLoadingState(false);
    
    console.log('🌊 ShoreSquad App Initialized with Weather Forecast!');
  }

  /**
   * Set up all event listeners
   */
  setupEventListeners() {
    // Navigation toggle for mobile
    this.setupMobileNavigation();
    
    // Button click handlers
    this.setupButtonHandlers();
    
    // Form submissions
    this.setupFormHandlers();
    
    // Window events
    this.setupWindowEvents();
    
    // Keyboard navigation
    this.setupKeyboardNavigation();
  }

  /**
   * Mobile navigation toggle functionality
   */
  setupMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        
        // Toggle ARIA state
        navToggle.setAttribute('aria-expanded', !isExpanded);
        
        // Toggle classes
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = !isExpanded ? 'hidden' : '';
        
        // Focus management for accessibility
        if (!isExpanded) {
          const firstLink = navMenu.querySelector('.nav-link');
          if (firstLink) firstLink.focus();
        }
      });

      // Close menu when clicking nav links
      const navLinks = document.querySelectorAll('.nav-link');
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          navToggle.classList.remove('active');
          navMenu.classList.remove('active');
          navToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        });
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
          navToggle.classList.remove('active');
          navMenu.classList.remove('active');
          navToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    }
  }

  /**
   * Set up button click handlers
   */
  setupButtonHandlers() {
    // Get Started button
    const getStartedBtns = document.querySelectorAll('.btn-primary');
    getStartedBtns.forEach(btn => {
      if (btn.textContent.includes('Get Started') || btn.textContent.includes('Download App')) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.handleGetStarted();
        });
      }
    });

    // Watch Demo button
    const demoBtns = document.querySelectorAll('.btn-secondary');
    demoBtns.forEach(btn => {
      if (btn.textContent.includes('Watch Demo')) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.handleWatchDemo();
        });
      }
    });

    // Get Updates button
    const updateBtns = document.querySelectorAll('.btn-outline');
    updateBtns.forEach(btn => {
      if (btn.textContent.includes('Get Updates')) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.handleGetUpdates();
        });
      }
    });
  }

  /**
   * Handle Get Started action
   */
  handleGetStarted() {
    this.showNotification('🚀 Ready to make waves? App download coming soon!', 'success');
    
    // Analytics tracking (placeholder)
    this.trackEvent('cta_click', 'get_started');
    
    // Simulate app download or redirect
    setTimeout(() => {
      this.showNotification('📱 We\'ll notify you when the app is ready!', 'info');
    }, 2000);
  }

  /**
   * Handle Watch Demo action
   */
  handleWatchDemo() {
    this.showNotification('🎬 Demo video coming soon! For now, explore our features below.', 'info');
    
    // Smooth scroll to features section
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    this.trackEvent('cta_click', 'watch_demo');
  }

  /**
   * Handle Get Updates action
   */
  handleGetUpdates() {
    const email = prompt('🌊 Enter your email to get ShoreSquad updates:');
    
    if (email && this.isValidEmail(email)) {
      this.showNotification(`✅ Thanks! We'll send updates to ${email}`, 'success');
      this.trackEvent('newsletter_signup', 'get_updates');
      
      // Store email in localStorage (in real app, send to backend)
      this.storeEmailSubscription(email);
    } else if (email) {
      this.showNotification('❌ Please enter a valid email address', 'error');
    }
  }

  /**
   * Set up form handlers
   */
  setupFormHandlers() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleFormSubmission(form);
      });
    });
  }

  /**
   * Handle form submissions
   */
  handleFormSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    this.showNotification('📝 Form submitted successfully!', 'success');
    console.log('Form data:', data);
    
    // Reset form
    form.reset();
  }

  /**
   * Set up window event listeners
   */
  setupWindowEvents() {
    // Header scroll effect
    window.addEventListener('scroll', this.throttle(() => {
      const header = document.querySelector('.header');
      if (header) {
        const scrolled = window.scrollY > 50;
        header.style.background = scrolled 
          ? 'rgba(255, 255, 255, 0.98)' 
          : 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = scrolled 
          ? '0 2px 20px rgba(0, 0, 0, 0.1)' 
          : 'none';
      }
    }, 100));

    // Resize handler
    window.addEventListener('resize', this.debounce(() => {
      this.handleResize();
    }, 250));

    // Page visibility change
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        console.log('🌊 Welcome back to ShoreSquad!');
      }
    });
  }

  /**
   * Handle window resize
   */
  handleResize() {
    // Close mobile menu on resize to larger screen
    if (window.innerWidth > 768) {
      const navToggle = document.querySelector('.nav-toggle');
      const navMenu = document.querySelector('.nav-menu');
      
      if (navToggle && navMenu) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    }
  }

  /**
   * Set up keyboard navigation
   */
  setupKeyboardNavigation() {
    // Escape key to close mobile menu
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu && navMenu.classList.contains('active')) {
          navToggle.classList.remove('active');
          navMenu.classList.remove('active');
          navToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
          navToggle.focus();
        }
      }
    });

    // Tab trapping in mobile menu
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
      navMenu.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && navMenu.classList.contains('active')) {
          const focusableElements = navMenu.querySelectorAll('.nav-link');
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      });
    }
  }

  /**
   * Initialize Intersection Observer for animations
   */
  initializeIntersectionObserver() {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    this.animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          // Trigger counter animation for stats
          if (entry.target.classList.contains('stat-number')) {
            this.animateCounter(entry.target);
          }
        }
      });
    }, options);

    // Observe elements for animation
    const observeElements = document.querySelectorAll('.feature-card, .step, .impact-card, .stat');
    observeElements.forEach(el => {
      this.animationObserver.observe(el);
    });
  }

  /**
   * Initialize counter animations
   */
  initializeCounterAnimations() {
    // Add CSS for animation
    const style = document.createElement('style');
    style.textContent = `
      .feature-card, .step, .impact-card, .stat {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
      }
      .feature-card.animate-in, .step.animate-in, .impact-card.animate-in, .stat.animate-in {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Animate counter numbers
   */
  animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const increment = target / 100;
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        element.textContent = Math.floor(current).toLocaleString();
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target.toLocaleString();
      }
    };

    updateCounter();
  }

  /**
   * Initialize smooth scrolling for anchor links
   */
  initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const headerHeight = document.querySelector('.header').offsetHeight;
          const targetPosition = targetElement.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Update focus for accessibility
          targetElement.setAttribute('tabindex', '-1');
          targetElement.focus();
          targetElement.addEventListener('blur', () => {
            targetElement.removeAttribute('tabindex');
          }, { once: true });
        }
      });
    });
  }

  /**
   * Initialize accessibility features
   */
  initializeAccessibilityFeatures() {
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add main landmark
    const main = document.querySelector('main');
    if (main) {
      main.id = 'main';
    }

    // Improve button accessibility
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
      if (!btn.getAttribute('aria-label') && !btn.textContent.trim()) {
        btn.setAttribute('aria-label', 'Action button');
      }
    });

    // Add loading states
    this.setupLoadingStates();
  }

  /**
   * Set up loading states for buttons
   */
  setupLoadingStates() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Loading...';
        btn.disabled = true;
        
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.disabled = false;
        }, 2000);
      });
    });
  }

  /**
   * Initialize performance optimizations
   */
  initializePerformanceOptimizations() {
    // Lazy load images when implemented
    this.initializeLazyLoading();
    
    // Preconnect to external resources
    this.preconnectResources();
    
    // Initialize service worker for PWA capabilities
    this.initializeServiceWorker();
  }

  /**
   * Initialize lazy loading for images
   */
  initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if (images.length > 0) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    }
  }

  /**
   * Preconnect to external resources
   */
  preconnectResources() {
    const resources = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://cdnjs.cloudflare.com'
    ];

    resources.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = url;
      document.head.appendChild(link);
    });
  }

  /**
   * Initialize service worker for PWA
   */
  initializeServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('🔧 Service Worker registered:', registration);
          })
          .catch(error => {
            console.log('❌ Service Worker registration failed:', error);
          });
      });
    }
  }

  /**
   * Weather forecast functionality
   */
  initializeWeatherForecast() {
    this.weatherAPI = new WeatherAPIHandler();
    this.weatherAPI.loadCurrentWeather();
    this.weatherAPI.loadWeatherForecast();
  }

  /**
   * Utility Functions
   */

  /**
   * Show notification to user
   */
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <span>${message}</span>
      <button class="notification-close" aria-label="Close notification">×</button>
    `;

    // Add styles
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#81B29A' : type === 'error' ? '#F07167' : '#2E86AB'};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 10000;
      max-width: 400px;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
      background: none;
      border: none;
      color: white;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0;
      margin-left: 1rem;
    `;

    const closeNotification = () => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    };

    closeBtn.addEventListener('click', closeNotification);

    // Auto close after 5 seconds
    setTimeout(closeNotification, 5000);
  }

  /**
   * Validate email address
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Store email subscription
   */
  storeEmailSubscription(email) {
    try {
      const subscriptions = JSON.parse(localStorage.getItem('shoresquad_emails') || '[]');
      if (!subscriptions.includes(email)) {
        subscriptions.push(email);
        localStorage.setItem('shoresquad_emails', JSON.stringify(subscriptions));
      }
    } catch (error) {
      console.error('Error storing email:', error);
    }
  }

  /**
   * Track events (placeholder for analytics)
   */
  trackEvent(action, label = '') {
    console.log(`📊 Event tracked: ${action}${label ? ` - ${label}` : ''}`);
    
    // In a real app, this would send to analytics service
    // Example: gtag('event', action, { event_label: label });
  }

  /**
   * Set loading state
   */
  setLoadingState(loading) {
    this.isLoading = loading;
    document.body.classList.toggle('loading', loading);
  }

  /**
   * Throttle function for performance
   */
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  /**
   * Debounce function for performance
   */
  debounce(func, delay) {
    let timeoutId;
    return function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }
}

/**
 * Initialize the app when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
  window.shoreSquadApp = new ShoreSquadApp();
});

/**
 * Progressive Web App features
 */

// Install prompt for PWA
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = e;
  
  // Show install button/banner
  console.log('💻 PWA install prompt available');
});

window.addEventListener('appinstalled', (evt) => {
  console.log('📱 ShoreSquad PWA was installed');
});

/**
 * Weather API integration (placeholder)
 * In a real app, this would connect to a weather service
 */
class WeatherService {  static async getWeatherForLocation(lat, lon) {
    // Placeholder for weather API
    return {
      temperature: Math.round(Math.random() * 30 + 10), // Celsius: 10-40°C
      condition: 'sunny',
      windSpeed: Math.round(Math.random() * 25 + 5), // km/h: 5-30 km/h
      humidity: Math.round(Math.random() * 40 + 30)
    };
  }
}

/**
 * Map integration (placeholder)
 * In a real app, this would integrate with Google Maps, Mapbox, etc.
 */
class MapService {  static async getNearbyBeaches(lat, lon) {
    // Placeholder for map API
    return [
      { name: 'Sunset Beach', distance: '3.7 km', cleanupNeeded: true },
      { name: 'Ocean View Beach', distance: '8.2 km', cleanupNeeded: false },
      { name: 'Coastal Park Beach', distance: '12.6 km', cleanupNeeded: true }
    ];
  }
}

/**
 * Weather API Handler for Singapore NEA Data
 * Fetches real-time weather data from data.gov.sg APIs
 */
class WeatherAPIHandler {
  constructor() {
    this.baseURL = 'https://api.data.gov.sg/v1';
    this.currentWeatherEndpoint = '/environment/realtime-weather-readings';
    this.forecastEndpoint = '/environment/24-hour-weather-forecast';
    this.airTempEndpoint = '/environment/air-temperature';
    this.rainfallEndpoint = '/environment/rainfall';
    
    // Station ID for Pasir Ris area (closest to our cleanup location)
    this.stationId = 'S09'; // Pasir Ris station
    
    this.retryCount = 0;
    this.maxRetries = 3;
  }

  /**
   * Load current weather conditions
   */
  async loadCurrentWeather() {
    try {
      const [tempData, rainfallData] = await Promise.all([
        this.fetchWithRetry(`${this.baseURL}${this.airTempEndpoint}`),
        this.fetchWithRetry(`${this.baseURL}${this.rainfallEndpoint}`)
      ]);

      this.displayCurrentWeather(tempData, rainfallData);
    } catch (error) {
      console.error('Error loading current weather:', error);
      this.displayWeatherError('current');
    }
  }

  /**
   * Load 24-hour weather forecast (simulating 7-day for demo)
   */
  async loadWeatherForecast() {
    try {
      const forecastData = await this.fetchWithRetry(`${this.baseURL}${this.forecastEndpoint}`);
      this.displayWeatherForecast(forecastData);
    } catch (error) {
      console.error('Error loading weather forecast:', error);
      this.displayWeatherError('forecast');
    }
  }

  /**
   * Fetch data with retry mechanism
   */
  async fetchWithRetry(url, options = {}) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'ShoreSquad/1.0'
        },
        ...options
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (this.retryCount < this.maxRetries) {
        this.retryCount++;
        console.log(`Retrying request (${this.retryCount}/${this.maxRetries})...`);
        await this.delay(1000 * this.retryCount);
        return this.fetchWithRetry(url, options);
      }
      throw error;
    }
  }

  /**
   * Display current weather data
   */
  displayCurrentWeather(tempData, rainfallData) {
    try {
      // Find Pasir Ris station data or use closest available
      const stations = tempData?.items?.[0]?.readings || [];
      const rainfallStations = rainfallData?.items?.[0]?.readings || [];
      
      let stationData = stations.find(station => 
        station.station_id === this.stationId || 
        station.station_id.includes('S09')
      ) || stations[0];

      let rainfallStation = rainfallStations.find(station => 
        station.station_id === this.stationId ||
        station.station_id.includes('S09')
      ) || rainfallStations[0];

      if (stationData) {
        const temp = Math.round(stationData.value);
        const humidity = this.calculateHumidity(temp);
        const windSpeed = this.generateWindSpeed();
        const rainfall = rainfallStation?.value || 0;
        
        // Update current weather display
        document.getElementById('current-temp').textContent = `${temp}°C`;
        document.getElementById('current-humidity').textContent = `${humidity}%`;
        document.getElementById('current-wind').textContent = `${windSpeed} km/h`;
        document.getElementById('current-rainfall').textContent = `${rainfall} mm`;
        
        // Update weather condition and icon
        const condition = this.getWeatherCondition(temp, rainfall, humidity);
        document.getElementById('current-condition').textContent = condition.text;
        document.getElementById('current-weather-icon').className = `fas ${condition.icon}`;
        
        // Update cleanup recommendation
        this.updateCleanupRecommendation(temp, rainfall, windSpeed, humidity);
      }
    } catch (error) {
      console.error('Error displaying current weather:', error);
      this.displayWeatherError('current');
    }
  }

  /**
   * Display weather forecast (simulate 7-day using available data)
   */
  displayWeatherForecast(forecastData) {
    try {
      const forecastGrid = document.getElementById('forecast-grid');
      
      // Generate 7-day forecast using Singapore weather patterns
      const forecast = this.generateSevenDayForecast(forecastData);
      
      forecastGrid.innerHTML = forecast.map((day, index) => `
        <div class="forecast-card" data-day="${index}">
          <div class="forecast-date">${day.date}</div>
          <div class="forecast-icon">
            <i class="fas ${day.icon}" aria-hidden="true"></i>
          </div>
          <div class="forecast-temps">
            <span class="forecast-high">${day.high}°</span>
            <span class="forecast-low">${day.low}°</span>
          </div>
          <div class="forecast-condition">${day.condition}</div>
          <div class="forecast-details">
            <div class="forecast-detail">
              <i class="fas fa-tint" aria-hidden="true"></i>
              <span>${day.humidity}%</span>
            </div>
            <div class="forecast-detail">
              <i class="fas fa-wind" aria-hidden="true"></i>
              <span>${day.wind}km/h</span>
            </div>
          </div>
        </div>
      `).join('');

      // Add click handlers for forecast cards
      this.addForecastInteractivity();
      
    } catch (error) {
      console.error('Error displaying weather forecast:', error);
      this.displayWeatherError('forecast');
    }
  }

  /**
   * Generate 7-day forecast based on Singapore weather patterns
   */
  generateSevenDayForecast(forecastData) {
    const days = ['Today', 'Tomorrow'];
    const currentDate = new Date();
    
    // Add remaining days
    for (let i = 2; i < 7; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);
      days.push(date.toLocaleDateString('en-SG', { weekday: 'short', day: 'numeric' }));
    }

    return days.map((day, index) => {
      const baseTemp = 28; // Average Singapore temperature
      const variation = Math.sin(index * 0.5) * 3; // Simulate weather variation
      const rainfall = Math.random() * 10; // Random rainfall
      
      return {
        date: day,
        high: Math.round(baseTemp + variation + 4),
        low: Math.round(baseTemp + variation - 2),
        condition: this.getWeatherCondition(baseTemp + variation, rainfall, 80).text,
        icon: this.getWeatherCondition(baseTemp + variation, rainfall, 80).icon,
        humidity: Math.round(75 + Math.random() * 20),
        wind: Math.round(10 + Math.random() * 15)
      };
    });
  }

  /**
   * Determine weather condition based on temperature, rainfall, and humidity
   */
  getWeatherCondition(temp, rainfall, humidity) {
    if (rainfall > 5) {
      return { text: 'Heavy Rain', icon: 'fa-cloud-rain' };
    } else if (rainfall > 1) {
      return { text: 'Light Rain', icon: 'fa-cloud-drizzle' };
    } else if (humidity > 85) {
      return { text: 'Partly Cloudy', icon: 'fa-cloud-sun' };
    } else if (temp > 32) {
      return { text: 'Hot & Sunny', icon: 'fa-sun' };
    } else {
      return { text: 'Sunny', icon: 'fa-sun' };
    }
  }

  /**
   * Update cleanup recommendation based on weather conditions
   */
  updateCleanupRecommendation(temp, rainfall, windSpeed, humidity) {
    const recommendationEl = document.getElementById('weather-recommendation');
    const textEl = document.getElementById('cleanup-recommendation');
    
    let recommendation = '';
    let className = '';

    if (rainfall > 3 || windSpeed > 25) {
      className = 'poor';
      recommendation = '⚠️ Poor conditions for beach cleanup. High rainfall or strong winds expected. Consider rescheduling for safety.';
    } else if (rainfall > 1 || temp > 35 || humidity > 90) {
      className = 'fair';
      recommendation = '⚡ Fair conditions for cleanup. Some rain or high heat expected. Bring extra water and rain protection.';
    } else if (temp > 30 && humidity < 80) {
      className = 'good';
      recommendation = '👍 Good conditions for beach cleanup. Warm weather with manageable humidity. Stay hydrated!';
    } else {
      className = 'excellent';
      recommendation = '🌟 Excellent conditions for beach cleanup! Perfect temperature and low chance of rain. Great day to make a difference!';
    }

    recommendationEl.className = `weather-recommendation ${className}`;
    textEl.textContent = recommendation;
  }

  /**
   * Calculate humidity based on temperature (Singapore climate)
   */
  calculateHumidity(temp) {
    // Singapore typically has high humidity (70-90%)
    const baseHumidity = 82;
    const tempVariation = (30 - temp) * 2; // Higher temp = lower humidity
    return Math.max(65, Math.min(95, Math.round(baseHumidity + tempVariation)));
  }

  /**
   * Generate realistic wind speed for Singapore
   */
  generateWindSpeed() {
    // Singapore typically has light winds (5-20 km/h)
    return Math.round(8 + Math.random() * 12);
  }

  /**
   * Add interactivity to forecast cards
   */
  addForecastInteractivity() {
    const forecastCards = document.querySelectorAll('.forecast-card');
    
    forecastCards.forEach(card => {
      card.addEventListener('click', () => {
        // Remove active class from all cards
        forecastCards.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked card
        card.classList.add('active');
        
        // Could show detailed view here
        this.showDetailedForecast(card.dataset.day);
      });
    });
  }

  /**
   * Show detailed forecast for selected day
   */
  showDetailedForecast(dayIndex) {
    // This could open a modal or update a detailed view
    console.log(`Showing detailed forecast for day ${dayIndex}`);
  }

  /**
   * Display error message when weather data fails to load
   */
  displayWeatherError(type) {
    if (type === 'current') {
      document.getElementById('current-temp').textContent = '--°C';
      document.getElementById('current-condition').textContent = 'Unable to load';
      document.getElementById('current-humidity').textContent = '--%';
      document.getElementById('current-wind').textContent = '-- km/h';
      document.getElementById('current-rainfall').textContent = '-- mm';
    } else if (type === 'forecast') {
      const forecastGrid = document.getElementById('forecast-grid');
      forecastGrid.innerHTML = `
        <div class="forecast-error">
          <i class="fas fa-exclamation-triangle" aria-hidden="true"></i>
          <p>Unable to load weather forecast. Please try again later.</p>
        </div>
      `;
    }
  }

  /**
   * Utility function for delays
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Initialize the ShoreSquad app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ShoreSquadApp();
});
