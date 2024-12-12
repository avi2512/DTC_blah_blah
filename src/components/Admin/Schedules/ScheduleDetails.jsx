import React, { useEffect, useState } from 'react';
import { scheduleService } from '../../../services/schedule.service';
import { useNotification } from '../../../contexts/NotificationContext';
import LoadingSpinner from '../../common/LoadingSpinner';

const ScheduleDetails = () => {
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(false);
    const { showNotification } = useNotification();

    useEffect(() => {
        fetchSchedules();
    }, []);

    const fetchSchedules = async () => {
        try {
            setLoading(true);
            const response = await scheduleService.getAllSchedules();
            setSchedules(response.data);
        } catch (error) {
            showNotification(error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this schedule?')) {
            try {
                await scheduleService.deleteSchedule(id);
                showNotification('Schedule deleted successfully', 'success');
                setSchedules(schedules.filter(schedule => schedule.id !== id));
            } catch (error) {
                showNotification(error.message, 'error');
            }
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Schedule Details</h2>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Route</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Crew</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Start Time</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">End Time</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {schedules.map((schedule) => (
                            <tr key={schedule.id}>
                                <td className="px-6 py-4">{schedule.id}</td>
                                <td className="px-6 py-4">{schedule.route_name}</td>
                                <td className="px-6 py-4">{schedule.crew_name}</td>
                                <td className="px-6 py-4">{schedule.start_time}</td>
                                <td className="px-6 py-4">{schedule.end_time}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                        schedule.status === 'active' ? 'bg-green-100 text-green-800' :
                                        schedule.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>
                                        {schedule.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => handleDelete(schedule.id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ScheduleDetails; 