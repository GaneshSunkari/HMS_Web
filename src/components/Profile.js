import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./Api"; // Ensure this is correctly pointing to your API setup
import "./ProfileStyles.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get("/user/profile"); // Adjust API endpoint as needed
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // Clear authentication token
    localStorage.removeItem("refreshToken");
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="profile-container">
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <h2>User Profile</h2>
      {user ? (
        <div className="profile-details">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
