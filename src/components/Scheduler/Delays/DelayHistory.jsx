import React, { useState } from 'react';

const DelayHistory = () => {
    const [delayHistory] = useState([
        {
            id: 1,
            date: '2024-03-19',
            route: 'Route A',
            bus: 'Bus 001',
            driver: 'John Doe',
            delayTime: '15',
            reason: 'Traffic',
            resolution: 'Rerouted',
            impact: 'Medium'
        },
        {
            id: 2,
            date: '2024-03-18',
            route: 'Route B',
            bus: 'Bus 002',
            driver: 'Jane Smith',
            delayTime: '20',
            reason: 'Weather',
            resolution: 'Waited for improvement',
            impact: 'High'
        }
    ]);

    const [filters, setFilters] = useState({
        route: '',
        impact: '',
        dateRange: 'week'
    });

    const getImpactColor = (impact) => {
        switch (impact.toLowerCase()) {
            case 'high': return 'text-red-600';
            case 'medium': return 'text-yellow-600';
            case 'low': return 'text-green-600';
            default: return 'text-gray-600';
        }
    };

    return (
        <div className="space-y-6">
            {/* Filters */}
            <div className="flex gap-4 mb-6">
                <select
                    className="border rounded-md p-2"
                    value={filters.route}
                    onChange={(e) => setFilters({...filters, route: e.target.value})}
                >
                    <option value="">All Routes</option>
                    <option value="Route A">Route A</option>
                    <option value="Route B">Route B</option>
                </select>

                <select
                    className="border rounded-md p-2"
                    value={filters.impact}
                    onChange={(e) => setFilters({...filters, impact: e.target.value})}
                >
                    <option value="">All Impacts</option>
                    <option value="High">High Impact</option>
                    <option value="Medium">Medium Impact</option>
                    <option value="Low">Low Impact</option>
                </select>

                <select
                    className="border rounded-md p-2"
                    value={filters.dateRange}
                    onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
                >
                    <option value="week">Last Week</option>
                    <option value="month">Last Month</option>
                    <option value="quarter">Last Quarter</option>
                </select>
            </div>

            {/* History Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Route</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bus</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Driver</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Delay</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Resolution</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Impact</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {delayHistory.map((delay) => (
                            <tr key={delay.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{delay.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{delay.route}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{delay.bus}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{delay.driver}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{delay.delayTime} min</td>
                                <td className="px-6 py-4 whitespace-nowrap">{delay.reason}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{delay.resolution}</td>
                                <td className={`px-6 py-4 whitespace-nowrap font-medium ${getImpactColor(delay.impact)}`}>
                                    {delay.impact}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DelayHistory;