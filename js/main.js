// main.js

import { DifExpander } from './expander.js';

class DifGrid {
    constructor() {
        // Initialize core components
        this.expander = new DifExpander();
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.initializeGrid();
            this.setupEventListeners();
        });
    }

    initializeGrid() {
        // Get grid container
        this.gridContainer = document.querySelector('.dif-grid');
        
        // Add any necessary grid initialization
        this.setupGridLayout();
    }

    setupGridLayout() {
        // Add any specific grid layout setup
        // This could include dynamic tile positioning or responsive adjustments
    }

    setupEventListeners() {
        // Add any additional grid-specific event listeners
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    handleResize() {
        // Handle window resize events
        // Adjust grid layout if needed
    }

    // Method to add new tiles dynamically (will be useful for Supabase integration)
    addTile(tileData) {
        const tile = this.createTileElement(tileData);
        this.gridContainer.appendChild(tile);
    }

    createTileElement(data) {
        const tile = document.createElement('div');
        tile.className = 'dif-tile';
        tile.dataset.supabaseId = data.id;
        tile.dataset.recordType = data.type;
        
        if (data.collectionId) {
            tile.dataset.collectionId = data.collectionId;
        }

        if (data.imageId) {
            tile.dataset.imageId = data.imageId;
        }

        tile.innerHTML = `
            <div class="tile-frame">
                ${data.image ? `
                    <div class="tile-image">
                        <img src="${data.image}" alt="${data.subject}">
                    </div>
                ` : ''}
                <div class="record-badge">${data.type}</div>
                <div class="preview-word-group">
                    <div class="preview-word subject">${data.subject}</div>
                    <div class="preview-word class">${data.class}</div>
                    <div class="preview-word breadcrumb">${data.breadcrumb}</div>
                    <div class="preview-word colorword">${data.colorWord}</div>
                </div>
            </div>
        `;

        return tile;
    }
}

// Initialize the grid system
const difGrid = new DifGrid();

// Export for potential use in other modules
export default difGrid;