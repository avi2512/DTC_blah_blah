import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MapInputs from './inputs/MapInputs';
import L from 'leaflet';

// Fix for default marker icons in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const ViewMap = () => {
    const [routes] = useState([
        {
            id: 1,
            name: "Route A",
            coordinates: [
                [12.9716, 77.5946],
                [13.0827, 77.5877]
            ],
            color: "#FF0000",
            stops: [
                { name: "Stop A1", position: [12.9716, 77.5946] },
                { name: "Stop A2", position: [13.0827, 77.5877] }
            ]
        },
        {
            id: 2,
            name: "Route B",
            coordinates: [
                [12.9716, 77.5946],
                [12.9279, 77.6271]
            ],
            color: "#0000FF",
            stops: [
                { name: "Stop B1", position: [12.9716, 77.5946] },
                { name: "Stop B2", position: [12.9279, 77.6271] }
            ]
        }
    ]);

    const [selectedRoute, setSelectedRoute] = useState(null);
    const [mapCenter, setMapCenter] = useState([12.9716, 77.5946]);
    const [mapZoom, setMapZoom] = useState(13);
    const [showStops, setShowStops] = useState(true);

    // Function to calculate route distance
    const calculateDistance = (coordinates) => {
        let distance = 0;
        for (let i = 0; i < coordinates.length - 1; i++) {
            const point1 = L.latLng(coordinates[i]);
            const point2 = L.latLng(coordinates[i + 1]);
            distance += point1.distanceTo(point2);
        }
        return (distance / 1000).toFixed(2); // Convert to kilometers
    };

    // Function to handle route selection
    const handleRouteSelect = (routeId) => {
        const route = routes.find(r => r.id === routeId);
        if (route) {
            setSelectedRoute(route);
            // Center map on route
            const bounds = L.latLngBounds(route.coordinates);
            setMapCenter(bounds.getCenter());
            setMapZoom(13);
        }
    };

    // Function to handle map filters
    const handleMapFilter = (filters) => {
        // Implement filter logic here
        console.log('Applying filters:', filters);
    };

    return (
        <div className="space-y-4">
            <MapInputs 
                onFilterChange={handleMapFilter}
                onRouteSelect={handleRouteSelect}
            />
            
            <div className="flex space-x-2 mb-4">
                <button 
                    className={`px-4 py-2 rounded ${showStops ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setShowStops(!showStops)}
                >
                    {showStops ? 'Hide Stops' : 'Show Stops'}
                </button>
            </div>

            <div className="h-[600px] w-full border rounded-lg overflow-hidden">
                <MapContainer 
                    center={mapCenter}
                    zoom={mapZoom}
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    
                    {routes.map(route => (
                        <React.Fragment key={route.id}>
                            <Polyline 
                                positions={route.coordinates}
                                color={route.color}
                                weight={selectedRoute?.id === route.id ? 6 : 3}
                            >
                                <Popup>
                                    <div className="p-2">
                                        <h3 className="font-bold text-lg">{route.name}</h3>
                                        <p>Distance: {calculateDistance(route.coordinates)} km</p>
                                        <p>Stops: {route.stops.length}</p>
                                    </div>
                                </Popup>
                            </Polyline>

                            {showStops && route.stops.map((stop, index) => (
                                <Marker 
                                    key={`${route.id}-stop-${index}`}
                                    position={stop.position}
                                >
                                    <Popup>
                                        <div className="p-2">
                                            <h4 className="font-bold">{stop.name}</h4>
                                            <p>Route: {route.name}</p>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </React.Fragment>
                    ))}
                </MapContainer>
            </div>

            {selectedRoute && (
                <div className="mt-4 p-4 bg-white rounded-lg shadow">
                    <h3 className="font-bold text-lg mb-2">{selectedRoute.name} Details</h3>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <p className="font-medium">Total Distance</p>
                            <p>{calculateDistance(selectedRoute.coordinates)} km</p>
                        </div>
                        <div>
                            <p className="font-medium">Number of Stops</p>
                            <p>{selectedRoute.stops.length}</p>
                        </div>
                        <div>
                            <p className="font-medium">Status</p>
                            <p className="text-green-500">Active</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewMap;