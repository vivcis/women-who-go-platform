import type { NextApiRequest, NextApiResponse } from 'next';

const BACKEND_URL = 'http://localhost:8080';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await fetch(`${BACKEND_URL}/api/membership-plans`);
    
    if (!response.ok) {
      throw new Error('Backend service unavailable');
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Membership plans API error:', error);
    // Return fallback data
    res.status(200).json([
      {
        name: "Free",
        price: 0,
        description: "Access to community resources and monthly meetups",
        features: [
          "Community forum access",
          "Monthly virtual meetups",
          "Resource library",
        ],
      },
      {
        name: "Supporter",
        price: 10,
        description: "Support the community and get exclusive content",
        features: [
          "Everything in Free",
          "Exclusive workshops",
          "1-on-1 mentorship (1 session/month)",
          "Early access to events",
        ],
      },
      {
        name: "Patron",
        price: 25,
        description: "Maximum support with premium benefits",
        features: [
          "Everything in Supporter",
          "Unlimited mentorship sessions",
          "Job board access",
          "Conference ticket discounts",
          "Priority support",
        ],
      },
    ]);
  }
}