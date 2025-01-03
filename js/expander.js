// expander.js
export class DifExpander {
    constructor() {
        this.container = document.querySelector('.dif-expander');
        this.currentId = null;
        this.isExpanded = false;
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        document.querySelector('.dif-grid').addEventListener('click', (e) => {
            const tile = e.target.closest('.dif-tile');
            if (tile) {
                this.handleTileClick(tile);
            }
        });

        this.container.addEventListener('click', (e) => {
            if (e.target.matches('.expander-close')) {
                this.collapse();
            }
        });
    }

    async handleTileClick(tile) {
        const recordId = tile.dataset.supabaseId;
        if (this.currentId === recordId && this.isExpanded) {
            this.collapse();
            return;
        }

        this.currentId = recordId;
        const content = this.getRecordContent(tile);
        this.showContent(content);
    }

    getRecordContent(tile) {
        const getPreviewWord = (className) => 
            tile.querySelector(`.preview-word.${className}`)?.textContent || '';

        return {
            type: tile.dataset.recordType,
            subject: getPreviewWord('subject'),
            class: getPreviewWord('class'),
            description: "This comprehensive and authoritative history of the War of 1812, thoroughly revised for the 200th anniversary of the historic conflict, is a myth-shattering study that will inform and entertain students, historians, and general readers alike. Donald R. Hickey explores the military, diplomatic, and domestic history of our second war with Great Britain, bringing the study up to date with recent scholarship on all aspects of the war, from the Gulf of Mexico to Canada.",
            breadcrumbs: [getPreviewWord('breadcrumb')],
            colorWords: [getPreviewWord('colorword')],
            links: [
                { text: "Related Documents", url: "#", type: "reference" },
                { text: "Purchase Book", url: "#", type: "purchase" }
            ],
            image: tile.querySelector('img')?.src || "/api/placeholder/400/320"
        };
    }

    showContent(content) {
        const contentHtml = this.buildContentHtml(content);
        this.container.innerHTML = contentHtml;
        requestAnimationFrame(() => {
            this.container.classList.add('active');
            this.isExpanded = true;
        });
        this.container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    buildContentHtml(content) {
        const bookmarkIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>`;
        const shareIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>`;
        const plusIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`;

        return `
            <div class="expander-content p-4">
                <div class="flex justify-between items-center mb-4 bg-blue-600 p-2 rounded">
                    <div class="px-2 py-0.5 text-xs border rounded bg-white/90 text-blue-600 border-blue-500">
                        ${content.type}
                    </div>
                    <div class="flex gap-2">
                        <button class="w-6 h-6 flex items-center justify-center text-white">
                            ${bookmarkIcon}
                        </button>
                        <button class="w-6 h-6 flex items-center justify-center text-white">
                            ${shareIcon}
                        </button>
                        <button class="expander-close w-6 h-6 flex items-center justify-center text-white">×</button>
                    </div>
                </div>

                <div class="relative mb-6">
                    <div class="float-left w-64 mr-4 mb-2">
                        <img src="${content.image}" alt="${content.subject}"
                            class="w-full h-48 object-cover border border-gray-200 rounded-lg shadow-sm">
                    </div>

                    <div class="min-w-0">
                        <h2 class="text-lg font-medium text-gray-800 mb-3">${content.subject}</h2>
                        <p class="text-sm text-gray-600 mb-3">${content.description}</p>
                        <div class="flex flex-wrap gap-2">
                            ${content.links.map(link => `
                                <a href="${link.url}" class="px-2 py-1 text-xs border transition-colors duration-200 no-underline 
                                    ${link.type === 'purchase' 
                                        ? 'border-green-600 text-green-600 hover:bg-green-600 hover:text-white'
                                        : 'border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white'
                                    }">
                                    ${link.text}
                                </a>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <div class="bg-blue-600 p-2 rounded mt-4">
                    <div class="flex flex-wrap gap-2 justify-center">
                        ${this.buildRDFTag(content.class, 'class')}
                        ${content.breadcrumbs.map(tag => this.buildRDFTag(tag, 'tag')).join('')}
                        ${content.colorWords.map(word => this.buildRDFTag(word, 'keyword')).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    buildRDFTag(text, type) {
        const plusIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`;
        
        const textColor = type === 'class' ? 'text-indigo-700' :
                         type === 'tag' ? 'text-emerald-700' :
                         'text-amber-700';

        return `
            <div class="flex items-center gap-1 bg-white/90 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                <button class="p-1.5 hover:bg-gray-50 rounded-l-lg border-r border-gray-100" title="Add to Attractor">
                    ${plusIcon}
                </button>
                <button class="px-3 py-1.5 text-xs rounded-r-lg hover:bg-gray-50 ${textColor}">
                    ${text}
                </button>
            </div>
        `;
    }

    collapse() {
        this.container.classList.remove('active');
        this.isExpanded = false;
        this.currentId = null;
        setTimeout(() => {
            if (!this.isExpanded) {
                this.container.innerHTML = '';
            }
        }, 300);
    }
}

// Initialize expander
new DifExpander();