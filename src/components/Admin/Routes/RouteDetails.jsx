import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { fetchRoutes } from '../../../store/slices/routeSlice';
import LoadingSpinner from '../../common/LoadingSpinner';

const RouteDetails = () => {
    const dispatch = useAppDispatch();
    const { routes, loading, error } = useAppSelector(state => state.routes);

    useEffect(() => {
        dispatch(fetchRoutes());
    }, [dispatch]);

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Route Details</h2>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Start Point</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">End Point</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {routes.map((route) => (
                            <tr key={route.id}>
                                <td className="px-6 py-4">{route.id}</td>
                                <td className="px-6 py-4">{route.route_name}</td>
                                <td className="px-6 py-4">{route.start_point}</td>
                                <td className="px-6 py-4">{route.end_point}</td>
                                <td className="px-6 py-4">{route.status}</td>
                                <td className="px-6 py-4">
                                    <button className="text-indigo-600 hover:text-indigo-900 mr-2">Edit</button>
                                    <button className="text-red-600 hover:text-red-900">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RouteDetails; 