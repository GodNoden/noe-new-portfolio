'use client';

import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';
import { Switch } from '@/components/ui/switch';

// Esto le dice a React cómo suscribirse al tema y cómo obtener el valor actual
// sin causar mismatches entre servidor y cliente.
const emptySubscribe = () => () => { };

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    // useSyncExternalStore resuelve el problema de hidratación
    // En el servidor devuelve null, en el cliente devuelve el tema real
    const mounted = useSyncExternalStore(
        emptySubscribe,
        () => true,   // valor en el cliente
        () => false   // valor en el servidor
    );

    // Mientras no esté montado, renderiza un placeholder del mismo tamaño
    // para evitar layout shift (salto visual)
    if (!mounted) {
        return <div className="h-5 w-13" />;
    }

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm">☀️</span>
            <Switch
                checked={theme === 'dark'}
                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                aria-label="Cambiar tema"
            />
            <span className="text-sm">🌙</span>
        </div>
    );
}