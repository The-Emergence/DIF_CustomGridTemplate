import React, { useState } from 'react';
import Tile from './Tile';
import Expander from './ExpanderComponent';

const DIF = () => {
  const [expandedContent, setExpandedContent] = useState(null);
  const [isExpanderOpen, setIsExpanderOpen] = useState(false);

  const handleTileClick = (content) => {
    setExpandedContent(content);
    setIsExpanderOpen(true);
  };

  const handleExpanderClose = () => {
    setIsExpanderOpen(false);
    setTimeout(() => setExpandedContent(null), 300); // Wait for animation
  };

  return (
    <div className="dif-container">
      <div className="dif-grid">
        {/* Your existing tile HTML structure, but add onClick handlers */}
        <div className="dif-tile dif-tile-modern" onClick={() => handleTileClick({
          type: "Book",
          subject: "The War of 1812: A forgotten conflict",
          class: "Historical Non Fiction",
          description: "This comprehensive and authoritative history...",
          breadcrumbs: ["Military History", "19th Century", "North America"],
          colorWords: ["Sir George Prevost", "Andrew Jackson", "Battle of New Orleans"],
          links: [
            { text: "Related Documents", url: "#", type: "reference" },
            { text: "Purchase Book", url: "#", type: "purchase" }
          ],
          image: "/api/placeholder/400/320"
        })}>
          {/* Your existing tile content */}
        </div>
      </div>

      <Expander 
        isOpen={isExpanderOpen}
        content={expandedContent}
        onClose={handleExpanderClose}
      />
    </div>
  );
};

export default DIF;