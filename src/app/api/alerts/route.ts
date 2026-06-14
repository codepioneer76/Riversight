import { NextResponse } from 'next/server';
import { generateMockAlerts, mockAlertStats } from '@/data/mockAlerts';

export async function GET() {
  const alerts = generateMockAlerts(10);
  return NextResponse.json({
    success: true,
    stats: mockAlertStats,
    data: alerts,
  });
}
