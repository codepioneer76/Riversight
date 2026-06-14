'use client';
import { useState, useEffect } from 'react';
import { Bell, Search, Settings, Radio, Clock, X } from 'lucide-react';
import { cn } from '@/lib/cn';

export default function Header() {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
      setDate(now.toLocaleDateString('en-IN', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('global-search')?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="relative h-16 bg-bg-secondary/50 backdrop-blur-xl flex flex-col justify-end sticky top-0 z-30">
      {/* Top decorative gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/20 to-transparent" />

      {/* Main header content */}
      <div className="flex items-center justify-between px-6 h-full">
        {/* Left - Search */}
        <div className="flex items-center gap-3">
          <div 
            className={cn(
              "relative group flex items-center",
              "transition-all duration-400",
              isFocused 
                ? "w-[320px] sm:w-[420px] md:w-[480px] lg:w-[540px]" 
                : "w-[280px] sm:w-[380px] md:w-[420px] lg:w-[480px]"
            )}
            style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            {/* Background and Border Glow */}
            <div className={cn(
              "absolute inset-0 rounded-xl border pointer-events-none",
              "transition-all duration-400",
              isFocused 
                ? "bg-bg-tertiary/95 border-accent-cyan/50 shadow-[0_0_25px_rgba(0,255,255,0.12),0_0_50px_rgba(0,255,255,0.04)] backdrop-blur-md" 
                : "bg-bg-tertiary/40 border-border-glass group-hover:bg-bg-tertiary/60 group-hover:border-border-glass/80"
            )}
            style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
            />
            
            {/* Icon container */}
            <div className="absolute left-0 top-0 h-full w-[56px] flex items-center justify-center pointer-events-none">
              <Search 
                size={16} 
                className={cn(
                  "transition-colors duration-300",
                  isFocused ? "text-accent-cyan" : "text-text-muted group-hover:text-text-secondary"
                )} 
              />
            </div>
            
            <input
              id="global-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Search stations, telemetry metrics..."
              className={cn(
                "w-full h-11 bg-transparent search-input-premium",
                "text-[13px] font-medium tracking-wide text-text-primary",
                "placeholder:text-text-tertiary placeholder:font-normal placeholder:opacity-60",
                "focus:outline-none transition-all duration-400",
                "relative z-10"
              )}
              style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
            />

            {/* Right side elements: Clear button or Shortcut hint */}
            <div className="absolute right-3.5 top-0 h-full flex items-center justify-center">
              {searchQuery ? (
                <button
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setSearchQuery('');
                  }}
                  className="p-1.5 rounded-md text-text-muted hover:text-text-primary hover:bg-white/10 transition-colors"
                >
                  <X size={13} />
                </button>
              ) : (
                <div className={cn(
                  "hidden sm:flex items-center justify-center px-2 py-0.5 rounded shadow-sm border border-border-glass bg-bg-primary/60",
                  "text-[10px] font-mono text-text-muted font-medium transition-opacity duration-300",
                  isFocused ? "opacity-0 pointer-events-none" : "opacity-100 group-hover:text-text-secondary group-hover:border-white/20"
                )}>
                  <span className="text-[10px] mr-0.5">⌘</span>K
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Center - Status */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_16px_rgba(16,185,129,0.08),0_0_32px_rgba(16,185,129,0.04)]">
            <Radio size={12} className="text-emerald-400 animate-pulse-slow" />
            <span className="text-[10px] text-emerald-400 font-medium tracking-wide">LIVE MONITORING ACTIVE</span>
          </div>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-text-secondary">
            <Clock size={13} />
            <div className="text-right">
              <p className="text-xs font-mono text-text-primary leading-tight">{time}</p>
              <p className="text-[9px] text-text-tertiary leading-tight">{date}</p>
            </div>
          </div>

          <div className="w-px h-6 bg-border-glass" />

          <button className="relative p-2 rounded-xl hover:bg-white/[0.05] transition-all duration-200 text-text-secondary hover:text-text-primary">
            <Bell size={16} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent-red animate-pulse-slow" />
          </button>
          <button className="p-2 rounded-xl hover:bg-white/[0.05] transition-all duration-200 text-text-secondary hover:text-text-primary">
            <Settings size={16} />
          </button>
        </div>
      </div>

      {/* Bottom gradient fade shadow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-glass to-transparent" />
    </header>
  );
}
