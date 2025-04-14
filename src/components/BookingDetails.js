import React, { useState, useEffect } from "react";
import api from "./Api"; // Assuming you have an api.js file for API requests
import "./BookingDetails.css";

const BookingDetails = ({ busId, onClose }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch bookings data using GET API with dynamic busId
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/bus/booking/${busId}`);
      setBookings(res.data.bookings); // Assuming the API returns bookings in a `bookings` field
    } catch (err) {
      setError("Failed to fetch booking data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Use effect to fetch data whenever busId changes
  useEffect(() => {
    if (busId) {
      fetchBookings();
    }
  }, [busId]);

  return (
    <div className="bookingdetails-container">
      <h3 className="bookingdetails-title">Booking Details</h3>

      {/* Show loading or error message if applicable */}
      {loading ? (
        <p className="bookingdetails-loading">Loading bookings...</p>
      ) : error ? (
        <p className="bookingdetails-error">{error}</p>
      ) : (
        <table className="bookingdetails-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Booking ID</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.studentName}</td>
                <td>{booking.bookingId}</td>
                <td className={`bookingdetails-status ${booking.paymentStatus === "Paid" ? "paid" : "pending"}`}>
                  {booking.paymentStatus}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button className="bookingdetails-close-button" onClick={onClose}>Close</button>
    </div>
  );
};

export default BookingDetails;
