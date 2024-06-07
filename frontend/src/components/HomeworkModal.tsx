// src/components/HomeworkModal.tsx
import React, { useEffect, useState } from "react";
import useStore, { Assignment } from "../store/useStore";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import "styles/homeworkModal.scss";

interface HomeworkModalProps {
  onClose: () => void;
}

const HomeworkModal: React.FC<HomeworkModalProps> = ({ onClose }) => {
  const { resources, assignments, fetchResources, addAssignment } = useStore();
  const { classroomId } = useParams<{ classroomId: string }>();
  const [selectedResources, setSelectedResources] = useState<string[]>([]);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  useEffect(() => {
    const classroomAssignments = assignments.find(
      (assignment) => assignment.classroomId === classroomId
    );
    if (classroomAssignments) {
      setSelectedResources(
        classroomAssignments.resources.map((resource) => resource.id)
      );
    }
  }, [assignments, classroomId]);

  const handleResourceClick = (resourceId: string) => {
    setSelectedResources((prev) =>
      prev.includes(resourceId)
        ? prev.filter((id) => id !== resourceId)
        : [...prev, resourceId]
    );
  };

  const handleAssign = async () => {
    const selectedResourcesDetails = resources.filter((resource) =>
      selectedResources.includes(resource.id)
    );
    const assignment: Assignment = {
      name: "New Assignment",
      date: Date.now(),
      resources: selectedResourcesDetails,
      classroomId: classroomId || "",
    };

    try {
      const toAPI = {
        ...assignment,
        students: [],
      };
      const response = await axios.post(
        "http://localhost:3000/assignment",
        toAPI
      );
      if (response.status === 201) {
        addAssignment(assignment); // Update the state in Zustand
        onClose();
      }
    } catch (error) {
      console.error("Error creating assignment:", error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div style={{ marginBottom: "3rem" }}>
          <button className="close-button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <h2>Select Resources to Assign</h2>
        <div className="resources-list">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className={`resource-card ${
                selectedResources.includes(resource.id) ? "selected" : ""
              }`}
              onClick={() => handleResourceClick(resource.id)}
            >
              <div className="resource-details">
                <p className="resource-name">
                  {resource.path.split("/").pop()}
                </p>
                <p className="resource-type">{resource.type}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="modal-actions">
          <button className="modal-button assign-button" onClick={handleAssign}>
            Assign
          </button>
          <button className="modal-button cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeworkModal;
