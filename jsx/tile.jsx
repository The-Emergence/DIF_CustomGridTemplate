import React from 'react';
import './tile.css';

// Text-only tile component
const TextTile = ({ data }) => {
  return (
    <div className="dif-tile dif-tile-modern">
      <div className="modern-frame">
        <div className={`record-type-modern ${data.recordType.toLowerCase()}`}>
          {data.recordType}
        </div>
        
        {/* Hidden elements for expander compatibility */}
        <div className="preview-word-group" style={{ display: 'none' }}>
          <div className="preview-word subject">{data.title}</div>
          <div className="preview-word class">{data.bookType}</div>
          <div className="preview-word breadcrumb">Military History</div>
          <div className="preview-word colorword">{data.keyFigure}</div>
        </div>

        <h3 className="modern-title">{data.title}</h3>
        
        <div className="modern-section">
          <span className="modern-section-label">Book Type:</span>
          <div className="modern-tag">{data.bookType}</div>
        </div>

        {data.keyFigure && (
          <div className="modern-section">
            <span className="modern-section-label">Key Figure:</span>
            <span className="modern-tag">{data.keyFigure}</span>
          </div>
        )}

        {data.themes && (
          <div className="modern-section">
            <span className="modern-section-label">Themes:</span>
            <div className="modern-tag-container">
              {data.themes.map((theme, index) => (
                <span key={index} className="modern-tag">{theme}</span>
              ))}
            </div>
          </div>
        )}

        {data.conflicts && (
          <div className="modern-section">
            <span className="modern-section-label">Conflict:</span>
            <div className="modern-tag-container">
              {data.conflicts.map((conflict, index) => (
                <span key={index} className="modern-tag">{conflict}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Image tile component
const ImageTile = ({ data }) => {
  return (
    <div className="dif-tile dif-tile-modern">
      <div className="modern-frame has-image">
        <div className={`record-type-modern ${data.recordType.toLowerCase()}`}>
          {data.recordType}
        </div>

        {/* Hidden elements for expander compatibility */}
        <div className="preview-word-group" style={{ display: 'none' }}>
          <div className="preview-word subject">{data.title}</div>
          <div className="preview-word class">{data.category}</div>
          <div className="preview-word breadcrumb">{data.subtitle}</div>
          <div className="preview-word colorword">{data.date}</div>
        </div>

        <img src={data.imageUrl} alt={data.title} />
        <div className="image-overlay"></div>
        <div className="image-content">
          <span className="image-tag">{data.category}</span>
          <h3 className="image-title">{data.title}</h3>
          {data.subtitle && (
            <p className="image-subtitle">{data.subtitle}</p>
          )}
          {data.date && (
            <span className="image-tag">{data.date}</span>
          )}
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