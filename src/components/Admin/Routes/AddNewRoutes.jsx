import React, { useState } from 'react';
import { routeService } from '../../../services/route.service';
import { useNotification } from '../../../contexts/NotificationContext';
import LoadingSpinner from '../../common/LoadingSpinner';

const AddNewRoutes = () => {
    const [loading, setLoading] = useState(false);
    const { showNotification } = useNotification();
    const [formData, setFormData] = useState({
        route_name: '',
        start_point: '',
        end_point: '',
        distance: '',
        estimated_time: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await routeService.createRoute(formData);
            showNotification('Route created successfully', 'success');
            // Reset form
            setFormData({
                route_name: '',
                start_point: '',
                end_point: '',
                distance: '',
                estimated_time: '',
                description: ''
            });
        } catch (error) {
            showNotification(error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Add New Route</h2>
            <form onSubmit={handleSubmit} className="max-w-2xl bg-white p-6 rounded-lg shadow-md">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Route Name
                        </label>
                        <input
                            type="text"
                            name="route_name"
                            value={formData.route_name}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Start Point
                        </label>
                        <input
                            type="text"
                            name="start_point"
                            value={formData.start_point}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            End Point
                        </label>
                        <input
                            type="text"
                            name="end_point"
                            value={formData.end_point}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Distance (km)
                        </label>
                        <input
                            type="number"
                            name="distance"
                            value={formData.distance}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Estimated Time (minutes)
                        </label>
                        <input
                            type="number"
                            name="estimated_time"
                            value={formData.estimated_time}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="3"
                        className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Create Route
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddNewRoutes; 