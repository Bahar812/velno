const AUTH_KEY = 'velno.dashboard.auth.v1';

export const DASHBOARD_PASSWORD = 'velno123';

export const isDashboardAuthed = () => {
    if (typeof window === 'undefined') {
        return false;
    }
    return window.localStorage.getItem(AUTH_KEY) === 'true';
};

export const setDashboardAuthed = () => {
    if (typeof window === 'undefined') {
        return;
    }
    window.localStorage.setItem(AUTH_KEY, 'true');
};

export const clearDashboardAuthed = () => {
    if (typeof window === 'undefined') {
        return;
    }
    window.localStorage.removeItem(AUTH_KEY);
};
