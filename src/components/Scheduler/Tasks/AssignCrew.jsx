import React, { useState } from 'react';

const AssignCrew = () => {
    const [taskData, setTaskData] = useState({
        route: '',
        crew: '',
        date: '',
        shift: '',
        vehicle: '',
        notes: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Task Assignment:', taskData);
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
                            value={taskData.route}
                            onChange={(e) => setTaskData({...taskData, route: e.target.value})}
                            required
                        >
                            <option value="">Select Route</option>
                            <option value="1">Route A</option>
                            <option value="2">Route B</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Crew Member</label>
                        <select 
                            className="w-full border rounded-md p-2"
                            value={taskData.crew}
                            onChange={(e) => setTaskData({...taskData, crew: e.target.value})}
                            required
                        >
                            <option value="">Select Crew Member</option>
                            <option value="1">John Doe</option>
                            <option value="2">Jane Smith</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Date</label>
                        <input 
                            type="date"
                            className="w-full border rounded-md p-2"
                            value={taskData.date}
                            onChange={(e) => setTaskData({...taskData, date: e.target.value})}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Shift</label>
                        <select 
                            className="w-full border rounded-md p-2"
                            value={taskData.shift}
                            onChange={(e) => setTaskData({...taskData, shift: e.target.value})}
                            required
                        >
                            <option value="">Select Shift</option>
                            <option value="morning">Morning</option>
                            <option value="afternoon">Afternoon</option>
                            <option value="evening">Evening</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Vehicle</label>
                    <select 
                        className="w-full border rounded-md p-2"
                        value={taskData.vehicle}
                        onChange={(e) => setTaskData({...taskData, vehicle: e.target.value})}
                        required
                    >
                        <option value="">Select Vehicle</option>
                        <option value="1">Bus 001</option>
                        <option value="2">Bus 002</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Notes</label>
                    <textarea 
                        className="w-full border rounded-md p-2"
                        value={taskData.notes}
                        onChange={(e) => setTaskData({...taskData, notes: e.target.value})}
                        rows="3"
                    />
                </div>

                <button 
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                    Assign Task
                </button>
            </form>
        </div>
    );
};

export default AssignCrew;