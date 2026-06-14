'use client';
import dynamic from 'next/dynamic';
import GlassCard from '@/components/ui/GlassCard';
import { Map as MapIcon, Loader2 } from 'lucide-react';

const MapContent = dynamic(() => import('./MapContent'), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] rounded-xl bg-bg-secondary flex items-center justify-center">
      <div className="flex items-center gap-2 text-text-secondary">
        <Loader2 size={16} className="animate-spin" />
        <span className="text-sm">Loading GIS Map...</span>
      </div>
    </div>
  ),
});

interface RiverMapProps {
  className?: string;
  height?: string;
}

export default function RiverMap({ className, height = '400px' }: RiverMapProps) {
  return (
    <GlassCard className={className} padding="lg" hover={false}>
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
          <MapIcon size={16} className="text-accent-cyan" />
          Live GIS River Map
        </h3>
        <span className="text-[10px] text-text-tertiary">OpenStreetMap • Varanasi Reach</span>
      </div>
      <div style={{ height }} className="rounded-xl overflow-hidden border border-border-glass">
        <MapContent />
      </div>
    </GlassCard>
  );
}
