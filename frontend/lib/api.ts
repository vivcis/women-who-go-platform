const API_BASE_URL = 'http://localhost:8080/api';

export interface User {
  id: number;
  email: string;
  name: string;
  location?: string;
  skill_level?: string;
  bio?: string;
  github_url?: string;
}

export interface PaymentRequest {
  user_id: number;
  amount: number;
  payment_method: string;
  plan_type: string;
}

export interface Stats {
  total_members: number;
  active_memberships: number;
  total_resources: number;
  total_donations: number;
}

// User API calls
export const userAPI = {
  getUsers: async (): Promise<User[]> => {
    const response = await fetch(`${API_BASE_URL}/users`);
    return response.json();
  },

  createUser: async (user: Omit<User, 'id'>): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    return response.json();
  },
};

// Payment API calls
export const paymentAPI = {
  initiatePayment: async (payment: PaymentRequest) => {
    const response = await fetch(`${API_BASE_URL}/payments/initiate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payment),
    });
    return response.json();
  },

  getPayment: async (reference: string) => {
    const response = await fetch(`${API_BASE_URL}/payments/${reference}`);
    return response.json();
  },
};

// Stats API call
export const getStats = async (): Promise<Stats> => {
  const response = await fetch(`${API_BASE_URL}/stats`);
  return response.json();
};

// Membership API calls
export const membershipAPI = {
  getPlans: async () => {
    const response = await fetch(`${API_BASE_URL}/membership-plans`);
    return response.json();
  },

  getMemberships: async () => {
    const response = await fetch(`${API_BASE_URL}/memberships`);
    return response.json();
  },
};

// Resources API calls
export const resourcesAPI = {
  getResources: async (category?: string, difficulty?: string) => {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (difficulty) params.append('difficulty', difficulty);
    
    const query = params.toString();
    const url = query ? `${API_BASE_URL}/resources?${query}` : `${API_BASE_URL}/resources`;
    
    const response = await fetch(url);
    return response.json();
  },

  getCategories: async (): Promise<string[]> => {
    const response = await fetch(`${API_BASE_URL}/resource-categories`);
    return response.json();
  },
};