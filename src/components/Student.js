import React, { useState } from "react";
import "./Student.css";

const studentsData = [
  { id: 1, name: "Ravi Kumar", idNo: "RGUKT123", phone: "9876543210", hostel: "A1" },
  { id: 2, name: "Priya Sharma", idNo: "RGUKT124", phone: "7894561230", hostel: "B1" },
  { id: 3, name: "Amit Patel", idNo: "RGUKT125", phone: "8569741236", hostel: "C1" },
  { id: 4, name: "Neha Gupta", idNo: "RGUKT126", phone: "9854123654", hostel: "A2" },
  { id: 5, name: "Vikram Singh", idNo: "RGUKT127", phone: "8975412369", hostel: "B2" },
  { id: 6, name: "Anjali Verma", idNo: "RGUKT128", phone: "7845963210", hostel: "C2" },
  { id: 7, name: "Rohan Joshi", idNo: "RGUKT129", phone: "9123456789", hostel: "A3" },
  { id: 8, name: "Megha Reddy", idNo: "RGUKT130", phone: "7985632140", hostel: "B3" },
  { id: 9, name: "Manoj Tiwari", idNo: "RGUKT131", phone: "8765412398", hostel: "C3" },
  { id: 10, name: "Sneha Raj", idNo: "RGUKT132", phone: "7458963214", hostel: "A4" },
  { id: 11, name: "Rahul Sharma", idNo: "RGUKT133", phone: "9632587412", hostel: "B4" },
  { id: 12, name: "Kiran Das", idNo: "RGUKT134", phone: "8456321975", hostel: "C4" },
  { id: 13, name: "Sakshi Malhotra", idNo: "RGUKT135", phone: "9516324785", hostel: "A5" },
  { id: 14, name: "Aditya Kumar", idNo: "RGUKT136", phone: "8527413692", hostel: "B5" },
  { id: 15, name: "Deepika Reddy", idNo: "RGUKT137", phone: "7896523145", hostel: "C5" },
  { id: 16, name: "Suraj Mehta", idNo: "RGUKT138", phone: "9874123654", hostel: "A6" },
  { id: 17, name: "Nidhi Sinha", idNo: "RGUKT139", phone: "8754123698", hostel: "B6" },
  { id: 18, name: "Pranav Ghosh", idNo: "RGUKT140", phone: "9687451236", hostel: "C6" },
  { id: 19, name: "Alok Yadav", idNo: "RGUKT141", phone: "7841236598", hostel: "A7" },
  { id: 20, name: "Varsha Jaiswal", idNo: "RGUKT142", phone: "7896541237", hostel: "B7" },
  { id: 21, name: "Karthik Iyer", idNo: "RGUKT143", phone: "9512634785", hostel: "C7" },
  { id: 22, name: "Pooja Soni", idNo: "RGUKT144", phone: "7418529632", hostel: "A8" },
  { id: 23, name: "Siddharth Rao", idNo: "RGUKT145", phone: "6987451234", hostel: "B8" },
  { id: 24, name: "Ritika Jain", idNo: "RGUKT146", phone: "8745632198", hostel: "C8" },
  { id: 25, name: "Mohit Sharma", idNo: "RGUKT147", phone: "9876523145", hostel: "A9" },
  { id: 26, name: "Arun Verma", idNo: "RGUKT148", phone: "8956231478", hostel: "B9" },
  { id: 27, name: "Shreya Das", idNo: "RGUKT149", phone: "7845963217", hostel: "C9" },
  { id: 28, name: "Rajesh Gupta", idNo: "RGUKT150", phone: "6985231478", hostel: "A10" },
  { id: 29, name: "Swati Sinha", idNo: "RGUKT151", phone: "8745963214", hostel: "B10" },
  { id: 30, name: "Akash Malhotra", idNo: "RGUKT152", phone: "9632147854", hostel: "C10" },
];

const Student = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = studentsData.slice(indexOfFirstStudent, indexOfLastStudent);

  return (
    <div className="student-container">
      <h2>Student List</h2>
      <table className="student-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>ID No</th>
            <th>Phone No</th>
            <th>Hostel</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.map((student, index) => (
            <tr key={student.id}>
              <td>{indexOfFirstStudent + index + 1}</td>
              <td>{student.name}</td>
              <td>{student.idNo}</td>
              <td>{student.phone}</td>
              <td>{student.hostel}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
          {[...Array(Math.ceil(studentsData.length / studentsPerPage))].map((_, pageIndex) => (
            <button
              key={pageIndex}
              className={`page-btn ${currentPage === pageIndex + 1 ? "active" : ""}`}
              onClick={() => setCurrentPage(pageIndex + 1)}
            >
              {pageIndex + 1}
            </button>
          ))}
      </div>
    </div>
  );
};

export default Student;
