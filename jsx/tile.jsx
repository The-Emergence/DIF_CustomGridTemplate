import React from 'react';
import './tile.css';

// Text-only tile component
const TextTile = ({ data }) => {
  return (
    <div className="dif-tile">
      <div className="tile-frame">
        <div className={`record-type-tag record-type-${data.recordType.toLowerCase()}`}>
          {data.recordType}
        </div>
        <div className="text-content">
          <h3 className="tile-title">{data.title}</h3>

          {/* Book Type */}
          <div className="content-section">
            <div className="flex items-center gap-2">
              <span className="section-label">Book Type:</span>
              <span className="content-tag">{data.bookType}</span>
            </div>
          </div>

          {/* Key Figure */}
          {data.keyFigure && (
            <div className="content-section">
              <div className="flex items-center gap-2">
                <span className="section-label">Key Figure:</span>
                <span className="font-medium">{data.keyFigure}</span>
              </div>
            </div>
          )}

          {/* Major Event */}
          {data.majorEvent && (
            <div className="content-section">
              <div className="flex items-center gap-2">
                <span className="section-label">Major Event:</span>
                <span className="font-medium">{data.majorEvent}</span>
              </div>
            </div>
          )}

          {/* Themes */}
          {data.themes && (
            <div className="content-section">
              <div className="flex items-center gap-2">
                <span className="section-label">Themes:</span>
                <div className="tag-container">
                  {data.themes.map((theme, index) => (
                    <span key={index} className="content-tag">{theme}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Conflicts */}
          {data.conflicts && (
            <div className="content-section">
              <div className="flex items-center gap-2">
                <span className="section-label">Conflict:</span>
                <div className="tag-container">
                  {data.conflicts.map((conflict, index) => (
                    <span key={index} className="content-tag">{conflict}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Image tile component
const ImageTile = ({ data }) => {
  return (
    <div className="dif-tile">
      <div className="tile-frame has-image">
        <div className={`record-type-tag record-type-${data.recordType.toLowerCase()}`}>
          {data.recordType}
        </div>
        <img src={data.imageUrl} alt={data.title} />
        <div className="image-overlay"></div>
        <div className="image-content">
          <span className="image-category">{data.category}</span>
          <h3 className="image-title">{data.title}</h3>
        </div>
      </div>
    </div>
  );
};

// Main Tile component that decides which type to render
const Tile = ({ data }) => {
  return data.imageUrl ? <ImageTile data={data} /> : <TextTile data={data} />;
};

export default Tile;
