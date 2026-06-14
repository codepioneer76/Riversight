'use client';
import { useState, ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { cn } from '@/lib/cn';

interface DashboardShellProps {
  children: ReactNode;
}

export default function DashboardShell({ children }: DashboardShellProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen gradient-mesh overflow-x-hidden">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <Header />
        <main className="px-6 py-6 md:px-10 md:py-8 lg:pl-16 lg:pr-12 lg:py-10 xl:pl-20 xl:pr-14 flex-1">
          <div className="max-w-[1600px] mx-auto w-full animate-page-enter">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
