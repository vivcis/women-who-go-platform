import { api } from '@/lib/api';

export interface User {
  id: number;
  email: string;
  name: string;
  location?: string;
  skill_level?: string;
  bio?: string;
  github_url?: string;
}

// User registration action
export async function createUser(userData: Omit<User, 'id'>) {
  try {
    const data = await api.post('/api/users', userData);
    return { success: true, data, status: 200 };
  } catch (error) {
    console.error('User creation error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create user',
    };
  }
}