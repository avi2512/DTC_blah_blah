import api from './api';

export const scheduleService = {
    getAllSchedules: async () => {
        const response = await api.get('/schedules');
        return response.data;
    },

    getScheduleById: async (id) => {
        const response = await api.get(`/schedules/${id}`);
        return response.data;
    },

    createSchedule: async (scheduleData) => {
        const response = await api.post('/schedules', scheduleData);
        return response.data;
    },

    updateSchedule: async (id, scheduleData) => {
        const response = await api.put(`/schedules/${id}`, scheduleData);
        return response.data;
    },

    deleteSchedule: async (id) => {
        const response = await api.delete(`/schedules/${id}`);
        return response.data;
    },

    getPendingSchedules: async () => {
        const response = await api.get('/schedules/pending');
        return response.data;
    },

    approveSchedule: async (id) => {
        const response = await api.post(`/schedules/${id}/approve`);
        return response.data;
    },

    rejectSchedule: async (id) => {
        const response = await api.post(`/schedules/${id}/reject`);
        return response.data;
    },

    getSchedulesByRoute: async (routeId) => {
        const response = await api.get(`/schedules/route/${routeId}`);
        return response.data;
    }
}; 