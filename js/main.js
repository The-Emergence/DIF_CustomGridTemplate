// main.js
import { DifExpander } from './expander.js';

class DifGrid {
    constructor() {
        this.expander = new DifExpander();
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.initializeGrid();
            this.setupEventListeners();
        });
    }

    // ... rest of your original code
}

const difGrid = new DifGrid();
export default difGrid;