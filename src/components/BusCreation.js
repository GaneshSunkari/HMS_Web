import React, { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import BusForm from "./BusForm";
import BusAnalytics from "./BusAnalytics";
import "./BusCreation.css";
import api from "./Api";

const BusCreation = () => {
  const [busData, setBusData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBusData = async (page = 1) => {
    try {
      setLoading(true);
      const response = await api.get(`/bus/form?page=${page}&limit=10`);
      const buses = response.data?.data?.busForms || [];
      const pagination = response.data?.data?.meta;
      setBusData(Array.isArray(buses) ? buses : []);
      setTotalPages(pagination?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching bus data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusData(currentPage);
  }, [currentPage]);

  if (loading) {
    return (
      <div className="bus-loader">
        <div className="loader-circle" />
        <p>Loading Bus Forms...</p>
      </div>
    );
  }

  return (
    <div className="bus-creation-container">
      {!showForm && !showAnalytics ? (
        <>
          <div className="bus-header">
            <h2 className="bus-title">Bus Management</h2>
            <button
              className="bus-create-button"
              onClick={() => setShowForm(true)}
            >
              Create
            </button>
          </div>

          <div className="bus-table-container">
            <table className="bus-table">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Allowed Hostels</th>
                  <th>Cities</th>
                  <th>Is Active</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {busData.map((bus, index) => (
                  <tr key={bus._id || index}>
                    <td>{(currentPage - 1) * 10 + index + 1}</td>
                    <td>
                      {Array.isArray(bus.hostelId)
                        ? bus.hostelId.map(h => h.name).join(", ")
                        : "No Hostels Assigned"}

                    </td>
                    <td>
                      {Array.isArray(bus.cities)
                        ? bus.cities.join(", ")
                        : "No Cities Selected"}
                    </td>
                    <td>
                      <span
                        className={
                          bus.isActive ? "status-active" : "status-inactive"
                        }
                      >
                        {bus.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="bus-action-cell">
                      <button
                        className="bus-arrow-button"
                        onClick={() => setShowAnalytics(true)}
                      >
                        <ChevronRight size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="busform-pagination">
            {[...Array(totalPages)].map((_, pageIndex) => (
              <button
                key={pageIndex}
                className={`busform-page-btn ${currentPage === pageIndex + 1 ? "active" : ""}`}
                onClick={() => setCurrentPage(pageIndex + 1)}
              >
                {pageIndex + 1}
              </button>
            ))}
          </div>
        </>
      ) : showForm ? (
        <BusForm onCancel={() => setShowForm(false)} />
      ) : (
        <BusAnalytics
          analyticsData={busData}
          onBack={() => setShowAnalytics(false)}
        />
      )}
    </div>
  );
};

export default BusCreation;
