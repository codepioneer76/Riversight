'use client';
import DashboardShell from '@/components/layout/DashboardShell';
import PredictionCards from '@/features/predictions/PredictionCards';
import { Brain } from 'lucide-react';

export default function PredictionsPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="animate-slide-up opacity-0" style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}>
          <h1 className="text-xl font-bold text-text-primary flex items-center gap-2">
            <Brain size={20} className="text-accent-purple" />
            ML Predictions
          </h1>
          <p className="text-xs text-text-tertiary mt-0.5">Machine learning model forecasts, anomaly detection, and dredging recommendations</p>
        </div>

        <div className="animate-slide-up opacity-0" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
          <PredictionCards />
        </div>
      </div>
    </DashboardShell>
  );
}
