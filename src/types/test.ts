export interface Question {
  id: number;
  question: string;
  options?: string[];
  type: 'multiple-choice' | 'text' | 'essay';
  section: string;
}

export interface TestSection {
  id: string;
  title: string;
  timeLimit: number; // in minutes
  instructions: string;
  questions: Question[];
}

export interface TestState {
  currentSection: number;
  answers: Record<number, string>;
  timeLeft: number;
  isActive: boolean;
  isComplete: boolean;
}

export interface StudentInfo {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  level: string;
  dateOfBirth: string;
}