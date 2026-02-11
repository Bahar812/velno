import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const UiContext = createContext(null);

function UiProvider({ children }) {
    const [language, setLanguage] = useState('en');

    useEffect(() => {
        const storedLanguage = localStorage.getItem('velno-language');
        if (storedLanguage) {
            setLanguage(storedLanguage);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('velno-language', language);
    }, [language]);

    const value = useMemo(
        () => ({
            language,
            toggleLanguage: () => setLanguage((prev) => (prev === 'en' ? 'id' : 'en')),
        }),
        [language]
    );

    return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}

function useUi() {
    const ctx = useContext(UiContext);
    if (!ctx) {
        throw new Error('useUi must be used within UiProvider');
    }
    return ctx;
}

export { UiProvider, useUi };
