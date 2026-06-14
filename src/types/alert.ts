export interface Alert {
  id: string;
  stationId: string;
  stationName: string;
  type: AlertType;
  severity: AlertSeverity;
  title: string;
  message: string;
  value: number;
  threshold: number;
  unit: string;
  timestamp: number;
  acknowledged: boolean;
  resolved: boolean;
  resolvedAt?: number;
}

export type AlertType =
  | 'low_lad'
  | 'high_sediment'
  | 'abnormal_discharge'
  | 'telemetry_failure'
  | 'flood_warning'
  | 'water_quality'
  | 'equipment_fault'
  | 'anomaly_detected';

export type AlertSeverity = 'critical' | 'warning' | 'info';

export interface AlertStats {
  total: number;
  critical: number;
  warning: number;
  info: number;
  unacknowledged: number;
  resolvedToday: number;
}

export interface AlertConfig {
  type: AlertType;
  enabled: boolean;
  thresholds: {
    warning: number;
    critical: number;
  };
  cooldown: number; // minutes between repeated alerts
}
