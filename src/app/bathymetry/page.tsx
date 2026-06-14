'use client';
import DashboardShell from '@/components/layout/DashboardShell';
import DepthProfile from '@/features/bathymetry/DepthProfile';
import { Layers } from 'lucide-react';

export default function BathymetryPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="animate-slide-up opacity-0" style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}>
          <h1 className="text-xl font-bold text-text-primary flex items-center gap-2">
            <Layers size={20} className="text-accent-blue" />
            Bathymetry Analysis
          </h1>
          <p className="text-xs text-text-tertiary mt-0.5">River depth profiles, cross-section analysis, and historical comparison</p>
        </div>

        <div className="animate-slide-up opacity-0" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
          <DepthProfile />
        </div>
      </div>
    </DashboardShell>
  );
}
