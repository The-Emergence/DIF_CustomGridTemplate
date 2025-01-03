
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
    <div ref={menuRef} className="absolute right-12 top-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10">
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
      setHeight(`${content