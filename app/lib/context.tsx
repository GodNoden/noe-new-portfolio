'use client';

import { createContext, useContext, useSyncExternalStore, ReactNode, useCallback } from 'react';
import { translations, Language } from './translations';

type I18nContextType = {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: typeof translations[Language];
};

const I18nContext = createContext<I18nContextType | null>(null);

const languageStore = {
    subscribe: (callback: () => void) => {
        window.addEventListener('storage', callback);
        return () => window.removeEventListener('storage', callback);
    },
    getSnapshot: (): Language => {
        if (typeof window === 'undefined') return 'en';
        const stored = localStorage.getItem('language') as Language | null;
        if (stored && translations[stored]) return stored;
        const browserLang = navigator.language.split('-')[0];
        if (browserLang in translations) return browserLang as Language;
        return 'en';
    },
    getServerSnapshot: (): Language => 'en',
};

export function LanguageProvider({ children }: { children: ReactNode; }) {
    const language = useSyncExternalStore(
        languageStore.subscribe,
        languageStore.getSnapshot,
        languageStore.getServerSnapshot
    );

    const setLanguage = useCallback((lang: Language) => {
        localStorage.setItem('language', lang);
        window.dispatchEvent(new Event('storage'));
    }, []);

    return (
        <I18nContext.Provider value={{ language, setLanguage, t: translations[language] }}>
            {children}
        </I18nContext.Provider>
    );
}

export function useTranslation() {
    const context = useContext(I18nContext);
    if (!context) throw new Error('useTranslation must be used within LanguageProvider');
    return context;
}