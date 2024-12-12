import api from '../api';

export const crewService = {
    login: async (credentials) => {
        const response = await api.post('/crew/login', credentials);
        return response.data;
    },

    logout: async () => {
        const response = await api.post('/crew/logout');
        return response.data;
    },

    changePassword: async (passwordData) => {
        const response = await api.post('/crew/change-password', passwordData);
        return response.data;
    },

    getCurrentCrew: async () => {
        const response = await api.get('/crew/current-crew');
        return response.data;
    }
}; 