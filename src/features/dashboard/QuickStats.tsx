'use client';
import MetricCard from '@/components/ui/MetricCard';
import { SENSOR_METRICS } from '@/lib/constants';
import { TelemetryReading } from '@/types/telemetry';

interface QuickStatsProps {
  currentReading: TelemetryReading | null;
  getSparkline: (key: keyof TelemetryReading) => number[];
  getTrend: (key: keyof TelemetryReading) => 'rising' | 'falling' | 'stable';
}

export default function QuickStats({ currentReading, getSparkline, getTrend }: QuickStatsProps) {
  if (!currentReading) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
      {SENSOR_METRICS.map((metric) => {
        const value = currentReading[metric.key] as number;
        const sparkline = getSparkline(metric.key);
        const trend = getTrend(metric.key);
        const isWarning = metric.key === 'lad'
          ? value <= metric.warningThreshold
          : value >= metric.warningThreshold;
        const isCritical = metric.key === 'lad'
          ? value <= metric.criticalThreshold
          : value >= metric.criticalThreshold;
        const status = isCritical ? 'critical' as const : isWarning ? 'warning' as const : 'online' as const;

        return (
          <MetricCard
            key={metric.key}
            label={metric.label}
            value={value}
            unit={metric.unit}
            icon={metric.icon}
            color={metric.color}
            trend={trend}
            status={status}
            decimals={metric.decimals}
            sparklineData={sparkline}
          />
        );
      })}
    </div>
  );
}
