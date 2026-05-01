/**
 * Utility for managing authentication tokens
 */

const TOKEN_KEY = 'cpms_jwt';
const USER_KEY = 'cpms_user';

export const storage = {
    setToken(token) {
        localStorage.setItem(TOKEN_KEY, token);
    },
    getToken() {
        return localStorage.getItem(TOKEN_KEY);
    },
    removeToken() {
        localStorage.removeItem(TOKEN_KEY);
    },
    setUser(user) {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    },
    getUser() {
        const user = localStorage.getItem(USER_KEY);
        return user ? JSON.parse(user) : null;
    },
    clearAuth() {
        this.removeToken();
        localStorage.removeItem(USER_KEY);
    },
    isAuthenticated() {
        return !!this.getToken();
    }
};
