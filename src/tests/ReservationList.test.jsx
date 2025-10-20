import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ReservationList from '../components/ReservationList';
import { clearAllReservations, saveReservation } from '../utils/reservationUtils';

/**
 * Test suite for ReservationList component
 * Verifies FR4 (cancel reservation) and US4 (cancel reservation user story)
 */
describe('ReservationList Component', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    clearAllReservations();
  });

  it('should render empty state when no reservations exist', () => {
    render(<ReservationList />);
    
    expect(screen.getByText('My Reservations')).toBeDefined();
    expect(screen.getByText('No reservations found')).toBeDefined();
  });

  it('should display existing reservations', () => {
    // Create a test reservation
    saveReservation({
      id: 1,
      studentName: 'John Doe',
      date: '2025-12-25',
      time: '14:00',
      spaceId: 1,
      spaceName: 'Classrooms',
      createdAt: new Date().toISOString()
    });

    render(<ReservationList />);
    
    expect(screen.getByText('Classrooms')).toBeDefined();
    expect(screen.getByText('John Doe')).toBeDefined();
  });

  it('should display multiple reservations', () => {
    // Create multiple test reservations
    saveReservation({
      id: 1,
      studentName: 'John Doe',
      date: '2025-12-25',
      time: '14:00',
      spaceId: 1,
      spaceName: 'Classrooms',
      createdAt: new Date().toISOString()
    });

    saveReservation({
      id: 2,
      studentName: 'Jane Smith',
      date: '2025-12-26',
      time: '10:00',
      spaceId: 2,
      spaceName: 'Computer Science Laboratory',
      createdAt: new Date().toISOString()
    });

    render(<ReservationList />);
    
    expect(screen.getByText('Classrooms')).toBeDefined();
    expect(screen.getByText('Computer Science Laboratory')).toBeDefined();
  });

  it('should have cancel buttons for each reservation', () => {
    saveReservation({
      id: 1,
      studentName: 'John Doe',
      date: '2025-12-25',
      time: '14:00',
      spaceId: 1,
      spaceName: 'Classrooms',
      createdAt: new Date().toISOString()
    });

    render(<ReservationList />);
    
    const cancelButtons = screen.getAllByText('Cancel Reservation');
    expect(cancelButtons.length).toBe(1);
  });

  it('should show confirmation dialog when cancel button is clicked', () => {
    // Mock window.confirm
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(false);

    saveReservation({
      id: 1,
      studentName: 'John Doe',
      date: '2025-12-25',
      time: '14:00',
      spaceId: 1,
      spaceName: 'Classrooms',
      createdAt: new Date().toISOString()
    });

    render(<ReservationList />);
    
    const cancelButton = screen.getByText('Cancel Reservation');
    fireEvent.click(cancelButton);

    expect(confirmSpy).toHaveBeenCalled();
    confirmSpy.mockRestore();
  });

  it('should remove reservation when cancel is confirmed (FR4)', () => {
    // Mock window.confirm to return true
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true);

    saveReservation({
      id: 1,
      studentName: 'John Doe',
      date: '2025-12-25',
      time: '14:00',
      spaceId: 1,
      spaceName: 'Classrooms',
      createdAt: new Date().toISOString()
    });

    render(<ReservationList />);
    
    // Verify reservation exists
    expect(screen.getByText('Classrooms')).toBeDefined();

    // Click cancel button
    const cancelButton = screen.getByText('Cancel Reservation');
    fireEvent.click(cancelButton);

    // Verify success message appears
    expect(screen.getByText(/cancelled successfully/i)).toBeDefined();

    confirmSpy.mockRestore();
  });

  it('should not remove reservation when cancel is rejected', () => {
    // Mock window.confirm to return false
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(false);

    saveReservation({
      id: 1,
      studentName: 'John Doe',
      date: '2025-12-25',
      time: '14:00',
      spaceId: 1,
      spaceName: 'Classrooms',
      createdAt: new Date().toISOString()
    });

    render(<ReservationList />);
    
    const cancelButton = screen.getByText('Cancel Reservation');
    fireEvent.click(cancelButton);

    // Verify reservation still exists
    expect(screen.getByText('Classrooms')).toBeDefined();

    confirmSpy.mockRestore();
  });

  it('should format date and time correctly', () => {
    saveReservation({
      id: 1,
      studentName: 'John Doe',
      date: '2025-12-25',
      time: '14:30',
      spaceId: 1,
      spaceName: 'Classrooms',
      createdAt: new Date().toISOString()
    });

    render(<ReservationList />);
    
    // Check that date is formatted (should contain "December" and "25")
    expect(screen.getByText(/December/i)).toBeDefined();
    
    // Check that time is formatted in 12-hour format (14:30 → 2:30 PM)
    expect(screen.getByText(/2:30 PM/i)).toBeDefined();
  });
});
