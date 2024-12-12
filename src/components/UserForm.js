import React, { useState } from 'react';
import { registerUser } from '../api';

const UserForm = () => {
    const [formData, setFormData] = useState({
        office_employee_name: '',
        admin_role: '',
        designation: '',
        username: '',
        password: '',
        email: '',
        phone_number: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(formData);
            alert('User registered successfully!');
        } catch (error) {
            console.error(error);
            alert('Error registering user');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Register User</h2>
            <input name="office_employee_name" onChange={handleChange} placeholder="Name" required className="w-full p-2 mb-2 border rounded" />
            <input name="admin_role" onChange={handleChange} placeholder="Role" required className="w-full p-2 mb-2 border rounded" />
            <input name="designation" onChange={handleChange} placeholder="Designation" required className="w-full p-2 mb-2 border rounded" />
            <input name="username" onChange={handleChange} placeholder="Username" required className="w-full p-2 mb-2 border rounded" />
            <input name="password" type="password" onChange={handleChange} placeholder="Password" required className="w-full p-2 mb-2 border rounded" />
            <input name="email" onChange={handleChange} placeholder="Email" required className="w-full p-2 mb-2 border rounded" />
            <input name="phone_number" onChange={handleChange} placeholder="Phone Number" required className="w-full p-2 mb-2 border rounded" />
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Register</button>
        </form>
    );
};

export default UserForm;