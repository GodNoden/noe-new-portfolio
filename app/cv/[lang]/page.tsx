import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cvLanguages, getCvDocument, isCvLanguage } from '@/app/lib/profile'
import { site } from '@/app/lib/site'

type PageParams = { params: Promise<{ lang: string }> }

/**
 * Print-ready résumé source. The committed PDFs in `public/` are produced from
 * this route by `pnpm cv:generate`, so the document is rendered by the same
 * data and the same Tailwind pipeline as the portfolio.
 *
 * Typography is deliberately tight: the CV must fit on a single A4 page, which
 * is what the original hand-made PDFs did.
 */
export const dynamicParams = false

export function generateStaticParams() {
    return cvLanguages.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
    const { lang } = await params
    if (!isCvLanguage(lang)) return {}

    const cv = getCvDocument(lang)

    return {
        title: `Résumé (${lang.toUpperCase()})`,
        description: cv.summary,
        // A print artifact that duplicates the portfolio: keep it out of search.
        robots: { index: false, follow: false },
        alternates: { canonical: `/cv/${lang}` },
    }
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="mt-3">
            <h2 className="mb-1.5 border-b border-neutral-300 pb-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-800">
                {title}
            </h2>
            {children}
        </section>
    )
}

export default async function CvPage({ params }: PageParams) {
    const { lang } = await params
    if (!isCvLanguage(lang)) notFound()

    const cv = getCvDocument(lang)

    return (
        <article className="cv-page mx-auto w-full max-w-[210mm] bg-white px-10 py-10 text-neutral-900">
            <div className="border-b border-neutral-300 pb-3">
                <h1 className="text-2xl font-bold tracking-tight">{site.name}</h1>
                <p className="mt-0.5 text-sm font-medium text-neutral-700">{cv.jobTitle}</p>
                <p className="mt-1.5 text-[10px] leading-relaxed text-neutral-600">
                    {cv.contact.phone} · {cv.contact.email} · {cv.contact.linkedin} ·{' '}
                    {cv.contact.github} · {cv.contact.website}
                </p>
            </div>

            <Section title={cv.labels.summary}>
                <p className="text-[10.5px] leading-snug text-neutral-800">{cv.summary}</p>
            </Section>

            <Section title={cv.labels.skills}>
                {cv.skillGroups.map((group) => (
                    <p key={group.id} className="text-[10.5px] leading-snug text-neutral-800">
                        <span className="font-semibold">{group.label}: </span>
                        {group.items.join(', ')}
                    </p>
                ))}
            </Section>

            <Section title={cv.labels.experience}>
                <div className="space-y-2">
                    {cv.jobs.map((job) => (
                        <div key={job.id}>
                            <div className="flex items-baseline justify-between gap-3">
                                <p className="text-[11.5px] font-semibold text-neutral-900">
                                    {job.role}
                                    <span className="font-normal"> | {job.company}</span>
                                </p>
                                <p className="shrink-0 text-[10px] text-neutral-600">{job.dates}</p>
                            </div>
                            <ul className="mt-0.5 list-disc space-y-0 pl-4 text-[10.5px] leading-snug text-neutral-800">
                                {job.achievements.map((achievement) => (
                                    <li key={achievement}>{achievement}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </Section>

            <Section title={cv.labels.projects}>
                <div className="space-y-1.5">
                    {cv.projects.map((project) => (
                        <div key={project.name}>
                            <p className="text-[11px] font-semibold text-neutral-900">
                                {project.name}
                                {project.url && (
                                    <span className="font-normal text-neutral-600">
                                        {' '}
                                        — {project.url.replace(/^https?:\/\//, '')}
                                    </span>
                                )}
                            </p>
                            <p className="text-[10px] text-neutral-600">{project.tech}</p>
                            <p className="text-[10.5px] leading-snug text-neutral-800">
                                {project.blurb}
                            </p>
                        </div>
                    ))}
                </div>
            </Section>

            <Section title={cv.labels.education}>
                <div className="flex items-baseline justify-between gap-3">
                    <p className="text-[11px] font-semibold text-neutral-900">
                        {cv.education.degree}
                        <span className="font-normal"> | {cv.education.school}</span>
                    </p>
                    <p className="shrink-0 text-[10px] text-neutral-600">{cv.education.dates}</p>
                </div>
                <p className="text-[10px] text-neutral-600">{cv.education.campus}</p>
            </Section>

            <Section title={cv.labels.languages}>
                <p className="text-[10.5px] text-neutral-800">
                    {cv.spokenLanguages.map((l) => `${l.label} — ${l.level}`).join(' | ')}
                </p>
            </Section>
        </article>
    )
}
