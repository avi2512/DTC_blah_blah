import React, { useState } from 'react';

const CurrentDelays = () => {
    const [currentDelays, setCurrentDelays] = useState([
        {
            id: 1,
            route: 'Route A',
            bus: 'Bus 001',
            driver: 'John Doe',
            delayTime: '15',
            reason: 'Traffic',
            status: 'Active',
            location: 'Main St & 5th Ave'
        },
        {
            id: 2,
            route: 'Route B',
            bus: 'Bus 002',
            driver: 'Jane Smith',
            delayTime: '20',
            reason: 'Weather',
            status: 'Resolved',
            location: 'Park Rd & 3rd St'
        }
    ]);

    const handleResolve = (id) => {
        setCurrentDelays(currentDelays.map(delay => 
            delay.id === id ? {...delay, status: 'Resolved'} : delay
        ));
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Live Delay Updates</h3>
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                    {currentDelays.filter(d => d.status === 'Active').length} Active Delays
                </span>
            </div>

            <div className="grid gap-4">
                {currentDelays.map((delay) => (
                    <div 
                        key={delay.id} 
                        className={`p-4 rounded-lg border ${
                            delay.status === 'Active' ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'
                        }`}
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="font-semibold">{delay.route}</h4>
                                <p className="text-sm text-gray-600">Bus: {delay.bus}</p>
                                <p className="text-sm text-gray-600">Driver: {delay.driver}</p>
                                <p className="text-sm text-gray-600">Location: {delay.location}</p>
                                <p className="text-sm font-medium mt-2">
                                    Delay: {delay.delayTime} minutes
                                </p>
                                <p className="text-sm text-gray-700 mt-1">
                                    Reason: {delay.reason}
                                </p>
                            </div>
                            <div className="text-right">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    delay.status === 'Active' ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'
                                }`}>
                                    {delay.status}
                                </span>
                                {delay.status === 'Active' && (
                                    <button
                                        onClick={() => handleResolve(delay.id)}
                                        className="block mt-2 text-sm text-blue-600 hover:text-blue-800"
                                    >
                                        Mark Resolved
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CurrentDelays;