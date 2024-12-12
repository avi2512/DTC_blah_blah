import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { fetchRoutes } from '../../store/slices/routeSlice';
import { useNotification } from '../../contexts/NotificationContext';
import LoadingSpinner from '../common/LoadingSpinner';

// Import components
import ScheduleDetails from './Schedules/ScheduleDetails';
import AddNewSchedules from './Schedules/AddNewSchedules';
import ApproveSchedules from './Schedules/ApproveSchedules';
import RouteDetails from './Routes/RouteDetails';
import AddNewRoutes from './Routes/AddNewRoutes';
import ApproveRoutes from './Routes/ApproveRoutes';
import ViewMap from '../Scheduler/GIS/ViewMap';
import UserList from './Users/UserList';
import AddUser from './Users/AddUser';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('routes');
    const dispatch = useAppDispatch();
    const { showNotification } = useNotification();
    const { loading, error } = useAppSelector(state => state.routes);

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                await dispatch(fetchRoutes()).unwrap();
            } catch (error) {
                showNotification(error.message, 'error');
            }
        };
        loadInitialData();
    }, [dispatch, showNotification]);

    const renderContent = () => {
        switch (activeTab) {
            case 'routes':
                return <RouteDetails />;
            case 'addRoute':
                return <AddNewRoutes />;
            case 'approveRoutes':
                return <ApproveRoutes />;
            case 'schedules':
                return <ScheduleDetails />;
            case 'addSchedule':
                return <AddNewSchedules />;
            case 'approveSchedules':
                return <ApproveSchedules />;
            case 'map':
                return <ViewMap />;
            case 'users':
                return <UserList />;
            case 'addUser':
                return <AddUser />;
            default:
                return <RouteDetails />;
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md">
                <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-800">Admin Dashboard</h2>
                </div>
                <nav className="mt-4">
                    <button
                        onClick={() => setActiveTab('routes')}
                        className={`w-full text-left px-4 py-2 ${activeTab === 'routes' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
                    >
                        Route Details
                    </button>
                    <button
                        onClick={() => setActiveTab('addRoute')}
                        className={`w-full text-left px-4 py-2 ${activeTab === 'addRoute' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
                    >
                        Add New Route
                    </button>
                    <button
                        onClick={() => setActiveTab('approveRoutes')}
                        className={`w-full text-left px-4 py-2 ${activeTab === 'approveRoutes' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
                    >
                        Approve Routes
                    </button>
                    {/* Add more navigation buttons as needed */}
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <div className="p-6">
                    {error && (
                        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
                            {error}
                        </div>
                    )}
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;