export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

export function formatTimestamp(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function formatDateTime(timestamp: number): string {
  return `${formatDate(timestamp)} ${formatTimestamp(timestamp)}`;
}

export function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return `${seconds}s ago`;
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

export function formatMetricValue(value: number, unit: string, decimals: number = 2): string {
  return `${formatNumber(value, decimals)} ${unit}`;
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'online':
    case 'active':
    case 'safe':
    case 'low':
      return 'var(--color-accent-emerald)';
    case 'warning':
    case 'caution':
    case 'moderate':
      return 'var(--color-accent-amber)';
    case 'critical':
    case 'danger':
    case 'high':
    case 'error':
      return 'var(--color-accent-red)';
    case 'offline':
    case 'inactive':
    case 'maintenance':
      return 'var(--color-text-tertiary)';
    default:
      return 'var(--color-accent-cyan)';
  }
}

export function getRiskColor(score: number): string {
  if (score >= 80) return '#ef4444';
  if (score >= 60) return '#f59e0b';
  if (score >= 40) return '#eab308';
  if (score >= 20) return '#22c55e';
  return '#10b981';
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

export function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}
