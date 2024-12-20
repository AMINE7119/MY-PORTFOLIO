// DOM Elements
const revealElements = document.querySelectorAll('.reveal');
const skillBars = document.querySelectorAll('.skill-category');
const projectCards = document.querySelectorAll('.project-card');

// Intersection Observer for reveal animations
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optional: stop observing after animation
            // revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px'
});

// Apply observer to reveal elements
revealElements.forEach(element => {
    revealObserver.observe(element);
});

// Skill bars animation
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-skill');
            skillObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// Project cards stagger animation
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add stagger delay based on index
            setTimeout(() => {
                entry.target.classList.add('fade-in');
            }, index * 100);
            projectObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

projectCards.forEach(card => {
    projectObserver.observe(card);
});

// Smooth scroll animation
function smoothScroll(target, duration) {
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    // Easing function
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Apply smooth scroll to all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            smoothScroll(target, 1000);
        }
    });
});

// Parallax effect for hero section
const hero = document.querySelector('.hero');
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
            ticking = false;
        });
        ticking = true;
    }
});

// Typing animation for hero text
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        typeWriter(heroTitle, heroTitle.textContent);
    }
});

// Export animation functions
export {
    smoothScroll,
    typeWriter
};
