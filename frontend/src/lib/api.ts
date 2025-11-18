const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

const handleApiError = async (response: Response): Promise<never> => {
  let errorMessage = `HTTP error! status: ${response.status}`;
  try {
    const errorBody = await response.json();
    if (errorBody.error) {
      errorMessage = errorBody.error;
    }
  } catch {
    // If parsing fails, keep the default message
  }
  throw new ApiError(response.status, errorMessage);
};

export const api = {
  async get(endpoint: string) {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      return handleApiError(response);
    }
    return response.json();
  },

  async post(endpoint: string, data?: any) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    });
    if (!response.ok) {
      return handleApiError(response);
    }
    return response.json();
  },

  async put(endpoint: string, data?: any) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    });
    if (!response.ok) {
      return handleApiError(response);
    }
    return response.json();
  },

  async delete(endpoint: string) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      return handleApiError(response);
    }
    return response.json();
  },
};

export { ApiError };