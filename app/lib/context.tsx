'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { translations, type Language } from './translations';
import { detectLanguage, STORAGE_KEY } from './language.mjs';

type I18nContextType = {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (typeof translations)[Language];
};

const I18nContext = createContext<I18nContextType | null>(null);

const FALLBACK: Language = 'en';
const supportedLanguages = Object.keys(translations) as Language[];

export function LanguageProvider({ children }: { children: ReactNode; }) {
    // Always render the fallback first so server HTML and the hydration pass
    // agree (the same mounted-guard pattern ThemeToggle uses); the visitor's own
    // language lands in an effect, before paint of the second render.
    const [language, setLanguageState] = useState<Language>(FALLBACK);

    useEffect(() => {
        const apply = () => {
            setLanguageState(detectLanguage({
                stored: window.localStorage.getItem(STORAGE_KEY),
                browserLanguage: navigator.language,
                supported: supportedLanguages,
                fallback: FALLBACK,
            }));
        };

        apply();
        // Real cross-tab sync: the `storage` event fires in the *other* tabs,
        // which is exactly the case worth handling.
        window.addEventListener('storage', apply);
        return () => window.removeEventListener('storage', apply);
    }, []);

    const setLanguage = useCallback((lang: Language) => {
        setLanguageState(lang);
        window.localStorage.setItem(STORAGE_KEY, lang);
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
