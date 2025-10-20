/**
 * Reservation Utility Functions
 * Manages reservation storage in localStorage (NFR2)
 */

const STORAGE_KEY = 'university_reservations';

/**
 * Get all reservations from localStorage
 * @returns {Array} Array of reservation objects
 */
export const getReservations = () => {
  try {
    const reservations = localStorage.getItem(STORAGE_KEY);
    return reservations ? JSON.parse(reservations) : [];
  } catch (error) {
    console.error('Error reading reservations:', error);
    return [];
  }
};

/**
 * Save a new reservation to localStorage
 * @param {Object} reservation - Reservation object to save
 * @returns {Object} Result object with success status and message
 */
export const saveReservation = (reservation) => {
  try {
    const existingReservations = getReservations();
    
    // Check for duplicate reservations (FR3 will be implemented later)
    // For now, just save the reservation
    
    const updatedReservations = [...existingReservations, reservation];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReservations));
    
    return { 
      success: true, 
      message: 'Reservation created successfully' 
    };
  } catch (error) {
    console.error('Error saving reservation:', error);
    return { 
      success: false, 
      message: 'Failed to create reservation. Please try again.' 
    };
  }
};

/**
 * Delete a reservation by ID
 * @param {number} reservationId - ID of the reservation to delete
 * @returns {Object} Result object with success status and message
 */
export const deleteReservation = (reservationId) => {
  try {
    const reservations = getReservations();
    const updatedReservations = reservations.filter(r => r.id !== reservationId);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReservations));
    
    return { 
      success: true, 
      message: 'Reservation cancelled successfully' 
    };
  } catch (error) {
    console.error('Error deleting reservation:', error);
    return { 
      success: false, 
      message: 'Failed to cancel reservation. Please try again.' 
    };
  }
};

/**
 * Check if a reservation exists for a specific space, date, and time
 * @param {number} spaceId - Space ID
 * @param {string} date - Reservation date (YYYY-MM-DD)
 * @param {string} time - Reservation time (HH:MM)
 * @returns {boolean} True if duplicate exists
 */
export const checkDuplicateReservation = (spaceId, date, time) => {
  const reservations = getReservations();
  return reservations.some(
    r => r.spaceId === spaceId && r.date === date && r.time === time
  );
};

/**
 * Clear all reservations (useful for testing)
 * @returns {boolean} True if successful
 */
export const clearAllReservations = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing reservations:', error);
    return false;
  }
};
