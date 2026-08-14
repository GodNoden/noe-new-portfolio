'use client';

import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';
import { Switch } from '@/components/ui/switch';

const emptySubscribe = () => () => { };

export default function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();

    const mounted = useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false
    );


    if (!mounted) {
        return <div className="h-5 w-13" />;
    }

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm">☀️</span>
            <Switch
                checked={resolvedTheme === 'dark'}
                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                aria-label="Cambiar tema"
            />
            <span className="text-sm">🌙</span>
        </div>
    );
}