'use client';
import GlassCard from '@/components/ui/GlassCard';
import StatusBadge from '@/components/ui/StatusBadge';
import { Layers, AlertTriangle, TrendingUp } from 'lucide-react';
import { sedimentZones } from '@/data/riverGeoJSON';
import { getRiskColor } from '@/lib/formatters';

export default function HotspotPanel() {
  const sortedZones = [...sedimentZones].sort((a, b) => b.riskScore - a.riskScore);

  return (
    <GlassCard padding="lg" hover={false}>
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
          <Layers size={16} className="text-accent-amber" />
          Sediment Hotspot Monitor
        </h3>
        <span className="text-[10px] text-text-tertiary">4 zones tracked</span>
      </div>

      <div className="space-y-4">
        {sortedZones.map((zone) => {
          const riskColor = getRiskColor(zone.riskScore);
          return (
            <div
              key={zone.id}
              className="p-4 rounded-xl bg-white/[0.02] border border-border-subtle hover:border-white/[0.08] hover:bg-white/[0.04] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-lg hover:shadow-black/10"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {zone.riskScore >= 75 && <AlertTriangle size={12} className="text-red-400" />}
                  <span className="text-xs font-semibold text-text-primary">{zone.name}</span>
                </div>
                <StatusBadge
                  status={zone.severity === 'critical' ? 'critical' : zone.severity === 'high' ? 'warning' : 'safe'}
                  label={zone.severity.toUpperCase()}
                />
              </div>

              <div className="flex items-center gap-4">
                {/* Risk bar */}
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-[10px] text-text-muted">Risk Score</span>
                    <span className="text-[10px] font-mono font-semibold" style={{ color: riskColor }}>{zone.riskScore}/100</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${zone.riskScore}%`, backgroundColor: riskColor }}
                    />
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-[10px] text-text-muted">Accumulation</p>
                  <div className="flex items-center gap-1">
                    <TrendingUp size={10} className="text-accent-amber" />
                    <span className="text-xs font-mono text-text-primary">{zone.accumulationRate} mm/yr</span>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-[10px] text-text-muted">Last Survey</p>
                  <span className="text-xs font-mono text-text-secondary">{zone.lastSurvey}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
