import { API_BASE_URL } from '../api/config.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('CPMS Frontend initialized.');
    checkBackendHealth();
});

async function checkBackendHealth() {
    const statusEl = document.getElementById('backend-status');
    
    try {
        const response = await fetch(`${API_BASE_URL}/health`);
        const data = await response.json();
        
        if (data.success) {
            statusEl.textContent = 'Backend is Online';
            statusEl.className = 'status-indicator online';
        } else {
            throw new Error('Backend returned invalid health format');
        }
    } catch (error) {
        console.error('Health check failed:', error);
        statusEl.textContent = 'Backend is Offline';
        statusEl.className = 'status-indicator offline';
    }
}
