import React, { useState} from 'react';
import { MapContainer, TileLayer, Polyline, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const RouteMapping = () => {
    const [routePoints, setRoutePoints] = useState([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [routes, setRoutes] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState(null);

    // Map click handler component
    const MapClickHandler = () => {
        useMapEvents({
            click: (e) => {
                if (isDrawing) {
                    const { lat, lng } = e.latlng;
                    setRoutePoints(prev => [...prev, [lat, lng]]);
                }
            }
        });
        return null;
    };

    const handleStartDrawing = () => {
        setIsDrawing(true);
        setRoutePoints([]);
    };

    const handleStopDrawing = () => {
        setIsDrawing(false);
        if (routePoints.length > 1) {
            const newRoute = {
                id: Date.now(),
                name: `Route ${routes.length + 1}`,
                points: routePoints
            };
            setRoutes(prev => [...prev, newRoute]);
        }
        setRoutePoints([]);
    };

    const handleDeleteRoute = (routeId) => {
        setRoutes(prev => prev.filter(route => route.id !== routeId));
        setSelectedRoute(null);
    };

    return (
        <div className="flex h-full">
            {/* Control Panel */}
            <div className="w-1/4 p-4 bg-white shadow-lg overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Route Management</h2>
                
                {/* Drawing Controls */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Drawing Tools</h3>
                    {!isDrawing ? (
                        <button 
                            onClick={handleStartDrawing}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Start Drawing Route
                        </button>
                    ) : (
                        <button 
                            onClick={handleStopDrawing}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            Finish Route
                        </button>
                    )}
                </div>

                {/* Route List */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Saved Routes</h3>
                    <div className="space-y-2">
                        {routes.map(route => (
                            <div 
                                key={route.id} 
                                className="flex justify-between items-center p-2 bg-gray-100 rounded"
                            >
                                <span>{route.name}</span>
                                <div>
                                    <button 
                                        onClick={() => setSelectedRoute(route)}
                                        className="text-blue-500 mr-2 hover:text-blue-700"
                                    >
                                        View
                                    </button>
                                    <button 
                                        onClick={() => handleDeleteRoute(route.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Map Container */}
            <div className="w-3/4 h-[calc(100vh-200px)]">
                <MapContainer
                    center={[1.3521, 103.8198]} // Singapore coordinates
                    zoom={13}
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <MapClickHandler />
                    
                    {/* Active drawing line */}
                    {routePoints.length > 0 && (
                        <Polyline 
                            positions={routePoints}
                            color="blue"
                        />
                    )}

                    {/* Saved routes */}
                    {routes.map(route => (
                        <Polyline
                            key={route.id}
                            positions={route.points}
                            color={selectedRoute?.id === route.id ? "green" : "red"}
                            weight={selectedRoute?.id === route.id ? 6 : 3}
                        />
                    ))}
                </MapContainer>
            </div>
        </div>
    );
};

export default RouteMapping; 