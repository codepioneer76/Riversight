export interface TelemetryReading {
  id: string;
  stationId: string;
  timestamp: number;
  waterLevel: number;       // meters
  lad: number;              // meters (Least Available Depth)
  discharge: number;        // m³/s
  turbidity: number;        // NTU
  sedimentLoad: number;     // mg/L
  rainfall: number;         // mm/hr
  flowVelocity: number;     // m/s
  temperature: number;      // °C
  dissolvedOxygen: number;  // mg/L
  ph: number;               // pH
}

export interface TelemetrySnapshot {
  current: TelemetryReading;
  history: TelemetryReading[];
  trend: 'rising' | 'falling' | 'stable';
  status: SensorStatus;
}

export type SensorStatus = 'online' | 'warning' | 'critical' | 'offline';

export interface SensorMetric {
  key: keyof Omit<TelemetryReading, 'id' | 'stationId' | 'timestamp'>;
  label: string;
  unit: string;
  icon: string;
  color: string;
  min: number;
  max: number;
  warningThreshold: number;
  criticalThreshold: number;
  decimals: number;
}

export interface TimeSeriesPoint {
  [key: string]: number;
  timestamp: number;
  value: number;
}

export interface TelemetryStream {
  sensorKey: string;
  data: TimeSeriesPoint[];
  currentValue: number;
  trend: 'rising' | 'falling' | 'stable';
  status: SensorStatus;
}
