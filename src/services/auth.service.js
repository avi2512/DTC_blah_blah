import api from '../api';

export const authService = {
    login: async (credentials) => {
        try {
            const response = await api.post('/users/login', credentials);
            if (response.data?.data?.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data.data));
            }
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    logout: async () => {
        try {
            await api.post('/users/logout');
            localStorage.removeItem('user');
        } catch (error) {
            console.error('Logout error:', error);
        }
    }
}; 