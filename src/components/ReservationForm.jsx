import React, { useState } from 'react';
import spacesData from '../data/data.json';
import { saveReservation, checkDuplicateReservation } from '../utils/reservationUtils';
import './ReservationForm.css';

/**
 * ReservationForm Component
 * Allows students to create a reservation with name, date, time, and space
 * Fulfills FR2 (create reservation), FR3 (prevent duplicates), and FR5 (show space image)
 * Implements US2 (reservation form) and US5 (view space image)
 */
function ReservationForm() {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    spaceId: ''
  });
  
  const [message, setMessage] = useState({ text: '', type: '' });
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Get today's date in YYYY-MM-DD format for min date validation
  const today = new Date().toISOString().split('T')[0];

  /**
   * Handle input changes
   * FR5: Update selected space when space selection changes
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // FR5: When space is selected, load the space details for image preview
    if (name === 'spaceId' && value) {
      const space = spacesData.spaces.find(s => s.id === parseInt(value));
      setSelectedSpace(space);
      setImageLoaded(false); // Reset image loaded state
    } else if (name === 'spaceId' && !value) {
      setSelectedSpace(null);
      setImageLoaded(false);
    }
  };

  /**
   * Handle image load event
   */
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  /**
   * Handle image error event
   */
  const handleImageError = () => {
    setImageLoaded(true); // Still set to true to hide the loading indicator
  };

  /**
   * Handle form submission
   * Implements FR3: Prevent duplicate reservations
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Find selected space details
    const selectedSpace = spacesData.spaces.find(
      space => space.id === parseInt(formData.spaceId)
    );

    // FR3: Check for double booking (same space + date + time)
    const isDuplicate = checkDuplicateReservation(
      parseInt(formData.spaceId),
      formData.date,
      formData.time
    );

    if (isDuplicate) {
      setMessage({ 
        text: `✗ This space is already reserved for ${formData.date} at ${formData.time}. Please choose a different time or date.`, 
        type: 'error' 
      });
      return; // Stop the submission
    }

    // Create reservation object
    const reservation = {
      id: Date.now(), // Simple unique ID
      studentName: formData.name,
      date: formData.date,
      time: formData.time,
      spaceId: parseInt(formData.spaceId),
      spaceName: selectedSpace.name,
      createdAt: new Date().toISOString()
    };

    // Save reservation (NFR2: local storage)
    const result = saveReservation(reservation);

    if (result.success) {
      setMessage({ 
        text: `✓ Reservation confirmed for ${selectedSpace.name} on ${formData.date} at ${formData.time}`, 
        type: 'success' 
      });
      
      // Reset form
      setFormData({
        name: '',
        date: '',
        time: '',
        spaceId: ''
      });

      // Reset selected space and image
      setSelectedSpace(null);
      setImageLoaded(false);

      // Clear message after 5 seconds
      setTimeout(() => setMessage({ text: '', type: '' }), 5000);
    } else {
      setMessage({ 
        text: `✗ ${result.message}`, 
        type: 'error' 
      });
    }
  };

  return (
    <div className="reservation-form-container">
      <h2 className="reservation-form__title">Make a Reservation</h2>
      <p className="reservation-form__subtitle">Fill in the details to book your space</p>

      {message.text && (
        <div className={`reservation-form__message reservation-form__message--${message.type}`}>
          {message.text}
        </div>
      )}

      <form className="reservation-form" onSubmit={handleSubmit}>
        {/* Student Name */}
        <div className="reservation-form__field">
          <label htmlFor="name" className="reservation-form__label">
            Student Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="reservation-form__input"
            value={formData.name}
            onChange={handleChange}
            required
            minLength={3}
            maxLength={100}
            placeholder="Enter your full name"
          />
        </div>

        {/* Space Selection */}
        <div className="reservation-form__field">
          <label htmlFor="spaceId" className="reservation-form__label">
            Select Space <span className="required">*</span>
          </label>
          <select
            id="spaceId"
            name="spaceId"
            className="reservation-form__select"
            value={formData.spaceId}
            onChange={handleChange}
            required
          >
            <option value="">-- Choose a space --</option>
            {spacesData.spaces.map(space => (
              <option key={space.id} value={space.id}>
                {space.name} ({space.type}) - Capacity: {space.capacity}
              </option>
            ))}
          </select>
        </div>

        {/* FR5: Space Image Preview */}
        {selectedSpace && (
          <div className="reservation-form__image-preview">
            <h3 className="reservation-form__image-title">
              Selected Space: {selectedSpace.name}
            </h3>
            <p className="reservation-form__image-description">
              {selectedSpace.description}
            </p>
            <div className="reservation-form__image-container">
              {!imageLoaded && (
                <div className="reservation-form__image-loading">
                  Loading image...
                </div>
              )}
              <img
                src={selectedSpace.image_path}
                alt={`${selectedSpace.name} - ${selectedSpace.description}`}
                className={`reservation-form__image ${imageLoaded ? 'reservation-form__image--loaded' : ''}`}
                onLoad={handleImageLoad}
                onError={handleImageError}
                loading="lazy"
              />
            </div>
            <div className="reservation-form__image-info">
              <span className="reservation-form__image-info-item">
                <strong>Type:</strong> {selectedSpace.type}
              </span>
              <span className="reservation-form__image-info-item">
                <strong>Capacity:</strong> {selectedSpace.capacity} people
              </span>
            </div>
          </div>
        )}

        {/* Date */}
        <div className="reservation-form__field">
          <label htmlFor="date" className="reservation-form__label">
            Reservation Date <span className="required">*</span>
          </label>
          <input
            type="date"
            id="date"
            name="date"
            className="reservation-form__input"
            value={formData.date}
            onChange={handleChange}
            required
            min={today}
          />
        </div>

        {/* Time */}
        <div className="reservation-form__field">
          <label htmlFor="time" className="reservation-form__label">
            Reservation Time <span className="required">*</span>
          </label>
          <input
            type="time"
            id="time"
            name="time"
            className="reservation-form__input"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="reservation-form__button">
          Create Reservation
        </button>
      </form>
    </div>
  );
}

export default ReservationForm;
