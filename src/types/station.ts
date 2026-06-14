export interface Station {
  id: string;
  name: string;
  code: string;
  latitude: number;
  longitude: number;
  riverName: string;
  riverKm: number;         // km from river mouth
  type: StationType;
  status: StationStatus;
  sensors: string[];
  lastUpdate: number;
  installDate: string;
  elevation: number;       // meters above sea level
  description: string;
}

export type StationType = 'primary' | 'secondary' | 'reference' | 'temporary';
export type StationStatus = 'active' | 'maintenance' | 'inactive' | 'error';

export interface StationPerformance {
  stationId: string;
  uptime: number;          // percentage
  dataQuality: number;     // percentage
  lastMaintenance: string;
  sensorHealth: Record<string, number>;
  transmissionRate: number; // data points per hour
}
