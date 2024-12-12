import React, { useState } from "react";
import ViewMap from './GIS/ViewMap';
import RouteAnalysis from './GIS/RouteAnalysis';
import OverlapDetection from './GIS/OverlapDetection';
import CreateSchedule from './Schedule/CreateSchedules';
import ModifySchedule from './Schedule/ModifySchedules';
import AssignCrew from './Tasks/AssignCrew';
import ViewAssignments from './Tasks/ViewAssignments';
import CurrentDelays from './Delays/CurrentDelays';
import DelayHistory from './Delays/DelayHistory';
import { useNavigate } from 'react-router-dom';

const ProfilePage = ({ isOpen, onClose }) => {
    const [profileData, setProfileData] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@company.com',
        phone: '555-0123',
        role: 'Scheduler',
        department: 'Operations',
        timeZone: 'GMT+5',
        employeeId: 'SCH001'
    });

    const [isEditing, setIsEditing] = useState(false);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                <div className="flex justify-between items-start mb-6">
                    <h2 className="text-2xl font-bold">My Profile</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="flex items-center justify-center mb-6">
                    <div className="relative">
                        <img
                            src="https://via.placeholder.com/100"
                            alt="Profile"
                            className="w-24 h-24 rounded-full"
                        />
                        {isEditing && (
                            <button 
                                className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600"
                                title="Change Photo"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                        <input
                            type="text"
                            value={profileData.firstName}
                            disabled={!isEditing}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input
                            type="text"
                            value={profileData.lastName}
                            disabled={!isEditing}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={profileData.email}
                            disabled={!isEditing}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                            type="tel"
                            value={profileData.phone}
                            disabled={!isEditing}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <input
                            type="text"
                            value={profileData.role}
                            disabled
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Department</label>
                        <input
                            type="text"
                            value={profileData.department}
                            disabled
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-50"
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                    {isEditing ? (
                        <>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Save Changes
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const SchedulerDashboard = () => {
    const [activeSection, setActiveSection] = useState(null);
    const [activeGISTab, setActiveGISTab] = useState('viewMap');
    const [activeScheduleTab, setActiveScheduleTab] = useState('create');
    const [activeTaskTab, setActiveTaskTab] = useState('assign');
    const [activeDelayTab, setActiveDelayTab] = useState('current');

    const toggleSection = (section) => {
        setActiveSection(activeSection === section ? null : section);
    }

    const navigate = useNavigate();

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md">
                <div className="p-4">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/2206/2206368.png"
                        alt="Logo"
                        className="h-10"
                    />
                </div>
                <nav className="mt-4">
                    <ul>
                        <li>
                            <button
                                className={`w-full text-left p-4 hover:bg-gray-200 cursor-pointer ${activeSection === 'gis' ? 'bg-gray-200' : ''}`}
                                onClick={() => toggleSection('gis')}
                            >
                                GIS Data
                            </button>
                            {activeSection === 'gis' && (
                                <ul className="pl-4 mt-2 space-y-2">
                                    <li className={`p-2 rounded-lg shadow cursor-pointer ${activeGISTab === 'viewMap' ? 'bg-blue-50' : 'bg-red-50'}`}
                                        onClick={() => setActiveGISTab('viewMap')}>
                                        View Map
                                    </li>
                                    <li className={`p-2 rounded-lg shadow cursor-pointer ${activeGISTab === 'routeAnalysis' ? 'bg-blue-50' : 'bg-red-50'}`}
                                        onClick={() => setActiveGISTab('routeAnalysis')}>
                                        Route Analysis
                                    </li>
                                    <li className={`p-2 rounded-lg shadow cursor-pointer ${activeGISTab === 'overlapDetection' ? 'bg-blue-50' : 'bg-red-50'}`}
                                        onClick={() => setActiveGISTab('overlapDetection')}>
                                        Overlap Detection
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <button
                                className={`w-full text-left p-4 hover:bg-gray-200 cursor-pointer ${activeSection === 'schedules' ? 'bg-gray-200' : ''}`}
                                onClick={() => toggleSection('schedules')}
                            >
                                Manage Schedules
                            </button>
                            {activeSection === 'schedules' && (
                                <ul className="pl-4 mt-2 space-y-2">
                                    <li 
                                        className={`p-2 rounded-lg shadow cursor-pointer ${activeScheduleTab === 'create' ? 'bg-blue-50' : 'bg-red-50'}`}
                                        onClick={() => setActiveScheduleTab('create')}
                                    >
                                        Create Schedule
                                    </li>
                                    <li 
                                        className={`p-2 rounded-lg shadow cursor-pointer ${activeScheduleTab === 'modify' ? 'bg-blue-50' : 'bg-red-50'}`}
                                        onClick={() => setActiveScheduleTab('modify')}
                                    >
                                        Modify Schedule
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <button
                                className={`w-full text-left p-4 hover:bg-gray-200 cursor-pointer ${activeSection === 'tasks' ? 'bg-gray-200' : ''}`}
                                onClick={() => toggleSection('tasks')}
                            >
                                Assign Tasks
                            </button>
                            {activeSection === 'tasks' && (
                                <ul className="pl-4 mt-2 space-y-2">
                                    <li 
                                        className={`p-2 rounded-lg shadow cursor-pointer ${activeTaskTab === 'assign' ? 'bg-blue-50' : 'bg-red-50'}`}
                                        onClick={() => setActiveTaskTab('assign')}
                                    >
                                        Assign to Crew
                                    </li>
                                    <li 
                                        className={`p-2 rounded-lg shadow cursor-pointer ${activeTaskTab === 'view' ? 'bg-blue-50' : 'bg-red-50'}`}
                                        onClick={() => setActiveTaskTab('view')}
                                    >
                                        View Assignments
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <button
                                className={`w-full text-left p-4 hover:bg-gray-200 cursor-pointer ${activeSection === 'delays' ? 'bg-gray-200' : ''}`}
                                onClick={() => toggleSection('delays')}
                            >
                                Track Delays
                            </button>
                            {activeSection === 'delays' && (
                                <ul className="pl-4 mt-2 space-y-2">
                                    <li 
                                        className={`p-2 rounded-lg shadow cursor-pointer ${activeDelayTab === 'current' ? 'bg-blue-50' : 'bg-red-50'}`}
                                        onClick={() => setActiveDelayTab('current')}
                                    >
                                        Current Delays
                                    </li>
                                    <li 
                                        className={`p-2 rounded-lg shadow cursor-pointer ${activeDelayTab === 'history' ? 'bg-blue-50' : 'bg-red-50'}`}
                                        onClick={() => setActiveDelayTab('history')}
                                    >
                                        Delay History
                                    </li>
                                </ul>
                            )}
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-white shadow p-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-semibold">Scheduler Dashboard</h1>
                        <p className="text-gray-500">{new Date().toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button 
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                            onClick={() => navigate('/scheduler-dashboard/notifications')}
                        >
                            Notifications
                        </button>
                        <button className="px-4 py-2 bg-gray-200 rounded">
                            Logout
                        </button>
                    </div>
                </header>

                {/* Main Content Area */}
                <div className="p-6 flex-1 overflow-y-auto">
                    {activeSection === 'gis' && (
                        <div className="w-full bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold mb-4">GIS Data</h2>
                            <div className="space-y-6">
                                {activeGISTab === 'viewMap' && <ViewMap />}
                                {activeGISTab === 'routeAnalysis' && <RouteAnalysis />}
                                {activeGISTab === 'overlapDetection' && <OverlapDetection />}
                            </div>
                        </div>
                    )}

                    {activeSection === 'schedules' && (
                        <div className="w-full bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold mb-4">Manage Schedules</h2>
                            <div className="space-y-6">
                                {activeScheduleTab === 'create' && <CreateSchedule />}
                                {activeScheduleTab === 'modify' && <ModifySchedule />}
                            </div>
                        </div>
                    )}

                    {activeSection === 'tasks' && (
                        <div className="w-full bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold mb-4">Task Management</h2>
                            <div className="space-y-6">
                                {activeTaskTab === 'assign' && <AssignCrew />}
                                {activeTaskTab === 'view' && <ViewAssignments />}
                            </div>
                        </div>
                    )}

                    {activeSection === 'delays' && (
                        <div className="w-full bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold mb-4">Delay Tracking</h2>
                            <div className="space-y-6">
                                {activeDelayTab === 'current' && <CurrentDelays />}
                                {activeDelayTab === 'history' && <DelayHistory />}
                            </div>
                        </div>
                    )}

                    {/* Add other section content here */}
                </div>
            </div>
        </div>
    );
};

export default SchedulerDashboard;