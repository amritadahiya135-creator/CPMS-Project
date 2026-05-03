import { authApi } from '../api/auth.js';
import { storage } from '../utils/storage.js';

document.addEventListener('DOMContentLoaded', () => {
    // If already logged in, redirect to dashboard
    if (storage.isAuthenticated()) {
        window.location.href = './dashboard.html';
    }

    const form = document.getElementById('register-form');
    const alertBox = document.getElementById('alert-box');
    const submitBtn = document.getElementById('submit-btn');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Reset UI
        alertBox.className = 'alert';
        alertBox.textContent = '';
        submitBtn.disabled = true;
        submitBtn.textContent = 'Creating account...';

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const role = document.getElementById('role').value;
        const password = document.getElementById('password').value;

        try {
            // 1. Call Register API
            const response = await authApi.register({ name, email, role, password });
            
            // 2. Success! The backend returns the user and a JWT token
            storage.setToken(response.data.token);
            storage.setUser(response.data.user);

            // Show success and redirect
            alertBox.classList.add('success');
            alertBox.textContent = 'Account created successfully! Redirecting...';
            
            setTimeout(() => {
                window.location.href = './dashboard.html';
            }, 800);

        } catch (error) {
            // Show error
            alertBox.classList.add('error');
            alertBox.textContent = error.message || 'Registration failed. Please try again.';
            submitBtn.disabled = false;
            submitBtn.textContent = 'Sign Up';
        }
    });
});
