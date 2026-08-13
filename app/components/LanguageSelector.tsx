'use client';

import { useTranslation } from "../lib/context";

export default function LanguageSelector() {
    const { language, setLanguage } = useTranslation();

    return (
        <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as any)}
            className="h-8 px-2 text-sm rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600"
            aria-label="Language"
        >
            <option value="en">EN</option>
            <option value="es">ES</option>
            <option value="fr">FR</option>
        </select>
    );
}