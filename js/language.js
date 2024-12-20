// Language translations
const translations = {
    en: {
        // Navigation
        nav_home: 'Home',
        nav_about: 'About',
        nav_projects: 'Projects',
        nav_contact: 'Contact',

        // Hero Section
        hero_title: 'Welcome to My Portfolio',
        hero_subtitle: 'Full-Stack Developer & Security Enthusiast',
        hero_cta_projects: 'View Projects',
        hero_cta_contact: 'Contact Me',

        // About Section
        about_title: 'About Me',
        about_description: 'Full-stack developer with expertise in web development, game development, and security.',
        skills_frontend: 'Frontend',
        skills_backend: 'Backend',
        skills_tools: 'Tools',

        // Projects Section
        projects_title: 'Projects',
        filter_all: 'All',
        filter_web: 'Web',
        filter_game: 'Games',
        filter_security: 'Security',
        project_view_github: 'View on GitHub',
        project_live_demo: 'Live Demo',

        // Contact Section
        contact_title: 'Contact Me',
        contact_name_placeholder: 'Your Name',
        contact_email_placeholder: 'Your Email',
        contact_message_placeholder: 'Your Message',
        contact_submit: 'Send Message',
        contact_success: 'Message sent successfully!',
        contact_error: 'Error sending message. Please try again.',

        // Footer
        footer_copyright: '© 2024 Portfolio. All rights reserved.'
    },
    es: {
        // Navigation
        nav_home: 'Inicio',
        nav_about: 'Sobre Mí',
        nav_projects: 'Proyectos',
        nav_contact: 'Contacto',

        // Hero Section
        hero_title: 'Bienvenido a Mi Portafolio',
        hero_subtitle: 'Desarrollador Full-Stack y Entusiasta de la Seguridad',
        hero_cta_projects: 'Ver Proyectos',
        hero_cta_contact: 'Contactar',

        // About Section
        about_title: 'Sobre Mí',
        about_description: 'Desarrollador full-stack con experiencia en desarrollo web, desarrollo de juegos y seguridad.',
        skills_frontend: 'Frontend',
        skills_backend: 'Backend',
        skills_tools: 'Herramientas',

        // Projects Section
        projects_title: 'Proyectos',
        filter_all: 'Todos',
        filter_web: 'Web',
        filter_game: 'Juegos',
        filter_security: 'Seguridad',
        project_view_github: 'Ver en GitHub',
        project_live_demo: 'Demo en Vivo',

        // Contact Section
        contact_title: 'Contáctame',
        contact_name_placeholder: 'Tu Nombre',
        contact_email_placeholder: 'Tu Email',
        contact_message_placeholder: 'Tu Mensaje',
        contact_submit: 'Enviar Mensaje',
        contact_success: '¡Mensaje enviado con éxito!',
        contact_error: 'Error al enviar el mensaje. Por favor, intenta de nuevo.',

        // Footer
        footer_copyright: '© 2024 Portafolio. Todos los derechos reservados.'
    },
    fr: {
        // Navigation
        nav_home: 'Accueil',
        nav_about: 'À Propos',
        nav_projects: 'Projets',
        nav_contact: 'Contact',

        // Hero Section
        hero_title: 'Bienvenue sur Mon Portfolio',
        hero_subtitle: 'Développeur Full-Stack et Passionné de Sécurité',
        hero_cta_projects: 'Voir les Projets',
        hero_cta_contact: 'Me Contacter',

        // About Section
        about_title: 'À Propos de Moi',
        about_description: 'Développeur full-stack spécialisé dans le développement web, le développement de jeux et la sécurité.',
        skills_frontend: 'Frontend',
        skills_backend: 'Backend',
        skills_tools: 'Outils',

        // Projects Section
        projects_title: 'Projets',
        filter_all: 'Tous',
        filter_web: 'Web',
        filter_game: 'Jeux',
        filter_security: 'Sécurité',
        project_view_github: 'Voir sur GitHub',
        project_live_demo: 'Démo en Direct',

        // Contact Section
        contact_title: 'Me Contacter',
        contact_name_placeholder: 'Votre Nom',
        contact_email_placeholder: 'Votre Email',
        contact_message_placeholder: 'Votre Message',
        contact_submit: 'Envoyer le Message',
        contact_success: 'Message envoyé avec succès !',
        contact_error: 'Erreur lors de l\'envoi du message. Veuillez réessayer.',

        // Footer
        footer_copyright: '© 2024 Portfolio. Tous droits réservés.'
    }
};

// DOM Elements with data-i18n attributes
const i18nElements = document.querySelectorAll('[data-i18n]');
const languageSelect = document.getElementById('language-select');

// Initialize language from localStorage or default to English
const currentLanguage = localStorage.getItem('language') || 'en';
languageSelect.value = currentLanguage;

// Update text content for all elements with data-i18n attribute
function updateTexts(language) {
    i18nElements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[language] && translations[language][key]) {
            // Handle placeholder attribute for inputs
            if (element.placeholder !== undefined) {
                element.placeholder = translations[language][key];
            } else {
                element.textContent = translations[language][key];
            }
        }
    });
}

// Language change event handler
languageSelect.addEventListener('change', (e) => {
    const language = e.target.value;
    localStorage.setItem('language', language);
    updateTexts(language);
    
    // Update HTML lang attribute
    document.documentElement.lang = language;
    
    // Trigger event for other components
    window.dispatchEvent(new CustomEvent('languagechange', {
        detail: { language }
    }));
});

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    updateTexts(currentLanguage);
    document.documentElement.lang = currentLanguage;
});

// Export for use in other modules
export { translations, updateTexts };