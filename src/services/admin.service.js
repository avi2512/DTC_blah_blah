import api from '../api';

export const adminService = {
    createDepot: async (depotData) => {
        const response = await api.post('/admin/create-depot', depotData);
        return response.data;
    },

    getDepots: async () => {
        const response = await api.get('/admin/depots');
        return response.data;
    },

    updateDepot: async (depotId, depotData) => {
        const response = await api.put(`/admin/depots/${depotId}`, depotData);
        return response.data;
    },

    deleteDepot: async (depotId) => {
        const response = await api.delete(`/admin/depots/${depotId}`);
        return response.data;
    }
}; 