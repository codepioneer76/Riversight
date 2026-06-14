'use client';
import GlassCard from '@/components/ui/GlassCard';
import TimeSeriesChart from '@/components/charts/TimeSeriesChart';
import StatusBadge from '@/components/ui/StatusBadge';
import { Activity, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { formatNumber, formatTimestamp } from '@/lib/formatters';
import { TelemetryReading } from '@/types/telemetry';
import { SENSOR_METRICS } from '@/lib/constants';

interface TelemetryGridProps {
  currentReading: TelemetryReading | null;
  history: TelemetryReading[];
}

export default function TelemetryGrid({ currentReading, history }: TelemetryGridProps) {
  if (!currentReading) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {SENSOR_METRICS.map((metric, index) => {
        const value = currentReading[metric.key] as number;
        const chartData = history.map((r) => ({
          timestamp: r.timestamp,
          value: r[metric.key] as number,
        }));
        const isLAD = metric.key === 'lad';
        const isWarning = isLAD ? value <= metric.warningThreshold : value >= metric.warningThreshold;
        const isCritical = isLAD ? value <= metric.criticalThreshold : value >= metric.criticalThreshold;
        const status = isCritical ? 'critical' as const : isWarning ? 'warning' as const : 'online' as const;

        // Determine trend
        const recent = chartData.slice(-5);
        let trend: 'rising' | 'falling' | 'stable' = 'stable';
        if (recent.length >= 2) {
          const diff = recent[recent.length - 1].value - recent[0].value;
          if (Math.abs(diff) > 0.01 * recent[0].value) trend = diff > 0 ? 'rising' : 'falling';
        }
        const TrendIcon = trend === 'rising' ? TrendingUp : trend === 'falling' ? TrendingDown : Minus;

        return (
          <div key={metric.key} className="animate-slide-up opacity-0" style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'forwards' }}>
          <GlassCard padding="md">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: metric.color }} />
                <span className="text-xs font-semibold text-text-primary">{metric.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendIcon size={12} className={trend === 'rising' ? 'text-emerald-400' : trend === 'falling' ? 'text-red-400' : 'text-slate-400'} />
                <StatusBadge status={status} />
              </div>
            </div>

            <div className="flex items-baseline gap-1.5 mb-3">
              <span className="metric-value text-3xl" style={{ color: metric.color }}>{formatNumber(value, metric.decimals)}</span>
              <span className="text-sm text-text-secondary font-mono">{metric.unit}</span>
            </div>

            <TimeSeriesChart
              data={chartData}
              color={metric.color}
              gradientId={`telem-${metric.key}`}
              height={120}
              showAxis={true}
              animated={false}
            />

            <div className="flex justify-between mt-2 text-[10px] text-text-muted font-mono">
              <span>Updated: {formatTimestamp(currentReading.timestamp)}</span>
              <span>Warn: {metric.warningThreshold} | Crit: {metric.criticalThreshold}</span>
            </div>
          </GlassCard>
          </div>
        );
      })}
    </div>
  );
}
