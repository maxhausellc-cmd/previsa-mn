import { api } from './api';
import type { User } from '../types';

interface AuthPayload {
  name?: string;
  email: string;
}

export const registerUser = async (data: AuthPayload): Promise<User> => {
  const res = await api.post('/api/auth/register', data);
  const backendUser = res.data;
  return {
    id: backendUser.id,
    name: backendUser.name,
    email: backendUser.email,
    role: backendUser.role,
    paymentStatus: backendUser.paymentStatus,
    avatar: backendUser.avatar ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(backendUser.name)}&background=f59e0b&color=fff`,
  };
};

export const loginUser = async (data: Pick<AuthPayload, 'email'>): Promise<User> => {
  const res = await api.post('/api/auth/login', data);
  const backendUser = res.data;
  return {
    id: backendUser.id,
    name: backendUser.name,
    email: backendUser.email,
    role: backendUser.role,
    paymentStatus: backendUser.paymentStatus,
    avatar: backendUser.avatar ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(backendUser.name)}&background=f97316&color=fff`,
  };
};


