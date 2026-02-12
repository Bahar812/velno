import { useEffect, useState } from 'react';
import { fetchLandingContent } from './landingApi';
import { loadLandingContent, mergeLandingContent, saveLandingContent } from './landingStorage';

let cachedContent = null;
let inflight = null;

export const useLandingContent = () => {
    const [content, setContent] = useState(() => cachedContent ?? loadLandingContent());

    useEffect(() => {
        if (cachedContent) {
            return undefined;
        }
        if (!inflight) {
            inflight = fetchLandingContent()
                .then((data) => {
                    const merged = mergeLandingContent(data);
                    cachedContent = merged;
                    saveLandingContent(merged);
                    return merged;
                })
                .catch(() => loadLandingContent());
        }

        let isMounted = true;
        inflight.then((data) => {
            if (isMounted && data) {
                setContent(data);
            }
        });

        return () => {
            isMounted = false;
        };
    }, []);

    return content;
};
