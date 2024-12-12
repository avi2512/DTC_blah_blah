import React, { useState } from 'react';

const ApproveSchedules = () => {
    const [pendingSchedules, setPendingSchedules] = useState([
        { 
            id: 1, 
            route: "Route A", 
            crew: "Crew 1", 
            startTime: "08:00", 
            endTime: "16:00", 
            requestedBy: "John Doe",
            requestDate: "2024-03-15",
            status: 'pending'
        },
    ]);

    const handleApprove = (id) => {
        if (window.confirm('Are you sure you want to approve this schedule?')) {
            setPendingSchedules(prevSchedules => 
                prevSchedules.map(schedule => 
                    schedule.id === id 
                        ? { ...schedule, status: 'approved' } 
                        : schedule
                )
            );
            // Add API call here
            setTimeout(() => {
                setPendingSchedules(prev => prev.filter(schedule => schedule.id !== id));
            }, 1000);
        }
    };

    const handleReject = (id) => {
        if (window.confirm('Are you sure you want to reject this schedule?')) {
            setPendingSchedules(prevSchedules => 
                prevSchedules.map(schedule => 
                    schedule.id === id 
                        ? { ...schedule, status: 'rejected' } 
                        : schedule
                )
            );
            // Add API call here
            setTimeout(() => {
                setPendingSchedules(prev => prev.filter(schedule => schedule.id !== id));
            }, 1000);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Approve Schedules</h2>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crew</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Time</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Time</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested By</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {pendingSchedules.map((schedule) => (
                            <tr key={schedule.id} className={`
                                ${schedule.status === 'approved' ? 'bg-green-50' : ''}
                                ${schedule.status === 'rejected' ? 'bg-red-50' : ''}
                                transition-colors duration-300
                            `}>
                                <td className="px-6 py-4 whitespace-nowrap">{schedule.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{schedule.route}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{schedule.crew}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{schedule.startTime}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{schedule.endTime}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{schedule.requestedBy}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{schedule.requestDate}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    {schedule.status === 'pending' ? (
                                        <>
                                            <button 
                                                onClick={() => handleApprove(schedule.id)}
                                                className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 
                                                         transition-colors duration-200 mr-2 transform hover:scale-105"
                                            >
                                                Approve
                                            </button>
                                            <button 
                                                onClick={() => handleReject(schedule.id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 
                                                         transition-colors duration-200 transform hover:scale-105"
                                            >
                                                Reject
                                            </button>
                                        </>
                                    ) : (
                                        <span className={`
                                            px-2 py-1 rounded-full text-xs font-semibold
                                            ${schedule.status === 'approved' ? 'bg-green-100 text-green-800' : ''}
                                            ${schedule.status === 'rejected' ? 'bg-red-100 text-red-800' : ''}
                                        `}>
                                            {schedule.status.charAt(0).toUpperCase() + schedule.status.slice(1)}
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {pendingSchedules.length === 0 && (
                            <tr>
                                <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                                    No pending schedules to approve
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApproveSchedules; 