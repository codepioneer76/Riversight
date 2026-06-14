'use client';
import GlassCard from '@/components/ui/GlassCard';
import GaugeChart from '@/components/charts/GaugeChart';
import TimeSeriesChart from '@/components/charts/TimeSeriesChart';
import StatusBadge from '@/components/ui/StatusBadge';
import { ArrowDownToLine, AlertTriangle, TrendingDown } from 'lucide-react';
import { TelemetryReading } from '@/types/telemetry';
import { formatNumber } from '@/lib/formatters';
import { thresholdConfig } from '@/config/siteConfig';

interface LADMonitorProps {
  currentReading: TelemetryReading | null;
  history: TelemetryReading[];
}

export default function LADMonitor({ currentReading, history }: LADMonitorProps) {
  if (!currentReading) return null;

  const lad = currentReading.lad;
  const { safe, warning, critical } = thresholdConfig.lad;

  // LAD is inverted: HIGHER is safer, LOWER is dangerous
  const status = lad < 1.5 ? 'critical' : lad < 2.5 ? 'warning' : 'safe';
  const statusLabel = lad < 1.5 ? 'CRITICAL' : lad < 2.5 ? 'WARNING' : 'SAFE';

  // Color for the LAD gauge and chart: green when safe, amber when warning, red when critical
  const ladColor = lad < 1.5 ? '#ef4444' : lad < 2.5 ? '#f59e0b' : '#10b981';

  const chartData = history.map((r) => ({
    timestamp: r.timestamp,
    value: r.lad,
  }));

  // Calculate predicted LAD (simple linear extrapolation for demo)
  const recentLAD = history.slice(-10).map(r => r.lad);
  const avgChange = recentLAD.length > 1
    ? (recentLAD[recentLAD.length - 1] - recentLAD[0]) / recentLAD.length
    : 0;
  const predictedLAD = Math.max(0.5, lad + avgChange * 12);

  return (
    <GlassCard padding="lg" hover={false}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
          <ArrowDownToLine size={16} className="text-accent-cyan" />
          LAD Monitoring Panel
        </h3>
        <StatusBadge status={status as 'safe' | 'warning' | 'critical'} label={statusLabel} size="md" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Live gauge */}
        <div className="flex flex-col items-center justify-center">
          <GaugeChart
            value={lad}
            max={8}
            label="Current LAD"
            unit="meters"
            color="#06b6d4"
            size={180}
            thresholds={{ warning: 2.5, critical: 1.5 }}
            invertThresholds={true}
          />
          <div className="mt-6 grid grid-cols-3 gap-3 w-full">
            <ThresholdIndicator label="Safe" value="≥ 2.5 m" color="#10b981" active={lad >= 2.5} />
            <ThresholdIndicator label="Warning" value="1.5 m – 2.49 m" color="#f59e0b" active={lad >= 1.5 && lad < 2.5} />
            <ThresholdIndicator label="Critical" value="< 1.5 m" color="#ef4444" active={lad < 1.5} />
          </div>
        </div>

        {/* Trend chart */}
        <div className="lg:col-span-2">
          <p className="text-xs text-text-secondary mb-2 font-medium">24-Hour LAD Trend</p>
          <TimeSeriesChart
            data={chartData}
            color={ladColor}
            gradientId="lad-trend"
            height={180}
          />
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-border-subtle">
              <TrendingDown size={12} className="text-accent-amber" />
              <span className="text-[10px] text-text-secondary">Predicted LAD (12h):</span>
              <span className="metric-value text-xs" style={{ color: ladColor }}>{formatNumber(predictedLAD, 2)}m</span>
            </div>
            {lad < 2.5 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20">
                <AlertTriangle size={12} className="text-red-400" />
                <span className="text-[10px] text-red-400 font-medium">Navigation advisory active</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

function ThresholdIndicator({ label, value, color, active }: { label: string; value: string; color: string; active: boolean }) {
  return (
    <div 
      className={`p-2 rounded-xl text-center border transition-all duration-300 ${
        active 
          ? 'border-white/[0.08] bg-white/[0.04] shadow-lg' 
          : 'border-transparent bg-white/[0.01] opacity-40'
      }`}
      style={{
        boxShadow: active ? `0 0 16px ${color}10, inset 0 1px 0 rgba(255, 255, 255, 0.05)` : undefined
      }}
    >
      <div 
        className="w-2 h-2 rounded-full mx-auto mb-1.5 transition-all duration-300" 
        style={{ 
          backgroundColor: color, 
          opacity: active ? 1 : 0.4,
          boxShadow: active ? `0 0 8px ${color}` : undefined
        }} 
      />
      <p className="text-[9px] font-bold uppercase tracking-wider mb-0.5" style={{ color: active ? color : '#64748b' }}>{label}</p>
      <p className="text-[9px] font-mono text-text-secondary">{value}</p>
    </div>
  );
}
