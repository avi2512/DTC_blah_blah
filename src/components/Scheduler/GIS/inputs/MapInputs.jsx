import React from 'react';

const MapInputs = () => {
    return (
        <div className="mb-4 flex justify-between items-center">
            <div className="flex space-x-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Select Route</label>
                    <select className="border rounded p-2 w-48">
                        <option value="">All Routes</option>
                        <option value="A">Route A</option>
                        <option value="B">Route B</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Time Period</label>
                    <select className="border rounded p-2 w-48">
                        <option value="today">Today</option>
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                    </select>
                </div>
            </div>
            <div className="flex space-x-2">
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    Apply Filters
                </button>
                <button className="bg-gray-500 text-white px-4 py-2 rounded">
                    Reset
                </button>
            </div>
        </div>
    );
};

export default MapInputs; 