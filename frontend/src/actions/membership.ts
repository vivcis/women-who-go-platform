import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export interface MembershipPlan {
  name: string;
  price: number;
  description: string;
  features: string[];
}

// Membership plans fetch function for TanStack Query
export const fetchMembershipPlans = async (): Promise<MembershipPlan[]> => {
  return api.get('/api/membership-plans');
};

// Custom hook for membership plans
export const useMembershipPlans = () => {
  return useQuery({
    queryKey: ['membership-plans'],
    queryFn: fetchMembershipPlans,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

