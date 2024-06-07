// src/components/BookModal.tsx
import React, { useEffect, useState } from "react";
import useStore from "../store/useStore";
import { FaTimes } from "react-icons/fa";
import "styles/bookModal.scss";

interface BookModalProps {
  studentId: string;
  onClose: () => void;
}

const BookModal: React.FC<BookModalProps> = ({ studentId, onClose }) => {
  const { resources, fetchResources, assignBookToStudent } = useStore();
  const [selectedBook, setSelectedBook] = useState<string | null>(null);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  const handleBookClick = (bookId: string) => {
    setSelectedBook((prev) => (prev === bookId ? null : bookId));
  };

  const handleAssign = () => {
    const selectedResource = resources.find(
      (resource) => resource.id === selectedBook
    );
    if (selectedResource) {
      assignBookToStudent(studentId, selectedResource);
      onClose();
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          <FaTimes />
        </button>
        <h2>Select Book to Assign</h2>
        <div className="books-list">
          {resources
            .filter((resource) => resource.type === "book")
            .map((book) => (
              <div
                key={book.id}
                className={`book-card ${
                  selectedBook === book.id ? "selected" : ""
                }`}
                onClick={() => handleBookClick(book.id)}
              >
                <div className="book-details">
                  <p className="book-name">{book.path.split("/").pop()}</p>
                  <p className="book-type">{book.type}</p>
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

export default BookModal;
