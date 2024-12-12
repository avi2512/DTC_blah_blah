import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI, crewAPI } from "../api";

const Login = () => {
    const [credentials, setCredentials] = useState({ 
        email: "", 
        username: "defaultUser",
        password: "defaultPassword",
        role: "admin" 
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Automatically attempt login on component mount
        handleSubmit();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setError("");
        setLoading(true);
        
        try {
            console.log("Attempting login with:", {
                username: credentials.username,
                password: "***",
                role: credentials.role
            });

            let response;
            const loginData = {
                username: credentials.username,
                password: credentials.password
            };

            // Choose API based on role
            if (credentials.role === 'crew') {
                response = await crewAPI.login(loginData);
                console.log("Crew login response:", response);
            } else {
                response = await authAPI.login(loginData);
                console.log("User login response:", response);
            }

            if (response?.data?.data) {
                // Store tokens if needed
                localStorage.setItem('user', JSON.stringify(response.data.data));
                localStorage.setItem('role', credentials.role);

                // Redirect based on role
                switch (credentials.role) {
                    case 'admin':
                        navigate('/admin-dashboard');
                        break;
                    case 'scheduler':
                        navigate('/scheduler-dashboard');
                        break;
                    case 'manager':
                        navigate('/manager-dashboard');
                        break;
                    case 'crew':
                        navigate('/crew-dashboard');
                        break;
                    default:
                        navigate('/');
                }
            } else {
                throw new Error("Invalid response format from server");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError(
                err.response?.data?.message || 
                err.message || 
                "Login failed. Please check your credentials and try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=" flex items-center justify-center bg-black rounded-lg">
            <form onSubmit={handleSubmit} className="max-w-md p-8 bg-gray-800 shadow-md rounded-lg">
                {error && (
                    <div className="text-red-500 mb-4 p-3 bg-red-100 rounded">
                        {error}
                    </div>
                )}
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={credentials.username}
                    onChange={handleChange}
                    required
                    className="w-full p-2 mb-4 border border-gray-600 rounded bg-gray-700 text-white"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                    className="w-full p-2 mb-4 border border-gray-600 rounded bg-gray-700 text-white"
                />
                <select
                    name="role"
                    value={credentials.role}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border border-gray-600 rounded bg-gray-700 text-white"
                >
                    <option value="admin">Admin</option>
                    <option value="scheduler">Scheduler</option>
                    <option value="manager">Manager</option>
                </select>
                <button 
                    type="submit" 
                    className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default Login;