import { storage } from '../utils/storage.js';
import { coreApi } from '../api/core.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Auth Guard
    if (!storage.isAuthenticated()) {
        window.location.href = './login.html';
        return;
    }

    const user = storage.getUser();
    document.getElementById('user-info').textContent = `Welcome, ${user.name}`;
    document.getElementById('role-display').textContent = user.role;

    // 2. Logout Handler
    document.getElementById('logout-btn').addEventListener('click', () => {
        storage.clearAuth();
        window.location.href = '../index.html';
    });

    // 3. Simple SPA Router Logic
    const navLinks = document.querySelectorAll('#nav-links a');
    const views = document.querySelectorAll('main.content section');
    const viewTitle = document.getElementById('view-title');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Update active nav state
            navLinks.forEach(l => l.classList.remove('active'));
            e.target.classList.add('active');

            const viewName = e.target.getAttribute('data-view');
            viewTitle.textContent = e.target.textContent;

            // Hide all views, show targeted view
            views.forEach(v => v.classList.add('hidden'));
            document.getElementById(`view-${viewName}`).classList.remove('hidden');

            // Fetch data based on view
            if (viewName === 'professors') loadProfessors();
            if (viewName === 'subjects') loadSubjects();
        });
    });

    // 4. Data Fetching Logic
    async function loadProfessors() {
        const listEl = document.getElementById('professors-list');
        listEl.innerHTML = '<p>Loading professors...</p>';
        try {
            const res = await coreApi.getProfessors();
            if (res.data.length === 0) {
                listEl.innerHTML = '<p style="color:var(--text-light)">No professors found.</p>';
                return;
            }
            listEl.innerHTML = `<ul style="list-style:none; padding:0;">
                ${res.data.map(p => `<li style="padding:0.5rem; border-bottom:1px solid var(--border-color);">${p.name || 'Unknown'} - ${p.department || 'N/A'}</li>`).join('')}
            </ul>`;
        } catch (error) {
            listEl.innerHTML = `<p style="color:var(--error-color)">Error loading data: ${error.message}</p>`;
        }
    }

    async function loadSubjects() {
        const listEl = document.getElementById('subjects-list');
        listEl.innerHTML = '<p>Loading subjects...</p>';
        try {
            const res = await coreApi.getSubjects();
            if (res.data.length === 0) {
                listEl.innerHTML = '<p style="color:var(--text-light)">No subjects found.</p>';
                return;
            }
            listEl.innerHTML = `<ul style="list-style:none; padding:0;">
                ${res.data.map(s => `<li style="padding:0.5rem; border-bottom:1px solid var(--border-color);"><strong>${s.code}</strong>: ${s.name}</li>`).join('')}
            </ul>`;
        } catch (error) {
            listEl.innerHTML = `<p style="color:var(--error-color)">Error loading data: ${error.message}</p>`;
        }
    }
});
