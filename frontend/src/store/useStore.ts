// src/store/useStore.ts
import { create } from "zustand";
import axios from "axios";

// Define the types for our state
export interface Student {
  id: string;
  grade: string;
  firstname: string;
  lastname: string;
  email: string;
  schoolId: string;
  avatar: string;
}

export interface Resource {
  id: string;
  path: string;
  type: string;
}

export interface Assignment {
  name: string;
  date: number;
  resources: Resource[];
  classroomId: string;
}

export interface BookAssignment {
  studentId: string;
  resource: Resource;
}

interface StoreState {
  students: Student[];
  resources: Resource[];
  assignments: Assignment[];
  bookAssignments: BookAssignment[];
  fetchStudents: () => Promise<void>;
  fetchResources: () => Promise<void>;
  addAssignment: (assignment: Assignment) => void;
  assignBookToStudent: (studentId: string, resource: Resource) => void;
}

// Create the Zustand store
const useStore = create<StoreState>((set) => ({
  students: [],
  resources: [],
  assignments: [],
  bookAssignments: [],
  fetchStudents: async () => {
    try {
      const response = await axios.get<{ students: Student[] }>(
        "http://localhost:3000/students"
      );
      set({ students: response.data.students });
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  },
  fetchResources: async () => {
    try {
      const response = await axios.get<{ resources: Resource[] }>(
        "http://localhost:3000/resources"
      );
      set({ resources: response.data.resources });
    } catch (error) {
      console.error("Error fetching resources:", error);
    }
  },
  addAssignment: (newAssignment: Assignment) => {
    set((state) => {
      const existingAssignmentIndex = state.assignments.findIndex(
        (assignment) => assignment.classroomId === newAssignment.classroomId
      );

      if (existingAssignmentIndex > -1) {
        const existingAssignment = state.assignments[existingAssignmentIndex];
        const updatedResources = newAssignment.resources.reduce<Resource[]>(
          (acc, resource) => {
            if (
              existingAssignment.resources.some((res) => res.id === resource.id)
            ) {
              return acc.filter((res) => res.id !== resource.id);
            } else {
              return [...acc, resource];
            }
          },
          existingAssignment.resources
        );

        const updatedAssignment = {
          ...existingAssignment,
          resources: updatedResources,
        };
        const updatedAssignments = [...state.assignments];
        updatedAssignments[existingAssignmentIndex] = updatedAssignment;

        return { assignments: updatedAssignments };
      } else {
        return { assignments: [...state.assignments, newAssignment] };
      }
    });
  },
  assignBookToStudent: (studentId: string, resource: Resource) => {
    set((state) => ({
      bookAssignments: [
        ...state.bookAssignments.filter(
          (assignment) => assignment.studentId !== studentId
        ),
        { studentId, resource },
      ],
    }));
  },
}));

export default useStore;
