import React, { useState } from "react";
import HostelName from "./HostelName";
import HostelForm from "./HostelForm";
import CareTaker from "./CareTaker";
import Student from "./Student";
import Issues from "./Issues";
import Profile from "./Profile";
import BusCreation from "./BusCreation";

import "./styles.css";
import Bus from "./Bus";

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
            <li className="nav-item" onClick={() => { setSelectedOption("caretakers") }}>
              Caretakers
            </li>
            <li className="nav-item" onClick={() => { setSelectedOption("issues") }}>
              Issues
            </li>
            <li className="nav-item" onClick={() => setSelectedOption("students")}>
              Students
            </li>
            <li className="nav-item" onClick={() => { setSelectedOption("buscreation") }}>
              Bus Creation
            </li>
            <li className="nav-item" onClick={() => { setSelectedOption("bus") }}>
              Bus
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
        {selectedOption === "buscreation" && <BusCreation />}
        {selectedOption === "bus" && <Bus/>}
        {selectedOption === "profile" && <Profile />}

        
      </div>
    </div>
  );
};

export default AdminDashboard;
