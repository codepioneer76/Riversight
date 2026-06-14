'use client';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';
import GlassCard from './GlassCard';
import { formatNumber } from '@/lib/formatters';
import {
  Waves, ArrowDownToLine, Gauge, CloudFog, Layers, CloudRain, Zap,
  Activity, Thermometer, Droplets, TrendingUp, TrendingDown, Minus
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Waves, ArrowDownToLine, Gauge, CloudFog, Layers, CloudRain, Zap,
  Activity, Thermometer, Droplets,
};

interface MetricCardProps {
  label: string;
  value: number;
  unit: string;
  icon: string;
  color: string;
  trend?: 'rising' | 'falling' | 'stable';
  status?: 'online' | 'warning' | 'critical' | 'offline';
  decimals?: number;
  sparklineData?: number[];
  className?: string;
}

export default function MetricCard({
  label, value, unit, icon, color, trend = 'stable',
  status = 'online', decimals = 2, sparklineData, className,
}: MetricCardProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const prevValue = useRef(value);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const start = prevValue.current;
    const end = value;
    const duration = 600;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 5);
      setDisplayValue(start + (end - start) * eased);
      if (progress < 1) animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    prevValue.current = value;
    return () => cancelAnimationFrame(animationRef.current);
  }, [value]);

  const Icon = iconMap[icon] || Activity;
  const TrendIcon = trend === 'rising' ? TrendingUp : trend === 'falling' ? TrendingDown : Minus;
  const statusColors: Record<string, string> = {
    online: '#10b981', warning: '#f59e0b', critical: '#ef4444', offline: '#64748b',
  };

  return (
    <GlassCard className={cn('relative overflow-hidden group transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-lg', className)} padding="md">
      {/* Glow accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] opacity-60" style={{ background: `linear-gradient(90deg, transparent 0%, ${color}40 25%, ${color} 50%, ${color}40 75%, transparent 100%)` }} />

      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}15` }}>
            <Icon size={16} style={{ color }} />
          </div>
          <span className="metric-label">{label}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: statusColors[status] }} />
          <TrendIcon size={14} className={cn(
            trend === 'rising' && 'text-accent-emerald',
            trend === 'falling' && 'text-accent-red',
            trend === 'stable' && 'text-text-secondary'
          )} />
        </div>
      </div>

      <div className="flex items-baseline gap-1.5">
        <span className="metric-value text-2xl" style={{ color }}>{formatNumber(displayValue, decimals)}</span>
        <span className="text-xs text-text-secondary font-mono">{unit}</span>
      </div>

      {/* Mini sparkline */}
      {sparklineData && sparklineData.length > 1 && (
        <div className="mt-3 h-8 w-full">
          <svg viewBox={`0 0 ${sparklineData.length * 8} 30`} className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`grad-${label}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
              <filter id={`glow-${label}`} x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Area fill */}
            <path
              d={(() => {
                const min = Math.min(...sparklineData);
                const max = Math.max(...sparklineData);
                const range = max - min || 1;
                const pts = sparklineData.map((v, i) => `${i * 8},${30 - ((v - min) / range) * 28}`);
                return `M0,30 L${pts.join(' L')} L${(sparklineData.length - 1) * 8},30 Z`;
              })()}
              fill={`url(#grad-${label})`}
            />
            {/* Line */}
            <polyline
              points={sparklineData.map((v, i) => {
                const min = Math.min(...sparklineData);
                const max = Math.max(...sparklineData);
                const range = max - min || 1;
                return `${i * 8},${30 - ((v - min) / range) * 28}`;
              }).join(' ')}
              fill="none"
              stroke={color}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter={`url(#glow-${label})`}
            />
          </svg>
        </div>
      )}
    </GlassCard>
  );
}
