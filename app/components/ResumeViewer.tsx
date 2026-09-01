'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from '../lib/context'

export default function ResumeViewer() {
    const { t, language } = useTranslation()
    const [isOpen, setIsOpen] = useState(false)

    const resumePath = `/resume-${language}.pdf`

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false)
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="px-6 py-3 rounded-md bg-gray-900 text-white hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300 transition-colors font-medium"
            >
                {t.resume.viewButton}
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-label={t.resume.title}
                >
                    <div
                        className="absolute inset-0 bg-black/70"
                        onClick={() => setIsOpen(false)}
                    />

                    <div className="relative w-full max-w-4xl h-[85vh] bg-white dark:bg-gray-900 rounded-lg shadow-2xl flex flex-col">
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                                {t.resume.title}
                            </h3>
                            <div className="flex items-center gap-2">
                                <a
                                    href={resumePath}
                                    download
                                    className="px-4 py-2 text-sm rounded-md bg-gray-900 text-white hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300 transition-colors"
                                >
                                    {t.resume.downloadButton}
                                </a>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                    aria-label={t.resume.close}
                                >
                                    ✕
                                </button>
                            </div>
                        </div>

                        <iframe
                            src={resumePath}
                            className="w-full flex-1 border-0"
                            title={t.resume.title}
                        />
                    </div>
                </div>
            )}
        </>
    )
}