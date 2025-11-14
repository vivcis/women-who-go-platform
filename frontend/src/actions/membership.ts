const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

export interface MembershipPlan {
  name: string;
  price: number;
  description: string;
  features: string[];
}

// Membership plans action
export async function getMembershipPlans(): Promise<{ success: boolean; data: MembershipPlan[]; error?: string }> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/membership-plans`);

    if (!response.ok) {
      throw new Error('Backend service unavailable');
    }

    const data = await response.json();
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