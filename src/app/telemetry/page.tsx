'use client';
import DashboardShell from '@/components/layout/DashboardShell';
import TelemetryGrid from '@/features/telemetry/TelemetryGrid';
import { useTelemetry } from '@/hooks/useTelemetry';
import { Activity, Radio } from 'lucide-react';

export default function TelemetryPage() {
  const { getPrimaryStation, isLive, setIsLive } = useTelemetry();
  const primaryData = getPrimaryStation();

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between animate-slide-up opacity-0" style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}>
          <div>
            <h1 className="text-xl font-bold text-text-primary flex items-center gap-2">
              <Activity size={20} className="text-accent-cyan" />
              Real-Time Telemetry
            </h1>
            <p className="text-xs text-text-tertiary mt-0.5">Live sensor data stream from all telemetry stations</p>
          </div>
          <button
            onClick={() => setIsLive(!isLive)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all border ${
              isLive
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-white/[0.03] border-border-glass text-text-secondary'
            }`}
          >
            <Radio size={12} className={isLive ? 'animate-pulse' : ''} />
            {isLive ? 'LIVE' : 'PAUSED'}
          </button>
        </div>

        <div className="animate-slide-up opacity-0" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
          <TelemetryGrid
            currentReading={primaryData?.current || null}
            history={primaryData?.history || []}
          />
        </div>
      </div>
    </DashboardShell>
  );
}
