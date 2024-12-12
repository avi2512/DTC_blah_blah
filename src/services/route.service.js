import api from './api';

export const routeService = {
    getAllRoutes: async () => {
        const response = await api.get('/routes');
        return response.data;
    },

    getRouteById: async (id) => {
        const response = await api.get(`/routes/${id}`);
        return response.data;
    },

    createRoute: async (routeData) => {
        const response = await api.post('/routes', routeData);
        return response.data;
    },

    updateRoute: async (id, routeData) => {
        const response = await api.put(`/routes/${id}`, routeData);
        return response.data;
    },

    deleteRoute: async (id) => {
        const response = await api.delete(`/routes/${id}`);
        return response.data;
    },

    getPendingRoutes: async () => {
        const response = await api.get('/routes/pending');
        return response.data;
    },

    approveRoute: async (id) => {
        const response = await api.post(`/routes/${id}/approve`);
        return response.data;
    },

    rejectRoute: async (id) => {
        const response = await api.post(`/routes/${id}/reject`);
        return response.data;
    }
}; 