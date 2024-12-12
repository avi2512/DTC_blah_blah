import React, { useState, useEffect } from 'react';

const AddNewSchedules = ({ onCancel = () => {}, onSubmit = () => {} }) => {
    const [formData, setFormData] = useState({
        route: '',
        crew: '',
        startTime: '',
        endTime: '',
        notes: '',
        isLinkedDuty: false,
        linkedSchedules: [],
        maxHours: 8
    });

    const [availableCrews, setAvailableCrews] = useState([]);
    const [availableRoutes, setAvailableRoutes] = useState([]);

    useEffect(() => {
        setAvailableCrews([
            { id: 'crew-1', name: 'Crew 1', assignedHours: 0 },
            { id: 'crew-2', name: 'Crew 2', assignedHours: 0 }
        ]);

        setAvailableRoutes([
            { id: 'route-a', name: 'Route A' },
            { id: 'route-b', name: 'Route B' }
        ]);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validateSchedule()) {
            return;
        }

        const formattedSchedule = {
            route: formData.route,
            crew: formData.crew,
            startTime: formData.startTime,
            endTime: formData.endTime,
            notes: formData.notes,
            isLinkedDuty: formData.isLinkedDuty,
            linkedSchedules: formData.linkedSchedules
        };
        
        onSubmit(formattedSchedule);
    };

    const validateSchedule = () => {
        const crew = availableCrews.find(c => c.id === formData.crew);
        if (!crew) return false;

        const scheduleHours = getHoursBetween(formData.startTime, formData.endTime);
        if (crew.assignedHours + scheduleHours > formData.maxHours) {
            alert('Crew has exceeded maximum allowed hours');
            return false;
        }

        return true;
    };

    const getHoursBetween = (start, end) => {
        const startDate = new Date(`2000/01/01 ${start}`);
        const endDate = new Date(`2000/01/01 ${end}`);
        return (endDate - startDate) / (1000 * 60 * 60);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Add New Schedule</h2>
            </div>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 sm:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Route
                        </label>
                        <select
                            name="route"
                            value={formData.route}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                            required
                        >
                            <option value="">Select Route</option>
                            {availableRoutes.map(route => (
                                <option key={route.id} value={route.id}>
                                    {route.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Crew
                        </label>
                        <select
                            name="crew"
                            value={formData.crew}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                            required
                        >
                            <option value="">Select Crew</option>
                            {availableCrews.map(crew => (
                                <option key={crew.id} value={crew.id}>
                                    {crew.name} ({8 - crew.assignedHours}hrs remaining)
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-span-2">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="isLinkedDuty"
                                checked={formData.isLinkedDuty}
                                onChange={handleChange}
                                className="rounded border-gray-300"
                            />
                            <span className="text-sm font-medium text-gray-700">
                                This is a linked duty
                            </span>
                        </label>
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Start Time
                        </label>
                        <input
                            type="time"
                            name="startTime"
                            value={formData.startTime}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                            required
                        />
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            End Time
                        </label>
                        <input
                            type="time"
                            name="endTime"
                            value={formData.endTime}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                            required
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Notes
                        </label>
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            rows="3"
                            className="w-full p-2 border rounded-md"
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                    <button
                        type="button"
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        Create Schedule
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddNewSchedules; 