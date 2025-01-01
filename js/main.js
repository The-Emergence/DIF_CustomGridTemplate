// main.js
import { DifExpander } from './expander.js';
import Tile from '../jsx/Tile.jsx';
import React from 'react';
import ReactDOM from 'react-dom';

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

    // Updated method to add new tiles using React
    addTile(tileData) {
        // Create a container for the React tile
        const tileContainer = document.createElement('div');
        tileContainer.className = 'dif-tile-container';
        this.gridContainer.appendChild(tileContainer);

        // Transform the data to match the React component's expected format
        const transformedData = this.transformTileData(tileData);

        // Render the React tile component
        ReactDOM.render(
            <Tile data={transformedData} />,
            tileContainer
        );
    }

    // Helper method to transform data from Supabase format to React component format
    transformTileData(data) {
        if (data.image) {
            // Image tile format
            return {
                recordType: data.type,
                title: data.subject,
                category: data.class,
                imageUrl: data.image
            };
        } else {
            // Text tile format
            return {
                recordType: data.type,
                title: data.subject,
                bookType: data.class,
                keyFigure: data.colorWord,
                majorEvent: data.breadcrumb,
                themes: [], // Add if available in your data
                conflicts: [] // Add if available in your data
            };
        }
    }

    // Method to handle data from Supabase
    async handleSupabaseData(supabaseData) {
        supabaseData.forEach(record => {
            this.addTile(record);
        });
    }

    // Legacy method kept for backwards compatibility
    createTileElement(data) {
        // Create container for React component
        const tileContainer = document.createElement('div');
        tileContainer.className = 'dif-tile-container';
        
        // Transform and render React component
        const transformedData = this.transformTileData(data);
        ReactDOM.render(
            <Tile data={transformedData} />,
            tileContainer
        );

        return tileContainer;
    }
}

// Initialize the grid system
const difGrid = new DifGrid();

// Export for potential use in other modules
export default difGrid;