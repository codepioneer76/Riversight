'use client';
import DashboardShell from '@/components/layout/DashboardShell';
import RiverMap from '@/features/gis/RiverMap';
import { Map } from 'lucide-react';

export default function GISPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="animate-slide-up opacity-0" style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}>
          <h1 className="text-xl font-bold text-text-primary flex items-center gap-2">
            <Map size={20} className="text-accent-cyan" />
            GIS River Map
          </h1>
          <p className="text-xs text-text-tertiary mt-0.5">Interactive geospatial intelligence — river routes, stations, sediment zones, and risk overlays</p>
        </div>

        <div className="animate-slide-up opacity-0" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
          <RiverMap height="calc(100vh - 200px)" />
        </div>
      </div>
    </DashboardShell>
  );
}
