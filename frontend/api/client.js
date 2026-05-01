import { API_BASE_URL } from './config.js';
import { storage } from '../utils/storage.js';

/**
 * Wrapper around native fetch to automatically handle JSON parsing,
 * error throwing, and injecting the JWT Authorization header.
 */
export async function apiClient(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    // Set up default headers
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };

    // Inject JWT if available
    const token = storage.getToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        ...options,
        headers
    };

    try {
        const response = await fetch(url, config);
        
        // Handle 204 No Content
        if (response.status === 204) return null;

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }

        return data;
    } catch (error) {
        console.error(`API Error [${endpoint}]:`, error);
        // Throw it further so the UI can catch and display it
        throw error;
    }
}
