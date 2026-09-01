// components/ContactSection.tsx
import { useTranslation } from '../lib/context';
import { Mail, MapPin, Globe, Plane } from 'lucide-react';

function Linkedin({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.28v1.56h.05c.46-.87 1.57-1.79 3.24-1.79 3.46 0 4.1 2.28 4.1 5.24v6.44zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46C23.2 24 24 23.23 24 22.27V1.73C24 .77 23.2 0 22.23 0z" />
        </svg>
    );
}

function Github({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 .3a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .3z" />
        </svg>
    );
}

export default function ContactSection() {
    const { t } = useTranslation();

    const contactLinks = [
        {
            id: 'email',
            label: t.contact.email,
            value: 'noe2000@live.com.mx',
            href: 'mailto:noe2000@live.com.mx',
            Icon: Mail,
        },
        {
            id: 'linkedin',
            label: t.contact.linkedin,
            value: 'noe-ixmak-quezada',
            href: 'https://www.linkedin.com/in/noe-ixmak-quezada/',
            Icon: Linkedin,
        },
        {
            id: 'github',
            label: t.contact.github,
            value: 'GodNoden',
            href: 'https://github.com/GodNoden',
            Icon: Github,
        },
    ];

    return (
        <section id="contact" className="scroll-mt-8 pb-12">
            <h2 className="text-xl font-semibold mb-6 border-b border-gray-200 dark:border-gray-800 pb-2">
                {t.contact.title}
            </h2>

            <p className="text-gray-900 dark:text-gray-300 mb-2">
                {t.contact.intro}
            </p>

            <div className="flex flex-wrap gap-4 mb-8 text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {t.contact.location}
                </span>
                <span className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    {t.contact.availability}
                </span>
                <span className="flex items-center gap-2">
                    <Plane className="w-4 h-4" />
                    {t.contact.relocation}
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {contactLinks.map(({ id, label, value, href, Icon }) => (
                    <a
                        key={id}
                        href={href}
                        target={id !== 'email' ? '_blank' : undefined}
                        rel={id !== 'email' ? 'noopener noreferrer' : undefined}
                        className="group flex flex-col items-center p-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-all"
                    >
                        <Icon className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors mb-3" />
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                            {label}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                            {value}
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}