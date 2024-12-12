import React, { useEffect, useState } from 'react';
import { routeService } from '../../../services/route.service';
import { useNotification } from '../../../contexts/NotificationContext';
import LoadingSpinner from '../../common/LoadingSpinner';

const ApproveRoutes = () => {
    const [pendingRoutes, setPendingRoutes] = useState([]);
    const [loading, setLoading] = useState(false);
    const { showNotification } = useNotification();

    useEffect(() => {
        fetchPendingRoutes();
    }, []);

    const fetchPendingRoutes = async () => {
        try {
            setLoading(true);
            const response = await routeService.getPendingRoutes();
            setPendingRoutes(response.data);
        } catch (error) {
            showNotification(error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        try {
            setLoading(true);
            await routeService.approveRoute(id);
            showNotification('Route approved successfully', 'success');
            // Remove the approved route from the list
            setPendingRoutes(routes => routes.filter(route => route.id !== id));
        } catch (error) {
            showNotification(error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleReject = async (id) => {
        try {
            setLoading(true);
            await routeService.rejectRoute(id);
            showNotification('Route rejected successfully', 'success');
            // Remove the rejected route from the list
            setPendingRoutes(routes => routes.filter(route => route.id !== id));
        } catch (error) {
            showNotification(error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Approve Routes</h2>
            {pendingRoutes.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    No pending routes to approve
                </div>
            ) : (
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Route Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Start Point</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">End Point</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Distance</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Est. Time</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Requested By</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {pendingRoutes.map((route) => (
                                <tr key={route.id}>
                                    <td className="px-6 py-4">{route.route_name}</td>
                                    <td className="px-6 py-4">{route.start_point}</td>
                                    <td className="px-6 py-4">{route.end_point}</td>
                                    <td className="px-6 py-4">{route.distance} km</td>
                                    <td className="px-6 py-4">{route.estimated_time} min</td>
                                    <td className="px-6 py-4">{route.requested_by}</td>
                                    <td className="px-6 py-4 space-x-2">
                                        <button
                                            onClick={() => handleApprove(route.id)}
                                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleReject(route.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ApproveRoutes;