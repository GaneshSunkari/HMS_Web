import React, { useState, useEffect } from "react";
import "./CareTakerFormStyles.css";
import api from "./Api";

const CareTakerForm = ({ onCancel }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    contactNumber: "",
    hostelId: "",
  });

  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch hostels from API
  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const response = await api.get("/hostel/");
        const data = response.data;
        setHostels(data.data.hostels); // Assuming API response contains hostels
      } catch (err) {
        console.error("Error fetching hostels:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHostels();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/caretaker/create", formData);
      const data = await response.data;
      console.log("api done : ");
      console.log(data);
      if (response.status === 201) {
        alert("Caretaker created successfully!");
        setFormData({ fullName: "", email: "", password: "", contactNumber: "", hostelId: "" });
        onCancel();
      } else {
        alert(data.message || "Failed to create caretaker");
      }
    } catch (error) {
      console.error("Error creating caretaker:", error);
      alert(error.message);
    }
  };

  return (
    <div className="caretaker-form-container">
      <h2>Create Caretaker</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />

        <label>Phone:</label>
        <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />

        <label>Hostel:</label>
        {loading ? (
          <p>Loading hostels...</p>
        ) : error ? (
          <p className="error-message">Error: {error}</p>
        ) : (
          <select name="hostelId" value={formData.hostelId} onChange={handleChange} required>
            <option value="">Select a Hostel</option>
            {hostels.map((hostel) => (
              <option key={hostel._id} value={hostel._id}>
                {hostel.name}
              </option>
            ))}
          </select>
        )}

        <div className="button-group">
          <button type="submit" className="create-button">Create</button>
          <button type="button" className="cancel-button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CareTakerForm;
