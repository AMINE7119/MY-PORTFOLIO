// DOM Elements
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const sections = document.querySelectorAll('section');
const projectGrid = document.querySelector('.project-grid');

// Project Data
const projects = [
    {
        id: 1,
        title: 'E-Commerce Platform',
        description: 'Full-stack e-commerce solution with React and Node.js',
        category: 'web',
        image: 'assets/images/web/ecommerce.jpg',
        technologies: ['React', 'Node.js', 'MongoDB'],
        github: 'https://github.com/username/ecommerce',
        demo: 'https://ecommerce-demo.com'
    },
    {
        id: 2,
        title: 'Adventure Game',
        description: '2D platform game built with JavaScript and Canvas',
        category: 'game',
        image: 'assets/images/games/adventure.jpg',
        technologies: ['JavaScript', 'HTML5 Canvas'],
        github: 'https://github.com/username/adventure-game',
        demo: 'https://adventure-game-demo.com'
    },
    {
        id: 3,
        title: 'Security Scanner',
        description: 'Web application security vulnerability scanner',
        category: 'security',
        image: 'assets/images/security/scanner.jpg',
        technologies: ['Python', 'SQLite'],
        github: 'https://github.com/username/security-scanner',
        demo: 'https://security-scanner-demo.com'
    }
];

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Active Section Highlight
function highlightActiveSection() {
    const scrollPosition = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            const currentActive = document.querySelector('.nav-links a.active');
            if (currentActive) {
                currentActive.classList.remove('active');
            }
            document.querySelector(`.nav-links a[href="#${section.id}"]`).classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);

// Project Card Creation
function createProjectCard(project) {
    return `
        <div class="project-card" data-category="${project.category}">
            <img src="${project.image}" alt="${project.title}">
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="technologies">
                    ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.github}" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-github"></i> GitHub
                    </a>
                    <a href="${project.demo}" target="_blank" rel="noopener noreferrer">
                        <i class="fas fa-external-link-alt"></i> Live Demo
                    </a>
                </div>
            </div>
        </div>
    `;
}

// Initialize Project Grid
function initializeProjects() {
    projectGrid.innerHTML = projects.map(project => createProjectCard(project)).join('');
}

// Form Submission
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const formProps = Object.fromEntries(formData);
    
    try {
        // Add your form submission logic here
        console.log('Form submitted:', formProps);
        contactForm.reset();
        alert('Message sent successfully!');
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('Error sending message. Please try again.');
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeProjects();
    highlightActiveSection();
});