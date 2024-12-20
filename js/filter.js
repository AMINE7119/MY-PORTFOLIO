// DOM Elements
const filterButtons = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-card');
const projectGrid = document.querySelector('.project-grid');

// Initialize Isotope-like filtering
class ProjectFilter {
    constructor(grid, items, buttons) {
        this.grid = grid;
        this.items = items;
        this.buttons = buttons;
        this.currentFilter = 'all';
        
        this.init();
    }

    init() {
        // Add click events to filter buttons
        this.buttons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                this.filterProjects(filter);
                this.updateActiveButton(button);
            });
        });

        // Initialize with 'all' filter
        this.filterProjects('all');
    }

    filterProjects(filter) {
        this.currentFilter = filter;
        
        // Show/hide items based on filter
        this.items.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                this.fadeIn(item);
            } else {
                this.fadeOut(item);
            }
        });

        // Trigger layout animation
        this.animateLayout();
    }

    fadeIn(element) {
        element.style.opacity = '0';
        element.style.display = 'block';
        
        // Trigger reflow
        element.offsetHeight;
        
        element.style.transition = 'opacity 0.5s ease';
        element.style.opacity = '1';
    }

    fadeOut(element) {
        element.style.opacity = '0';
        element.addEventListener('transitionend', function handler() {
            element.style.display = 'none';
            element.removeEventListener('transitionend', handler);
        });
    }

    animateLayout() {
        // Get visible items
        const visibleItems = Array.from(this.items).filter(item => {
            const category = item.getAttribute('data-category');
            return this.currentFilter === 'all' || category === this.currentFilter;
        });

        // Calculate and apply new positions
        visibleItems.forEach((item, index) => {
            const row = Math.floor(index / 3);
            const col = index % 3;
            
            item.style.transform = `translate(${col * 33.33}%, ${row * 100}%)`;
            item.style.transition = 'transform 0.5s ease';
        });
    }

    updateActiveButton(activeButton) {
        this.buttons.forEach(button => {
            button.classList.remove('active');
        });
        activeButton.classList.add('active');
    }
}

// Search functionality
class ProjectSearch {
    constructor(items) {
        this.items = items;
        this.searchInput = document.getElementById('project-search');
        
        if (this.searchInput) {
            this.init();
        }
    }

    init() {
        this.searchInput.addEventListener('input', () => {
            this.searchProjects(this.searchInput.value.toLowerCase());
        });
    }

    searchProjects(query) {
        this.items.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const description = item.querySelector('p').textContent.toLowerCase();
            const technologies = Array.from(item.querySelectorAll('.technologies span'))
                .map(span => span.textContent.toLowerCase());

            const matchesSearch = title.includes(query) || 
                                description.includes(query) || 
                                technologies.some(tech => tech.includes(query));

            if (matchesSearch) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
}

// Tag filtering functionality
class TagFilter {
    constructor(items) {
        this.items = items;
        this.tags = this.collectTags();
        this.selectedTags = new Set();
        
        this.init();
    }

    collectTags() {
        const tagSet = new Set();
        
        this.items.forEach(item => {
            const technologies = item.querySelectorAll('.technologies span');
            technologies.forEach(tech => {
                tagSet.add(tech.textContent.toLowerCase());
            });
        });

        return Array.from(tagSet);
    }

    init() {
        this.createTagButtons();
    }

    createTagButtons() {
        const tagContainer = document.createElement('div');
        tagContainer.className = 'tag-filters';
        
        this.tags.forEach(tag => {
            const button = document.createElement('button');
            button.className = 'tag-filter-btn';
            button.textContent = tag;
            button.addEventListener('click', () => this.toggleTag(tag, button));
            
            tagContainer.appendChild(button);
        });

        const filterSection = document.querySelector('.filter-buttons');
        if (filterSection) {
            filterSection.appendChild(tagContainer);
        }
    }

    toggleTag(tag, button) {
        if (this.selectedTags.has(tag)) {
            this.selectedTags.delete(tag);
            button.classList.remove('active');
        } else {
            this.selectedTags.add(tag);
            button.classList.add('active');
        }

        this.filterByTags();
    }

    filterByTags() {
        if (this.selectedTags.size === 0) {
            this.items.forEach(item => item.style.display = 'block');
            return;
        }

        this.items.forEach(item => {
            const technologies = Array.from(item.querySelectorAll('.technologies span'))
                .map(span => span.textContent.toLowerCase());
            
            const hasAllTags = Array.from(this.selectedTags)
                .every(tag => technologies.includes(tag));

            item.style.display = hasAllTags ? 'block' : 'none';
        });
    }
}

// Initialize filtering and searching
document.addEventListener('DOMContentLoaded', () => {
    const projectFilter = new ProjectFilter(projectGrid, projectItems, filterButtons);
    const projectSearch = new ProjectSearch(projectItems);
    const tagFilter = new TagFilter(projectItems);
});

// Export classes for use in other modules
export {
    ProjectFilter,
    ProjectSearch,
    TagFilter
};