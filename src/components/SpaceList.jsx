import React, { useState, useEffect } from 'react';
import SpaceCard from './SpaceCard';
import spacesData from '../data/data.json';
import './SpaceList.css';

/**
 * SpaceList Component
 * Displays a grid of all available university spaces
 * Fulfills FR1 (view available spaces) and FR5 (display space images)
 * Bonus Feature: Filter spaces by type
 */
function SpaceList() {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all');
  const [spaceTypes, setSpaceTypes] = useState([]);

  useEffect(() => {
    // Load spaces from imported JSON data
    try {
      setSpaces(spacesData.spaces);
      
      // Extract unique space types for filter
      const types = [...new Set(spacesData.spaces.map(space => space.type))];
      setSpaceTypes(types.sort());
      
      setLoading(false);
    } catch (err) {
      console.error('Error loading spaces:', err);
      setLoading(false);
    }
  }, []);

  /**
   * Bonus Feature: Filter spaces by type
   */
  const filteredSpaces = filterType === 'all' 
    ? spaces 
    : spaces.filter(space => space.type === filterType);

  /**
   * Handle filter change
   */
  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

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
      
      {/* Bonus Feature: Filter by space type */}
      <div className="space-list__filter-container">
        <label htmlFor="spaceTypeFilter" className="space-list__filter-label">
          Filter by type:
        </label>
        <select
          id="spaceTypeFilter"
          className="space-list__filter-select"
          value={filterType}
          onChange={handleFilterChange}
        >
          <option value="all">All Types ({spaces.length})</option>
          {spaceTypes.map(type => {
            const count = spaces.filter(s => s.type === type).length;
            return (
              <option key={type} value={type}>
                {type} ({count})
              </option>
            );
          })}
        </select>
      </div>

      {filteredSpaces.length === 0 ? (
        <div className="space-list__empty">
          <p>No spaces found for the selected type.</p>
        </div>
      ) : (
        <>
          <div className="space-list__results-info">
            Showing {filteredSpaces.length} of {spaces.length} spaces
          </div>
          <div className="space-list__grid">
            {filteredSpaces.map(space => (
              <SpaceCard key={space.id} space={space} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default SpaceList;
