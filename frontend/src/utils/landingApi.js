const API_BASE = import.meta.env.VITE_API_BASE || '';

const buildUrl = (path) => `${API_BASE}${path}`;

const buildHttpError = async (response, fallbackMessage) => {
    let detail = '';
    const contentType = response.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
        try {
            const body = await response.json();
            detail = body?.error || body?.message || '';
        } catch (error) {
            detail = '';
        }
    }

    if (!detail) {
        try {
            const text = await response.text();
            detail = text.slice(0, 120).trim();
        } catch (error) {
            detail = '';
        }
    }

    const suffix = detail ? `: ${detail}` : '';
    return new Error(`${fallbackMessage} (HTTP ${response.status})${suffix}`);
};

export const fetchLandingContent = async () => {
    const response = await fetch(buildUrl('/api/landing-content'));
    if (!response.ok) {
        throw await buildHttpError(response, 'Failed to load content');
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
        throw await buildHttpError(response, 'Failed to save content');
    }
    return response.json();
};
