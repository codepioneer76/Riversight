'use client';
import GlassCard from '@/components/ui/GlassCard';
import StatusBadge from '@/components/ui/StatusBadge';
import { Brain, TrendingUp, TrendingDown, Minus, ChevronRight, Cpu } from 'lucide-react';
import { mockPredictions } from '@/data/mockPredictions';
import { formatRelativeTime, formatNumber } from '@/lib/formatters';
import { Prediction, RiskLevel } from '@/types/prediction';

const riskColors: Record<RiskLevel, string> = {
  low: '#10b981',
  moderate: '#f59e0b',
  high: '#ef4444',
  critical: '#dc2626',
};

const riskBg: Record<RiskLevel, string> = {
  low: 'bg-emerald-500/10 border-emerald-500/20',
  moderate: 'bg-amber-500/10 border-amber-500/20',
  high: 'bg-red-500/10 border-red-500/20',
  critical: 'bg-red-600/15 border-red-600/25',
};

export default function PredictionCards() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
          <Brain size={16} className="text-accent-purple" />
          ML Prediction Engine
        </h3>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
          <Cpu size={12} className="text-purple-400" />
          <span className="text-[10px] text-purple-400 font-medium">3 models active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {mockPredictions.map((pred) => (
          <PredictionCard key={pred.id} prediction={pred} />
        ))}
      </div>
    </div>
  );
}

function PredictionCard({ prediction }: { prediction: Prediction }) {
  const TrendIcon = prediction.trend === 'increasing' ? TrendingUp : prediction.trend === 'decreasing' ? TrendingDown : Minus;
  const trendColor = prediction.trend === 'increasing' ? '#ef4444' : prediction.trend === 'decreasing' ? '#10b981' : '#94a3b8';

  return (
    <GlassCard padding="md" className="transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <p className="text-xs font-semibold text-text-primary mb-1">{prediction.title}</p>
          <p className="text-[10px] text-text-tertiary leading-relaxed line-clamp-2">{prediction.description}</p>
        </div>
      </div>

      {/* Risk & Confidence */}
      <div className="flex items-center gap-2 mb-3">
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${riskBg[prediction.riskLevel]}`}
          style={{ color: riskColors[prediction.riskLevel] }}>
          {prediction.riskLevel.toUpperCase()} RISK
        </span>
        <div className="flex-1" />
        <div className="text-right">
          <p className="text-[9px] text-text-muted">Confidence</p>
          <p className="text-sm font-mono font-bold text-accent-purple">{prediction.confidence}%</p>
        </div>
      </div>

      {/* Confidence bar */}
      <div className="h-1 rounded-full bg-white/[0.05] mb-3 overflow-hidden">
        <div className="h-full rounded-full bg-accent-purple transition-all duration-1000" style={{ width: `${prediction.confidence}%` }} />
      </div>

      {/* Values */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="p-2 rounded-lg bg-white/[0.02] border border-border-subtle">
          <p className="text-[9px] text-text-muted">Current</p>
          <p className="text-sm font-mono font-semibold text-text-primary">{formatNumber(prediction.currentValue, 1)} <span className="text-[10px] text-text-muted">{prediction.unit}</span></p>
        </div>
        <div className="p-2 rounded-lg bg-white/[0.02] border border-border-subtle">
          <p className="text-[9px] text-text-muted">Predicted</p>
          <div className="flex items-center gap-1">
            <p className="text-sm font-mono font-semibold" style={{ color: riskColors[prediction.riskLevel] }}>
              {formatNumber(prediction.predictedValue, 1)} <span className="text-[10px] text-text-muted">{prediction.unit}</span>
            </p>
            <TrendIcon size={12} style={{ color: trendColor }} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-border-subtle">
        <div>
          <p className="text-[9px] text-text-muted">{prediction.modelName} v{prediction.modelVersion}</p>
          <p className="text-[9px] text-text-muted">Horizon: {prediction.horizon}</p>
        </div>
        <span className="text-[9px] text-text-muted">{formatRelativeTime(prediction.lastUpdated)}</span>
      </div>
    </GlassCard>
  );
}
