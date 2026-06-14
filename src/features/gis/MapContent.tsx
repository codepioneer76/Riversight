'use client';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, Polygon } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { mapConfig } from '@/config/siteConfig';
import { mockStations } from '@/data/mockStations';
import { riverRouteGeoJSON, sedimentZones } from '@/data/riverGeoJSON';
import StatusBadge from '@/components/ui/StatusBadge';

// Custom station marker icon
function createStationIcon(status: string) {
  const color = status === 'active' ? '#10b981' : status === 'maintenance' ? '#f59e0b' : '#64748b';
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="width:28px;height:28px;border-radius:50%;background:${color}20;border:2px solid ${color};display:flex;align-items:center;justify-content:center;box-shadow:0 0 12px ${color}40">
      <div style="width:10px;height:10px;border-radius:50%;background:${color}"></div>
    </div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

function getSeverityColor(severity: string) {
  switch (severity) {
    case 'critical': return { fill: '#ef444440', stroke: '#ef4444' };
    case 'high': return { fill: '#f59e0b30', stroke: '#f59e0b' };
    case 'moderate': return { fill: '#eab30825', stroke: '#eab308' };
    default: return { fill: '#10b98120', stroke: '#10b981' };
  }
}

export default function MapContent() {
  return (
    <MapContainer center={mapConfig.defaultCenter} zoom={mapConfig.defaultZoom} style={{ height: '100%', width: '100%' }} zoomControl={true}>
      <TileLayer url={mapConfig.tileUrl} attribution={mapConfig.tileAttribution} />

      {/* River route overlay */}
      <GeoJSON
        data={riverRouteGeoJSON}
        style={() => ({
          color: '#3b82f6',
          weight: 4,
          opacity: 0.8,
          dashArray: undefined,
        })}
      />

      {/* Sediment zones */}
      {sedimentZones.map((zone) => {
        const colors = getSeverityColor(zone.severity);
        return (
          <Polygon
            key={zone.id}
            positions={zone.coordinates.map(([lng, lat]) => [lat, lng] as [number, number])}
            pathOptions={{ fillColor: colors.fill, color: colors.stroke, weight: 2, fillOpacity: 0.4 }}
          >
            <Popup>
              <div className="min-w-[180px]">
                <p className="font-semibold text-sm mb-1">{zone.name}</p>
                <p className="text-xs mb-1">Risk Score: <strong>{zone.riskScore}</strong>/100</p>
                <p className="text-xs mb-1">Accumulation: {zone.accumulationRate} mm/yr</p>
                <p className="text-xs text-gray-400">Last Survey: {zone.lastSurvey}</p>
              </div>
            </Popup>
          </Polygon>
        );
      })}

      {/* Station markers */}
      {mockStations.map((station) => (
        <Marker key={station.id} position={[station.latitude, station.longitude]} icon={createStationIcon(station.status)}>
          <Popup>
            <div className="min-w-[200px]">
              <p className="font-bold text-sm">{station.name}</p>
              <p className="text-xs text-gray-400 mb-2">{station.code} • River km {station.riverKm}</p>
              <div className="flex items-center gap-2 mb-2">
                <span className={`inline-block w-2 h-2 rounded-full ${station.status === 'active' ? 'bg-green-400' : 'bg-amber-400'}`} />
                <span className="text-xs capitalize">{station.status}</span>
              </div>
              <p className="text-xs">Sensors: {station.sensors.length} active</p>
              <p className="text-xs text-gray-400">Elev: {station.elevation}m ASL</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
