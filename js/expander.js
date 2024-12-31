// expander.js

export class DifExpander {
    constructor() {
        this.container = document.querySelector('.dif-expander');
        this.currentId = null;
        this.isExpanded = false;
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Listen for tile clicks
        document.querySelector('.dif-grid').addEventListener('click', (e) => {
            const tile = e.target.closest('.dif-tile');
            if (tile) {
                this.handleTileClick(tile);
            }
        });

        // Close expander when clicking close button
        this.container.addEventListener('click', (e) => {
            if (e.target.matches('.expander-close')) {
                this.collapse();
            }
        });
    }

    async handleTileClick(tile) {
        const recordId = tile.dataset.supabaseId;
        const imageId = tile.dataset.imageId;
        
        // If clicking the same tile, collapse
        if (this.currentId === recordId && this.isExpanded) {
            this.collapse();
            return;
        }

        // Store current record ID
        this.currentId = recordId;

        // Get record data (placeholder for Supabase integration)
        const content = await this.getRecordContent(recordId, imageId);
        
        // Build and show content
        this.showContent(content);
    }

    async getRecordContent(recordId, imageId) {
        // Get the tile element to access its data
        const tile = document.querySelector(`[data-supabase-id="${recordId}"]`);
        const imageElement = tile.querySelector('.tile-image img');
        
        // Get image source if it exists
        const imageSrc = imageElement ? imageElement.src : 'https://www.neh.gov/sites/default/files/2019-09/battle-new-orleans.jpg';

        // Placeholder for Supabase query
        // For now, return test data
        return {
            type: tile.dataset.recordType,
            subject: tile.querySelector('.preview-word.subject').textContent,
            class: tile.querySelector('.preview-word.class').textContent,
            description: 'Test description of the record...',
            breadcrumbs: ['Tag 1', 'Tag 2', 'Tag 3'],
            colorWords: ['Color 1', 'Color 2'],
            links: [
                { text: 'Related Link 1', url: '#' },
                { text: 'Related Link 2', url: '#' }
            ],
            image: imageSrc
        };
    }

    showContent(content) {
        // Build content HTML
        const contentHtml = this.buildContentHtml(content);
        
        // Update container
        this.container.innerHTML = contentHtml;
        
        // Trigger expansion
        requestAnimationFrame(() => {
            this.container.classList.add('active');
            this.isExpanded = true;
        });

        // Scroll to expander
        this.container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    buildContentHtml(content) {
        return `
            <div class="expander-content">
                <div class="expander-left">
                    <img src="${content.image}" alt="${content.subject}">
                </div>
                <div class="expander-right">
                    <div class="expander-record-type">${content.type}</div>
                    <h2 class="expander-subject">${content.subject}</h2>
                    
                    <div class="expander-section">
                        <h3>Class</h3>
                        <p>${content.class}</p>
                    </div>

                    <div class="expander-section">
                        <h3>Description</h3>
                        <p>${content.description}</p>
                    </div>

                    <div class="expander-section">
                        <h3>Breadcrumbs</h3>
                        <div class="expander-tags">
                            ${content.breadcrumbs.map(tag => 
                                `<span class="expander-tag">${tag}</span>`
                            ).join('')}
                        </div>
                    </div>

                    <div class="expander-section">
                        <h3>Color Words</h3>
                        <div class="expander-tags">
                            ${content.colorWords.map(word => 
                                `<span class="expander-tag">${word}</span>`
                            ).join('')}
                        </div>
                    </div>

                    <div class="expander-links">
                        ${content.links.map(link => 
                            `<a href="${link.url}" class="expander-link">${link.text}</a>`
                        ).join('')}
                    </div>
                </div>
                <button class="expander-close">×</button>
            </div>
        `;
    }

    collapse() {
        this.container.classList.remove('active');
        this.isExpanded = false;
        this.currentId = null;
        
        // Clear content after animation
        setTimeout(() => {
            if (!this.isExpanded) {
                this.container.innerHTML = '';
            }
        }, 300); // Match CSS transition duration
    }
}