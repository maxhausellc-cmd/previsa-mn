
export type Language = 'mn' | 'en';
export type Theme = 'light' | 'dark';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role?: 'user' | 'admin';
  paymentStatus?: 'pending' | 'paid' | 'cancelled';
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

export interface Banner {
  id: string;
  title: string;
  imageUrl: string;
  type: 'discount' | 'standard';
  linkUrl: string;
  isActive: boolean;
  startDate: string;
  endDate: string;
}

export enum Page {
  HOME = 'home',
  CHECKLIST = 'checklist',
  GUIDE = 'guide',
  PRICING = 'pricing',
  DASHBOARD = 'dashboard',
  ADMIN = 'admin',
}