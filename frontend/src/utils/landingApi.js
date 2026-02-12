const API_BASE = import.meta.env.VITE_API_BASE || '';

const buildUrl = (path) => `${API_BASE}${path}`;

export const fetchLandingContent = async () => {
    const response = await fetch(buildUrl('/api/landing-content'));
    if (!response.ok) {
        throw new Error('Failed to load content');
    }
    return response.json();
};

export const saveLandingContentRemote = async (content) => {
    const response = await fetch(buildUrl('/api/landing-content'), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
    });
    if (!response.ok) {
        throw new Error('Failed to save content');
    }
    return response.json();
};
