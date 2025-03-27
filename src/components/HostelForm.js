import React, { useState } from "react";
import "./HostelFormStyles.css";
import api from "./Api";

const HostelForm = ({ onCancel }) => {
  // State to store form data
  const [hostelName, setHostelName] = useState("");
  const [numRooms, setNumRooms] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const hostelData = {
      name: hostelName,
      totalRooms: Number(numRooms),
      // wings: ["A1"]  // Remove later
    };

    try {
      const response = await api.post("/hostel/create",JSON.stringify(hostelData));
      
      const data = await response.data;
      console.log(data);
      if (response.status === 201) {
        alert("Hostel created successfully!");
        setHostelName("");
        setNumRooms("");
        onCancel();
      } else {
        alert(data.message || "Failed to create hostel");
      }
    } catch (error) {
      console.error("Error creating hostel:", error);
      alert(error.message);
    }
  };

  return (
    <div className="hostel-form-container">
      <h2>Create Hostel</h2>
      <form className="hostel-form" onSubmit={handleSubmit}>
        <label>Hostel Name</label>
        <input
          type="text"
          placeholder="Enter hostel name"
          value={hostelName}
          onChange={(e) => setHostelName(e.target.value)}
          required
        />

        <label>Number of Rooms</label>
        <input
          type="number"
          placeholder="Enter number of rooms"
          value={numRooms}
          onChange={(e) => setNumRooms(e.target.value)}
          required
        />

        <div className="button-group">
          <button type="submit" className="create-button">Create</button>
          <button type="button" className="cancel-button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default HostelForm;
