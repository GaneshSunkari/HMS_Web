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

  useEffect(() => {
    // Simulate API fetch with delay
    const fetchBusData = async () => {
      try {
        setLoading(true);
        const response = await api.get("/bus/form");
        const buses = response.data?.data || [];
        setBusData(Array.isArray(buses) ? buses : []);
      } catch (error) {
        console.error("Error fetching bus data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusData();
  }, []);

  if (loading) {
    return (
      <div className="bus-loader">
        <div className="loader-circle" />
        <p>Loading Buses...</p>
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
                  <th>Is Active</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {busData.map((bus, index) => (
                  <tr key={bus.id || index}>
                    <td>{index + 1}</td>
                    <td>
                      {Array.isArray(bus.allowedHostels)
                        ? bus.allowedHostels.join(", ")
                        : "No Hostels Assigned"}
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
