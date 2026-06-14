'use client';
import GlassCard from '@/components/ui/GlassCard';
import GaugeChart from '@/components/charts/GaugeChart';
import StatusBadge from '@/components/ui/StatusBadge';
import { cn } from '@/lib/cn';
import { Shield, Activity, Anchor, AlertTriangle, Radio, Database, Cpu, Globe, Timer, HardDrive } from 'lucide-react';

interface OverviewPanelProps {
  healthScore: number;
  activeStations: number;
  totalStations: number;
  alertCount: number;
  currentLAD?: number;
}

export default function OverviewPanel({ healthScore, activeStations, totalStations, alertCount, currentLAD = 3.5 }: OverviewPanelProps) {
  const ladVal = currentLAD;
  const navStatus = ladVal >= 2.5 ? 'SAFE' : ladVal >= 1.5 ? 'WARNING' : 'CRITICAL';
  const navColor = ladVal >= 2.5 ? 'text-accent-emerald' : ladVal >= 1.5 ? 'text-accent-amber' : 'text-accent-red';
  const navBg = ladVal >= 2.5 ? 'bg-accent-emerald/10' : ladVal >= 1.5 ? 'bg-accent-amber/10' : 'bg-accent-red/10';
  const navIconColor = ladVal >= 2.5 ? 'text-accent-emerald' : ladVal >= 1.5 ? 'text-accent-amber' : 'text-accent-red';
  const navMsg = ladVal >= 2.5 
    ? 'High confidence: navigation channels clear' 
    : ladVal >= 1.5 
      ? 'Navigation caution: Shallow depths (1.5m - 2.49m)' 
      : 'CRITICAL HAZARD: Varanasi Reach depth is below safe threshold';
  const navSub = ladVal >= 2.5 
    ? 'No restrictions active' 
    : ladVal >= 1.5 
      ? 'Caution advisory active' 
      : 'Deep draft transport suspended';
      
  const healthLabel = healthScore >= 90 ? 'Excellent' : healthScore >= 70 ? 'Good' : healthScore >= 50 ? 'Moderate' : healthScore >= 30 ? 'Poor' : 'Critical';
  const healthColor = healthScore >= 90 ? '#10b981' : healthScore >= 70 ? '#06b6d4' : healthScore >= 50 ? '#f59e0b' : '#ef4444';

  return (
    <div className="space-y-5 md:space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-[15px] font-semibold text-text-primary flex items-center gap-2">
          <Shield size={18} className="text-accent-cyan" />
          River System Overview
        </h2>
        <StatusBadge status={healthScore >= 70 ? 'active' : healthScore >= 50 ? 'warning' : 'critical'} label={healthLabel} size="md" />
      </div>

      {/* Row 1: Health Score + Key Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">

        {/* Health Score Card */}
        <div className="animate-slide-up opacity-0" style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}>
        <GlassCard padding="lg" hover={false} glow="cyan">
          <p className="text-[10px] text-text-tertiary uppercase tracking-widest font-semibold mb-3 text-center">River Health Score</p>
          <div className="flex justify-center">
            <GaugeChart value={healthScore} max={100} label="" unit="/ 100" color={healthColor} size={160} />
          </div>
          <p className="text-center mt-2 text-xs font-semibold" style={{ color: healthColor }}>{healthLabel}</p>
          <p className="text-center text-[9px] text-text-muted mt-0.5">Ganga River Basin • Varanasi Reach</p>
        </GlassCard>
        </div>

        {/* Active Stations */}
        <div className="animate-slide-up opacity-0" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
        <GlassCard padding="lg" hover={false}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 flex items-center justify-center">
              <Radio size={18} className="text-accent-cyan" />
            </div>
            <div>
              <p className="text-[10px] text-text-tertiary uppercase tracking-widest font-semibold">Active Stations</p>
              <p className="text-2xl font-bold font-mono text-text-primary">{activeStations}<span className="text-sm text-text-muted">/{totalStations}</span></p>
            </div>
          </div>
          <p className="text-[11px] text-text-secondary">Telemetry stations online and transmitting data</p>
          <div className="mt-3 flex gap-1">
            {Array.from({ length: totalStations }).map((_, i) => (
              <div key={i} className={`flex-1 h-1.5 rounded-full ${i < activeStations ? 'bg-accent-cyan' : 'bg-white/[0.06]'}`} />
            ))}
          </div>
        </GlassCard>
        </div>

        {/* Active Alerts */}
        <div className="animate-slide-up opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
        <GlassCard padding="lg" hover={false}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-accent-amber/10 flex items-center justify-center">
              <AlertTriangle size={18} className="text-accent-amber" />
            </div>
            <div>
              <p className="text-[10px] text-text-tertiary uppercase tracking-widest font-semibold">Active Alerts</p>
              <p className="text-2xl font-bold font-mono text-accent-amber">{alertCount}</p>
            </div>
          </div>
          <p className="text-[11px] text-text-secondary">Requires attention and acknowledgement</p>
          <div className="mt-3 flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[9px] font-mono font-semibold bg-red-500/10 text-red-400 border border-red-500/20">2 Critical</span>
            <span className="px-2 py-0.5 rounded text-[9px] font-mono font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">3 Warning</span>
          </div>
        </GlassCard>
        </div>

        {/* Navigation Status */}
        <div className="animate-slide-up opacity-0" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
        <GlassCard padding="lg" hover={false}>
          <div className="flex items-center gap-3 mb-4">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300", navBg)}>
              <Anchor size={18} className={cn("transition-colors duration-300", navIconColor)} />
            </div>
            <div>
              <p className="text-[10px] text-text-tertiary uppercase tracking-widest font-semibold">Navigation Status</p>
              <p className={cn("text-2xl font-bold font-mono transition-colors duration-300", navColor)}>{navStatus}</p>
            </div>
          </div>
          <p className="text-[11px] text-text-secondary">{navMsg}</p>
          <div className="mt-3 flex items-center gap-1.5">
            <div className={cn("w-2 h-2 rounded-full animate-pulse transition-colors duration-300", 
              ladVal >= 2.5 ? 'bg-accent-emerald' : ladVal >= 1.5 ? 'bg-accent-amber' : 'bg-accent-red'
            )} />
            <span className={cn("text-[10px] font-medium transition-colors duration-300", navColor)}>{navSub}</span>
          </div>
        </GlassCard>
        </div>
      </div>

      {/* Row 2: System Telemetry Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5 md:gap-4">
        <SystemMetric icon={<Activity size={14} className="text-accent-cyan" />} label="Data Throughput" value="1,247" unit="pts/min" />
        <SystemMetric icon={<Radio size={14} className="text-accent-emerald" />} label="MQTT Uplink" value="99.2" unit="%" />
        <SystemMetric icon={<Timer size={14} className="text-accent-blue" />} label="Avg Latency" value="142" unit="ms" />
        <SystemMetric icon={<Cpu size={14} className="text-accent-purple" />} label="Models Active" value="3" unit="/ 5" />
        <SystemMetric icon={<Globe size={14} className="text-accent-cyan" />} label="GIS Layers" value="6" unit="loaded" />
        <SystemMetric icon={<HardDrive size={14} className="text-accent-amber" />} label="Storage Used" value="2.4" unit="GB" />
      </div>
    </div>
  );
}

function SystemMetric({ icon, label, value, unit }: { icon: React.ReactNode; label: string; value: string; unit: string }) {
  return (
    <GlassCard padding="sm" hover={true}>
      <div className="flex items-center gap-2 mb-1.5">
        {icon}
        <span className="text-[9px] text-text-muted uppercase tracking-wider font-semibold">{label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-lg font-bold font-mono text-text-primary">{value}</span>
        <span className="text-[10px] text-text-muted font-mono">{unit}</span>
      </div>
    </GlassCard>
  );
}
