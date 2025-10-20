import React, { useState, useEffect } from 'react';
import SpaceCard from './SpaceCard';
import spacesData from '../data/data.json';
import './SpaceList.css';

/**
 * SpaceList Component
 * Displays a grid of all available university spaces
 * Fulfills FR1 (view available spaces) and FR5 (display space images)
 */
function SpaceList() {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load spaces from imported JSON data
    try {
      setSpaces(spacesData.spaces);
      setLoading(false);
    } catch (err) {
      console.error('Error loading spaces:', err);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div className="space-list__message">Loading spaces...</div>;
  }

  if (spaces.length === 0) {
    return <div className="space-list__message">No spaces available.</div>;
  }

  return (
    <div className="space-list">
      <h2 className="space-list__title">Available Spaces</h2>
      <p className="space-list__subtitle">Browse and select a space for your reservation</p>
      
      <div className="space-list__grid">
        {spaces.map(space => (
          <SpaceCard key={space.id} space={space} />
        ))}
      </div>
    </div>
  );
}

export default SpaceList;
