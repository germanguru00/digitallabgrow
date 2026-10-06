/**
 * DIGITAL GROWTH LAB™ - Dynamic Theme Engine (Light / Dark Mode)
 * Default Theme: Light Mode (as requested)
 * Supports user toggle, persistence via localStorage, and responsive UI icon synchronization.
 */

(function() {
  // 1. Initialize Theme on immediate script execution (before DOM render to prevent FOUC)
  function initTheme() {
    var savedTheme = localStorage.getItem('dgl_theme');
    
    // Default to 'light' mode unless explicitly saved as 'dark'
    if (savedTheme === 'dark') {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
  }

  initTheme();

  // 2. Global Toggle Function
  window.toggleTheme = function() {
    var isLight = document.documentElement.classList.toggle('light');
    var newTheme = isLight ? 'light' : 'dark';
    try {
      localStorage.setItem('dgl_theme', newTheme);
    } catch (e) {
      console.warn('localStorage access error:', e);
    }
    updateThemeToggleUI();
  };

  // 3. Synchronize UI Buttons & Icons (Sun / Moon)
  function updateThemeToggleUI() {
    var isLight = document.documentElement.classList.contains('light');
    
    // Update all toggle buttons on the page
    var toggleButtons = document.querySelectorAll('.theme-toggle-btn');
    toggleButtons.forEach(function(btn) {
      var sunIcon = btn.querySelector('.sun-icon');
      var moonIcon = btn.querySelector('.moon-icon');
      if (sunIcon && moonIcon) {
        if (isLight) {
          sunIcon.classList.add('hidden');
          moonIcon.classList.remove('hidden');
          btn.setAttribute('title', 'Switch to Dark Mode');
          btn.setAttribute('aria-label', 'Switch to Dark Mode');
        } else {
          sunIcon.classList.remove('hidden');
          moonIcon.classList.add('hidden');
          btn.setAttribute('title', 'Switch to Light Mode');
          btn.setAttribute('aria-label', 'Switch to Light Mode');
        }
      }
    });

    // Update Mobile Drawer toggle if present
    var drawerToggles = document.querySelectorAll('.theme-drawer-toggle');
    drawerToggles.forEach(function(btn) {
      var pill = btn.querySelector('.theme-current-pill');
      var icon = btn.querySelector('.theme-mode-icon');
      if (pill) {
        pill.textContent = isLight ? 'Light Mode' : 'Dark Mode';
        if (isLight) {
          pill.className = 'theme-current-pill text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold bg-amber-500/15 text-amber-700 border border-amber-500/30';
        } else {
          pill.className = 'theme-current-pill text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30';
        }
      }
      if (icon) {
        icon.textContent = isLight ? '☀️' : '🌙';
      }
    });
  }

  // 4. Run update on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateThemeToggleUI);
  } else {
    updateThemeToggleUI();
  }
})();
