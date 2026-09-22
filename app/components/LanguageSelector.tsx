'use client';

import { useTranslation } from "@/app/lib/context";
import { translations, type Language } from "@/app/lib/translations";

export default function LanguageSelector() {
    const { language, setLanguage } = useTranslation();

    return (
        <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="h-8 px-2 text-sm rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600"
            aria-label="Language"
        >
            {(Object.keys(translations) as Language[]).map((lang) => (
                <option key={lang} value={lang}>
                    {lang.toUpperCase()}
                </option>
            ))}
        </select>
    );
}