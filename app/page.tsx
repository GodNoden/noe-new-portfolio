'use client'
import Link from 'next/link';
import { useTranslation } from './lib/context';

export default function Home() {
  const { t } = useTranslation();

  return (
    // <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
    //   <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">

    //   </main>
    // </div>
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
        </nav>
      </aside>

      <div className="md:col-span-8 space-y-16">

        <section id="experiencia" className="scroll-mt-8">
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">
            Experiencia
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                Desarrollador Backend Senior
              </h3>
              <p className="text-sm text-gray-900 dark:text-gray-100">Empresa XYZ · 2022 - Presente</p>
              <p className="mt-2 text-gray-900 dark:text-gray-300">
                Diseño e implementación de APIs RESTful con Python y PostgreSQL.
                Reduje el tiempo de respuesta de las consultas críticas en un 40%.
              </p>
            </div>
            {/* Más experiencias... */}
          </div>
        </section>

        <section id="proyectos" className="scroll-mt-8">
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">
            Proyectos
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium">
                <a href="#" className="hover:underline">Sistema de Inventario v2</a>
              </h3>
              <p className="text-sm text-gray-900 dark:text-gray-100 mb-2">Node.js · Express · MongoDB</p>
              <p className="text-gray-900 dark:text-gray-300">
                Aplicación interna para gestionar stock en tiempo real.
                Maneja sincronización de datos entre 3 sucursales.
              </p>
            </div>
            {/* Más proyectos... */}
          </div>
        </section>

        <section id="stack" className="scroll-mt-8">
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">
            Stack Tecnológico
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
            Contacto
          </h2>
          <p className="text-gray-900 dark:text-gray-300 mb-4">
            Estoy abierto a oportunidades en desarrollo backend y arquitectura de software.
          </p>
          <div className="space-y-2 text-sm">
            <p>📧 <a href="mailto:tu@email.com" className="hover:underline">tu@email.com</a></p>
            <p>💼 <a href="https://linkedin.com/in/tuusuario" target="_blank" rel="noopener noreferrer" className="hover:underline">linkedin.com/in/tuusuario</a></p>
            <p>💻 <a href="https://github.com/tuusuario" target="_blank" rel="noopener noreferrer" className="hover:underline">github.com/tuusuario</a></p>
          </div>
        </section>

      </div>
    </div>
  );
}
