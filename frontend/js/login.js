import { authApi } from '../api/auth.js';
import { storage } from '../utils/storage.js';

document.addEventListener('DOMContentLoaded', () => {
    // If already logged in, redirect to dashboard
    if (storage.isAuthenticated()) {
        window.location.href = './dashboard.html';
    }

    const form = document.getElementById('login-form');
    const alertBox = document.getElementById('alert-box');
    const submitBtn = document.getElementById('submit-btn');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Reset UI
        alertBox.className = 'alert';
        alertBox.textContent = '';
        submitBtn.disabled = true;
        submitBtn.textContent = 'Signing in...';

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await authApi.login(email, password);
            
            // Success! Store token and user data
            storage.setToken(response.data.token);
            storage.setUser(response.data.user);

            // Show success and redirect
            alertBox.classList.add('success');
            alertBox.textContent = 'Login successful! Redirecting...';
            
            setTimeout(() => {
                window.location.href = './dashboard.html';
            }, 500);

        } catch (error) {
            // Show error
            alertBox.classList.add('error');
            alertBox.textContent = error.message || 'Login failed. Please try again.';
            submitBtn.disabled = false;
            submitBtn.textContent = 'Sign In';
        }
    });
});
