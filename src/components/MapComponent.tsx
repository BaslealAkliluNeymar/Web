import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { MapPin, Navigation } from 'lucide-react';

// TypeScript interfaces
interface Facility {
  id: number;
  name: string;
  position: [number, number];
}

interface Vehicle {
  id: number;
  name: string;
  position: [number, number];
  color: string;
  destination: Facility;
}

interface VehiclePaths {
  [key: number]: [number, number][];
}

interface Markers {
  facilities: any[];
  vehicles: any[];
}

// Extend Window interface for Leaflet
declare global {
  interface Window {
    L: any;
  }
}

const MapComponent: React.FC = () => {
  // Sample facilities data
  const facilities: Facility[] = [
    { id: 1, name: 'Central Hospital', position: [40.7589, -73.9851] },
    { id: 2, name: 'Community Clinic', position: [40.7505, -73.9934] },
    { id: 3, name: 'Emergency Center', position: [40.7614, -73.9776] },
    { id: 4, name: 'Medical Plaza', position: [40.7549, -73.9840] },
  ];

  // Initial vehicles with random positions and assigned destinations
  const getInitialVehicles = (): Vehicle[] => {
    const colors: string[] = ['#ef4444', '#22c55e', '#3b82f6', '#f97316', '#8b5cf6', '#06b6d4'];
    return [
      { 
        id: 1, 
        name: 'Ambulance Alpha', 
        position: [40.7400, -73.9900], 
        color: colors[0],
        destination: facilities[Math.floor(Math.random() * facilities.length)]
      },
      { 
        id: 2, 
        name: 'Ambulance Beta', 
        position: [40.7300, -73.9800], 
        color: colors[1],
        destination: facilities[Math.floor(Math.random() * facilities.length)]
      },
      { 
        id: 3, 
        name: 'Medical Van Gamma', 
        position: [40.7700, -74.0000], 
        color: colors[2],
        destination: facilities[Math.floor(Math.random() * facilities.length)]
      },
      { 
        id: 4, 
        name: 'Transport Delta', 
        position: [40.7600, -73.9700], 
        color: colors[3],
        destination: facilities[Math.floor(Math.random() * facilities.length)]
      },
    ];
  };

  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>(getInitialVehicles());
  const [vehiclePaths, setVehiclePaths] = useState<VehiclePaths>(() => 
    getInitialVehicles().reduce((acc: VehiclePaths, vehicle: Vehicle) => {
      acc[vehicle.id] = [vehicle.position];
      return acc;
    }, {})
  );
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<Markers>({ facilities: [], vehicles: [] });
  const [pathLines, setPathLines] = useState<any[]>([]);
  const mapRef = useRef<HTMLDivElement>(null);

  // Initialize map
  useEffect(() => {
    if (typeof window !== 'undefined' && window.L && mapRef.current && !map) {
      const newMap = window.L.map(mapRef.current, {
        preferCanvas: true,
        zoomControl: false
      }).setView([40.7589, -73.9851], 13);
      
      // Dark theme tile layer
      window.L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors © CARTO',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(newMap);

      // Add zoom control to bottom right
      window.L.control.zoom({
        position: 'bottomright'
      }).addTo(newMap);

      setMap(newMap);
    }
  }, [map]);

  // Add markers and paths to map
  useEffect(() => {
    if (!map) return;

    // Clear existing markers and paths
    markers.facilities.forEach(marker => map.removeLayer(marker));
    markers.vehicles.forEach(marker => map.removeLayer(marker));
    pathLines.forEach(line => map.removeLayer(line));

    // Add facility markers
    const facilityMarkers = facilities.map(facility => {
      const customIcon = window.L.divIcon({
        className: 'custom-facility-marker',
        html: `<div style="background-color: #1f2937; border: 2px solid #3b82f6; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"><svg width="12" height="12" fill="#3b82f6" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      const marker = window.L.marker(facility.position, { icon: customIcon })
        .addTo(map)
        .bindPopup(`<div class="bg-background text-white p-2 rounded border border-gray-700"><strong>${facility.name}</strong><br/>Health Facility</div>`);
      return marker;
    });

    // Add vehicle markers
    const vehicleMarkers = vehicles.map(vehicle => {
      const customIcon = window.L.divIcon({
        className: 'custom-vehicle-marker',
        html: `<div style="background-color: ${vehicle.color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid #1f2937; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">V</div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });

      const marker = window.L.marker(vehicle.position, { icon: customIcon })
        .addTo(map)
        .bindPopup(`<div class="bg-background text-white p-2 rounded border border-gray-700"><strong>${vehicle.name}</strong><br/>Heading to: ${vehicle.destination.name}</div>`);
      return marker;
    });

    // Add vehicle paths
    const newPathLines = vehicles.map(vehicle => {
      const path = vehiclePaths[vehicle.id] || [vehicle.position];
      const polyline = window.L.polyline(path, { 
        color: vehicle.color, 
        weight: 3,
        opacity: 0.8 
      }).addTo(map);
      return polyline;
    });

    setMarkers({ facilities: facilityMarkers, vehicles: vehicleMarkers });
    setPathLines(newPathLines);
  }, [map, vehicles, vehiclePaths]);

  // Handle facility selection
  useEffect(() => {
    if (map && selectedFacility) {
      map.setView(selectedFacility.position, 15);
    }
  }, [map, selectedFacility]);

  // Handle vehicle selection
  useEffect(() => {
    if (map && selectedVehicle) {
      map.setView(selectedVehicle.position, 15);
    }
  }, [map, selectedVehicle]);

  // Move vehicles toward their destinations
  const moveVehicles = (): void => {
    setVehicles((prevVehicles: Vehicle[]) => {
      const updatedVehicles: Vehicle[] = prevVehicles.map((vehicle: Vehicle) => {
        const [currentLat, currentLng] = vehicle.position;
        const [destLat, destLng] = vehicle.destination.position;

        // Calculate distance to destination
        const deltaLat: number = destLat - currentLat;
        const deltaLng: number = destLng - currentLng;
        const distance: number = Math.sqrt(deltaLat * deltaLat + deltaLng * deltaLng);

        // If very close to destination, assign new random destination
        if (distance < 0.001) {
          const newDestination: Facility = facilities[Math.floor(Math.random() * facilities.length)];
          return { ...vehicle, destination: newDestination };
        }

        // Move toward destination (adjust step size as needed)
        const step: number = 0.0008; // Smaller step for more realistic movement
        const moveRatio: number = Math.min(step / distance, 1);
        
        const newLat: number = currentLat + (deltaLat * moveRatio);
        const newLng: number = currentLng + (deltaLng * moveRatio);
        const newPosition: [number, number] = [newLat, newLng];

        // Update vehicle path
        setVehiclePaths((prevPaths: VehiclePaths) => ({
          ...prevPaths,
          [vehicle.id]: [...(prevPaths[vehicle.id] || []), newPosition]
        }));

        return { ...vehicle, position: newPosition };
      });
      setVehiclePaths((prevPaths) => {
        const newPaths: VehiclePaths = { ...prevPaths };
        updatedVehicles.forEach((vehicle) => {
          if (!newPaths[vehicle.id]) newPaths[vehicle.id] = [];
          newPaths[vehicle.id].push(vehicle.position);
        });
        return newPaths;
      });

      return updatedVehicles;
    });
  };

  // Set up movement interval
  useEffect(() => {
    const interval: NodeJS.Timeout = setInterval(moveVehicles, 60000); // Move every minute
    // For demo purposes, also move every 3 seconds
    const demoInterval: NodeJS.Timeout = setInterval(moveVehicles, 3000);
    
    return () => {
      clearInterval(interval);
      clearInterval(demoInterval);
    };
  }, []);

  return (
    <>
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css" 
      />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js"></script>
      
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-80 bg-background border-r border-gray-800 p-4 overflow-y-auto">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-5 w-5 text-blue-400" />
              <h2 className="text-lg font-semibold text-white">Fleet Management</h2>
            </div>
            <p className="text-sm text-gray-400">Welcome to the Fleet Management System</p>
          </div>

          {/* Add Vehicle Button
          <Button className="w-full mb-6 bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Vehicle
          </Button> */}

          {/* Health Facilities Card */}
          <Card className="mb-6 bg-background border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-sm font-medium">Health Facilities</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={selectedFacility?.id?.toString() || ""}
                onValueChange={(value:any) => {
                  const facility = facilities.find(f => f.id === parseInt(value));
                  setSelectedFacility(facility || null);
                }}
              >
                <SelectTrigger className="bg-background border-gray-600 text-white">
                  <SelectValue placeholder="Select a facility" />
                </SelectTrigger>
                <SelectContent className="bg-background border-gray-700">
                  {facilities.map((facility: Facility) => (
                    <SelectItem 
                      key={facility.id} 
                      value={facility.id.toString()}
                      className="text-white hover:bg-background focus:bg-background"
                    >
                      {facility.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Vehicles Card */}
          <Card className="mb-6 bg-background border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-sm font-medium">Vehicles</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={selectedVehicle?.id?.toString() || ""}
                onValueChange={(value:any) => {
                  const vehicle = vehicles.find(v => v.id === parseInt(value));
                  setSelectedVehicle(vehicle || null);
                }}
              >
                <SelectTrigger className="bg-background border-gray-600 text-white">
                  <SelectValue placeholder="Select a vehicle" />
                </SelectTrigger>
                <SelectContent className="bg-background border-gray-700">
                  {vehicles.map((vehicle: Vehicle) => (
                    <SelectItem 
                      key={vehicle.id} 
                      value={vehicle.id.toString()}
                      className="text-white hover:bg-background focus:bg-background"
                    >
                      {vehicle.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Vehicle Status Card */}
          <Card className="bg-background border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-sm font-medium">Vehicle Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {vehicles.map((vehicle: Vehicle) => (
                  <div key={vehicle.id} className="flex items-center justify-between p-3 bg-background rounded-lg">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: vehicle.color }}
                      />
                      <div>
                        <div className="text-white text-sm font-medium">{vehicle.name}</div>
                        <div className="text-gray-400 text-xs flex items-center gap-1">
                          <Navigation className="h-3 w-3" />
                          {vehicle.destination.name}
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-background text-gray-200 text-xs">
                      Active
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Instructions */}
          <div className="mt-6 p-3 bg-background rounded-lg border border-gray-700">
            <h4 className="text-white text-sm font-medium mb-2">Instructions:</h4>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>• Select facilities to center map view</li>
              <li>• Select vehicles to track their movement</li>
              <li>• Vehicles move every minute toward facilities</li>
              <li>• Each vehicle has a colored path trail</li>
              <li>• Demo: vehicles also move every 3 seconds</li>
            </ul>
          </div>
        </div>

        {/* Map Container */}
        <div className="flex-1 relative">
          <div 
            ref={mapRef} 
            className="w-full h-full bg-background"
            style={{ minHeight: '400px' }}
          />
        </div>
      </div>
    </>
  );
};

export default MapComponent;