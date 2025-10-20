import React from 'react';
import './SpaceCard.css';

/**
 * SpaceCard Component
 * Displays information about a single university space
 * 
 * @param {Object} space - Space object with id, name, description, type, capacity, and image_path
 */
function SpaceCard({ space }) {
  return (
    <div className="space-card">
      <div className="space-card__image-container">
        <img 
          src={space.image_path} 
          alt={space.name}
          className="space-card__image"
        />
      </div>
      
      <div className="space-card__content">
        <h3 className="space-card__title">{space.name}</h3>
        
        <div className="space-card__info">
          <span className="space-card__type">{space.type}</span>
          <span className="space-card__capacity">Capacity: {space.capacity}</span>
        </div>
        
        <p className="space-card__description">{space.description}</p>
      </div>
    </div>
  );
}

export default SpaceCard;
