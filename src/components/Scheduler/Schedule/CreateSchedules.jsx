import React, { useState } from 'react';

const CreateSchedule = () => {
    const [scheduleData, setScheduleData] = useState({
        routeId: '',
        busId: '',
        driverId: '',
        startTime: '',
        endTime: '',
        frequency: '',
        daysOfWeek: []
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Schedule Data:', scheduleData);
        // Add API call here
    };

    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Route</label>
                        <select 
                            className="w-full border rounded-md p-2"
                            value={scheduleData.routeId}
                            onChange={(e) => setScheduleData({...scheduleData, routeId: e.target.value})}
                        >
                            <option value="">Select Route</option>
                            <option value="1">Route A</option>
                            <option value="2">Route B</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Bus</label>
                        <select 
                            className="w-full border rounded-md p-2"
                            value={scheduleData.busId}
                            onChange={(e) => setScheduleData({...scheduleData, busId: e.target.value})}
                        >
                            <option value="">Select Bus</option>
                            <option value="1">Bus 001</option>
                            <option value="2">Bus 002</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Start Time</label>
                        <input 
                            type="time"
                            className="w-full border rounded-md p-2"
                            value={scheduleData.startTime}
                            onChange={(e) => setScheduleData({...scheduleData, startTime: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">End Time</label>
                        <input 
                            type="time"
                            className="w-full border rounded-md p-2"
                            value={scheduleData.endTime}
                            onChange={(e) => setScheduleData({...scheduleData, endTime: e.target.value})}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Frequency (minutes)</label>
                    <input 
                        type="number"
                        className="w-full border rounded-md p-2"
                        value={scheduleData.frequency}
                        onChange={(e) => setScheduleData({...scheduleData, frequency: e.target.value})}
                    />
                </div>

                <button 
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                    Create Schedule
                </button>
            </form>
        </div>
    );
};

export default CreateSchedule;