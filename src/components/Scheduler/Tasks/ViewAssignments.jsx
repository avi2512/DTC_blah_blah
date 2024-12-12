import React, { useState } from 'react';

const ViewAssignments = () => {
    const [assignments] = useState([
        {
            id: 1,
            route: 'Route A',
            crew: 'John Doe',
            date: '2024-03-20',
            shift: 'Morning',
            vehicle: 'Bus 001',
            status: 'Active'
        },
        {
            id: 2,
            route: 'Route B',
            crew: 'Jane Smith',
            date: '2024-03-20',
            shift: 'Afternoon',
            vehicle: 'Bus 002',
            status: 'Pending'
        }
    ]);

    const [filterStatus, setFilterStatus] = useState('all');

    const filteredAssignments = filterStatus === 'all' 
        ? assignments 
        : assignments.filter(a => a.status.toLowerCase() === filterStatus);

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Current Assignments</h3>
                <select 
                    className="border rounded-md p-2"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                </select>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Route
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Crew Member
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Shift
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Vehicle
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredAssignments.map((assignment) => (
                            <tr key={assignment.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{assignment.route}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{assignment.crew}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{assignment.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{assignment.shift}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{assignment.vehicle}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        ${assignment.status === 'Active' ? 'bg-green-100 text-green-800' : 
                                          assignment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                                          'bg-gray-100 text-gray-800'}`}>
                                        {assignment.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-900">
                                    <button>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewAssignments;