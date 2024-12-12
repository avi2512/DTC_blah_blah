import React from 'react';

const RouteInputs = () => {
    return (
        <div className="mb-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Route Name</label>
                    <input 
                        type="text" 
                        className="border rounded p-2 w-full"
                        placeholder="Enter route name"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Route Number</label>
                    <input 
                        type="text" 
                        className="border rounded p-2 w-full"
                        placeholder="Enter route number"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Start Point</label>
                    <input 
                        type="text" 
                        className="border rounded p-2 w-full"
                        placeholder="Enter start point"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">End Point</label>
                    <input 
                        type="text" 
                        className="border rounded p-2 w-full"
                        placeholder="Enter end point"
                    />
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Start Time</label>
                    <input 
                        type="time" 
                        className="border rounded p-2 w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">End Time</label>
                    <input 
                        type="time" 
                        className="border rounded p-2 w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Frequency (mins)</label>
                    <input 
                        type="number" 
                        className="border rounded p-2 w-full"
                        placeholder="Enter frequency"
                    />
                </div>
            </div>

            <div className="flex justify-end space-x-2">
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    Save Route
                </button>
                <button className="bg-gray-500 text-white px-4 py-2 rounded">
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default RouteInputs; 