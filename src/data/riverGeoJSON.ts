import { SedimentZone, HeatmapPoint } from '@/types/gis';

// Ganga River route near Varanasi (simplified polyline)
export const riverRouteGeoJSON: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { name: 'Ganga River - Varanasi Reach', id: 'ganga-vns' },
      geometry: {
        type: 'LineString',
        coordinates: [
          [81.88, 25.43],[81.92, 25.42],[81.96, 25.41],[82.00, 25.40],
          [82.04, 25.39],[82.08, 25.38],[82.12, 25.37],[82.16, 25.36],
          [82.20, 25.355],[82.24, 25.35],[82.28, 25.345],[82.32, 25.34],
          [82.36, 25.335],[82.40, 25.33],[82.44, 25.325],[82.48, 25.32],
          [82.52, 25.318],[82.56, 25.315],[82.60, 25.312],[82.64, 25.31],
          [82.68, 25.308],[82.72, 25.305],[82.76, 25.302],[82.80, 25.30],
          [82.84, 25.298],[82.88, 25.296],[82.90, 25.295],[82.92, 25.294],
          [82.94, 25.293],[82.96, 25.292],[82.97, 25.293],[82.98, 25.296],
          [82.99, 25.30],[83.00, 25.305],[83.01, 25.31],[83.02, 25.312],
          [83.04, 25.308],[83.06, 25.30],[83.08, 25.295],[83.10, 25.29],
        ],
      },
    },
  ],
};

export const sedimentZones: SedimentZone[] = [
  {
    id: 'sed-001', name: 'Ramnagar Bend Deposit', riskScore: 78, accumulationRate: 12.5, lastSurvey: '2026-01-10', severity: 'high',
    coordinates: [[82.98, 25.28],[83.02, 25.28],[83.02, 25.30],[82.98, 25.30]],
  },
  {
    id: 'sed-002', name: 'Assi Confluence Zone', riskScore: 55, accumulationRate: 8.2, lastSurvey: '2026-01-10', severity: 'moderate',
    coordinates: [[82.97, 25.29],[83.00, 25.29],[83.00, 25.30],[82.97, 25.30]],
  },
  {
    id: 'sed-003', name: 'Rajghat Upstream Bar', riskScore: 42, accumulationRate: 5.1, lastSurvey: '2025-12-20', severity: 'moderate',
    coordinates: [[82.98, 25.33],[83.01, 25.33],[83.01, 25.35],[82.98, 25.35]],
  },
  {
    id: 'sed-004', name: 'Dashashwamedh Shoal', riskScore: 88, accumulationRate: 15.3, lastSurvey: '2026-01-10', severity: 'critical',
    coordinates: [[82.96, 25.30],[82.99, 25.30],[82.99, 25.32],[82.96, 25.32]],
  },
];

export const heatmapPoints: HeatmapPoint[] = [
  { lat: 25.30, lng: 82.97, intensity: 0.9 },
  { lat: 25.31, lng: 82.98, intensity: 0.7 },
  { lat: 25.29, lng: 82.99, intensity: 0.85 },
  { lat: 25.32, lng: 82.97, intensity: 0.5 },
  { lat: 25.285, lng: 83.01, intensity: 0.95 },
  { lat: 25.295, lng: 82.985, intensity: 0.6 },
  { lat: 25.335, lng: 82.99, intensity: 0.45 },
  { lat: 25.305, lng: 82.975, intensity: 0.75 },
  { lat: 25.31, lng: 83.005, intensity: 0.55 },
  { lat: 25.325, lng: 82.995, intensity: 0.35 },
  { lat: 25.28, lng: 83.005, intensity: 0.8 },
  { lat: 25.34, lng: 82.985, intensity: 0.3 },
];
