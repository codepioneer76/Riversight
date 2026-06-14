'use client';
import DashboardShell from '@/components/layout/DashboardShell';
import PressureDashboard from '@/features/pressure/PressureDashboard';
import { Gauge } from 'lucide-react';

export default function PressurePage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Page Title */}
        <div className="mb-2 animate-slide-up opacity-0" style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}>
          <h1 className="text-xl font-bold text-text-primary flex items-center gap-2.5">
            <Gauge size={22} className="text-accent-cyan" />
            Pressure Intelligence
          </h1>
          <p className="text-xs text-text-tertiary mt-0.5">Hydraulic load diagnostics, transient shockwave telemetry, and explainable AI insights</p>
        </div>

        {/* Core Feature Dashboard */}
        <div className="animate-slide-up opacity-0" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
          <PressureDashboard />
        </div>
      </div>
    </DashboardShell>
  );
}
