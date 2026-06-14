'use client';
import GlassCard from '@/components/ui/GlassCard';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Layers, ArrowLeftRight } from 'lucide-react';
import { mockBathymetryProfiles, depthContours } from '@/data/mockBathymetry';
import { useState } from 'react';

export default function DepthProfile() {
  const [selectedStation, setSelectedStation] = useState('STN-001');

  const profiles = mockBathymetryProfiles.filter(p => p.stationId === selectedStation);
  const latestProfile = profiles[0];

  if (!latestProfile) return null;

  const chartData = latestProfile.crossSection.map((pt) => ({
    distance: pt.distance,
    depth: -pt.depth, // negative for display (depth below surface)
    elevation: pt.elevation,
  }));

  return (
    <GlassCard padding="lg" hover={false}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
          <Layers size={16} className="text-accent-blue" />
          Bathymetry — Cross Section Profile
        </h3>
        <div className="flex items-center gap-2">
          <select
            value={selectedStation}
            onChange={(e) => setSelectedStation(e.target.value)}
            className="text-xs bg-white/[0.03] border border-border-glass rounded-lg px-3 py-1.5 text-text-primary focus:outline-none focus:border-accent-cyan/30"
          >
            <option value="STN-001">Varanasi Ghats</option>
            <option value="STN-002">Ramnagar Bridge</option>
          </select>
          <span className="text-[10px] text-text-tertiary">Survey: {latestProfile.surveyDate}</span>
        </div>
      </div>

      {/* Depth profile chart */}
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="depthGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.1} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.4} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis
            dataKey="distance"
            label={{ value: 'Distance from Left Bank (m)', position: 'insideBottom', offset: -2, style: { fontSize: 10, fill: '#64748b' } }}
            tick={{ fontSize: 10, fill: '#64748b' }}
            stroke="rgba(255,255,255,0.1)"
            axisLine={false}
          />
          <YAxis
            label={{ value: 'Depth (m)', angle: -90, position: 'insideLeft', offset: 15, style: { fontSize: 10, fill: '#64748b' } }}
            tick={{ fontSize: 10, fill: '#64748b' }}
            stroke="rgba(255,255,255,0.1)"
            axisLine={false}
            domain={['auto', 0]}
          />
          <Tooltip
            contentStyle={{
              background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px', fontSize: '12px', color: '#f1f5f9', fontFamily: 'JetBrains Mono',
            }}
            formatter={(value) => [`${Math.abs(Number(value)).toFixed(2)} m`, 'Depth']}
          />
          <Area type="monotone" dataKey="depth" stroke="#3b82f6" strokeWidth={2} fill="url(#depthGrad)" isAnimationActive={false} />
        </AreaChart>
      </ResponsiveContainer>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-3 mt-4">
        <StatBox label="Min Depth" value={`${latestProfile.minDepth} m`} />
        <StatBox label="Max Depth" value={`${latestProfile.maxDepth} m`} />
        <StatBox label="Avg Depth" value={`${latestProfile.avgDepth} m`} />
        <StatBox label="Channel Width" value={`${latestProfile.channelWidth} m`} />
      </div>

      {/* Depth contour distribution */}
      <div className="mt-4">
        <p className="text-xs text-text-secondary font-medium mb-2 flex items-center gap-1.5">
          <ArrowLeftRight size={12} /> Depth Distribution
        </p>
        <div className="flex items-end gap-1 h-16">
          {depthContours.map((c) => (
            <div key={c.depth} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-t-sm transition-all"
                style={{ height: `${c.percentage * 2}px`, backgroundColor: c.color, opacity: 0.7 }}
              />
              <span className="text-[8px] font-mono text-text-muted">{c.depth}m</span>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-2.5 rounded-lg bg-white/[0.02] border border-border-subtle text-center">
      <p className="text-[9px] text-text-muted uppercase tracking-wider">{label}</p>
      <p className="text-sm font-mono font-semibold text-text-primary mt-0.5">{value}</p>
    </div>
  );
}
