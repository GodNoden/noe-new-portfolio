import { useTranslation } from '../lib/context';

export default function ExperienceSection() {
    const { t } = useTranslation();

    return (
        <section id="experience" className="scroll-mt-8">
            <h2 className="text-xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">
                {t.experience.title}
            </h2>
            <div className="space-y-6">
                {t.experience.jobs.map((job) => (
                    <div key={job.link}>
                        <h3 className="font-medium text-gray-900 dark:text-gray-100">
                            {job.role}
                        </h3>
                        <p className="text-sm text-gray-900 dark:text-gray-100">
                            <a
                                href={job.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                            >
                                {job.company}
                            </a>
                            {job.dates && (
                                <span className="ml-2 text-gray-500 dark:text-gray-400">
                                    {job.dates}
                                </span>
                            )}
                        </p>
                        <p className="mt-2 whitespace-pre-line text-gray-900 dark:text-gray-300">
                            {job.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}