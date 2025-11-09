// app/api/health/route.ts
import { NextResponse } from 'next/server';

const BACKEND_URL = 'http://localhost:8080';

export async function GET() {
  try {
    const response = await fetch(`${BACKEND_URL}/health`);
    const data = await response.json();
    return NextResponse.json({ 
      backend: 'connected', 
      message: data.message,
      status: response.status 
    });
  } catch (error) {
    return NextResponse.json({ 
      backend: 'disconnected', 
      error: 'Backend not reachable',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}