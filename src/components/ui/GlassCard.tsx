'use client';
import { cn } from '@/lib/cn';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: 'cyan' | 'blue' | 'red' | 'emerald' | 'amber' | 'purple';
  padding?: 'sm' | 'md' | 'lg';
  animate?: boolean;
  onClick?: () => void;
}

export default function GlassCard({ children, className, hover = true, glow, padding = 'md', animate = true, onClick }: GlassCardProps) {
  const paddings = { 
    sm: 'p-3 md:p-4', 
    md: 'p-5 md:p-6', 
    lg: 'p-6 md:p-8' 
  };
  const glowClasses: Record<string, string> = {
    cyan: 'glow-cyan',
    blue: 'glow-blue',
    red: 'glow-red',
    emerald: 'glow-emerald',
    amber: 'glow-amber',
    purple: 'shadow-[0_0_20px_rgba(139,92,246,0.15),0_8px_32px_rgba(0,0,0,0.3)]',
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        hover ? 'glass-card' : 'glass-card-static',
        paddings[padding],
        glow && glowClasses[glow],
        animate && 'animate-fade-in',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
}

