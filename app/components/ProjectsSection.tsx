import { useTranslation } from '../lib/context';

export default function ProjectsSection() {
    const { t } = useTranslation();

    return (
        <section id="projects" className="scroll-mt-8">
            <h2 className="text-xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">
                {t.projects.title}
            </h2>
            <div className="space-y-6">
                {t.projects.items.map((project) => (
                    <div
                        key={project.name}
                        className="p-5 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center justify-between gap-2 mb-2">
                            <h3 className="font-medium">
                                <a href="#" className="hover:underline">
                                    {project.name}
                                </a>
                            </h3>
                            {project.status === 'in-progress' && (
                                <span className="text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                                    {t.projects.inProgress}
                                </span>
                            )}
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {project.tech}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                            {project.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}