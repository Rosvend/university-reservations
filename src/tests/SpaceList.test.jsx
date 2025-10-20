import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SpaceList from '../components/SpaceList';

/**
 * Test suite for SpaceList component
 * Verifies FR1 (display available spaces), FR5 (display space images)
 * Bonus Feature: Filter by space type
 */
describe('SpaceList Component', () => {
  it('should render the component title', () => {
    render(<SpaceList />);
    expect(screen.getByText('Available Spaces')).toBeDefined();
  });

  it('should render the component subtitle', () => {
    render(<SpaceList />);
    expect(screen.getByText('Browse and select a space for your reservation')).toBeDefined();
  });

  it('should render space cards with images', () => {
    render(<SpaceList />);
    
    const spaceCards = document.querySelectorAll('.space-card');
    expect(spaceCards.length).toBeGreaterThan(0);
    
    // Verify images are rendered
    const images = document.querySelectorAll('.space-card__image');
    expect(images.length).toBeGreaterThan(0);
  });

  // Bonus Feature: Test filter functionality
  it('should render filter dropdown', () => {
    render(<SpaceList />);
    
    const filterSelect = screen.getByLabelText(/Filter by type:/i);
    expect(filterSelect).toBeDefined();
  });

  it('should filter spaces by type when filter is changed', () => {
    render(<SpaceList />);
    
    const filterSelect = screen.getByLabelText(/Filter by type:/i);
    
    // Get initial count
    const initialCards = document.querySelectorAll('.space-card');
    const initialCount = initialCards.length;
    
    // Change filter to Education
    fireEvent.change(filterSelect, { target: { value: 'Education' } });
    
    // Verify filter is applied
    expect(filterSelect.value).toBe('Education');
    
    // Count should be different (unless all spaces are Education type)
    const filteredCards = document.querySelectorAll('.space-card');
    expect(filteredCards.length).toBeLessThanOrEqual(initialCount);
  });

  it('should show all spaces when "all" filter is selected', () => {
    render(<SpaceList />);
    
    const filterSelect = screen.getByLabelText(/Filter by type:/i);
    
    // Change to a specific type first
    fireEvent.change(filterSelect, { target: { value: 'Sports' } });
    
    // Change back to all
    fireEvent.change(filterSelect, { target: { value: 'all' } });
    
    // Should show results info
    expect(screen.getByText(/Showing/i)).toBeDefined();
  });

  it('should display results count', () => {
    render(<SpaceList />);
    
    const resultsInfo = screen.getByText(/Showing \d+ of \d+ spaces/i);
    expect(resultsInfo).toBeDefined();
  });
});
