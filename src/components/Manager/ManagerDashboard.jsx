import React, { useState } from "react";

const ManagerDashboard = () => {
    const [activeSection, setActiveSection] = useState(null);

    const toggleSection = (section) => {
        setActiveSection(activeSection === section ? null : section);
    }

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
                                className="w-full text-left p-4 hover:bg-gray-200 cursor-pointer"
                                onClick={() => toggleSection('leaves')}
                            >
                                Leaves
                            </button>
                            {activeSection === 'leaves' && (
                                <ul className="pl-4 mt-2 space-y-2">
                                    <li className="bg-red-50 p-2 rounded-lg shadow">Pending Leave Requests</li>
                                    <li className="bg-red-50 p-2 rounded-lg shadow">Approved Leave Requests</li>
                                    <li className="bg-red-50 p-2 rounded-lg shadow">Approve Leave Requests</li>
                                    <li className="bg-red-50 p-2 rounded-lg shadow">Leave Details</li>
                                </ul>
                            )}
                        </li>

                        <li>
                            <button
                                className="w-full text-left p-4 hover:bg-gray-200 cursor-pointer"
                                onClick={() => toggleSection('crews')}
                            >
                                Manage Crews
                            </button>
                            {activeSection === 'crews' && (
                                <ul className="pl-4 mt-2 space-y-2">
                                    <li className="bg-red-50 p-2 rounded-lg shadow">Add Crew</li>
                                    <li className="bg-red-50 p-2 rounded-lg shadow">Change Crew Details</li>
                                </ul>
                            )}
                        </li>

                        <li>
                            <button
                                className="w-full text-left p-4 hover:bg-gray-200 cursor-pointer"
                                onClick={() => toggleSection('gis')}
                            >
                                GIS Data
                            </button>
                            {activeSection === 'gis' && (
                                <ul className="pl-4 mt-2 space-y-2">
                                    <li className="bg-red-50 p-2 rounded-lg shadow">View GIS Data</li>
                                </ul>
                            )}
                        </li>

                        <li>
                            <button
                                className="w-full text-left p-4 hover:bg-gray-200 cursor-pointer"
                                onClick={() => toggleSection('schedules')}
                            >
                                Manage Schedules
                            </button>
                            {activeSection === 'schedules' && (
                                <ul className="pl-4 mt-2 space-y-2">
                                    <li className="bg-red-50 p-2 rounded-lg shadow">Approve Schedules</li>
                                    <li className="bg-red-50 p-2 rounded-lg shadow">View Schedules</li>
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
                        <h1 className="text-xl font-semibold">Good Evening, Manager</h1>
                        <p className="text-gray-500">Wed, 11 Dec 2024</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405m-5.61-5.61l-3.66 3.66M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Notifications
                        </button>
                        <img src="data:image/jpeg;base64,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" alt="profile" className="w-10 h-10 rounded-full cursor-pointer" />
                        <button className="px-4 py-2 bg-yellow-400 rounded">
                            Logout
                        </button>
                    </div>
                </header>

                {/* Content */}
                <div className="p-4 flex flex-col items-center">
                    {/* Content sections based on activeSection */}
                    {activeSection === 'leaves' && (
                        <div className="w-full bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold">Leaves Management</h2>
                            <div className="mt-4 space-y-4">
                                {/* Add leave management content here */}
                            </div>
                        </div>
                    )}

                    {activeSection === 'crews' && (
                        <div className="w-full bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold">Manage Crews</h2>
                            <div className="mt-4 space-y-4">
                                {/* Add crew management content here */}
                            </div>
                        </div>
                    )}

                    {activeSection === 'gis' && (
                        <div className="w-full bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold">GIS Data</h2>
                            <div className="mt-4">
                                {/* Add GIS data visualization here */}
                            </div>
                        </div>
                    )}

                    {activeSection === 'schedules' && (
                        <div className="w-full bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold">Manage Schedules</h2>
                            <div className="mt-4 space-y-4">
                                {/* Add schedule management content here */}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManagerDashboard;