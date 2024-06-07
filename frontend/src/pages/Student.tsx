// src/pages/StudentPage.tsx
import React, { useEffect, useState } from "react";
import useStore, { Student } from "../store/useStore";
import BookModal from "../components/BookModal";
import { FaBook, FaArrowLeft } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import "styles/studentPage.scss";
import Loader from "components/Loader";

const StudentPage: React.FC = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const { students, bookAssignments, fetchStudents } = useStore();
  const [student, setStudent] = useState<Student | undefined>(undefined);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  useEffect(() => {
    const foundStudent = students.find((student) => student.id === studentId);
    setStudent(foundStudent);
  }, [studentId, students]);

  const assignedBook = bookAssignments.find(
    (assignment) => assignment.studentId === studentId
  );
  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };
  const generateAvatarUrl = (name: string) => {
    return `https://api.dicebear.com/8.x/avataaars/svg?seed=${encodeURIComponent(
      name
    )}`;
  };
  if (!student) return <Loader />;

  return (
    <div className="container">
      <div className="student-page">
        <div className="student-header">
          <div className="btn-name">
            <button onClick={handleBack} className="back-button">
              <FaArrowLeft /> Back
            </button>
            <h1>
              {student.firstname} {student.lastname}
            </h1>
          </div>
          <img
            src={generateAvatarUrl(`${student.firstname} ${student.lastname}`)}
            alt={student.firstname}
            className="student-avatar"
          />
        </div>
        <button onClick={() => setShowModal(true)} className="assign-button">
          <FaBook /> Assign Book
        </button>
        {showModal && (
          <BookModal
            studentId={student.id}
            onClose={() => setShowModal(false)}
          />
        )}
        <div className="assigned-book-section">
          <h2>Assigned Book</h2>
          {assignedBook ? (
            <div className="book-card">
              {assignedBook.resource.path.split("/").pop()}
            </div>
          ) : (
            <div className="no-book">No book assigned</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentPage;
