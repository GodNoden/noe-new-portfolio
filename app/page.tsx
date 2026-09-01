'use client';
import Link from 'next/link';
import { useTranslation } from './lib/context';
import ContactSection from './components/ContactSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import StackSection from './components/StackSection';
import ResumeViewer from './components/ResumeViewer';
import RoadmapSection from './components/RoadmapSection';

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
          <div className="mt-4">
            <ResumeViewer />
          </div>
        </div>
        <nav className="flex flex-col space-y-3">
          <Link href="#experience">{t.nav.experience}</Link>
          <Link href="#projects">{t.nav.projects}</Link>
          <Link href="#stack">{t.nav.stack}</Link>
          <Link href="#roadmap">{t.roadmap.nav}</Link>
          <Link href="#contact">{t.nav.contact}</Link>
        </nav>
      </aside>

      <div className="md:col-span-8 space-y-16">

        <ExperienceSection />

        <ProjectsSection />

        <StackSection />

        <RoadmapSection />

        <ContactSection />

      </div>
    </div>
  );
}
