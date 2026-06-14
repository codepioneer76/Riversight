import { NextResponse } from 'next/server';
import { mockStations } from '@/data/mockStations';

export async function GET() {
  return NextResponse.json({
    success: true,
    count: mockStations.length,
    data: mockStations,
  });
}
