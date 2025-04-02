import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Student.css";
import api from "./Api";

const Student = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hostels, setHostels] = useState([]);
  const [selectedHostel, setSelectedHostel] = useState("");

  const navigate = useNavigate();

  // Fetch all hostels on component mount
  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const response = await api.get("/hostel/");
        setHostels(response.data.data.hostels);
        if (response.data.data.hostels.length > 0) {
          setSelectedHostel(response.data.data.hostels[0]._id); // Select the first hostel by default
        }
      } catch (error) {
        console.error("Error fetching hostels:", error);
      }
    };
    fetchHostels();
  }, []);

  // Fetch students whenever hostel or page changes
  useEffect(() => {
    if (selectedHostel) {
      fetchStudents(currentPage, selectedHostel);
    }
  }, [currentPage, selectedHostel]);

  // Function to fetch students
  const fetchStudents = async (page, hostelId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/hostel/students?hostelId=${hostelId}&page=${page}`);
      console.log(response.data);
      setStudents(response.data.data.students);
      setTotalPages(response.data.data.meta.totalPages);
    } catch (err) {
      console.error("Error fetching students:", err);
      setError("Failed to load students. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="student-container">
      <h2>Student List</h2>

      {/* Hostel Selection Dropdown */}
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

      {loading && <p>Loading students...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && students.length === 0 && <p>No students available.</p>}

      {/* Student Table */}
      {!loading && !error && students.length > 0 && (
        <>
          <table className="styled-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone No</th>
                <th>Hostel</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr
                  key={student._id}
                  // onClick={() => navigate(`/students/${student._id}`)} // Navigate if needed
                  className="clickable-row"
                >
                  <td>{index + 1 + (currentPage - 1) * 10}</td>
                  <td>{student.fullName}</td>
                  <td>{student.email}</td>
                  <td>{student.contactNumber}</td>
                  <td>{student.hostelId.name || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
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

export default Student;
