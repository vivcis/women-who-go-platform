const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

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
    const response = await fetch(`${BACKEND_URL}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `Status: ${response.status}`);
    }

    return { success: true, data, status: response.status };
  } catch (error) {
    console.error('User creation error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create user',
    };
  }
}