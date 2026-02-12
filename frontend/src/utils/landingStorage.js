import { defaultLandingContent } from '../data/landingContent';

const STORAGE_KEY = 'velno.landingContent.v1';

const isPlainObject = (value) =>
    Boolean(value) && typeof value === 'object' && !Array.isArray(value);

const mergeDeep = (base, override) => {
    if (!isPlainObject(base)) {
        return override ?? base;
    }
    const result = { ...base };
    if (!isPlainObject(override)) {
        return result;
    }
    Object.keys(override).forEach((key) => {
        const baseValue = base[key];
        const overrideValue = override[key];
        if (Array.isArray(baseValue)) {
            result[key] = Array.isArray(overrideValue) ? overrideValue : baseValue;
        } else if (isPlainObject(baseValue)) {
            result[key] = mergeDeep(baseValue, overrideValue);
        } else {
            result[key] = overrideValue ?? baseValue;
        }
    });
    return result;
};

export const mergeLandingContent = (override) => mergeDeep(defaultLandingContent, override);

export const loadLandingContent = () => {
    if (typeof window === 'undefined') {
        return defaultLandingContent;
    }
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
        return defaultLandingContent;
    }
    try {
        const parsed = JSON.parse(raw);
        return mergeLandingContent(parsed);
    } catch (error) {
        return defaultLandingContent;
    }
};

export const saveLandingContent = (content) => {
    if (typeof window === 'undefined') {
        return { ok: false, reason: 'server' };
    }
    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
        return { ok: true };
    } catch (error) {
        return { ok: false, error };
    }
};

export const clearLandingContent = () => {
    if (typeof window === 'undefined') {
        return;
    }
    window.localStorage.removeItem(STORAGE_KEY);
};
