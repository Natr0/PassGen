import { initTheme } from './src/js/theme.js';
import { initLoading } from './src/js/loading.js';
import { initPasswordGenerator } from './src/js/passwordGenerator.js';
import { isElementPresent } from './src/js/utils.js';

// Initialize all modules
window.addEventListener('load', () => {
    // Theme should be initialized on all pages
    initTheme();
    
    // Loading screen only on main page
    if (isElementPresent('loading-screen')) {
        initLoading();
    }
    
    // Password generator only on main page
    if (isElementPresent('generate')) {
        initPasswordGenerator();
    }
});