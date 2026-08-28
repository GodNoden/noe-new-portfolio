'use client';
import Link from 'next/link';
import { useTranslation } from './lib/context';
import RoadmapItemCard from './components/RoadmapItem';
import { futureProjects, targetCertifications } from './lib/roadmap';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">

      <aside className="md:col-span-4 md:sticky md:top-8 h-fit space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{t.name}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {t.title}<br />{t.subtitle}
          </p>
        </div>
        <nav className="flex flex-col space-y-3">
          <Link href="#experience">{t.nav.experience}</Link>
          <Link href="#projects">{t.nav.projects}</Link>
          <Link href="#stack">{t.nav.stack}</Link>
          <Link href="#contact">{t.nav.contact}</Link>
          <Link href="#roadmap">{t.roadmap.nav}</Link>
        </nav>
      </aside>

      <div className="md:col-span-8 space-y-16">

        <section id="experience" className="scroll-mt-8">
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">
            {t.experience.title}
          </h2>
          <div className="space-y-6">
            {t.experience.jobs.map((job) => (
              <div key={`${job.company}-${job.role}`}>
                <h3 className="font-medium text-gray-900 dark:text-gray-100">
                  {job.role}
                </h3>
                <p className="text-sm text-gray-900 dark:text-gray-100">
                  <a href={job.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {job.company}
                  </a>
                  {job.dates && <span className="ml-2 text-gray-500 dark:text-gray-400">{job.dates}</span>}
                </p>
                <p className="mt-2 whitespace-pre-line text-gray-900 dark:text-gray-300">
                  {job.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="scroll-mt-8">
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">
            {t.projects.title}
          </h2>
          <div className="space-y-6">
            {t.projects.project.map((project) => (
              <div key={project.name}>
                <h3 className="font-medium">
                  <a href="#" className="hover:underline">
                    {project.name}
                  </a>
                </h3>
                <p className="text-sm text-gray-900 dark:text-gray-100 mb-2">
                  {project.tech}
                </p>
                <p className="text-gray-900 dark:text-gray-300">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="stack" className="scroll-mt-8">
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">
            {t.stack.title}
          </h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
            <li className="p-3 bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-800">Python / Django</li>
            <li className="p-3 bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-800">PostgreSQL</li>
            <li className="p-3 bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-800">Docker</li>
            <li className="p-3 bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-800">AWS (EC2, S3)</li>
            <li className="p-3 bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-800">Git / CI/CD</li>
            <li className="p-3 bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-800">Linux</li>
          </ul>
        </section>

        <section id="contacto" className="scroll-mt-8 pb-12">
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">
            {t.contact.title}
          </h2>
          <p className="text-gray-900 dark:text-gray-300 mb-4">
            {t.contact.intro}
          </p>
          <div className="space-y-2 text-sm">
            <p>📧 <a href="mailto:tu@email.com" className="hover:underline">tu@email.com</a></p>
            <p>💼 <a href="https://linkedin.com/in/tuusuario" target="_blank" rel="noopener noreferrer" className="hover:underline">linkedin.com/in/tuusuario</a></p>
            <p>💻 <a href="https://github.com/tuusuario" target="_blank" rel="noopener noreferrer" className="hover:underline">github.com/tuusuario</a></p>
          </div>
        </section>

        <section id="roadmap" className="scroll-mt-8">
          <h2 className="text-xl font-semibold mb-6 border-b border-gray-200 dark:border-gray-800 pb-2">
            {t.roadmap.title}
          </h2>

          <div className="space-y-8">
            {/* Proyectos futuros */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-4">
                {t.roadmap.projects}
              </h3>
              <div className="space-y-0">
                {futureProjects.map((item) => (
                  <RoadmapItemCard key={item.title} item={item} />
                ))}
              </div>
            </div>

            {/* Certificaciones */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-4">
                {t.roadmap.certifications}
              </h3>
              <div className="space-y-0">
                {targetCertifications.map((item) => (
                  <RoadmapItemCard key={item.title} item={item} />
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
