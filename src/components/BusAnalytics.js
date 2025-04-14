import React, { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import { Button } from "@mui/material";
import axios from "axios";
import "chart.js/auto";
import "./BusAnalytics.css";

const BusAnalytics = ({ analyticsData, onBack }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const busId = analyticsData?.[0]?.id || "";

  useEffect(() => {
    if (!busId) return;

    setLoading(true);
    axios.get(`/bus/form/stats/${busId}`)
      .then(response => {
        setStats(response.data);
      })
      .catch(error => {
        console.error("Error fetching bus stats:", error);
      })
      .finally(() => setLoading(false));
  }, [busId]);

  if (!busId) return <p>No Bus Selected</p>;
  if (loading) return <p>Loading Analytics...</p>;
  if (!stats) return <p>No analytics available.</p>;

  // Assuming your API returns { yes, no, cityCounts } format
  const pieData = {
    labels: ["Yes", "No"],
    datasets: [
      {
        data: [stats.yes, stats.no],
        backgroundColor: ["#4CAF50", "#FF5252"],
      },
    ],
  };

  const barData = {
    labels: Object.keys(stats.cityCounts),
    datasets: [
      {
        label: "Students Count",
        data: Object.values(stats.cityCounts),
        backgroundColor: "#42A5F5",
      },
    ],
  };

  return (
    <div className="bus-analytics-container">
      <h2>Bus Analytics</h2>
      <div className="charts-container">
        <div className="chart-box">
          <h3>Yes vs No</h3>
          <Pie data={pieData} />
        </div>
        <div className="chart-box">
          <h3>Student Count per City</h3>
          <Bar data={barData} />
        </div>
      </div>
      <Button className="back-button" onClick={onBack}>
        Back
      </Button>
    </div>
  );
};

export default BusAnalytics;
