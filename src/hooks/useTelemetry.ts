'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { TelemetryReading } from '@/types/telemetry';
import { generateTelemetryReading, generateHistoricalData, calculateRiverHealthScore } from '@/data/mockTelemetry';
import { mockStations } from '@/data/mockStations';
import { TELEMETRY_UPDATE_INTERVAL, CHART_MAX_POINTS } from '@/lib/constants';

interface StationTelemetry {
  current: TelemetryReading;
  history: TelemetryReading[];
}

export function useTelemetry() {
  const [stationData, setStationData] = useState<Record<string, StationTelemetry>>({});
  const [healthScore, setHealthScore] = useState(78);
  const [isLive, setIsLive] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize with historical data
  useEffect(() => {
    const initial: Record<string, StationTelemetry> = {};
    mockStations.forEach((station) => {
      const history = generateHistoricalData(station.id, CHART_MAX_POINTS);
      initial[station.id] = {
        current: history[history.length - 1],
        history,
      };
    });
    setStationData(initial);
    setHealthScore(calculateRiverHealthScore());
  }, []);

  // Real-time updates
  useEffect(() => {
    if (!isLive) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setStationData((prev) => {
        const updated = { ...prev };
        mockStations.forEach((station) => {
          if (station.status !== 'active') return;
          const newReading = generateTelemetryReading(station.id);
          const prevStation = updated[station.id];
          if (prevStation) {
            const newHistory = [...prevStation.history, newReading].slice(-CHART_MAX_POINTS);
            updated[station.id] = { current: newReading, history: newHistory };
          }
        });
        return updated;
      });
      setHealthScore(calculateRiverHealthScore());
    }, TELEMETRY_UPDATE_INTERVAL);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isLive]);

  const getStationData = useCallback((stationId: string) => {
    return stationData[stationId] || null;
  }, [stationData]);

  const getPrimaryStation = useCallback(() => {
    return stationData['STN-001'] || null;
  }, [stationData]);

  const getSparklineData = useCallback((stationId: string, key: keyof TelemetryReading): number[] => {
    const station = stationData[stationId];
    if (!station) return [];
    return station.history.map((r) => r[key] as number);
  }, [stationData]);

  const getTrend = useCallback((stationId: string, key: keyof TelemetryReading): 'rising' | 'falling' | 'stable' => {
    const station = stationData[stationId];
    if (!station || station.history.length < 3) return 'stable';
    const recent = station.history.slice(-5);
    const first = recent[0][key] as number;
    const last = recent[recent.length - 1][key] as number;
    const diff = last - first;
    if (Math.abs(diff) < 0.01 * first) return 'stable';
    return diff > 0 ? 'rising' : 'falling';
  }, [stationData]);

  return {
    stationData,
    healthScore,
    isLive,
    setIsLive,
    getStationData,
    getPrimaryStation,
    getSparklineData,
    getTrend,
    stations: mockStations,
  };
}
