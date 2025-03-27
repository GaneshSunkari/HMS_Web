import React, { useState } from "react";
import HostelName from "./HostelName";
import HostelForm from "./HostelForm";
import CareTaker from "./CareTaker";
import Student from "./Student";
import Issues from "./Issues";
import "./styles.css";
import Profile from "./Profile";

const AdminDashboard = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h1 className="logo">RGUKT</h1>
        <nav>
          <ul>
            <li className="nav-item" onClick={() => { setSelectedOption("hostels"); setShowForm(false); }}>
              Hostels
            </li>
            <li className="nav-item" onClick={() => { setSelectedOption("caretakers"); setShowForm(false); }}>
              Caretakers
            </li>
            <li className="nav-item" onClick={() => { setSelectedOption("issues"); setShowForm(false); }}>
              Issues
            </li>
            <li className="nav-item" onClick={() => setSelectedOption("students")}>
              Students
            </li>
            <li className="nav-item" onClick={() => setSelectedOption("buses")}>
              Buses
            </li>
            <li className="nav-item" onClick={() => setSelectedOption("profile")}>
              Profile
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        {selectedOption === "hostels" && !showForm && <HostelName onAddHostel={() => setShowForm(true)} />}
        {selectedOption === "hostels" && showForm && <HostelForm onCancel={() => setShowForm(false)} />}
        {selectedOption === "caretakers" && <CareTaker />}
        {selectedOption === "issues" && <Issues />} 
        {selectedOption === "students" && <Student />}
        {selectedOption === "profile" && <Profile />}

      </div>
    </div>
  );
};

export default AdminDashboard;
