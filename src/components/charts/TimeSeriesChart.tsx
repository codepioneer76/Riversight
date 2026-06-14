'use client';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { formatTimestamp } from '@/lib/formatters';

interface TimeSeriesChartProps {
  data: Array<Record<string, number>>;
  dataKey?: string;
  color?: string;
  gradientId?: string;
  height?: number;
  showGrid?: boolean;
  showAxis?: boolean;
  showTooltip?: boolean;
  strokeWidth?: number;
  animated?: boolean;
}

export default function TimeSeriesChart({
  data, dataKey = 'value', color = '#06b6d4', gradientId = 'tsGrad',
  height = 200, showGrid = true, showAxis = true, showTooltip = true,
  strokeWidth = 2, animated = false,
}: TimeSeriesChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.25} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />}
        {showAxis && (
          <>
            <XAxis
              dataKey="timestamp"
              tickFormatter={(v) => formatTimestamp(v)}
              stroke="rgba(255,255,255,0.1)"
              tick={{ fontSize: 10, fill: '#64748b' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              stroke="rgba(255,255,255,0.1)"
              tick={{ fontSize: 10, fill: '#64748b' }}
              axisLine={false}
              tickLine={false}
            />
          </>
        )}
        {showTooltip && (
          <Tooltip
            contentStyle={{
              background: '#1e293b',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              fontSize: '12px',
              color: '#f1f5f9',
              fontFamily: 'JetBrains Mono',
            }}
            labelFormatter={(v) => formatTimestamp(v as number)}
          />
        )}
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={strokeWidth}
          fill={`url(#${gradientId})`}
          isAnimationActive={animated}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
