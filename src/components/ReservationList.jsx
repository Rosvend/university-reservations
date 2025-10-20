import React, { useState, useEffect } from 'react';
import { getReservations, deleteReservation } from '../utils/reservationUtils';
import './ReservationList.css';

/**
 * ReservationList Component
 * Displays user's reservations with cancel functionality
 * Fulfills FR4 (cancel reservation) and US4 (cancel reservation user story)
 */
function ReservationList() {
  const [reservations, setReservations] = useState([]);
  const [message, setMessage] = useState({ text: '', type: '' });

  /**
   * Load reservations from localStorage on component mount
   */
  useEffect(() => {
    loadReservations();
  }, []);

  /**
   * Load all reservations from localStorage
   */
  const loadReservations = () => {
    const allReservations = getReservations();
    // Sort by date (most recent first)
    const sortedReservations = allReservations.sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );
    setReservations(sortedReservations);
  };

  /**
   * Handle reservation cancellation
   * @param {number} reservationId - ID of reservation to cancel
   * @param {string} spaceName - Name of the space for confirmation message
   */
  const handleCancelReservation = (reservationId, spaceName) => {
    // Confirm before deleting
    const confirmed = window.confirm(
      `Are you sure you want to cancel your reservation for ${spaceName}?`
    );

    if (!confirmed) return;

    // Delete the reservation (FR4)
    const result = deleteReservation(reservationId);

    if (result.success) {
      setMessage({
        text: `✓ Reservation for ${spaceName} has been cancelled successfully`,
        type: 'success'
      });

      // Reload reservations to update the list
      loadReservations();

      // Clear message after 5 seconds
      setTimeout(() => setMessage({ text: '', type: '' }), 5000);
    } else {
      setMessage({
        text: `✗ ${result.message}`,
        type: 'error'
      });
    }
  };

  /**
   * Format date for display (YYYY-MM-DD → Month DD, YYYY)
   */
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  /**
   * Format time for display (24h → 12h format)
   */
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="reservation-list-container">
      <h2 className="reservation-list__title">My Reservations</h2>
      <p className="reservation-list__subtitle">
        View and manage your active reservations
      </p>

      {message.text && (
        <div className={`reservation-list__message reservation-list__message--${message.type}`}>
          {message.text}
        </div>
      )}

      {reservations.length === 0 ? (
        <div className="reservation-list__empty">
          <p>No reservations found</p>
          <p className="reservation-list__empty-hint">
            Create a reservation using the form above
          </p>
        </div>
      ) : (
        <div className="reservation-list">
          {reservations.map((reservation) => (
            <div key={reservation.id} className="reservation-card">
              <div className="reservation-card__header">
                <h3 className="reservation-card__space-name">
                  {reservation.spaceName}
                </h3>
                <span className="reservation-card__badge">Active</span>
              </div>

              <div className="reservation-card__details">
                <div className="reservation-card__detail">
                  <span className="reservation-card__label">Student:</span>
                  <span className="reservation-card__value">
                    {reservation.studentName}
                  </span>
                </div>

                <div className="reservation-card__detail">
                  <span className="reservation-card__label">Date:</span>
                  <span className="reservation-card__value">
                    {formatDate(reservation.date)}
                  </span>
                </div>

                <div className="reservation-card__detail">
                  <span className="reservation-card__label">Time:</span>
                  <span className="reservation-card__value">
                    {formatTime(reservation.time)}
                  </span>
                </div>
              </div>

              <button
                className="reservation-card__cancel-btn"
                onClick={() => handleCancelReservation(reservation.id, reservation.spaceName)}
                aria-label={`Cancel reservation for ${reservation.spaceName}`}
              >
                Cancel Reservation
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReservationList;
