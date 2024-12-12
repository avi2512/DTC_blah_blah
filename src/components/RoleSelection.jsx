import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelection = () => {
    const navigate = useNavigate();

    const handleRoleSelect = (role) => {
        // Store the selected role (e.g., in context or local storage)
        // Redirect to the role-specific page
        navigate('/role-specific');
    };

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Select Your Role</h2>
            <button onClick={() => handleRoleSelect('admin')} className="mb-2 p-2 bg-blue-500 text-white rounded">Admin</button>
            <button onClick={() => handleRoleSelect('scheduler')} className="mb-2 p-2 bg-blue-500 text-white rounded">Scheduler</button>
            <button onClick={() => handleRoleSelect('manager')} className="mb-2 p-2 bg-blue-500 text-white rounded">Manager</button>
        </div>
    );
};

export default RoleSelection;
