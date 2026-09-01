// components/ThemeToggle.tsx
'use client'

import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'
import { Switch } from '@/components/ui/switch'
import { Sun, Moon } from 'lucide-react'

const emptySubscribe = () => () => { }

export default function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme()

    const mounted = useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false
    )

    if (!mounted) {
        return <div className="h-6 w-[92px]" />
    }

    return (
        <div className="flex items-center gap-2">
            {/* Sun: bright in light mode, dimmed in dark mode */}
            <Sun
                className="w-4 h-4 text-gray-900 dark:text-gray-600 transition-colors"
                aria-hidden="true"
            />

            <Switch
                checked={resolvedTheme === 'dark'}
                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                aria-label="Cambiar tema"
            />

            {/* Moon: dimmed in light mode, bright in dark mode */}
            <Moon
                className="w-4 h-4 text-gray-400 dark:text-gray-100 transition-colors"
                aria-hidden="true"
            />
        </div>
    )
}