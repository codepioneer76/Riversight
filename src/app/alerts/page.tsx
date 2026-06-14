'use client';
import DashboardShell from '@/components/layout/DashboardShell';
import AlertCenter from '@/features/alerts/AlertCenter';
import { Bell } from 'lucide-react';

export default function AlertsPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="animate-slide-up opacity-0" style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}>
          <h1 className="text-xl font-bold text-text-primary flex items-center gap-2">
            <Bell size={20} className="text-accent-amber" />
            Alert Center
          </h1>
          <p className="text-xs text-text-tertiary mt-0.5">Early warning system — monitor, acknowledge, and resolve alerts</p>
        </div>

        <div className="animate-slide-up opacity-0" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
          <AlertCenter />
        </div>
      </div>
    </DashboardShell>
  );
}
