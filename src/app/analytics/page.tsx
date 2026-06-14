'use client';
import DashboardShell from '@/components/layout/DashboardShell';
import AnalyticsDashboard from '@/features/analytics/AnalyticsDashboard';
import { BarChart3 } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="animate-slide-up opacity-0" style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}>
          <h1 className="text-xl font-bold text-text-primary flex items-center gap-2">
            <BarChart3 size={20} className="text-accent-emerald" />
            Analytics
          </h1>
          <p className="text-xs text-text-tertiary mt-0.5">Historical trends, seasonal analysis, and station performance metrics</p>
        </div>

        <div className="animate-slide-up opacity-0" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
          <AnalyticsDashboard />
        </div>
      </div>
    </DashboardShell>
  );
}
