'use client';
import DashboardShell from '@/components/layout/DashboardShell';
import OverviewPanel from '@/features/dashboard/OverviewPanel';
import QuickStats from '@/features/dashboard/QuickStats';
import RiverMap from '@/features/gis/RiverMap';
import LADMonitor from '@/features/lad/LADMonitor';
import HotspotPanel from '@/features/sediment/HotspotPanel';
import { useTelemetry } from '@/hooks/useTelemetry';

export default function DashboardPage() {
  const { healthScore, stations, getPrimaryStation, getSparklineData, getTrend } = useTelemetry();

  const primaryData = getPrimaryStation();
  const activeStations = stations.filter(s => s.status === 'active').length;

  return (
    <DashboardShell>
      <div className="space-y-10 md:space-y-12">
        {/* Page title */}
        <div className="mb-2 animate-slide-up opacity-0" style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}>
          <h1 className="text-2xl font-bold text-text-primary" style={{ letterSpacing: '-0.02em' }}>Dashboard</h1>
          <p className="text-xs text-text-tertiary/80 mt-1">Real-time river system intelligence overview</p>
        </div>

        {/* Overview Panel — 4 separated cards + system metrics row */}
        <div className="animate-slide-up opacity-0" style={{ animationDelay: '80ms', animationFillMode: 'forwards' }}>
          <OverviewPanel
            healthScore={healthScore}
            activeStations={activeStations}
            totalStations={stations.length}
            alertCount={5}
            currentLAD={primaryData?.current?.lad || 3.5}
          />
        </div>

        {/* Live Sensor Readings — 4-column grid */}
        <div className="space-y-4 animate-slide-up opacity-0" style={{ animationDelay: '160ms', animationFillMode: 'forwards' }}>
          <h2 className="text-sm font-semibold text-text-primary">Live Sensor Readings</h2>
          <QuickStats
            currentReading={primaryData?.current || null}
            getSparkline={(key) => getSparklineData('STN-001', key)}
            getTrend={(key) => getTrend('STN-001', key)}
          />
        </div>

        {/* GIS Map — full width */}
        <div className="animate-slide-up opacity-0" style={{ animationDelay: '240ms', animationFillMode: 'forwards' }}>
          <RiverMap height="380px" />
        </div>

        {/* LAD Monitor — full width */}
        <div className="animate-slide-up opacity-0" style={{ animationDelay: '320ms', animationFillMode: 'forwards' }}>
          <LADMonitor
            currentReading={primaryData?.current || null}
            history={primaryData?.history || []}
          />
        </div>

        {/* Sediment Hotspot — full width */}
        <div className="animate-slide-up opacity-0" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
          <HotspotPanel />
        </div>
      </div>
    </DashboardShell>
  );
}
