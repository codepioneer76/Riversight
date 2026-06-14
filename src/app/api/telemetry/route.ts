import { NextResponse } from 'next/server';
import { generateTelemetryReading, generateHistoricalData } from '@/data/mockTelemetry';
import { mockStations } from '@/data/mockStations';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const stationId = searchParams.get('stationId') || 'STN-001';
  const mode = searchParams.get('mode') || 'latest';

  if (mode === 'historical') {
    const points = parseInt(searchParams.get('points') || '30');
    const data = generateHistoricalData(stationId, points);
    return NextResponse.json({ success: true, stationId, data });
  }

  // Latest reading
  const reading = generateTelemetryReading(stationId);
  return NextResponse.json({ success: true, stationId, data: reading });
}
