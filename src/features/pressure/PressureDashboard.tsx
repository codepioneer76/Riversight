'use client';
import { useState, useEffect, useRef, useMemo } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import StatusBadge from '@/components/ui/StatusBadge';
import { 
  Gauge, TrendingUp, TrendingDown, Minus, AlertTriangle, 
  Activity, Cpu, Shield, Brain, Clock, RefreshCw, 
  Play, Pause, ListCollapse, Database, Radio, Server, 
  CheckCircle2, Volume2, ShieldAlert
} from 'lucide-react';
import { mockPressureData, PressurePoint } from '@/data/mockPressure';
import { formatNumber } from '@/lib/formatters';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, ReferenceArea, ReferenceLine, ComposedChart, Line, Area
} from 'recharts';

export default function PressureDashboard() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [t, setT] = useState(0);
  const [history, setHistory] = useState<PressurePoint[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Playback timer loop simulating live telemetry feed
  useEffect(() => {
    if (!isPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setT((prev) => {
        const next = prev >= 100 ? 0 : prev + 1;
        return next;
      });
    }, 900); // Live tick every 900ms

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  // Synchronize dynamic history stream based on current t
  useEffect(() => {
    if (t === 0) {
      setHistory([mockPressureData[0]]);
    } else {
      setHistory(mockPressureData.slice(0, t + 1));
    }
  }, [t]);

  // 1. Core Pressure & Threshold Variables from Sketch
  const currentReading = mockPressureData[t]?.pressure || 0;
  
  // Sketch threshold limits (in meters of pressure head 'm')
  const BASELINE_PRESSURE = 7.0;  // 7m -> standard operating head
  const WARNING_THRESHOLD = 20.0; // 20m -> warning trigger
  const ALARM_THRESHOLD = 80.0;   // 80m -> critical alarm surge peak

  const peakPressure = useMemo(() => {
    const activeData = mockPressureData.slice(0, t + 1);
    return Math.max(...activeData.map(d => d.pressure), 0);
  }, [t]);

  const averagePressure = useMemo(() => {
    const activeData = mockPressureData.slice(0, t + 1);
    const sum = activeData.reduce((acc, curr) => acc + curr.pressure, 0);
    return activeData.length > 0 ? sum / activeData.length : 0;
  }, [t]);

  // Determine dynamic event details and alarm status
  const { eventDuration, status, statusLabel, statusColor, statusBg, trend, trendIcon } = useMemo(() => {
    let duration = 0;
    let st: 'online' | 'warning' | 'critical' | 'alarm' = 'online';
    let label = 'SAFE';
    let color = 'text-accent-emerald';
    let bg = 'bg-accent-emerald/10 border-accent-emerald/20';
    let tr: 'Rising' | 'Falling' | 'Stable' = 'Stable';
    let icon = <Minus size={14} className="text-text-secondary" />;

    // Event duration logic
    if (t <= 39) {
      duration = t;
    } else if (t > 39 && t < 51) {
      duration = 0; // Flat-line period
    } else if (t >= 51 && t <= 75) {
      duration = t - 50;
    } else {
      duration = 0; // Final flat-line
    }

    // 4-State Threshold Status logic derived from the handwritten sketch
    if (currentReading >= ALARM_THRESHOLD) {
      st = 'alarm';
      label = 'ALARM ACTIVE';
      color = 'text-accent-red';
      bg = 'bg-red-500/15 border-red-500/30 animate-pulse';
    } else if (currentReading >= 50.0) {
      st = 'critical';
      label = 'CRITICAL';
      color = 'text-accent-red';
      bg = 'bg-red-500/10 border-red-500/20';
    } else if (currentReading >= WARNING_THRESHOLD) {
      st = 'warning';
      label = 'WARNING';
      color = 'text-accent-amber';
      bg = 'bg-accent-amber/10 border-accent-amber/20';
    } else {
      st = 'online';
      label = 'SAFE';
      color = 'text-accent-emerald';
      bg = 'bg-accent-emerald/10 border-accent-emerald/20';
    }

    // Trend analysis (delta comparison with 3 steps back)
    if (t > 2) {
      const prev = mockPressureData[t - 3].pressure;
      const diff = currentReading - prev;
      if (Math.abs(diff) < 1) {
        tr = 'Stable';
        icon = <Minus size={14} className="text-text-secondary" />;
      } else if (diff > 0) {
        tr = 'Rising';
        icon = <TrendingUp size={14} className="text-accent-cyan animate-pulse-slow" />;
      } else {
        tr = 'Falling';
        icon = <TrendingDown size={14} className="text-accent-red animate-pulse-slow" />;
      }
    }

    return { 
      eventDuration: duration, 
      status: st, 
      statusLabel: label, 
      statusColor: color, 
      statusBg: bg,
      trend: tr, 
      trendIcon: icon 
    };
  }, [t, currentReading]);

  // 2. Pressure Health Score computation (0 - 100)
  const healthScoreObj = useMemo(() => {
    let score = 98;
    let activeWarnings = 0;
    let description = 'System Saturated Baseline';
    let color = '#10b981';

    if (t > 0) {
      const current = mockPressureData[t].pressure;
      
      if (current >= ALARM_THRESHOLD) {
        score = 35;
        activeWarnings = 3;
        description = 'Critical Pipeline Shockwave';
        color = '#ef4444';
      } else if (current >= 50.0) {
        score = 60;
        activeWarnings = 2;
        description = 'Secondary Transient Wave';
        color = '#ef4444';
      } else if (current >= WARNING_THRESHOLD) {
        score = 78;
        activeWarnings = 1;
        description = 'Over-pressure Threshold Warning';
        color = '#f59e0b';
      } else if (t >= 39 && t <= 50) {
        score = 92;
        description = 'Zero Head Hydraulic Rest';
        color = '#06b6d4';
      } else if (t > 75) {
        score = 99;
        description = 'Viscous Friction Equilibrium';
        color = '#10b981';
      } else {
        score = 89;
        description = 'Saturated Active Flow';
        color = '#10b981';
      }
    }

    return { score, warnings: activeWarnings, description, color };
  }, [t]);

  // 3. Simulated Predictive Analytics (+5, +30, +60 steps)
  const predictions = useMemo(() => {
    const getForecast = (offset: number) => {
      const index = (t + offset) % 101;
      return mockPressureData[index].pressure;
    };

    const p5 = getForecast(5);
    const p30 = getForecast(30);
    const p60 = getForecast(60);

    // Calculate probabilities based on cycle phase and sketch rules
    let surgeProb = 0;
    let crossingProb = 0;

    if (t >= 0 && t < 15) {
      surgeProb = 98;
      crossingProb = 99;
    } else if (t >= 15 && t <= 24) {
      surgeProb = 30;
      crossingProb = 60;
    } else if (t > 24 && t < 38) {
      crossingProb = 10;
    } else if (t >= 38 && t <= 50) {
      surgeProb = 90; // approaching second peak
      crossingProb = 95;
    } else if (t > 50 && t < 63) {
      surgeProb = 85;
      crossingProb = 90;
    }

    return { p5, p30, p60, surgeProb, crossingProb };
  }, [t]);

  // 4. Sketch Integrated Event Log Stream generator
  const eventLogs = useMemo(() => {
    const logs: Array<{ id: string; t: number; msg: string; severity: 'info' | 'warning' | 'high' | 'critical' }> = [];
    
    if (t >= 0) logs.push({ id: '1', t: 0, msg: 'Pressure monitoring pipeline system online.', severity: 'info' });
    if (t >= 2) logs.push({ id: '2', t: 2, msg: 'Normal operating head (7.0m) exceeded. Fluid column rising.', severity: 'info' });
    if (t >= 4) logs.push({ id: '3', t: 4, msg: 'WARNING: Pressure head exceeded 20.0m safety threshold.', severity: 'warning' });
    if (t >= 11) logs.push({ id: '4', t: 11, msg: 'HIGH PRESSURE: Pressure exceeded critical 50.0m limit.', severity: 'high' });
    if (t >= 21) logs.push({ id: '5', t: 21, msg: 'CRITICAL ALARM: Primary hammer surge peaked at 82.4m, triggering automatic bypass.', severity: 'critical' });
    if (t >= 30) logs.push({ id: '6', t: 30, msg: 'Flow venting activated. Pressure dissipating through acoustic grids.', severity: 'info' });
    if (t >= 39) logs.push({ id: '7', t: 39, msg: 'Hydraulic head decay completed. System resting at 0.0m.', severity: 'warning' });
    if (t >= 51) logs.push({ id: '8', t: 51, msg: 'Secondary pressure wave detected. Rising past baseline (7.0m).', severity: 'info' });
    if (t >= 55) logs.push({ id: '9', t: 55, msg: 'WARNING: Secondary wave crossed 20.0m warning limit.', severity: 'warning' });
    if (t >= 63) logs.push({ id: '10', t: 63, msg: 'HIGH PRESSURE: Secondary peak surge reached 52.1m. Damping active.', severity: 'high' });
    if (t >= 75) logs.push({ id: '11', t: 75, msg: 'Pipeline stress stabilized. Saturated state achieved.', severity: 'info' });

    return logs.reverse(); // Newest first
  }, [t]);

  // 5. Explainable AI Insights Engine (Sketch Diagnostics)
  const aiInsight = useMemo(() => {
    if (t <= 22) {
      return {
        title: "Primary Wave Hammer Surge",
        content: `The system pressure has breached both the baseline head (7.0m) and the warning threshold (20.0m), peaking in the extreme ALARM zone at ${formatNumber(peakPressure, 1)}m. This matches a classical closed valve water hammer pulse where fluid momentum is instantly converted to elastic column stress.`,
        action: "Bypass valves triggered. Standby acoustic absorbers.",
        reason: "Calculated steep rise gradient (+3.92 m/t) indicates a highly rapid valve shutoff event."
      };
    } else if (t > 22 && t < 39) {
      return {
        title: "Viscous Energy Dissipation",
        content: `Pressure is in a recovery decay phase (-4.85 m/t). It has dropped below the 80m alarm and 50m critical lines, heading toward the safe 20m threshold. Viscous boundary friction is absorbing the kinetic column waves correctly.`,
        action: "Monitor dissipation decay timeline.",
        reason: "Sufficient kinetic venting achieved through structural relief grids."
      };
    } else if (t >= 39 && t <= 50) {
      return {
        title: "Hydraulic Bypass Dead-State",
        content: "The system is in a fully open dead-zone (0.0m head pressure). Symmetrical valve bypass allows zero-head stabilization before the reflection wave loops back from the pipeline terminal.",
        action: "Acoustic panels mapping reflection transit.",
        reason: "Reflected pressure head wave is traveling back from the pipeline bulkhead."
      };
    } else if (t >= 51 && t <= 64) {
      return {
        title: "Secondary Damped Reflection",
        content: `A secondary wave pulse is moving past the warning line (20.0m) and peaking at 52.1m. This is a classic reflection wave exhibiting a damping factor of exactly 0.63. Because the amplitude remains below the 80m alarm limit, no structural alert is triggered.`,
        action: "Acoustic absorption grids active.",
        reason: "Amplitude successfully restricted by 36.8% via system friction loss."
      };
    } else if (t > 64 && t < 75) {
      return {
        title: "Post-Reflection Dissipation",
        content: `Secondary reflection decay is resolving. The head pressure is falling (-4.34 m/t) back below the 20m safe operating threshold, ensuring zero risk of conduit fracturing or bulkhead leakage.`,
        action: "System preparing for static baseline rest.",
        reason: "Dissipation curve matches secondary kinetic boundary thresholds."
      };
    } else {
      return {
        title: "Post-Transit Saturated Equilibrium",
        content: "Both pressure peaks (82.4m and 52.1m) have fully resolved. The transient shocks are completely damped by boundary layer friction. The system is resting securely at baseline static head conditions.",
        action: "Pipeline cleared. Preparing logs for next simulation run.",
        reason: "Energy decay analysis registers complete viscous dissipation."
      };
    }
  }, [t, peakPressure]);

  // 6. Advanced chart rendering helper: format whole 100-point set to overlay markers dynamically
  const chartData = useMemo(() => {
    return mockPressureData.map((d, idx) => {
      const isRendered = idx <= t;
      const isPeak1 = d.t === 21;
      const isPeak2 = d.t === 63;
      const isAnomaly = d.t === 39 || d.t === 51;
      
      // Calculate smoothed 5-point moving average
      let smooth = 0;
      let count = 0;
      for (let i = Math.max(0, idx - 2); i <= Math.min(100, idx + 2); i++) {
        smooth += mockPressureData[i].pressure;
        count++;
      }
      smooth = smooth / count;

      return {
        ...d,
        pressureLive: isRendered ? d.pressure : null,
        smoothedTrend: isRendered ? smooth : null,
        peakMarker: isRendered && (isPeak1 || isPeak2) ? d.pressure : null,
        anomalyMarker: isRendered && isAnomaly ? d.pressure : null,
      };
    });
  }, [t]);

  return (
    <div className="space-y-8">
      {/* Playback controller & Header */}
      <GlassCard padding="lg" hover={false} className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-accent-cyan/15 flex items-center justify-center shadow-lg shadow-accent-cyan/10">
            <Gauge size={22} className="text-accent-cyan" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-text-primary flex items-center gap-2.5">
              Pipeline Pressure Intelligence
              <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold border transition-all duration-300 ${statusBg} ${statusColor}`}>
                {statusLabel}
              </span>
            </h2>
            <p className="text-xs text-text-tertiary mt-0.5">Dual-pulse hydraulic shockwave tracking and transient pipeline telemetry</p>
          </div>
        </div>

        {/* Simulation Ticker and Controls */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-border-subtle font-mono text-xs">
            <span className="text-text-muted">CYCLE STEP:</span>
            <span className="text-accent-cyan font-bold w-10 text-right">{t} / 100</span>
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide border transition-all duration-300 ${
              isPlaying 
                ? 'border-accent-amber/20 bg-accent-amber/10 text-accent-amber hover:bg-accent-amber/15' 
                : 'border-accent-cyan/20 bg-accent-cyan/10 text-accent-cyan hover:bg-accent-cyan/15'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause size={12} fill="currentColor" /> PAUSE PLAYBACK
              </>
            ) : (
              <>
                <Play size={12} fill="currentColor" /> RUN SIMULATOR
              </>
            )}
          </button>

          <button
            onClick={() => setT(0)}
            className="p-2 rounded-xl border border-border-glass bg-white/[0.02] text-text-secondary hover:text-text-primary transition-all hover:bg-white/[0.06]"
            title="Reset simulation loop"
          >
            <RefreshCw size={14} className={t === 0 ? '' : 'animate-spin-slow'} />
          </button>
        </div>
      </GlassCard>

      {/* Row 1: Live metrics (6-column panel) */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-5">
        
        <GlassCard padding="md" hover={false} className="flex flex-col justify-between min-h-[115px]">
          <p className="text-[10px] text-text-tertiary uppercase tracking-widest font-semibold">Live Head Pressure</p>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="metric-value text-3xl font-bold tracking-tight text-text-primary font-mono">{formatNumber(currentReading, 1)}</span>
            <span className="text-[11px] text-text-secondary font-mono">meters</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${status === 'alarm' ? 'bg-accent-red animate-status-pulse' : status === 'critical' ? 'bg-accent-red animate-pulse' : status === 'warning' ? 'bg-accent-amber' : 'bg-accent-emerald'}`} />
            <span className={`text-[10px] font-bold uppercase tracking-wider ${statusColor}`}>{statusLabel}</span>
          </div>
        </GlassCard>

        <GlassCard padding="md" hover={false} className="flex flex-col justify-between min-h-[115px]">
          <p className="text-[10px] text-text-tertiary uppercase tracking-widest font-semibold">Peak Head Recorded</p>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="metric-value text-3xl font-bold tracking-tight text-accent-red font-mono">{formatNumber(peakPressure, 1)}</span>
            <span className="text-[11px] text-text-secondary font-mono">meters</span>
          </div>
          <p className="text-[9px] text-text-muted mt-2">Maximum registered peak</p>
        </GlassCard>

        <GlassCard padding="md" hover={false} className="flex flex-col justify-between min-h-[115px]">
          <p className="text-[10px] text-text-tertiary uppercase tracking-widest font-semibold">Mean Hydro Head</p>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="metric-value text-3xl font-bold tracking-tight text-accent-cyan font-mono">{formatNumber(averagePressure, 1)}</span>
            <span className="text-[11px] text-text-secondary font-mono">meters</span>
          </div>
          <p className="text-[9px] text-text-muted mt-2">Mean pressure head</p>
        </GlassCard>

        <GlassCard padding="md" hover={false} className="flex flex-col justify-between min-h-[115px]">
          <p className="text-[10px] text-text-tertiary uppercase tracking-widest font-semibold">Active Event Width</p>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="metric-value text-3xl font-bold tracking-tight text-text-primary font-mono">{eventDuration}</span>
            <span className="text-[11px] text-text-secondary font-mono">ticks</span>
          </div>
          <p className="text-[9px] text-text-muted mt-2">Current active transit</p>
        </GlassCard>

        <GlassCard padding="md" hover={false} className="flex flex-col justify-between min-h-[115px]">
          <p className="text-[10px] text-text-tertiary uppercase tracking-widest font-semibold">Wave Trend</p>
          <div className="flex items-center gap-2 mt-3.5">
            {trendIcon}
            <span className="text-sm font-semibold text-text-primary font-mono">{trend}</span>
          </div>
          <p className="text-[9px] text-text-muted mt-2">Transient vector rate</p>
        </GlassCard>

        <GlassCard padding="md" hover={false} className="flex flex-col justify-between min-h-[115px]">
          <p className="text-[10px] text-text-tertiary uppercase tracking-widest font-semibold">Stability Score</p>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="metric-value text-3xl font-bold tracking-tight text-accent-emerald font-mono">{t === 0 ? '100' : healthScoreObj.score}</span>
            <span className="text-[11px] text-text-secondary font-mono">%</span>
          </div>
          <p className="text-[9px] text-text-muted mt-2">Shockwave damping index</p>
        </GlassCard>

      </div>

      {/* Row 2: Advanced Zone Graph & Event Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Advanced Multi-Zone Chart */}
        <GlassCard padding="lg" hover={false} className="lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
                <Activity size={16} className="text-accent-cyan animate-pulse-slow" />
                Pipeline Pressure Waveform & Multi-Zone Thresholds
              </h3>
              <p className="text-[10px] text-text-muted mt-0.5 font-mono">DAMPED TRANSIENT SHOCKWAVE INTEGRATED SIGNAL MATCH</p>
            </div>
            <div className="flex items-center gap-2.5 text-[9px] font-mono">
              <span className="flex items-center gap-1"><span className="w-2.5 h-1.5 rounded bg-accent-cyan"></span> Live</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-accent-red"></span> Peak</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-accent-amber"></span> Anomaly</span>
            </div>
          </div>

          <div className="h-[310px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 15, right: 5, left: -20, bottom: 5 }}>
                <defs>
                  <linearGradient id="pressureGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" vertical={false} />
                <XAxis 
                  dataKey="t" 
                  stroke="#475569" 
                  fontSize={10} 
                  fontFamily="JetBrains Mono"
                  tickLine={false}
                  domain={[0, 100]}
                />
                <YAxis 
                  stroke="#475569" 
                  fontSize={10} 
                  fontFamily="JetBrains Mono"
                  tickLine={false}
                  domain={[-10, 95]}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#111827', 
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '12px',
                    fontFamily: 'JetBrains Mono',
                    fontSize: '11px',
                    color: '#f1f5f9'
                  }} 
                />

                {/* Handdrawn Sketch Color Regions/Zones */}
                {/* 1. Safe Zone (Green): 0 to 20m */}
                <ReferenceArea y1={0} y2={20} stroke="none" fill="#10b981" fillOpacity={0.04} />
                {/* 2. Warning Zone (Yellow): 20m to 50m */}
                <ReferenceArea y1={20} y2={50} stroke="none" fill="#f59e0b" fillOpacity={0.04} />
                {/* 3. High Pressure Zone (Orange): 50m to 80m */}
                <ReferenceArea y1={50} y2={80} stroke="none" fill="#ea580c" fillOpacity={0.04} />
                {/* 4. Critical Alarm Zone (Red): 80m to 95m */}
                <ReferenceArea y1={80} y2={95} stroke="none" fill="#ef4444" fillOpacity={0.06} />

                {/* Highlight Inactive Rest States */}
                <ReferenceArea x1={39} x2={50} stroke="none" fill="rgba(255,255,255,0.03)" label={{ value: 'SYSTEM DEAD STATE', fill: '#475569', fontSize: 9, fontFamily: 'JetBrains Mono', position: 'insideTop' }} />
                <ReferenceArea x1={75} x2={100} stroke="none" fill="rgba(255,255,255,0.03)" label={{ value: 'SATURATED POST-DECAY', fill: '#475569', fontSize: 9, fontFamily: 'JetBrains Mono', position: 'insideTop' }} />

                {/* Sketch Specific Reference Boundary Lines */}
                <ReferenceLine y={BASELINE_PRESSURE} stroke="#06b6d4" strokeDasharray="3 3" strokeOpacity={0.5} label={{ value: 'SYSTEM BASELINE (7m)', fill: '#06b6d4', fontSize: 8, fontFamily: 'JetBrains Mono', position: 'left' }} />
                <ReferenceLine y={WARNING_THRESHOLD} stroke="#f59e0b" strokeDasharray="3 3" strokeOpacity={0.5} label={{ value: 'WARNING LEVEL (20m)', fill: '#f59e0b', fontSize: 8, fontFamily: 'JetBrains Mono', position: 'left' }} />
                <ReferenceLine y={ALARM_THRESHOLD} stroke="#ef4444" strokeDasharray="4 4" strokeOpacity={0.6} label={{ value: 'ALARM HIGH (80m)', fill: '#ef4444', fontSize: 8, fontFamily: 'JetBrains Mono', position: 'right' }} />
                
                {/* Live Area */}
                <Area 
                  type="monotone" 
                  dataKey="pressureLive" 
                  stroke="#06b6d4" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#pressureGrad)" 
                  name="Pressure (meters)"
                  isAnimationActive={false}
                />

                {/* Smoothed Trend Line */}
                <Line
                  type="monotone"
                  dataKey="smoothedTrend"
                  stroke="#10b981"
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  dot={false}
                  name="MA Trend"
                  isAnimationActive={false}
                />

                {/* Dynamic Peak Circles */}
                <Line 
                  type="monotone" 
                  dataKey="peakMarker" 
                  stroke="none" 
                  dot={{ r: 5.5, stroke: '#ef4444', strokeWidth: 2, fill: '#111827' }} 
                  name="Surge Peaks"
                />

                {/* Anomaly markers */}
                <Line 
                  type="monotone" 
                  dataKey="anomalyMarker" 
                  stroke="none" 
                  dot={{ r: 4.5, stroke: '#f59e0b', strokeWidth: 2, fill: '#111827' }} 
                  name="Transitions"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Real-time Event log */}
        <GlassCard padding="lg" hover={false} className="flex flex-col justify-between h-[405px]">
          <div>
            <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2 mb-1">
              <ListCollapse size={16} className="text-accent-cyan" />
              Dynamic Telemetry Event Log
            </h3>
            <p className="text-[10px] text-text-muted mb-4 font-mono">REAL-TIME SHOCKWAVE THRESHOLD ALARMS</p>
          </div>

          <div className="flex-1 overflow-y-auto pr-1 space-y-3.5 max-h-[290px] scrollbar-thin">
            {eventLogs.map((log) => (
              <div 
                key={log.id} 
                className={`p-3 rounded-xl border flex gap-2.5 transition-all duration-300 ${
                  log.severity === 'critical'
                    ? 'border-red-500/20 bg-red-500/5'
                    : log.severity === 'high'
                      ? 'border-orange-500/20 bg-orange-500/5'
                      : log.severity === 'warning'
                        ? 'border-amber-500/20 bg-amber-500/5'
                        : 'border-white/[0.04] bg-white/[0.01]'
                }`}
              >
                <div className="mt-0.5 flex-shrink-0">
                  {log.severity === 'critical' ? (
                    <ShieldAlert size={14} className="text-accent-red animate-pulse-slow" />
                  ) : log.severity === 'high' ? (
                    <Volume2 size={14} className="text-orange-400" />
                  ) : log.severity === 'warning' ? (
                    <AlertTriangle size={14} className="text-accent-amber" />
                  ) : (
                    <CheckCircle2 size={14} className="text-accent-cyan" />
                  )}
                </div>
                <div>
                  <div className="flex justify-between items-center gap-3">
                    <span className={`text-[9px] font-mono font-bold uppercase tracking-wider ${
                      log.severity === 'critical' ? 'text-accent-red' : log.severity === 'high' ? 'text-orange-400' : log.severity === 'warning' ? 'text-accent-amber' : 'text-accent-cyan'
                    }`}>
                      {log.severity}
                    </span>
                    <span className="text-[9px] text-text-tertiary font-mono">T={log.t}</span>
                  </div>
                  <p className="text-[11px] text-text-secondary mt-1 leading-tight">{log.msg}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Row 3: Health Score Analysis & AI Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        
        {/* Hydraulic Score Circle */}
        <GlassCard padding="lg" hover={false} className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative flex-shrink-0 w-28 h-28 flex items-center justify-center">
            {/* SVG circular track */}
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="56" cy="56" r="48" stroke="rgba(255,255,255,0.03)" strokeWidth="8" fill="none" />
              <circle 
                cx="56" 
                cy="56" 
                r="48" 
                stroke={healthScoreObj.color} 
                strokeWidth="8" 
                fill="none" 
                strokeDasharray={2 * Math.PI * 48}
                strokeDashoffset={2 * Math.PI * 48 * (1 - healthScoreObj.score / 100)}
                style={{ transition: 'stroke-dashoffset 0.8s ease' }}
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-2xl font-bold font-mono text-text-primary">{healthScoreObj.score}</span>
              <span className="text-[9px] text-text-muted font-mono">HEALTH</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
              <Shield size={15} className="text-accent-emerald" />
              Hydraulic Performance Indices
            </h3>
            <p className="text-xs font-semibold" style={{ color: healthScoreObj.color }}>{healthScoreObj.description}</p>
            <p className="text-[11px] text-text-secondary leading-relaxed font-sans">
              Integrates wave kinetic energy attenuation velocity, pipeline maximum elastic thresholds, safe threshold recovery timelines, and active anomaly occurrences.
            </p>
            <div className="mt-3 flex gap-2">
              <span className="px-2 py-0.5 rounded text-[9px] font-mono font-semibold bg-white/[0.04] text-text-secondary border border-border-subtle">
                Active Warnings: {healthScoreObj.warnings}
              </span>
              <span className="px-2 py-0.5 rounded text-[9px] font-mono font-semibold bg-white/[0.04] text-text-secondary border border-border-subtle">
                Damping Ratio: 0.63
              </span>
            </div>
          </div>
        </GlassCard>

        {/* Explainable AI Insights */}
        <GlassCard padding="lg" hover={false} className="border-l-2 border-l-accent-cyan flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
              <Brain size={16} className="text-accent-cyan" />
              Explainable AI (XAI) Hydrological Insights
            </h3>
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-border-subtle">
              <p className="text-[10px] font-mono font-bold text-accent-cyan uppercase tracking-wider">{aiInsight.title}</p>
              <p className="text-xs text-text-secondary mt-1 leading-relaxed font-sans">{aiInsight.content}</p>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-1 text-[11px]">
            <div className="flex items-center gap-1.5">
              <span className="text-accent-emerald font-bold uppercase tracking-wider font-mono">RECOMMENDED ACTION:</span>
              <span className="text-text-secondary italic">{aiInsight.action}</span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-accent-cyan font-bold uppercase tracking-wider font-mono">ENGINEERING REASONING:</span>
              <span className="text-text-secondary font-mono text-[10px]">{aiInsight.reason}</span>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Row 4: Predictive analytics & Future Architectural Specs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Live Predictor card */}
        <GlassCard padding="lg" hover={false} className="md:col-span-2">
          <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2 mb-4">
            <Clock size={16} className="text-accent-cyan" />
            Hydraulic Transient Predictive Analytics
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-3.5 rounded-xl bg-white/[0.01] border border-border-subtle text-center">
              <p className="text-[10px] text-text-tertiary uppercase font-mono font-bold">Window (+5 Ticks)</p>
              <p className="text-lg font-bold font-mono text-text-primary mt-1.5">{formatNumber(predictions.p5, 1)} <span className="text-[10px] text-text-muted">meters</span></p>
              <span className="mt-1 inline-block text-[9px] text-accent-cyan font-mono">Local Forecast</span>
            </div>
            
            <div className="p-3.5 rounded-xl bg-white/[0.01] border border-border-subtle text-center">
              <p className="text-[10px] text-text-tertiary uppercase font-mono font-bold">Window (+30 Ticks)</p>
              <p className="text-lg font-bold font-mono text-text-primary mt-1.5">{formatNumber(predictions.p30, 1)} <span className="text-[10px] text-text-muted">meters</span></p>
              <span className="mt-1 inline-block text-[9px] text-accent-cyan font-mono">Long-Range Forecast</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.01] border border-border-subtle text-center">
              <p className="text-[10px] text-text-tertiary uppercase font-mono font-bold">Window (+60 Ticks)</p>
              <p className="text-lg font-bold font-mono text-text-primary mt-1.5">{formatNumber(predictions.p60, 1)} <span className="text-[10px] text-text-muted">meters</span></p>
              <span className="mt-1 inline-block text-[9px] text-accent-cyan font-mono">Cycle Loop Forecast</span>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02]">
              <span className="text-xs text-text-secondary">Abnormal Surge Probability:</span>
              <span className="text-xs font-mono font-bold text-accent-amber">{predictions.surgeProb}%</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02]">
              <span className="text-xs text-text-secondary">Threshold Crossing Certainty:</span>
              <span className="text-xs font-mono font-bold text-accent-emerald">{predictions.crossingProb}%</span>
            </div>
          </div>
        </GlassCard>

        {/* Future Architectural Specs */}
        <GlassCard padding="lg" hover={false} className="flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2 mb-1">
              <Server size={15} className="text-accent-cyan" />
              Scalable IoT Integration Specs
            </h3>
            <p className="text-[9px] text-text-tertiary uppercase font-mono mb-4">PRODUCTION ARCHITECTURE PLAN</p>
            
            <div className="space-y-3.5 text-xs text-text-secondary font-sans">
              <div className="flex items-start gap-2.5">
                <Database size={13} className="text-accent-cyan flex-shrink-0 mt-0.5" />
                <p><strong>Database:</strong> InfluxDB / TimescaleDB for time-series pressure head storage.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <Radio size={13} className="text-accent-emerald flex-shrink-0 mt-0.5" />
                <p><strong>Uplink:</strong> MQTT telemetry client over JSON payload fields.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <Cpu size={13} className="text-accent-cyan flex-shrink-0 mt-0.5" />
                <p><strong>ML:</strong> FastAPI server executing regression forecasts.</p>
              </div>
            </div>
          </div>

          <div className="mt-4 p-2.5 rounded-lg bg-cyan-500/5 border border-cyan-500/15 flex items-center gap-2 text-[10px] text-accent-cyan font-mono">
            <Radio size={12} className="animate-pulse-slow" />
            <span>STANDBY READY FOR MQTT SENSORS</span>
          </div>
        </GlassCard>

      </div>
    </div>
  );
}
