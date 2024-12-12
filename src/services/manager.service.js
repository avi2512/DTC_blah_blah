import api from '../api';

export const managerService = {
    createGroundStaff: async (staffData) => {
        const response = await api.post('/manager/register', staffData);
        return response.data;
    },

    updatePhoneNumber: async (data) => {
        const response = await api.post('/manager/update-phone-number', data);
        return response.data;
    },

    updateEmail: async (data) => {
        const response = await api.post('/manager/update-email', data);
        return response.data;
    },

    getPendingLeaves: async () => {
        const response = await api.get('/manager/get-pending-request');
        return response.data;
    },

    approveLeave: async (leaveId) => {
        const response = await api.post('/manager/approve-leave-request', { leaveId });
        return response.data;
    }
}; 