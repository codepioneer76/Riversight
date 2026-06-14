export const siteConfig = {
  name: 'RIVERSIGHT',
  fullName: 'RIVERSIGHT — Intelligent River Monitoring Platform',
  description: 'IoT-Enabled Intelligent River Monitoring, Telemetry, GIS & Predictive Analytics Platform',
  tagline: 'Real-Time River Intelligence & Predictive Monitoring',
  version: '1.0.0',
  organization: 'Indian Institute of Technology',
  department: 'Hydrology & Water Resources Engineering',
  project: 'Inland Waterway Monitoring & Navigation Safety',
};

export const mapConfig = {
  defaultCenter: [25.3176, 82.9739] as [number, number], // Varanasi, Ganga
  defaultZoom: 12,
  minZoom: 6,
  maxZoom: 18,
  tileUrl: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
  tileAttribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
};

export const thresholdConfig = {
  lad: {
    safe: 2.5,
    warning: 2.5,
    critical: 1.5,
    unit: 'm',
  },
  waterLevel: {
    normal: 8.0,
    warning: 10.0,
    danger: 12.0,
    unit: 'm',
  },
  sediment: {
    low: 200,
    moderate: 400,
    high: 600,
    critical: 800,
    unit: 'mg/L',
  },
  discharge: {
    low: 500,
    normal: 2000,
    high: 3500,
    flood: 4500,
    unit: 'm³/s',
  },
};

export const apiEndpoints = {
  telemetry: {
    latest: '/api/telemetry',
    historical: '/api/telemetry/historical',
    stream: '/api/telemetry/stream',
  },
  stations: {
    list: '/api/stations',
    detail: '/api/stations/:id',
    performance: '/api/stations/:id/performance',
  },
  alerts: {
    active: '/api/alerts',
    history: '/api/alerts/history',
    acknowledge: '/api/alerts/:id/acknowledge',
  },
  predictions: {
    latest: '/api/predictions',
    models: '/api/predictions/models',
  },
  bathymetry: {
    profiles: '/api/bathymetry',
    compare: '/api/bathymetry/compare',
  },
};
