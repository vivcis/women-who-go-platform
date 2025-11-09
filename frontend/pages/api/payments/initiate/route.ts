import type { NextApiRequest, NextApiResponse } from 'next';

const BACKEND_URL = 'http://localhost:8080';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await fetch(`${BACKEND_URL}/api/payments/initiate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Payment initiation error:', error);
    res.status(500).json({ error: 'Payment service temporarily unavailable' });
  }
}