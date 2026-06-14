'use client';
import GlassCard from '@/components/ui/GlassCard';
import TimeSeriesChart from '@/components/charts/TimeSeriesChart';
import { BarChart3, TrendingUp, Calendar, Activity } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';
import { generateTimeSeriesData } from '@/data/mockTelemetry';
import { useMemo } from 'react';

// Generate monthly data for seasonal analysis
function generateMonthlyData() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map((month) => {
    const isMonsoon = ['Jun', 'Jul', 'Aug', 'Sep'].includes(month);
    const isWinter = ['Dec', 'Jan', 'Feb'].includes(month);
    return {
      month,
      waterLevel: isMonsoon ? 7 + Math.random() * 4 : isWinter ? 3 + Math.random() * 2 : 4 + Math.random() * 3,
      discharge: isMonsoon ? 3000 + Math.random() * 2000 : isWinter ? 500 + Math.random() * 500 : 1000 + Math.random() * 1000,
      sediment: isMonsoon ? 500 + Math.random() * 400 : isWinter ? 100 + Math.random() * 100 : 200 + Math.random() * 200,
      lad: isMonsoon ? 4 + Math.random() * 2 : isWinter ? 2 + Math.random() * 1.5 : 3 + Math.random() * 1.5,
    };
  });
}

function generateStationPerf() {
  return [
    { station: 'VNS-GHT', uptime: 99.2, quality: 97.8, coverage: 100 },
    { station: 'RNG-BRG', uptime: 98.5, quality: 95.4, coverage: 95 },
    { station: 'ASI-GHT', uptime: 96.1, quality: 93.2, coverage: 85 },
    { station: 'RJG-STN', uptime: 97.8, quality: 96.1, coverage: 92 },
    { station: 'CHN-FRT', uptime: 94.3, quality: 91.0, coverage: 88 },
    { station: 'ALH-SNG', uptime: 78.5, quality: 82.3, coverage: 72 },
  ];
}

export default function AnalyticsDashboard() {
  const monthlyData = useMemo(() => generateMonthlyData(), []);
  const stationPerf = useMemo(() => generateStationPerf(), []);
  const historicalWL = useMemo(() => generateTimeSeriesData(5.2, 1.5, 50, 3600000), []);
  const historicalLAD = useMemo(() => generateTimeSeriesData(3.5, 0.8, 50, 3600000), []);

  const tooltipStyle = {
    background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px', fontSize: '11px', color: '#f1f5f9', fontFamily: 'JetBrains Mono',
  };

  return (
    <div className="space-y-4">
      {/* Historical Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <GlassCard padding="md" hover={false}>
          <h4 className="text-xs font-semibold text-text-primary mb-3 flex items-center gap-2">
            <TrendingUp size={14} className="text-accent-blue" />
            Water Level — 48h Trend
          </h4>
          <TimeSeriesChart data={historicalWL} color="#3b82f6" gradientId="hist-wl" height={200} />
        </GlassCard>

        <GlassCard padding="md" hover={false}>
          <h4 className="text-xs font-semibold text-text-primary mb-3 flex items-center gap-2">
            <TrendingUp size={14} className="text-accent-cyan" />
            LAD — 48h Trend
          </h4>
          <TimeSeriesChart data={historicalLAD} color="#06b6d4" gradientId="hist-lad" height={200} />
        </GlassCard>
      </div>

      {/* Seasonal Analysis */}
      <GlassCard padding="md" hover={false}>
        <h4 className="text-xs font-semibold text-text-primary mb-3 flex items-center gap-2">
          <Calendar size={14} className="text-accent-purple" />
          Seasonal Analysis — Monthly Parameters
        </h4>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={monthlyData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />
            <Bar dataKey="waterLevel" name="Water Level (m)" fill="#3b82f6" radius={[3, 3, 0, 0]} opacity={0.8} />
            <Bar dataKey="lad" name="LAD (m)" fill="#06b6d4" radius={[3, 3, 0, 0]} opacity={0.8} />
          </BarChart>
        </ResponsiveContainer>
      </GlassCard>

      {/* Station Performance */}
      <GlassCard padding="md" hover={false}>
        <h4 className="text-xs font-semibold text-text-primary mb-3 flex items-center gap-2">
          <Activity size={14} className="text-accent-emerald" />
          Station Performance Metrics
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border-glass">
                <th className="text-[10px] text-text-muted uppercase tracking-wider font-semibold py-2 px-3">Station</th>
                <th className="text-[10px] text-text-muted uppercase tracking-wider font-semibold py-2 px-3">Uptime</th>
                <th className="text-[10px] text-text-muted uppercase tracking-wider font-semibold py-2 px-3">Data Quality</th>
                <th className="text-[10px] text-text-muted uppercase tracking-wider font-semibold py-2 px-3">Coverage</th>
                <th className="text-[10px] text-text-muted uppercase tracking-wider font-semibold py-2 px-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {stationPerf.map((s) => (
                <tr key={s.station} className="border-b border-border-subtle hover:bg-white/[0.02] transition-colors">
                  <td className="py-2.5 px-3 text-xs font-mono font-semibold text-text-primary">{s.station}</td>
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${s.uptime}%`, backgroundColor: s.uptime > 95 ? '#10b981' : s.uptime > 85 ? '#f59e0b' : '#ef4444' }} />
                      </div>
                      <span className="text-xs font-mono text-text-secondary">{s.uptime}%</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="text-xs font-mono text-text-secondary">{s.quality}%</span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="text-xs font-mono text-text-secondary">{s.coverage}%</span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-medium ${s.uptime > 90 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${s.uptime > 90 ? 'bg-emerald-400' : 'bg-amber-400'} animate-pulse`} />
                      {s.uptime > 90 ? 'Healthy' : 'Degraded'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
