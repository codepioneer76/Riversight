import { SensorMetric } from '@/types/telemetry';

export const APP_NAME = 'RIVERSIGHT';
export const APP_TAGLINE = 'Intelligent River Monitoring Platform';
export const APP_VERSION = '1.0.0';

export const TELEMETRY_UPDATE_INTERVAL = 2000; // ms
export const CHART_MAX_POINTS = 30;
export const SPARKLINE_MAX_POINTS = 15;

export const SENSOR_METRICS: SensorMetric[] = [
  {
    key: 'waterLevel',
    label: 'Water Level',
    unit: 'm',
    icon: 'Waves',
    color: '#3b82f6',
    min: 0,
    max: 15,
    warningThreshold: 10,
    criticalThreshold: 12,
    decimals: 2,
  },
  {
    key: 'lad',
    label: 'LAD',
    unit: 'm',
    icon: 'ArrowDownToLine',
    color: '#06b6d4',
    min: 0,
    max: 8,
    warningThreshold: 2.0,
    criticalThreshold: 1.5,
    decimals: 2,
  },
  {
    key: 'discharge',
    label: 'Discharge',
    unit: 'm³/s',
    icon: 'Gauge',
    color: '#10b981',
    min: 0,
    max: 5000,
    warningThreshold: 3500,
    criticalThreshold: 4000,
    decimals: 0,
  },
  {
    key: 'turbidity',
    label: 'Turbidity',
    unit: 'NTU',
    icon: 'CloudFog',
    color: '#f59e0b',
    min: 0,
    max: 500,
    warningThreshold: 300,
    criticalThreshold: 400,
    decimals: 1,
  },
  {
    key: 'sedimentLoad',
    label: 'Sediment Load',
    unit: 'mg/L',
    icon: 'Layers',
    color: '#ef4444',
    min: 0,
    max: 1000,
    warningThreshold: 600,
    criticalThreshold: 800,
    decimals: 0,
  },
  {
    key: 'rainfall',
    label: 'Rainfall',
    unit: 'mm/hr',
    icon: 'CloudRain',
    color: '#8b5cf6',
    min: 0,
    max: 100,
    warningThreshold: 50,
    criticalThreshold: 75,
    decimals: 1,
  },
  {
    key: 'flowVelocity',
    label: 'Flow Velocity',
    unit: 'm/s',
    icon: 'Zap',
    color: '#06b6d4',
    min: 0,
    max: 5,
    warningThreshold: 3.5,
    criticalThreshold: 4.0,
    decimals: 2,
  },
];

export const NAVIGATION_ITEMS = [
  { label: 'Dashboard', path: '/', icon: 'LayoutDashboard', section: 'monitoring' },
  { label: 'Telemetry', path: '/telemetry', icon: 'Activity', section: 'monitoring' },
  { label: 'GIS Map', path: '/gis', icon: 'Map', section: 'monitoring' },
  { label: 'Bathymetry', path: '/bathymetry', icon: 'Layers', section: 'analysis' },
  { label: 'Predictions', path: '/predictions', icon: 'Brain', section: 'analysis' },
  { label: 'Pressure Intel', path: '/pressure', icon: 'Gauge', section: 'analysis' },
  { label: 'Analytics', path: '/analytics', icon: 'BarChart3', section: 'analysis' },
  { label: 'Alerts', path: '/alerts', icon: 'Bell', section: 'system' },
];

export const RIVER_HEALTH_THRESHOLDS = {
  excellent: 90,
  good: 70,
  moderate: 50,
  poor: 30,
  critical: 0,
};
