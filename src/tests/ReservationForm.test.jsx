import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ReservationForm from '../components/ReservationForm';
import { clearAllReservations, saveReservation } from '../utils/reservationUtils';

/**
 * Test suite for ReservationForm component
 * Verifies FR2 (create reservation) and HU2 (reservation form)
 */
describe('ReservationForm Component', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    clearAllReservations();
  });

  it('should render the form with all required fields', () => {
    render(<ReservationForm />);
    
    // Check if title is rendered
    expect(screen.getByText('Make a Reservation')).toBeDefined();
    
    // Check if all form fields are present
    expect(screen.getByLabelText(/Student Name/i)).toBeDefined();
    expect(screen.getByLabelText(/Select Space/i)).toBeDefined();
    expect(screen.getByLabelText(/Reservation Date/i)).toBeDefined();
    expect(screen.getByLabelText(/Reservation Time/i)).toBeDefined();
    
    // Check if submit button is present
    expect(screen.getByText('Create Reservation')).toBeDefined();
  });

  it('should have HTML5 validation attributes on inputs', () => {
    render(<ReservationForm />);
    
    const nameInput = screen.getByLabelText(/Student Name/i);
    const spaceSelect = screen.getByLabelText(/Select Space/i);
    const dateInput = screen.getByLabelText(/Reservation Date/i);
    const timeInput = screen.getByLabelText(/Reservation Time/i);
    
    // Check required attributes
    expect(nameInput.hasAttribute('required')).toBe(true);
    expect(spaceSelect.hasAttribute('required')).toBe(true);
    expect(dateInput.hasAttribute('required')).toBe(true);
    expect(timeInput.hasAttribute('required')).toBe(true);
    
    // Check input types
    expect(dateInput.getAttribute('type')).toBe('date');
    expect(timeInput.getAttribute('type')).toBe('time');
  });

  it('should update form fields when user types', () => {
    render(<ReservationForm />);
    
    const nameInput = screen.getByLabelText(/Student Name/i);
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    expect(nameInput.value).toBe('John Doe');
  });

  it('should have space options in the select dropdown', () => {
    render(<ReservationForm />);
    
    const spaceSelect = screen.getByLabelText(/Select Space/i);
    const options = spaceSelect.querySelectorAll('option');
    
    // Should have at least the default option plus space options
    expect(options.length).toBeGreaterThan(1);
  });

  it('should show success message after successful submission', () => {
    render(<ReservationForm />);
    
    // Fill in the form
    fireEvent.change(screen.getByLabelText(/Student Name/i), {
      target: { value: 'Jane Smith' }
    });
    
    fireEvent.change(screen.getByLabelText(/Select Space/i), {
      target: { value: '1' }
    });
    
    fireEvent.change(screen.getByLabelText(/Reservation Date/i), {
      target: { value: '2025-12-31' }
    });
    
    fireEvent.change(screen.getByLabelText(/Reservation Time/i), {
      target: { value: '10:00' }
    });
    
    // Submit the form
    const submitButton = screen.getByText('Create Reservation');
    fireEvent.click(submitButton);
    
    // Check for success message
    const successMessage = screen.getByText(/Reservation confirmed/i);
    expect(successMessage).toBeDefined();
  });

  // FR3: Test for double booking prevention
  it('should prevent double booking for same space, date, and time', () => {
    // Create an initial reservation
    saveReservation({
      id: 1,
      studentName: 'First Student',
      date: '2025-12-25',
      time: '14:00',
      spaceId: 1,
      spaceName: 'Classrooms',
      createdAt: new Date().toISOString()
    });

    render(<ReservationForm />);
    
    // Try to make a duplicate reservation
    fireEvent.change(screen.getByLabelText(/Student Name/i), {
      target: { value: 'Second Student' }
    });
    
    fireEvent.change(screen.getByLabelText(/Select Space/i), {
      target: { value: '1' }
    });
    
    fireEvent.change(screen.getByLabelText(/Reservation Date/i), {
      target: { value: '2025-12-25' }
    });
    
    fireEvent.change(screen.getByLabelText(/Reservation Time/i), {
      target: { value: '14:00' }
    });
    
    // Submit the form
    const submitButton = screen.getByText('Create Reservation');
    fireEvent.click(submitButton);
    
    // Check for error message about duplicate booking
    const errorMessage = screen.getByText(/already reserved/i);
    expect(errorMessage).toBeDefined();
  });

  // FR3: Test that different times for same space and date are allowed
  it('should allow reservations for same space and date but different time', () => {
    // Create an initial reservation
    saveReservation({
      id: 1,
      studentName: 'First Student',
      date: '2025-12-25',
      time: '10:00',
      spaceId: 1,
      spaceName: 'Classrooms',
      createdAt: new Date().toISOString()
    });

    render(<ReservationForm />);
    
    // Try to make a reservation at a different time
    fireEvent.change(screen.getByLabelText(/Student Name/i), {
      target: { value: 'Second Student' }
    });
    
    fireEvent.change(screen.getByLabelText(/Select Space/i), {
      target: { value: '1' }
    });
    
    fireEvent.change(screen.getByLabelText(/Reservation Date/i), {
      target: { value: '2025-12-25' }
    });
    
    fireEvent.change(screen.getByLabelText(/Reservation Time/i), {
      target: { value: '15:00' }
    });
    
    // Submit the form
    const submitButton = screen.getByText('Create Reservation');
    fireEvent.click(submitButton);
    
    // Check for success message
    const successMessage = screen.getByText(/Reservation confirmed/i);
    expect(successMessage).toBeDefined();
  });
});
