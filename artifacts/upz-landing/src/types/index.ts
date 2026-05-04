export type Profession = 'developer' | 'teacher' | 'student' | 'freelancer' | 'designer' | 'smm' | 'creator';
export type Goal = 'learn' | 'find_work' | 'manage_team' | 'build_portfolio' | 'freelance';
export type Experience = 'beginner' | 'intermediate' | 'advanced';
export type Priority = 'low' | 'medium' | 'high';
export type ChatType = '1on1' | 'group' | 'team' | 'project';
export type UserStatus = 'online' | 'offline' | 'away';

export interface UserProfile {
  name: string;
  profession: Profession;
  goal: Goal;
  experience: Experience;
  joinedAt: number;
}

export interface Task {
  id: string;
  text: string;
  done: boolean;
  createdAt: number;
  priority: Priority;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}

export interface ChatUser {
  id: string;
  name: string;
  initials: string;
  color: string;
  status: UserStatus;
  role?: string;
}

export interface ChatMessage {
  id: string;
  userId: string;
  text: string;
  timestamp: number;
}

export interface ChatRoom {
  id: string;
  type: ChatType;
  name: string;
  memberIds: string[];
  messages: ChatMessage[];
  unread?: number;
}

export interface Integration {
  id: string;
  name: string;
  description: string;
  iconBg: string;
  iconColor: string;
  connected: boolean;
}
