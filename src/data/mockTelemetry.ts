import { TelemetryReading, TimeSeriesPoint } from '@/types/telemetry';
import { randomInRange } from '@/lib/formatters';

// Base values for realistic river telemetry simulation
const BASE_VALUES = {
  waterLevel: 5.2,
  lad: 3.5,
  discharge: 1800,
  turbidity: 120,
  sedimentLoad: 350,
  rainfall: 2.5,
  flowVelocity: 1.2,
  temperature: 24.5,
  dissolvedOxygen: 7.2,
  ph: 7.8,
};

// Variation ranges for each sensor
const VARIATION = {
  waterLevel: 0.3,
  lad: 0.2,
  discharge: 150,
  turbidity: 30,
  sedimentLoad: 80,
  rainfall: 5,
  flowVelocity: 0.15,
  temperature: 0.5,
  dissolvedOxygen: 0.3,
  ph: 0.1,
};

// Simulated drift/trend per station for realistic variation
const stationDrift: Record<string, Record<string, number>> = {};

function getStationDrift(stationId: string): Record<string, number> {
  if (!stationDrift[stationId]) {
    stationDrift[stationId] = {
      waterLevel: randomInRange(-0.5, 0.5),
      lad: randomInRange(-0.3, 0.3),
      discharge: randomInRange(-200, 200),
      turbidity: randomInRange(-20, 40),
      sedimentLoad: randomInRange(-50, 100),
      rainfall: randomInRange(-2, 5),
      flowVelocity: randomInRange(-0.2, 0.2),
      temperature: randomInRange(-1, 1),
      dissolvedOxygen: randomInRange(-0.5, 0.5),
      ph: randomInRange(-0.2, 0.2),
    };
  }
  return stationDrift[stationId];
}

export function generateTelemetryReading(stationId: string): TelemetryReading {
  const drift = getStationDrift(stationId);
  const timeVariation = Math.sin(Date.now() / 60000) * 0.3; // slow sinusoidal variation

  return {
    id: `${stationId}-${Date.now()}`,
    stationId,
    timestamp: Date.now(),
    waterLevel: Math.max(0, BASE_VALUES.waterLevel + drift.waterLevel + randomInRange(-VARIATION.waterLevel, VARIATION.waterLevel) + timeVariation * 0.5),
    lad: Math.max(0.5, BASE_VALUES.lad + drift.lad + randomInRange(-VARIATION.lad, VARIATION.lad) - timeVariation * 0.2),
    discharge: Math.max(100, BASE_VALUES.discharge + drift.discharge + randomInRange(-VARIATION.discharge, VARIATION.discharge) + timeVariation * 100),
    turbidity: Math.max(0, BASE_VALUES.turbidity + drift.turbidity + randomInRange(-VARIATION.turbidity, VARIATION.turbidity)),
    sedimentLoad: Math.max(0, BASE_VALUES.sedimentLoad + drift.sedimentLoad + randomInRange(-VARIATION.sedimentLoad, VARIATION.sedimentLoad)),
    rainfall: Math.max(0, BASE_VALUES.rainfall + drift.rainfall + randomInRange(-VARIATION.rainfall, VARIATION.rainfall)),
    flowVelocity: Math.max(0, BASE_VALUES.flowVelocity + drift.flowVelocity + randomInRange(-VARIATION.flowVelocity, VARIATION.flowVelocity)),
    temperature: BASE_VALUES.temperature + drift.temperature + randomInRange(-VARIATION.temperature, VARIATION.temperature),
    dissolvedOxygen: Math.max(0, BASE_VALUES.dissolvedOxygen + drift.dissolvedOxygen + randomInRange(-VARIATION.dissolvedOxygen, VARIATION.dissolvedOxygen)),
    ph: Math.max(6, Math.min(9, BASE_VALUES.ph + drift.ph + randomInRange(-VARIATION.ph, VARIATION.ph))),
  };
}

export function generateHistoricalData(stationId: string, points: number = 30, intervalMs: number = 60000): TelemetryReading[] {
  const data: TelemetryReading[] = [];
  const now = Date.now();

  for (let i = points - 1; i >= 0; i--) {
    const reading = generateTelemetryReading(stationId);
    reading.timestamp = now - (i * intervalMs);
    reading.id = `${stationId}-${reading.timestamp}`;
    data.push(reading);
  }

  return data;
}

export function generateTimeSeriesData(
  baseValue: number,
  variation: number,
  points: number = 30,
  intervalMs: number = 60000
): TimeSeriesPoint[] {
  const data: TimeSeriesPoint[] = [];
  const now = Date.now();

  for (let i = points - 1; i >= 0; i--) {
    const t = now - (i * intervalMs);
    const noise = randomInRange(-variation, variation);
    const trend = Math.sin(i / 5) * variation * 0.5;
    data.push({
      timestamp: t,
      value: Math.max(0, baseValue + noise + trend),
    });
  }

  return data;
}

export function calculateRiverHealthScore(): number {
  const ladScore = Math.min(100, (BASE_VALUES.lad / 4.0) * 100);
  const turbidityScore = Math.max(0, 100 - (BASE_VALUES.turbidity / 5));
  const sedimentScore = Math.max(0, 100 - (BASE_VALUES.sedimentLoad / 10));
  const doScore = Math.min(100, (BASE_VALUES.dissolvedOxygen / 8) * 100);
  const phScore = BASE_VALUES.ph >= 6.5 && BASE_VALUES.ph <= 8.5 ? 90 : 50;

  const avgScore = (ladScore + turbidityScore + sedimentScore + doScore + phScore) / 5;
  return Math.round(avgScore + randomInRange(-3, 3));
}
