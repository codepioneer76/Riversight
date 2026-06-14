import { NextResponse } from 'next/server';
import { mockBathymetryProfiles, depthContours } from '@/data/mockBathymetry';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const stationId = searchParams.get('stationId');

  const profiles = stationId
    ? mockBathymetryProfiles.filter(p => p.stationId === stationId)
    : mockBathymetryProfiles;

  return NextResponse.json({
    success: true,
    count: profiles.length,
    contours: depthContours,
    data: profiles,
  });
}
