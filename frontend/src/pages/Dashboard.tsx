// src/pages/DashboardPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { PROTECTED_PATHS } from "../routes/pagePath";
import { FaTasks } from "react-icons/fa"; // Import an icon from react-icons
import "../styles/dashboardPage.scss";

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const handleAssignHomework = () => {
    const classroomId = "1";
    const path = PROTECTED_PATHS.CLASSROOM.replace(":classroomId", classroomId);
    navigate(path);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome to the Teacher Dashboard</h1>
        <p>
          Manage your classrooms, assign homework, and track student progress.
        </p>
      </div>
      <div className="dashboard-content">
        <div className="dashboard-item" onClick={handleAssignHomework}>
          <FaTasks className="dashboard-icon" />{" "}
          {/* Use the imported icon here */}
          <h2>Assign Homework</h2>
          <p>Click here to assign homework to your students.</p>
        </div>
        {/* Add more dashboard items as needed */}
      </div>
    </div>
  );
};

export default DashboardPage;
