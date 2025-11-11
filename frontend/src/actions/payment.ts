const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

export interface PaymentRequest {
  user_id: number;
  amount: number;
  payment_method: string;
  plan_type: string;
}

// Payment initiation action
export async function initiatePayment(paymentData: PaymentRequest) {
  try {
    const response = await fetch(`${BACKEND_URL}/api/payments/initiate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Payment initiation failed');
    }

    return { success: true, data, status: response.status };
  } catch (error) {
    console.error('Payment initiation error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Payment service temporarily unavailable',
    };
  }
}