import { BathymetryProfile, CrossSectionPoint } from '@/types/bathymetry';

function generateCrossSection(width: number, maxDepth: number, asymmetry: number = 0, roughness: number = 0.3): CrossSectionPoint[] {
  const points: CrossSectionPoint[] = [];
  const steps = 40;
  const dx = width / steps;
  for (let i = 0; i <= steps; i++) {
    const x = i * dx;
    const n = (x / width) * 2 - 1;
    const s = n + asymmetry * 0.3;
    let depth = maxDepth * (1 - s * s);
    depth = Math.max(0, depth + (Math.random() - 0.5) * roughness * maxDepth);
    if (Math.abs(s - 0.2) < 0.15) depth *= 1.15;
    if (Math.abs(s + 0.5) < 0.1 && maxDepth > 4) depth *= 0.6;
    points.push({ distance: Math.round(x * 10) / 10, depth: Math.round(depth * 100) / 100, elevation: Math.round((65 - depth) * 100) / 100 });
  }
  return points;
}

export const mockBathymetryProfiles: BathymetryProfile[] = [
  { id: 'bath-001', stationId: 'STN-001', surveyDate: '2026-01-15', crossSection: generateCrossSection(250, 6.5, -0.1, 0.25), minDepth: 1.2, maxDepth: 6.5, avgDepth: 4.1, channelWidth: 250, remarks: 'Pre-monsoon survey.' },
  { id: 'bath-002', stationId: 'STN-001', surveyDate: '2025-09-20', crossSection: generateCrossSection(280, 8.2, -0.15, 0.3), minDepth: 2.1, maxDepth: 8.2, avgDepth: 5.3, channelWidth: 280, remarks: 'Post-monsoon survey.' },
  { id: 'bath-003', stationId: 'STN-001', surveyDate: '2025-03-10', crossSection: generateCrossSection(240, 5.8, -0.05, 0.2), minDepth: 0.8, maxDepth: 5.8, avgDepth: 3.6, channelWidth: 240, remarks: 'Dry season survey.' },
  { id: 'bath-004', stationId: 'STN-002', surveyDate: '2026-01-15', crossSection: generateCrossSection(300, 7.0, 0.1, 0.35), minDepth: 1.5, maxDepth: 7.0, avgDepth: 4.5, channelWidth: 300, remarks: 'Bridge section survey.' },
];

export const depthContours = [
  { depth: 1, color: '#bfdbfe', area: 15, percentage: 6 },
  { depth: 2, color: '#93c5fd', area: 35, percentage: 14 },
  { depth: 3, color: '#60a5fa', area: 55, percentage: 22 },
  { depth: 4, color: '#3b82f6', area: 65, percentage: 26 },
  { depth: 5, color: '#2563eb', area: 45, percentage: 18 },
  { depth: 6, color: '#1d4ed8', area: 25, percentage: 10 },
  { depth: 7, color: '#1e40af', area: 10, percentage: 4 },
];
