// src/pages/ClassroomPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useStore from "../store/useStore";
import HomeworkModal from "../components/HomeworkModal";
import { FaArrowLeft, FaTasks } from "react-icons/fa";
import "styles/classroomPage.scss";

const ClassroomPage: React.FC = () => {
  const { classroomId } = useParams<{ classroomId: string }>();
  const { students, fetchStudents, assignments } = useStore();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const classroomAssignments = assignments.filter(
    (assignment) => assignment.classroomId === classroomId
  );

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="classroom">
      <div className="classroom-header">
        <button onClick={handleBack} className="back-button">
          <FaArrowLeft /> Back
        </button>
        <h1>Classroom {classroomId}</h1>
      </div>
      <div className="classroom-content">
        <div className="students-section">
          <h2>Students</h2>
          <ul className="students-list">
            {students.map((student) => (
              <li key={student.id} className="student-card">
                <a href={`/student/${student.id}`}>
                  {student.firstname} {student.lastname}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <button onClick={() => setShowModal(true)} className="assign-button">
          <FaTasks /> Assign Homework
        </button>
        {showModal && <HomeworkModal onClose={() => setShowModal(false)} />}
        <div className="assignments-section">
          <h2>Assigned Homework</h2>
          <ul className="assignments-list">
            {classroomAssignments.map((assignment, index) => (
              <li key={index} className="assignment-card">
                <div className="assignment-header">
                  <h3>{assignment.name}</h3>
                  <p>{new Date(assignment.date).toLocaleDateString()}</p>
                </div>
                <div className="assignment-resources">
                  <h4>Resources:</h4>
                  <ul>
                    {assignment.resources.map((resource) => (
                      <li key={resource.id}>
                        {resource.path.split("/").pop()}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ClassroomPage;
