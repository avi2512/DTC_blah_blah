import React, { useState } from 'react';

const ModifySchedule = () => {
    const [schedules] = useState([
        { id: 1, route: 'Route A', bus: 'Bus 001', startTime: '08:00', endTime: '17:00' },
        { id: 2, route: 'Route B', bus: 'Bus 002', startTime: '09:00', endTime: '18:00' }
    ]);

    const [editingId, setEditingId] = useState(null);

    const handleEdit = (schedule) => {
        setEditingId(schedule.id);
    };

    const handleSave = (id) => {
        setEditingId(null);
        // Add API call here
    };

    return (
        <div className="space-y-4">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2">Route</th>
                            <th className="px-4 py-2">Bus</th>
                            <th className="px-4 py-2">Start Time</th>
                            <th className="px-4 py-2">End Time</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedules.map(schedule => (
                            <tr key={schedule.id} className="border-t">
                                <td className="px-4 py-2">{schedule.route}</td>
                                <td className="px-4 py-2">{schedule.bus}</td>
                                <td className="px-4 py-2">{schedule.startTime}</td>
                                <td className="px-4 py-2">{schedule.endTime}</td>
                                <td className="px-4 py-2">
                                    {editingId === schedule.id ? (
                                        <button 
                                            onClick={() => handleSave(schedule.id)}
                                            className="text-green-500 hover:text-green-700"
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <button 
                                            onClick={() => handleEdit(schedule)}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            Edit
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ModifySchedule;