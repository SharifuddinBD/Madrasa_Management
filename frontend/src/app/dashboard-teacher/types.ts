// dashboard-teacher/types.ts

export interface Student {
  id: number;
  name: string;
  class: string;
  avatar: string;
  attendance: { [date: string]: boolean };
}

export interface Grade {
  id: number;
  student: string;
  subject: string;
  score: number;
}

export interface Homework {
  id: number;
  subject: string;
  assignment: string;
  dueDate: string;
}

export interface TeacherProfile {
  name: string;
  designation: string;
  experience: string;
  specialization: string;
  education: string;
  email: string;
  phone: string;
  joinedDate: string;
  totalStudents: number;
  achievements: string[];
}

export interface SidebarItem {
  id: string;
  label: string;
  icon: any;
  color: string;
}

export type ViewType = 'dashboard' | 'attendance' | 'grading' | 'homework' | 'notices' | 'settings' | 'login';