'use client';
import { cn } from '@/lib/cn';

interface StatusBadgeProps {
  status: 'online' | 'warning' | 'critical' | 'offline' | 'active' | 'maintenance' | 'safe' | 'caution' | 'restricted';
  label?: string;
  size?: 'sm' | 'md';
  pulse?: boolean;
}

const statusStyles: Record<string, { bg: string; text: string; dot: string; border: string; glow: string }> = {
  online: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', dot: 'bg-emerald-400', border: 'border-emerald-500/25', glow: 'shadow-[0_0_6px_rgba(16,185,129,0.4)]' },
  active: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', dot: 'bg-emerald-400', border: 'border-emerald-500/25', glow: 'shadow-[0_0_6px_rgba(16,185,129,0.4)]' },
  safe: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', dot: 'bg-emerald-400', border: 'border-emerald-500/25', glow: 'shadow-[0_0_6px_rgba(16,185,129,0.4)]' },
  warning: { bg: 'bg-amber-500/10', text: 'text-amber-400', dot: 'bg-amber-400', border: 'border-amber-500/25', glow: 'shadow-[0_0_6px_rgba(245,158,11,0.4)]' },
  caution: { bg: 'bg-amber-500/10', text: 'text-amber-400', dot: 'bg-amber-400', border: 'border-amber-500/25', glow: 'shadow-[0_0_6px_rgba(245,158,11,0.4)]' },
  maintenance: { bg: 'bg-amber-500/10', text: 'text-amber-400', dot: 'bg-amber-400', border: 'border-amber-500/25', glow: 'shadow-[0_0_6px_rgba(245,158,11,0.4)]' },
  critical: { bg: 'bg-red-500/10', text: 'text-red-400', dot: 'bg-red-400', border: 'border-red-500/25', glow: 'shadow-[0_0_6px_rgba(239,68,68,0.4)]' },
  restricted: { bg: 'bg-red-500/10', text: 'text-red-400', dot: 'bg-red-400', border: 'border-red-500/25', glow: 'shadow-[0_0_6px_rgba(239,68,68,0.4)]' },
  offline: { bg: 'bg-slate-500/10', text: 'text-slate-400', dot: 'bg-slate-400', border: 'border-slate-500/25', glow: '' },
};

export default function StatusBadge({ status, label, size = 'sm', pulse = true }: StatusBadgeProps) {
  const style = statusStyles[status] || statusStyles.offline;
  const displayLabel = label || status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 rounded-full font-medium border backdrop-blur-sm',
      'transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
      style.bg, style.text, style.border,
      size === 'sm' ? 'px-2.5 py-0.5 text-[10px]' : 'px-3 py-1 text-xs'
    )}>
      <span className="relative flex items-center justify-center">
        {pulse && <span className={cn('absolute rounded-full animate-status-pulse', style.dot, size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2')} />}
        <span className={cn('relative rounded-full', style.dot, style.glow, size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2')} />
      </span>
      {displayLabel}
    </span>
  );
}
