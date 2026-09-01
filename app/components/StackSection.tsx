'use client';
import { useTranslation } from '../lib/context';
import { stackCategories } from '../lib/stack';

export default function StackSection() {
    const { t } = useTranslation();

    return (
        <section id="stack" className="scroll-mt-8">
            <h2 className="text-xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">
                {t.stack.title}
            </h2>
            <div className="space-y-6">
                {stackCategories.map((category) => (
                    <div key={category.id}>
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-3">
                            {t.stack.categories[category.id]}
                        </h3>
                        <ul className="flex flex-wrap gap-2">
                            {category.items.map((item) => (
                                <li
                                    key={item}
                                    className="px-3 py-1.5 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-md border border-gray-200 dark:border-gray-800 shadow-sm"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
}