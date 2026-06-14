'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/cn';
import { NAVIGATION_ITEMS } from '@/lib/constants';
import {
  LayoutDashboard, Activity, Map, Layers, Brain, BarChart3, Bell,
  ChevronLeft, ChevronRight, Radio, Droplets, Gauge
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard, Activity, Map, Layers, Brain, BarChart3, Bell, Gauge,
};

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  const sections = [
    { key: 'monitoring', label: 'MONITORING' },
    { key: 'analysis', label: 'ANALYSIS' },
    { key: 'system', label: 'SYSTEM' },
  ];

  return (
    <aside className={cn(
      'sticky top-0 h-screen z-40 flex flex-col flex-shrink-0',
      'bg-bg-secondary/80 backdrop-blur-xl border-r border-border-glass',
      'transition-[width] duration-300 ease-in-out will-change-[width]',
      collapsed ? 'w-[72px]' : 'w-[240px]'
    )}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-border-glass">
        <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-blue flex items-center justify-center flex-shrink-0 shadow-lg shadow-accent-cyan/20">
          <Droplets size={20} className="text-white relative z-10" />
          {/* Subtle under-glow */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-3 rounded-full bg-accent-cyan/20 blur-md" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="text-sm font-bold tracking-wider text-text-primary">RIVERSIGHT</h1>
            <p className="text-[9px] text-text-tertiary tracking-widest uppercase">River Intelligence</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-12 px-3.5 overflow-y-auto flex flex-col justify-start gap-11">
        {sections.map((section, sectionIndex) => (
          <div key={section.key} className="flex flex-col">
            {/* Section separator (between sections, not before first) */}
            {sectionIndex > 0 && !collapsed && (
              <div className="h-px bg-border-glass/50 mx-3.5 -mt-5 mb-5" />
            )}
            {!collapsed && (
              <p className="px-3.5 mb-4 text-[10px] font-bold tracking-[0.22em] text-text-tertiary uppercase opacity-80">
                {section.label}
              </p>
            )}
            {/* Collapsed separator dot */}
            {sectionIndex > 0 && collapsed && (
              <div className="flex justify-center -mt-5 mb-5">
                <div className="w-1 h-1 rounded-full bg-border-glass" />
              </div>
            )}
            {NAVIGATION_ITEMS.filter(item => item.section === section.key).map((item) => {
              const Icon = iconMap[item.icon] || LayoutDashboard;
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    'flex items-center gap-3.5 px-3.5 py-3.5 rounded-xl mb-2.5 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group relative border border-transparent',
                    isActive
                      ? 'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/15 shadow-[0_0_12px_rgba(6,182,212,0.05),inset_0_1px_1px_rgba(6,182,212,0.15)]'
                      : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.04] hover:border-white/[0.02] hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)]'
                  )}
                >
                  {/* Active indicator — taller with gradient fill */}
                  {isActive && (
                    <div
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r-full shadow-[0_0_8px_rgba(6,182,212,0.5)]"
                      style={{ background: 'linear-gradient(to bottom, #22d3ee, #06b6d4)' }}
                    />
                  )}
                  <Icon size={18} className={cn('flex-shrink-0 transition-transform duration-300 group-hover:scale-105', isActive && 'drop-shadow-[0_0_6px_rgba(6,182,212,0.5)]')} />
                  {!collapsed && <span className="text-sm font-medium tracking-wide">{item.label}</span>}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* System status footer */}
      <div className="px-5 py-4 border-t border-border-glass bg-bg-secondary/40 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-accent-emerald animate-status-pulse"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-emerald"></span>
          </div>
          <Radio size={13} className="text-accent-emerald/80 flex-shrink-0" />
          {!collapsed && (
            <span className="text-[10px] text-text-tertiary font-mono tracking-wider uppercase font-semibold">
              System Online
            </span>
          )}
        </div>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        className={cn(
          'absolute -right-3.5 top-20 w-7 h-7 rounded-full flex items-center justify-center z-50',
          'bg-bg-secondary border border-border-glass',
          'text-text-secondary hover:text-text-primary',
          'shadow-lg shadow-black/30',
          'transition-all duration-200 ease-out',
          'hover:scale-110 hover:bg-bg-tertiary hover:border-border-glass/80',
          'active:scale-95'
        )}
      >
        {collapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
      </button>
    </aside>
  );
}
