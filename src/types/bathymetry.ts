export interface BathymetryProfile {
  id: string;
  stationId: string;
  surveyDate: string;
  crossSection: CrossSectionPoint[];
  minDepth: number;
  maxDepth: number;
  avgDepth: number;
  channelWidth: number;
  remarks: string;
}

export interface CrossSectionPoint {
  distance: number;   // horizontal distance from left bank (m)
  depth: number;      // depth below water surface (m)
  elevation: number;  // bed elevation (m above MSL)
}

export interface BathymetryComparison {
  stationId: string;
  surveys: {
    date: string;
    profile: CrossSectionPoint[];
    color: string;
  }[];
  volumeChange: number;
  depthChange: number;
}

export interface DepthContour {
  depth: number;
  color: string;
  area: number;
  percentage: number;
}
