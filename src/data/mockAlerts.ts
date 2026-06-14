import { Alert, AlertType, AlertSeverity } from '@/types/alert';
import { generateId } from '@/lib/formatters';

const alertTemplates: Array<{
  type: AlertType;
  severity: AlertSeverity;
  title: string;
  message: string;
  unit: string;
}> = [
  {
    type: 'low_lad',
    severity: 'critical',
    title: 'Critical Navigation Hazard',
    message: 'CRITICAL HAZARD: Varanasi Reach depth is below safe threshold (1.2m). Deep draft transport suspended.',
    unit: 'm',
  },
  {
    type: 'low_lad',
    severity: 'warning',
    title: 'Navigation Caution',
    message: 'Navigation caution: Channel depth at Varanasi Reach is shallow (1.9m). High draft vessels advise caution.',
    unit: 'm',
  },
  {
    type: 'high_sediment',
    severity: 'warning',
    title: 'High Sediment Load',
    message: 'Sediment concentration exceeds safe levels. Potential for channel obstruction.',
    unit: 'mg/L',
  },
  {
    type: 'abnormal_discharge',
    severity: 'warning',
    title: 'Abnormal Discharge Rate',
    message: 'River discharge rate is significantly above normal levels. Monitor for flood conditions.',
    unit: 'm³/s',
  },
  {
    type: 'telemetry_failure',
    severity: 'critical',
    title: 'Telemetry Communication Loss',
    message: 'Station has stopped transmitting data. Check MQTT connectivity and sensor hardware.',
    unit: '',
  },
  {
    type: 'flood_warning',
    severity: 'critical',
    title: 'Flood Warning Issued',
    message: 'Water level approaching danger mark. Evacuation advisory may be required.',
    unit: 'm',
  },
  {
    type: 'water_quality',
    severity: 'warning',
    title: 'Water Quality Degradation',
    message: 'Dissolved oxygen levels have dropped below acceptable limits.',
    unit: 'mg/L',
  },
  {
    type: 'anomaly_detected',
    severity: 'info',
    title: 'Anomaly Detected',
    message: 'ML model detected unusual pattern in sensor readings. Review recommended.',
    unit: '',
  },
];

const stationNames = [
  { id: 'STN-001', name: 'Varanasi Ghats Station' },
  { id: 'STN-002', name: 'Ramnagar Bridge Station' },
  { id: 'STN-003', name: 'Assi Ghat Station' },
  { id: 'STN-004', name: 'Rajghat Station' },
  { id: 'STN-005', name: 'Chunar Fort Station' },
];

export function generateMockAlerts(count: number = 8): Alert[] {
  const alerts: Alert[] = [];
  const now = Date.now();

  for (let i = 0; i < count; i++) {
    const template = alertTemplates[i % alertTemplates.length];
    const station = stationNames[i % stationNames.length];
    const hoursAgo = Math.floor(Math.random() * 24);

    alerts.push({
      id: generateId(),
      stationId: station.id,
      stationName: station.name,
      type: template.type,
      severity: template.severity,
      title: template.title,
      message: template.message,
      value: Math.random() * 100,
      threshold: 50 + Math.random() * 50,
      unit: template.unit,
      timestamp: now - (hoursAgo * 3600000),
      acknowledged: i > 3,
      resolved: i > 5,
      resolvedAt: i > 5 ? now - (hoursAgo * 1800000) : undefined,
    });
  }

  return alerts.sort((a, b) => b.timestamp - a.timestamp);
}

export const mockAlertStats = {
  total: 24,
  critical: 5,
  warning: 12,
  info: 7,
  unacknowledged: 8,
  resolvedToday: 6,
};
