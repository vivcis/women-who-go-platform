import { api } from '@/lib/api';

export interface PaymentRequest {
  user_id: number;
  amount: number;
  payment_method: string;
  plan_type: string;
}

// Payment initiation action
export async function initiatePayment(paymentData: PaymentRequest) {
  try {
    const data = await api.post('/api/payments/initiate', paymentData);
    return { success: true, data, status: 200 };
  } catch (error) {
    console.error('Payment initiation error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Payment service temporarily unavailable',
    };
  }
}