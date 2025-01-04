import React, { useState, useEffect, useRef } from 'react';
import { X, Share2, Mail, MessageCircle, Twitter, Facebook, Link, Plus, Bookmark } from 'lucide-react';

const ShareMenu = ({ isOpen, onClose }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  const shareOptions = [
    { icon: Mail, label: 'Email', action: () => {} },
    { icon: MessageCircle, label: 'Message', action: () => {} },
    { icon: Twitter, label: 'Twitter', action: () => {} },
    { icon: Facebook, label: 'Facebook', action: () => {} },
    { icon: Link, label: 'Copy Link', action: () => {} }
  ];

  if (!isOpen) return null;

  return (
    
<div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10">
  <div className="flex items-center gap-2 mb-2"> {/* New container for Share and X */}
    <Share2 className="w-3.5 h-3.5 text-gray-600" />
    <X onClick={onClose} className="w-3.5 h-3.5 text-gray-600 cursor-pointer" />
  </div>
  <div className="flex flex-col gap-2">
    {shareOptions.map(({ icon: Icon, label, action }) => (
      <button
        key={label}
        onClick={() => {
          action();
          onClose();
        }}
        className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-100 rounded text-sm w-full"
      >
        <Icon size={14} />
        <span>{label}</span>
      </button>
    ))}
  </div>
</div>


  );
};

const RDFTag = ({ text, type, onAddToAttractor, onClick }) => (
  <div className="flex items-center gap-1 bg-white/90 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
    <button 
      onClick={() => onAddToAttractor(text)}
      className="p-1.5 hover:bg-gray-50 rounded-l-lg border-r border-gray-100"
      title="Add to Attractor"
    >
      <Plus size={12} className="text-blue-600" />
    </button>
    <button
      onClick={() => onClick(text)}
      className={`px-3 py-1.5 text-xs rounded-r-lg hover:bg-gray-50 ${
        type === 'class' ? 'text-indigo-700' :
        type === 'tag' ? 'text-emerald-700' :
        'text-amber-700'
      }`}
    >
      {text}
    </button>
  </div>
);

const Expander = ({ isOpen, content, onClose }) => {
  const [showShare, setShowShare] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [height, setHeight] = useState('0px');
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setHeight('0px');
    }
  }, [isOpen, content]);

  const handleAddToAttractor = (word) => {
    console.log('Added to attractor:', word);
  };

  const handleRDFClick = (word) => {
    console.log('Navigate to:', word);
  };

  if (!content) return null;

  return (
    <div 
      className={`relative w-full overflow-hidden transition-all duration-300 ease-in-out bg-white opacity-0 
        ${isOpen ? 'opacity-100 my-3 border border-gray-200 rounded-lg' : 'm-0'}`}
      style={{ height }}
    >
      <div ref={contentRef} className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className={`inline-block px-2 py-0.5 text-xs border rounded
            ${content.type.toLowerCase() === 'book' ? 'border-blue-500 bg-white/90 text-blue-600' : 'border-gray-800'}`}>
            {content.type}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <Bookmark 
                size={16}
                className={isBookmarked ? 'text-blue-500 fill-current' : 'text-gray-600'} 
              />
            </button>
            <div className="relative">
              <button
                onClick={() => setShowShare(!showShare)}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <Share2 size={16} className="text-gray-600" />
              </button>
              <ShareMenu isOpen={showShare} onClose={() => setShowShare(false)} />
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <X size={16} className="text-gray-600" />
            </button>
          </div>
        </div>

        <div className="relative mb-6">
          <div className="float-left w-64 mr-4 mb-2">
            <img 
              src={content.image} 
              alt={content.subject}
              className="w-full h-48 object-cover border border-gray-200 rounded-lg shadow-sm"
            />
          </div>

          <div className="min-w-0">
            <h2 className="text-lg font-medium text-gray-800 mb-3">{content.subject}</h2>
            <p className="text-sm text-gray-600 mb-3">{content.description}</p>
            {content.links && (
              <div className="flex flex-wrap gap-2">
                {content.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    className={`px-2 py-1 text-xs border transition-colors duration-200 no-underline ${
                      link.type === 'purchase' 
                        ? 'border-green-600 text-green-600 hover:bg-green-600 hover:text-white'
                        : 'border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    {link.text}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-blue-600 p-3 rounded-lg mt-4 w-full clear-both">
          <div className="flex flex-wrap gap-2 justify-center">
            <RDFTag 
              text={content.class}
              type="class"
              onAddToAttractor={handleAddToAttractor}
              onClick={handleRDFClick}
            />
            {content.breadcrumbs.map((tag, index) => (
              <RDFTag 
                key={index}
                text={tag}
                type="tag"
                onAddToAttractor={handleAddToAttractor}
                onClick={handleRDFClick}
              />
            ))}
            {content.colorWords?.map((word, index) => (
              <RDFTag 
                key={index}
                text={word}
                type="keyword"
                onAddToAttractor={handleAddToAttractor}
                onClick={handleRDFClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ExpanderDemo = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const mockContent = {
    type: "Product",
    subject: "Industrial Revolution",
    class: "Historical Era",
    description: "This comprehensive and authoritative history of the War of 1812, thoroughly revised for the 200th anniversary of the historic conflict, is a myth-shattering study that will inform and entertain students, historians, and general readers alike. Donald R. Hickey explores the military, diplomatic, and domestic history of our second war with Great Britain, bringing the study up to date with recent scholarship on all aspects of the war, from the Gulf of Mexico to Canada. The newly expanded The War of 1812: A Forgotten Conflict, Bicentennial Edition includes additional information on the British forces, American Indians, and military operations such as the importance of logistics and the use and capabilities of weaponry.",
    breadcrumbs: ["Manufacturing", "1760-1840"],
    links: [
      { text: "Related Documents", url: "#", type: "reference" },
      { text: "Purchase Book", url: "#", type: "purchase" }
    ],
    image: "/api/placeholder/400/320"
  };

  return (
    <div className="p-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-1.5 bg-blue-500 text-white rounded-md mb-3 text-sm"
      >
        Toggle Expander
      </button>
      
      <Expander
        isOpen={isOpen}
        content={mockContent}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default ExpanderDemo;