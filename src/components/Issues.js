import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Issues.css";
import api from "./Api";

const Issues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hostels, setHostels] = useState([]);
  const [selectedHostel, setSelectedHostel] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const response = await api.get("/hostel/");
        setHostels(response.data.data.hostels);
        if (response.data.data.hostels.length > 0) {
          setSelectedHostel(response.data.data.hostels[0]._id);
        }
      } catch (error) {
        console.error("Error fetching hostels:", error);
      }
    };
    fetchHostels();
  }, []);

  useEffect(() => {
    if (selectedHostel) {
      fetchIssues(currentPage, selectedHostel);
    }
  }, [currentPage, selectedHostel]);

  const fetchIssues = async (page, hostelId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(
        `/complaints/hostel?hostelId=${hostelId}&page=${page}`
      );
      setIssues(response.data.data.complaints);
      setTotalPages(response.data.data.meta.totalPages);
    } catch (err) {
      console.error(err);
      setError("Failed to load issues. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="issues-container">
      <h2>Issues Reported</h2>
      <div className="hostel-select-container">
        <label htmlFor="hostel-select">Select Hostel: </label>
        <select
          id="hostel-select"
          value={selectedHostel}
          onChange={(e) => setSelectedHostel(e.target.value)}
        >
          {hostels.map((hostel) => (
            <option key={hostel._id} value={hostel._id}>
              {hostel.name}
            </option>
          ))}
        </select>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && issues.length === 0 && <p>No issues found.</p>}
      {!loading && !error && issues.length > 0 && (
        <>
          <table className="styled-table">
            <thead>
              <tr>
                <th>Issue ID</th>
                <th>Issue Type</th>
                <th>Description</th>
                <th>Student Name</th>
                <th>Hostel Name</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue) => (
                <tr
                  key={issue._id}
                  onClick={() => navigate(`/complaints/${issue._id}`)} // Navigate to Complaints.js
                  className="clickable-row"
                >
                  <td>{issue._id}</td>
                  <td>{issue.type.toUpperCase()}</td>
                  <td>{issue.description}</td>
                  <td>{issue.raised_by}</td>
                  <td>{issue.hostel}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            {[...Array(totalPages)].map((_, pageIndex) => (
              <button
                key={pageIndex}
                className={`page-btn ${currentPage === pageIndex + 1 ? "active" : ""}`}
                onClick={() => setCurrentPage(pageIndex + 1)}
              >
                {pageIndex + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Issues;
