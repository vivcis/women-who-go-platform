import { api } from '@/lib/api';

export interface MembershipPlan {
  name: string;
  price: number;
  description: string;
  features: string[];
}

// Membership plans action
export async function getMembershipPlans(): Promise<{ success: boolean; data: MembershipPlan[]; error?: string }> {
  try {
    const data = await api.get('/api/membership-plans');
    return { success: true, data };
  } catch (error) {
    console.error('Membership plans fetch error:', error);
    return {
      success: false,
      data: [],
      error: error instanceof Error ? error.message : 'Failed to fetch membership plans'
    };
  }
}