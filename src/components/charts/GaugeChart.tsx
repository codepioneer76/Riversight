'use client';

interface GaugeChartProps {
  value: number;
  max: number;
  label: string;
  unit: string;
  color?: string;
  size?: number;
  thresholds?: { warning: number; critical: number };
  /** When true, LOWER values are worse (e.g., LAD depth). Default false = higher values are worse. */
  invertThresholds?: boolean;
}

export default function GaugeChart({
  value, max, label, unit, color = '#06b6d4', size = 160,
  thresholds, invertThresholds = false,
}: GaugeChartProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = Math.PI * radius; // semicircle
  const offset = circumference - (percentage / 100) * circumference;

  let activeColor = color;
  let hasThresholdSegments = false;
  let cLen = 0;
  let wLen = 0;
  let sLen = 0;

  if (thresholds) {
    hasThresholdSegments = true;
    if (invertThresholds) {
      // For LAD: lower is worse → value < critical = red, value < warning = amber, else green
      if (value < thresholds.critical) activeColor = '#ef4444';
      else if (value < thresholds.warning) activeColor = '#f59e0b';
      else activeColor = '#10b981';

      // Segment calculations (semicircle):
      cLen = (thresholds.critical / max) * circumference;
      wLen = ((thresholds.warning - thresholds.critical) / max) * circumference;
      sLen = circumference - cLen - wLen;
    } else {
      // Default: higher is worse → value >= critical = red, value >= warning = amber
      if (value >= thresholds.critical) activeColor = '#ef4444';
      else if (value >= thresholds.warning) activeColor = '#f59e0b';
      else activeColor = '#10b981';

      // Segment calculations (semicircle):
      sLen = (thresholds.warning / max) * circumference;
      wLen = ((thresholds.critical - thresholds.warning) / max) * circumference;
      cLen = circumference - sLen - wLen;
    }
  }

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size / 2 + 20} viewBox={`0 0 ${size} ${size / 2 + 20}`}>
        {/* Background arc segments */}
        {!hasThresholdSegments ? (
          <path
            d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        ) : invertThresholds ? (
          <>
            {/* Critical Segment Background */}
            <path
              d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
              fill="none"
              stroke="#ef4444"
              strokeWidth={strokeWidth}
              strokeDasharray={`${cLen} ${circumference}`}
              strokeDashoffset={0}
              strokeOpacity={0.15}
            />
            {/* Warning Segment Background */}
            <path
              d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
              fill="none"
              stroke="#f59e0b"
              strokeWidth={strokeWidth}
              strokeDasharray={`${wLen} ${circumference}`}
              strokeDashoffset={-cLen}
              strokeOpacity={0.15}
            />
            {/* Safe Segment Background */}
            <path
              d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
              fill="none"
              stroke="#10b981"
              strokeWidth={strokeWidth}
              strokeDasharray={`${sLen} ${circumference}`}
              strokeDashoffset={-(cLen + wLen)}
              strokeOpacity={0.15}
            />
          </>
        ) : (
          <>
            {/* Safe Segment Background */}
            <path
              d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
              fill="none"
              stroke="#10b981"
              strokeWidth={strokeWidth}
              strokeDasharray={`${sLen} ${circumference}`}
              strokeDashoffset={0}
              strokeOpacity={0.15}
            />
            {/* Warning Segment Background */}
            <path
              d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
              fill="none"
              stroke="#f59e0b"
              strokeWidth={strokeWidth}
              strokeDasharray={`${wLen} ${circumference}`}
              strokeDashoffset={-sLen}
              strokeOpacity={0.15}
            />
            {/* Critical Segment Background */}
            <path
              d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
              fill="none"
              stroke="#ef4444"
              strokeWidth={strokeWidth}
              strokeDasharray={`${cLen} ${circumference}`}
              strokeDashoffset={-(sLen + wLen)}
              strokeOpacity={0.15}
            />
          </>
        )}
        {/* Value arc */}
        <path
          d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
          fill="none"
          stroke={activeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: 'stroke-dashoffset 0.8s cubic-bezier(0.22, 1, 0.36, 1), stroke 0.4s ease',
            filter: `drop-shadow(0 0 8px ${activeColor}60)`,
          }}
        />
        {/* Value text */}
        <text x={size / 2} y={size / 2 - 5} textAnchor="middle" fill="#f1f5f9" fontSize="22" fontFamily="JetBrains Mono" fontWeight="600">
          {value.toFixed(1)}
        </text>
        <text x={size / 2} y={size / 2 + 14} textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="JetBrains Mono">
          {unit}
        </text>
      </svg>
      <p className="text-xs text-text-secondary mt-1 font-medium">{label}</p>
    </div>
  );
}
