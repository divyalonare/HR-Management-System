const API_BASE = 'http://localhost:5000';

function getToken() {
    return localStorage.getItem('token');
}

function getRole() {
    return localStorage.getItem('role');
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('employeeId');
    localStorage.removeItem('name');
    window.location.href = '/login.html';
}

async function apiFetch(path, options = {}) {
    const headers = {
        'Content-Type': 'application/json',
        ...(options.headers || {})
    };

    const token = getToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers
    });

    if (res.status === 401) {
        logout();
        throw new Error('Session expired. Please log in again.');
    }

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        throw new Error(data.error ? (Array.isArray(data.error) ? data.error.map(e => e.msg).join(', ') : data.error) : 'Request failed');
    }

    return data;
}

function requireAuth(allowedRoles) {
    const token = getToken();
    const role = getRole();

    if (!token) {
        window.location.href = '/login.html';
        return;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
        window.location.href = '/login.html';
        return;
    }
}