import { NextResponse } from 'next/server';
import { mockPredictions, mockModelEndpoints } from '@/data/mockPredictions';

export async function GET() {
  return NextResponse.json({
    success: true,
    models: mockModelEndpoints,
    predictions: mockPredictions,
  });
}
