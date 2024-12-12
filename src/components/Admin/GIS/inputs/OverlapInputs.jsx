import React from 'react';

const OverlapInputs = () => {
    return (
        <div className="mb-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Primary Route</label>
                    <select className="border rounded p-2 w-full">
                        <option value="">Select Primary Route</option>
                        <option value="A">Route A</option>
                        <option value="B">Route B</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Compare With</label>
                    <select className="border rounded p-2 w-full">
                        <option value="all">All Routes</option>
                        <option value="A">Route A</option>
                        <option value="B">Route B</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Time Range</label>
                    <select className="border rounded p-2 w-full">
                        <option value="peak">Peak Hours</option>
                        <option value="off-peak">Off-Peak Hours</option>
                        <option value="all">All Hours</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Overlap Threshold (meters)</label>
                    <input 
                        type="number" 
                        className="border rounded p-2 w-full"
                        placeholder="Enter threshold distance"
                    />
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <div className="flex items-center">
                    <input 
                        type="checkbox" 
                        id="includeStops" 
                        className="mr-2"
                    />
                    <label htmlFor="includeStops">Include Bus Stops</label>
                </div>
                <div className="flex items-center">
                    <input 
                        type="checkbox" 
                        id="includeTimeOverlap" 
                        className="mr-2"
                    />
                    <label htmlFor="includeTimeOverlap">Check Time Overlaps</label>
                </div>
            </div>

            <div className="flex justify-end space-x-2">
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    Run Analysis
                </button>
                <button className="bg-gray-500 text-white px-4 py-2 rounded">
                    Clear
                </button>
            </div>
        </div>
    );
};

export default OverlapInputs; 