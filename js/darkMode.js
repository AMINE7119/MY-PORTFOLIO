// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved user preference, default to light mode
const savedTheme = localStorage.getItem('theme') || 'light';

// Function to set theme
function setTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        document.documentElement.removeAttribute('data-theme');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// Initialize theme
setTheme(savedTheme);

// Theme toggle event handler
themeToggle.addEventListener('click', () => {
    // Check current theme
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Save preference
    localStorage.setItem('theme', newTheme);
    
    // Update theme
    setTheme(newTheme);
    
    // Trigger custom event for other components
    window.dispatchEvent(new CustomEvent('themechange', {
        detail: { theme: newTheme }
    }));
});

// Function to get current theme
function getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
}

// System theme change detection
const systemThemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

function handleSystemThemeChange(e) {
    if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
    }
}

systemThemeMediaQuery.addListener(handleSystemThemeChange);

// Initial system theme check
if (!localStorage.getItem('theme')) {
    handleSystemThemeChange(systemThemeMediaQuery);
}

// Handle theme-sensitive images
function updateImages() {
    const currentTheme = getCurrentTheme();
    const images = document.querySelectorAll('img[data-dark-src]');
    
    images.forEach(img => {
        const darkSrc = img.getAttribute('data-dark-src');
        const lightSrc = img.getAttribute('data-light-src');
        
        if (currentTheme === 'dark' && darkSrc) {
            img.src = darkSrc;
        } else if (lightSrc) {
            img.src = lightSrc;
        }
    });
}

// Update images on theme change
window.addEventListener('themechange', updateImages);

// Initialize images on page load
document.addEventListener('DOMContentLoaded', updateImages);

// Export functions for use in other modules
export { getCurrentTheme, setTheme };