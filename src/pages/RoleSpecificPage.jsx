import React from 'react';
import { useSelector } from 'react-redux'; // Assuming you're using Redux for state management
import ManageUsers from '../components/Admin/ManageUsers';
import RealTimeMonitor from '../components/Scheduler/RealTimeMonitor';


const RoleSpecificPage = () => {
    const userRole = useSelector((state) => state.user.role); // Get user role from state

    return (
        <div>
            {userRole === 'admin' && <ManageUsers />}
            {userRole === 'scheduler' && <RealTimeMonitor />}
            {/* Add more role-based components as needed */}
        </div>
    );
};

export default RoleSpecificPage;
