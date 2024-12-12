import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

// Create axios instance with default config
const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000 // 10 second timeout
});

// Add request interceptor for debugging
api.interceptors.request.use(
    (config) => {
        console.log(`🚀 Making ${config.method?.toUpperCase()} request to:`, config.url);
        return config;
    },
    (error) => {
        console.error('❌ Request Error:', error.message);
        return Promise.reject(error);
    }
);

// Add response interceptor for debugging
api.interceptors.response.use(
    (response) => {
        console.log(`✅ Response from ${response.config.url}:`, response.status);
        return response;
    },
    (error) => {
        if (error.code === 'ECONNABORTED') {
            console.error('❌ Request timed out');
            return Promise.reject(new Error('Request timed out. Please try again.'));
        }
        
        if (!error.response) {
            console.error('❌ Network Error:', error.message);
            return Promise.reject(new Error('Unable to connect to server. Please check your internet connection.'));
        }

        console.error('❌ Response Error:', {
            status: error.response?.status,
            message: error.response?.data?.message || error.message
        });
        return Promise.reject(error);
    }
);

// Auth APIs
export const authAPI = {
    login: async (credentials) => {
        try {
            const response = await api.post('/users/login', credentials);
            return response;
        } catch (error) {
            if (!error.response) {
                throw new Error('Network error: Unable to connect to server');
            }
            throw error;
        }
    },
    logout: () => api.post('/users/logout'),
    register: (userData) => api.post('/users/register', userData),
    refreshToken: () => api.post('/users/refresh-token')
};

// Crew APIs
export const crewAPI = {
    login: async (credentials) => {
        try {
            const response = await api.post('/crew/login', credentials);
            return response;
        } catch (error) {
            if (!error.response) {
                throw new Error('Network error: Unable to connect to server');
            }
            throw error;
        }
    },
    logout: () => api.post('/crew/logout'),
    refreshToken: () => api.post('/crew/refresh-token')
};

// Manager APIs
export const managerAPI = {
    createGroundStaff: (staffData) => api.post('/manager/register', staffData),
    updatePhoneNumber: (data) => api.post('/manager/update-phone-number', data),
    updateEmail: (data) => api.post('/manager/update-email', data),
    updatePassword: (data) => api.post('/manager/update-password', data),
    getPendingLeaves: () => api.get('/manager/get-pending-request'),
    getApprovedLeaves: () => api.get('/manager/get-approved-request'),
    approveLeave: (data) => api.post('/manager/approve-leave-request', data)
};

// Admin APIs
export const adminAPI = {
    createDepot: (depotData) => api.post('/admin/create-depot', depotData)
};

// Response interceptor for handling token refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If error is 401 and we haven't tried to refresh token yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Try to refresh token
                const response = await authAPI.refreshToken();
                
                // If token refresh successful, retry original request
                return api(originalRequest);
            } catch (refreshError) {
                // If refresh token fails, redirect to login
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
