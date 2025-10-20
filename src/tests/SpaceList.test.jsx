import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SpaceList from '../components/SpaceList';

/**
 * Test suite for SpaceList component
 * Verifies FR1 (display available spaces) and FR5 (display space images)
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
});
