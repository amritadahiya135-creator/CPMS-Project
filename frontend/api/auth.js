import { apiClient } from './client.js';

export const authApi = {
    async login(email, password) {
        return apiClient('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
    },
    
    async register(userData) {
        return apiClient('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    }
};
