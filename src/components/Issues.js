import React, { useState, useEffect } from "react";
import "./Issues.css";
import api from "./Api";

const Issues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const hostelId = "679b997967241f0ddd12dc09"; // Change this dynamically if needed

  useEffect(() => {
    fetchIssues(currentPage);
  }, [currentPage]);

  const fetchIssues = async (page) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(
        `https://rgukt-hms.vercel.app/api/v1/complaints/hostel?hostelId=${hostelId}&page=${page}`
      );
      console.log(response.data);
      setIssues(response.data.data.complaints);
      setTotalPages(response.data.data.meta.totalPages);
    } catch (err) {
      console.log(err);
      setError("Failed to load issues. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="issues-container">
      <h2>Issues Reported</h2>

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
              {issues.map((issue, index) => (
                <tr key={index}>
                  <td>{issue._id}</td>
                  <td>{issue.type.toUpperCase()}</td>
                  <td>{issue.description}</td>
                  <td>{issue.raised_by}</td>
                  <td>{issue.hostel}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="pagination">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="page-button"
            >
              ⬅ Prev
            </button>
            <span className="page-info">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="page-button"
            >
              Next ➡
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Issues;
