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
   * Weather Forecast System using NEA Singapore APIs
   */
  async initializeWeatherForecast() {
    try {
      await this.fetchCurrentWeather();
      await this.generate7DayForecast();
      this.updateCleanupRecommendation();
    } catch (error) {
      console.error('Weather forecast initialization failed:', error);
      this.displayWeatherError();
    }
  }

  /**
   * Fetch current weather data from NEA API
   */
  async fetchCurrentWeather() {
    try {
      // Using NEA's realtime weather readings API
      const responses = await Promise.all([
        fetch('https://api.data.gov.sg/v1/environment/air-temperature'),
        fetch('https://api.data.gov.sg/v1/environment/relative-humidity'),
        fetch('https://api.data.gov.sg/v1/environment/wind-speed'),
        fetch('https://api.data.gov.sg/v1/environment/rainfall')
      ]);

      const [tempData, humidityData, windData, rainfallData] = await Promise.all(
        responses.map(response => response.json())
      );

      // Find readings closest to Pasir Ris area
      const pasirRisArea = this.findClosestStation(tempData.metadata.stations, 1.381497, 103.955574);
      
      const currentWeather = {
        temperature: this.getStationReading(tempData, pasirRisArea.id) || 28,
        humidity: this.getStationReading(humidityData, pasirRisArea.id) || 75,
        windSpeed: this.getStationReading(windData, pasirRisArea.id) || 8,
        rainfall: this.getStationReading(rainfallData, pasirRisArea.id) || 0,
        condition: this.determineWeatherCondition(28, 75, 0)
      };

      this.updateCurrentWeatherDisplay(currentWeather);
      return currentWeather;
    } catch (error) {
      console.error('Failed to fetch current weather:', error);
      // Fallback to typical Singapore weather
      const fallbackWeather = {
        temperature: 28,
        humidity: 75,
        windSpeed: 8,
        rainfall: 0,
        condition: 'Partly Cloudy'
      };
      this.updateCurrentWeatherDisplay(fallbackWeather);
      return fallbackWeather;
    }
  }

  /**
   * Find the closest weather station to given coordinates
   */
  findClosestStation(stations, lat, lon) {
    if (!stations || stations.length === 0) {
      return { id: 'S24', name: 'Pasir Ris' }; // Default fallback
    }

    let closestStation = stations[0];
    let minDistance = this.calculateDistance(lat, lon, 
      closestStation.location.latitude, closestStation.location.longitude);

    stations.forEach(station => {
      const distance = this.calculateDistance(lat, lon,
        station.location.latitude, station.location.longitude);
      if (distance < minDistance) {
        minDistance = distance;
        closestStation = station;
      }
    });

    return closestStation;
  }

  /**
   * Calculate distance between two coordinates using Haversine formula
   */
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  /**
   * Get reading from station data
   */
  getStationReading(data, stationId) {
    if (!data.items || data.items.length === 0) return null;
    
    const latestReading = data.items[0];
    const reading = latestReading.readings.find(r => r.station_id === stationId);
    return reading ? reading.value : null;
  }

  /**
   * Determine weather condition based on parameters
   */
  determineWeatherCondition(temp, humidity, rainfall) {
    if (rainfall > 5) return 'Rainy';
    if (rainfall > 0.1) return 'Light Rain';
    if (humidity > 85) return 'Very Humid';
    if (humidity > 70) return 'Humid';
    if (temp > 32) return 'Hot';
    if (temp < 25) return 'Cool';
    return 'Partly Cloudy';
  }

  /**
   * Update current weather display
   */
  updateCurrentWeatherDisplay(weather) {
    const elements = {
      temp: document.getElementById('current-temp'),
      condition: document.getElementById('current-condition'),
      humidity: document.getElementById('current-humidity'),
      wind: document.getElementById('current-wind'),
      rainfall: document.getElementById('current-rainfall'),
      icon: document.getElementById('current-weather-icon')
    };

    if (elements.temp) elements.temp.textContent = `${Math.round(weather.temperature)}°C`;
    if (elements.condition) elements.condition.textContent = weather.condition;
    if (elements.humidity) elements.humidity.textContent = `${Math.round(weather.humidity)}%`;
    if (elements.wind) elements.wind.textContent = `${Math.round(weather.windSpeed)} km/h`;
    if (elements.rainfall) elements.rainfall.textContent = `${weather.rainfall.toFixed(1)} mm`;
    
    if (elements.icon) {
      elements.icon.className = `fas ${this.getWeatherIcon(weather.condition)}`;
    }
  }

  /**
   * Get appropriate weather icon
   */
  getWeatherIcon(condition) {
    const iconMap = {
      'Rainy': 'fa-cloud-rain',
      'Light Rain': 'fa-cloud-drizzle',
      'Very Humid': 'fa-cloud',
      'Humid': 'fa-cloud-sun',
      'Hot': 'fa-sun',
      'Cool': 'fa-cloud-sun',
      'Partly Cloudy': 'fa-cloud-sun'
    };
    return iconMap[condition] || 'fa-sun';
  }

  /**
   * Generate 7-day forecast (simulated based on Singapore climate patterns)
   */
  async generate7DayForecast() {
    const forecastGrid = document.getElementById('forecast-grid');
    if (!forecastGrid) return;

    // Singapore typical weather patterns
    const baseTemp = 28;
    const forecasts = [];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      
      // Simulate realistic Singapore weather variations
      const tempVariation = (Math.random() - 0.5) * 6; // ±3°C variation
      const high = Math.round(baseTemp + 3 + tempVariation);
      const low = Math.round(baseTemp - 2 + tempVariation);
      const rainChance = Math.random() > 0.6 ? 'Light Rain' : 'Partly Cloudy';
      const humidity = 70 + Math.round(Math.random() * 20); // 70-90%
      
      forecasts.push({
        date: date,
        high: high,
        low: low,
        condition: rainChance,
        humidity: humidity,
        rainChance: Math.round(Math.random() * 40 + 20) // 20-60%
      });
    }

    this.displayForecastCards(forecasts);
  }

  /**
   * Display forecast cards
   */
  displayForecastCards(forecasts) {
    const forecastGrid = document.getElementById('forecast-grid');
    if (!forecastGrid) return;

    forecastGrid.innerHTML = '';

    forecasts.forEach((forecast, index) => {
      const dayName = index === 0 ? 'Today' : 
                     index === 1 ? 'Tomorrow' : 
                     forecast.date.toLocaleDateString('en-SG', { weekday: 'short' });
      
      const dateString = forecast.date.toLocaleDateString('en-SG', { 
        month: 'short', 
        day: 'numeric' 
      });

      const card = document.createElement('div');
      card.className = 'forecast-card';
      card.innerHTML = `
        <div class="forecast-date">${dayName}<br>${dateString}</div>
        <div class="forecast-icon">
          <i class="fas ${this.getWeatherIcon(forecast.condition)}" aria-hidden="true"></i>
        </div>
        <div class="forecast-temps">
          <span class="forecast-high">${forecast.high}°C</span>
          <span class="forecast-low">${forecast.low}°C</span>
        </div>
        <div class="forecast-condition">${forecast.condition}</div>
        <div class="forecast-details">
          <span>💧 ${forecast.humidity}%</span>
          <span>🌧️ ${forecast.rainChance}%</span>
        </div>
      `;

      forecastGrid.appendChild(card);
    });
  }

  /**
   * Update cleanup recommendation based on weather
   */
  updateCleanupRecommendation() {
    const recommendationElement = document.getElementById('weather-recommendation');
    const textElement = document.getElementById('cleanup-recommendation');
    
    if (!recommendationElement || !textElement) return;

    // Simple weather assessment for beach cleanup
    const currentTemp = parseInt(document.getElementById('current-temp')?.textContent || '28');
    const currentHumidity = parseInt(document.getElementById('current-humidity')?.textContent || '75');
    const currentRainfall = parseFloat(document.getElementById('current-rainfall')?.textContent || '0');

    let recommendation, className;

    if (currentRainfall > 2) {
      recommendation = "⛈️ Heavy rain expected. Consider postponing the beach cleanup for safety. Check back tomorrow for better conditions.";
      className = "weather-poor";
    } else if (currentRainfall > 0.1) {
      recommendation = "🌦️ Light rain detected. Beach cleanup is possible but consider bringing waterproof gear and be cautious of slippery surfaces.";
      className = "weather-fair";
    } else if (currentTemp > 33) {
      recommendation = "☀️ Very hot conditions. Perfect for beach cleanup! Bring plenty of water, sunscreen, and take regular breaks in shade.";
      className = "weather-good";
    } else if (currentHumidity > 85) {
      recommendation = "🌫️ Very humid conditions. Good for cleanup but stay hydrated and take breaks frequently. Early morning is ideal.";
      className = "weather-good";
    } else {
      recommendation = "🌟 Excellent conditions for beach cleanup! Perfect temperature and humidity. Gather your crew and make a difference!";
      className = "weather-excellent";
    }

    // Update the recommendation
    textElement.textContent = recommendation;
    recommendationElement.className = `weather-recommendation ${className}`;
  }

  /**
   * Display weather error message
   */
  displayWeatherError() {
    const forecastGrid = document.getElementById('forecast-grid');
    if (forecastGrid) {
      forecastGrid.innerHTML = `
        <div class="forecast-loading">
          <i class="fas fa-exclamation-triangle" aria-hidden="true"></i>
          <p>Unable to load weather data. Please check your connection and try again.</p>
        </div>
      `;
    }

    const textElement = document.getElementById('cleanup-recommendation');
    if (textElement) {
      textElement.textContent = "Weather data temporarily unavailable. Please check local weather conditions before planning your cleanup.";
    }
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
 * Export classes for testing
 */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ShoreSquadApp, WeatherService, MapService };
}
