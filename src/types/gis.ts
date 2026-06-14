export interface GISLayer {
  id: string;
  name: string;
  type: LayerType;
  visible: boolean;
  opacity: number;
  data: GeoJSON.FeatureCollection | null;
  color: string;
  description: string;
}

export type LayerType =
  | 'river_route'
  | 'stations'
  | 'sediment_zones'
  | 'risk_heatmap'
  | 'depth_contours'
  | 'navigation_channels'
  | 'flood_zones'
  | 'administrative';

export interface MapViewport {
  center: [number, number];
  zoom: number;
  bounds?: [[number, number], [number, number]];
}

export interface SedimentZone {
  id: string;
  name: string;
  coordinates: [number, number][];
  riskScore: number;         // 0-100
  accumulationRate: number;  // mm/year
  lastSurvey: string;
  severity: 'low' | 'moderate' | 'high' | 'critical';
}

export interface HeatmapPoint {
  lat: number;
  lng: number;
  intensity: number;
}

export interface RiverSegment {
  id: string;
  name: string;
  coordinates: [number, number][];
  avgDepth: number;
  minDepth: number;
  navigationStatus: 'safe' | 'caution' | 'restricted';
}
