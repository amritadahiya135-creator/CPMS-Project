import { apiClient } from './client.js';

export const coreApi = {
    async getProfessors() {
        return apiClient('/professors', { method: 'GET' });
    },
    async getSubjects() {
        return apiClient('/subjects', { method: 'GET' });
    },
    async getAttendance(subjectId) {
        return apiClient(`/attendance/${subjectId}`, { method: 'GET' });
    }
};
