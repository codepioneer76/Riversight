'use client';
import GlassCard from '@/components/ui/GlassCard';
import StatusBadge from '@/components/ui/StatusBadge';
import { Bell, AlertTriangle, CheckCircle, Clock, ShieldAlert, Radio, CloudRain, Cpu, Wrench } from 'lucide-react';
import { generateMockAlerts, mockAlertStats } from '@/data/mockAlerts';
import { formatRelativeTime } from '@/lib/formatters';
import { Alert, AlertSeverity } from '@/types/alert';
import { useState, useMemo } from 'react';

const severityConfig: Record<AlertSeverity, { color: string; bg: string; border: string; icon: React.ElementType }> = {
  critical: { color: '#ef4444', bg: 'bg-red-500/8', border: 'border-red-500/20', icon: ShieldAlert },
  warning: { color: '#f59e0b', bg: 'bg-amber-500/8', border: 'border-amber-500/20', icon: AlertTriangle },
  info: { color: '#3b82f6', bg: 'bg-blue-500/8', border: 'border-blue-500/20', icon: Bell },
};

export default function AlertCenter() {
  const [filter, setFilter] = useState<'all' | AlertSeverity>('all');
  const alerts = useMemo(() => generateMockAlerts(10), []);

  const filtered = filter === 'all' ? alerts : alerts.filter(a => a.severity === filter);

  return (
    <div className="space-y-4">
      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        <AlertStat label="Total Alerts" value={mockAlertStats.total} icon={<Bell size={14} className="text-accent-cyan" />} />
        <AlertStat label="Critical" value={mockAlertStats.critical} icon={<ShieldAlert size={14} className="text-red-400" />} color="#ef4444" />
        <AlertStat label="Warnings" value={mockAlertStats.warning} icon={<AlertTriangle size={14} className="text-amber-400" />} color="#f59e0b" />
        <AlertStat label="Info" value={mockAlertStats.info} icon={<Bell size={14} className="text-blue-400" />} color="#3b82f6" />
        <AlertStat label="Unacknowledged" value={mockAlertStats.unacknowledged} icon={<Clock size={14} className="text-purple-400" />} color="#8b5cf6" />
        <AlertStat label="Resolved Today" value={mockAlertStats.resolvedToday} icon={<CheckCircle size={14} className="text-emerald-400" />} color="#10b981" />
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2">
        {(['all', 'critical', 'warning', 'info'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all border ${
              filter === f
                ? 'bg-accent-cyan/10 border-accent-cyan/30 text-accent-cyan'
                : 'bg-white/[0.02] border-border-glass text-text-secondary hover:text-text-primary'
            }`}
          >
            {f === 'all' ? 'All Alerts' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Alert list */}
      <div className="space-y-2">
        {filtered.map((alert) => (
          <AlertRow key={alert.id} alert={alert} />
        ))}
      </div>
    </div>
  );
}

function AlertRow({ alert }: { alert: Alert }) {
  const config = severityConfig[alert.severity];
  const Icon = config.icon;

  return (
    <GlassCard padding="sm" className={`${config.bg} ${config.border} group`}>
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110" style={{ background: `${config.color}15` }}>
          <Icon size={14} style={{ color: config.color }} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-text-primary">{alert.title}</span>
            <StatusBadge
              status={alert.severity === 'critical' ? 'critical' : alert.severity === 'warning' ? 'warning' : 'active'}
              label={alert.severity.toUpperCase()}
            />
            {alert.resolved && (
              <span className="flex items-center gap-1 text-[10px] text-emerald-400">
                <CheckCircle size={10} /> Resolved
              </span>
            )}
          </div>
          <p className="text-[11px] text-text-secondary leading-relaxed">{alert.message}</p>
          <div className="flex items-center gap-4 mt-1.5">
            <span className="text-[10px] text-text-muted">{alert.stationName}</span>
            <span className="text-[10px] text-text-muted">{formatRelativeTime(alert.timestamp)}</span>
            {!alert.acknowledged && (
              <button className="text-[10px] text-accent-cyan hover:text-accent-cyan-light transition-colors font-medium">
                Acknowledge
              </button>
            )}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

function AlertStat({ label, value, icon, color }: { label: string; value: number; icon: React.ReactNode; color?: string }) {
  return (
    <GlassCard padding="sm">
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="text-[10px] text-text-muted uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-xl font-mono font-bold" style={{ color: color || '#f1f5f9' }}>{value}</p>
    </GlassCard>
  );
}
