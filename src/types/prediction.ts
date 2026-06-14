export interface Prediction {
  id: string;
  type: PredictionType;
  title: string;
  description: string;
  confidence: number;         // 0-100
  riskLevel: RiskLevel;
  predictedValue: number;
  currentValue: number;
  unit: string;
  horizon: string;            // e.g., "24h", "7d", "30d"
  trend: 'increasing' | 'decreasing' | 'stable';
  lastUpdated: number;
  modelName: string;
  modelVersion: string;
  factors: PredictionFactor[];
}

export type PredictionType =
  | 'lad_reduction'
  | 'sediment_formation'
  | 'navigation_hazard'
  | 'dredging_recommendation'
  | 'anomaly_detection'
  | 'flood_risk'
  | 'water_quality';

export type RiskLevel = 'low' | 'moderate' | 'high' | 'critical';

export interface PredictionFactor {
  name: string;
  impact: number;      // -1 to 1 (contribution to prediction)
  value: number;
  unit: string;
}

export interface ModelEndpoint {
  id: string;
  name: string;
  version: string;
  endpoint: string;
  status: 'active' | 'training' | 'offline';
  accuracy: number;
  lastTrained: string;
  inputFeatures: string[];
  outputMetric: string;
}
