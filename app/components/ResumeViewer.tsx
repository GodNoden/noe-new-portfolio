'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from '../lib/context'

export default function ResumeViewer() {
    const { t, language } = useTranslation()
    const [isOpen, setIsOpen] = useState(false)

    const resumePath = `Noe_Quezada_CV_${language.toUpperCase()}.pdf`

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
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-gray-950/80"
                        onClick={() => setIsOpen(false)}
                        aria-hidden="true"
                    />

                    <div className="relative z-10 w-full max-w-4xl h-[85vh] bg-white dark:bg-gray-900 rounded-lg shadow-2xl flex flex-col overflow-hidden isolate">
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                                {t.resume.title}
                            </h3>
                            <div className="flex items-center gap-2">
                                <a
                                    href={resumePath}
                                    download={`Noe_Quezada_CV_${language.toUpperCase()}.pdf`}
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

                        <div className="flex-1 relative bg-white dark:bg-gray-900">
                            <iframe
                                src={resumePath}
                                className="absolute inset-0 w-full h-full border-0 bg-white dark:bg-gray-900"
                                title={t.resume.title}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}