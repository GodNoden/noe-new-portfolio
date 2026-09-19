import { translations, type Language } from './translations'
import { stackCategories, type StackCategory } from './stack'
import { site } from './site'

/**
 * Single source of truth for the résumés.
 *
 * Nothing here duplicates content that already lives in `translations.ts` or
 * `stack.ts`: company, dates, project list and skills are read from those
 * modules. Only CV-exclusive material (the achievement bullets that used to be
 * trapped inside the PDFs, education, spoken languages and the print labels)
 * is declared here.
 *
 * Consequence: adding a project to the portfolio automatically adds it to all
 * three CVs, so the CVs can no longer drift behind the site.
 */

export const cvLanguages: readonly Language[] = ['en', 'es', 'fr']

export function isCvLanguage(value: string): value is Language {
    return (cvLanguages as readonly string[]).includes(value)
}

type EmployerId = 'tekchoice' | 'dxc' | 'folio3'

/** Maps the shared job entries (keyed by their company link) to CV copy. */
const employerByLink: Record<string, EmployerId> = {
    'https://tekchoice.com/': 'tekchoice',
    'https://dxc.com/': 'dxc',
    'https://folio3.com/': 'folio3',
}

/**
 * Projects shown on the CV, selected by repository URL because the display
 * name is translated but the URL is stable across languages.
 *
 * Curated to the three strongest, differentiators only: the portfolio itself is
 * already linked in the CV header, and a one-page CV is worth more than a
 * complete list. Everything not listed here still lives on the website.
 */
const cvProjectUrls: readonly string[] = [
    'https://github.com/GodNoden/bmv-audit',
    'https://github.com/GodNoden/kapital-clone',
    'https://github.com/GodNoden/aggora',
]

/** Longest project blurb the CV will print before falling back to one sentence. */
const PROJECT_BLURB_MAX = 165

type CvCopy = {
    jobTitle: string
    labels: {
        summary: string
        skills: string
        experience: string
        projects: string
        education: string
        languages: string
    }
    summary: string
    roles: Record<EmployerId, string>
    achievements: Record<EmployerId, string[]>
    education: {
        degree: string
        dates: string
        school: string
        campus: string
    }
    spokenLanguages: { label: string; level: string }[]
}

const cvCopy: Record<Language, CvCopy> = {
    en: {
        jobTitle: 'Backend Developer',
        labels: {
            summary: 'Professional Summary',
            skills: 'Technical Skills',
            experience: 'Professional Experience',
            projects: 'Projects',
            education: 'Education',
            languages: 'Languages',
        },
        summary:
            'Backend Developer with 4+ years of experience designing and maintaining scalable APIs and services with Java and Spring Boot. Experienced in SQL databases, serverless architecture, and AWS deployment.',
        roles: {
            tekchoice: 'Backend Developer',
            dxc: 'Backend Developer Jr.',
            folio3: 'Software Developer Jr.',
        },
        achievements: {
            tekchoice: [
                "Collaborated with a U.S. credit union's technical team using the internal Symitar tool, holding daily client meetings to gather requirements and translate them into technical stories.",
                'Designed and implemented 6+ serverless Lambda functions for a self-service portal, enabling clients to request loan deferments online instead of visiting a branch, consuming data from the Fiserv DNA banking core system.',
                'Applied Infrastructure as Code on AWS using CloudFormation and configured monitoring alerts with CloudWatch, improving system observability.',
            ],
            dxc: [
                "Developed backend features in Java and Spring Boot for Grupo Bimbo, one of the country's largest bakery companies, replacing a legacy catalog and inventory system and building REST APIs under a layered architecture (Controller–Service–Repository).",
                'Refactored the data layer, removing DTOs that duplicated information already present in the entities and consolidating data access through models, simplifying the codebase and reducing maintenance complexity.',
                'Wrote unit tests with JUnit to ensure the quality and stability of the new module, reducing regression risk during the migration.',
            ],
            folio3: [
                'Fixed bugs and implemented new features under Scrum methodology and the MVC pattern, within a team of 5+ developers.',
                'Wrote technical documentation and unit tests for each release, ensuring continuous integration with the existing CI/CD pipeline.',
                'Maintained and developed a REST API using an ORM for a platform serving FDA-regulated companies.',
            ],
        },
        education: {
            degree: 'B.S. in Computer Systems Engineering',
            dates: '2018 – 2023',
            school: 'Universidad de Guadalajara',
            campus: 'CUCEI | Guadalajara, Mexico',
        },
        spokenLanguages: [
            { label: 'Spanish', level: 'Native' },
            { label: 'English', level: 'B2' },
            { label: 'French', level: 'B1' },
        ],
    },
    es: {
        jobTitle: 'Backend Developer',
        labels: {
            summary: 'Resumen Profesional',
            skills: 'Habilidades Técnicas',
            experience: 'Experiencia Profesional',
            projects: 'Proyectos',
            education: 'Educación',
            languages: 'Idiomas',
        },
        summary:
            'Backend Developer con 4+ años de experiencia diseñando y manteniendo APIs y servicios escalables con Java y Spring Boot. Experiencia en bases de datos SQL, arquitecturas serverless y despliegue en AWS.',
        roles: {
            tekchoice: 'Backend Developer',
            dxc: 'Backend Developer Jr.',
            folio3: 'Software Developer Jr.',
        },
        achievements: {
            tekchoice: [
                'Colaboré con el equipo técnico de una cooperativa de crédito (Credit Union) en EE. UU., utilizando la herramienta interna Symitar, en reuniones diarias con el cliente para levantar requerimientos y traducirlos en historias técnicas.',
                'Diseñé e implementé más de 6 funciones Lambda serverless para un portal de autoservicio, permitiendo a los clientes solicitar aplazamientos de sus préstamos directamente en línea sin necesidad de acudir a sucursal, consumiendo datos del core bancario Fiserv DNA.',
                'Apliqué infraestructura como código en AWS mediante CloudFormation y configuré alertas de monitoreo con CloudWatch, mejorando la observabilidad del sistema.',
            ],
            dxc: [
                'Desarrollé funcionalidades backend en Java y Spring Boot para Grupo Bimbo, una de las panificadoras más grandes del país, reemplazando un sistema legacy de catálogo e inventario y construyendo APIs REST bajo una arquitectura en capas (Controller–Service–Repository).',
                'Refactoricé la capa de datos, eliminando DTOs que duplicaban información ya existente en las entidades y consolidando el acceso mediante modelos, simplificando el código y reduciendo la complejidad de mantenimiento.',
                'Escribí pruebas unitarias con JUnit para garantizar la calidad y estabilidad del nuevo módulo, reduciendo el riesgo de regresiones durante la migración.',
            ],
            folio3: [
                'Corregí bugs e implementé nuevas funcionalidades bajo metodología Scrum y el patrón MVC, dentro de un equipo de 5+ desarrolladores.',
                'Escribí documentación técnica y pruebas unitarias para cada release, asegurando integración continua con el pipeline CI/CD existente.',
                'Mantuve y desarrollé una API REST usando un ORM para una plataforma que sirve a empresas reguladas por la FDA.',
            ],
        },
        education: {
            degree: 'Ingeniería en Sistemas Computacionales',
            dates: '2018 – 2023',
            school: 'Universidad de Guadalajara',
            campus: 'CUCEI | Guadalajara, México',
        },
        spokenLanguages: [
            { label: 'Español', level: 'Nativo' },
            { label: 'Inglés', level: 'B2' },
            { label: 'Francés', level: 'B1' },
        ],
    },
    fr: {
        jobTitle: 'Développeur Back',
        labels: {
            summary: 'Résumé Professionnel',
            skills: 'Compétences Techniques',
            experience: 'Expérience Professionnelle',
            projects: 'Projets',
            education: 'Formation',
            languages: 'Langues',
        },
        summary:
            "Développeur Back avec 4+ ans d'expérience dans la conception et la maintenance d'API et de services évolutifs avec Java et Spring Boot. Expérience en bases de données SQL, architecture serverless et déploiement sur AWS.",
        roles: {
            tekchoice: 'Développeur Back',
            dxc: 'Développeur Back Jr.',
            folio3: 'Développeur de Logiciels Jr.',
        },
        achievements: {
            tekchoice: [
                "Collaboré avec l'équipe technique d'une coopérative de crédit (Credit Union) aux États-Unis, en utilisant l'outil interne Symitar, lors de réunions quotidiennes avec le client pour recueillir les besoins et les traduire en user stories techniques.",
                "Conçu et implémenté plus de 6 fonctions Lambda serverless pour un portail en libre-service, permettant aux clients de demander des reports d'échéance de prêt en ligne sans avoir à se rendre en agence, en consommant les données du core bancaire Fiserv DNA.",
                "Appliqué l'Infrastructure as Code sur AWS avec CloudFormation et configuré des alertes de surveillance via CloudWatch, améliorant l'observabilité du système.",
            ],
            dxc: [
                "Développé des fonctionnalités backend en Java et Spring Boot pour Grupo Bimbo, l'une des plus grandes entreprises de boulangerie industrielle du pays, en remplaçant un système hérité de catalogue et d'inventaire et en construisant des API REST selon une architecture en couches (Controller–Service–Repository).",
                "Refactorisé la couche de données, en supprimant les DTO qui dupliquaient des informations déjà présentes dans les entités et en consolidant l'accès aux données via les modèles, simplifiant le code et réduisant la complexité de maintenance.",
                "Rédigé des tests unitaires avec JUnit afin de garantir la qualité et la stabilité du nouveau module, réduisant le risque de régressions pendant la migration.",
            ],
            folio3: [
                "Corrigé des bugs et développé de nouvelles fonctionnalités selon la méthodologie Scrum et le pattern MVC, au sein d'une équipe de 5+ développeurs.",
                "Rédigé la documentation technique et des tests unitaires pour chaque release, assurant l'intégration continue avec le pipeline CI/CD existant.",
                "Maintenu et développé une API REST à l'aide d'un ORM pour une plateforme servant des entreprises régulées par la FDA.",
            ],
        },
        education: {
            degree: 'Ingénierie des systèmes informatiques (licence)',
            dates: '2018 – 2023',
            school: 'Universidad de Guadalajara',
            campus: 'CUCEI | Guadalajara, Mexique',
        },
        spokenLanguages: [
            { label: 'Espagnol', level: 'Langue maternelle' },
            { label: 'Anglais', level: 'B2' },
            { label: 'Français', level: 'B1' },
        ],
    },
}

export type CvJob = {
    id: EmployerId
    role: string
    company: string
    link: string
    dates: string
    achievements: string[]
}

export type CvProject = {
    name: string
    tech: string
    url?: string
    blurb: string
}

export type CvDocument = {
    language: Language
    jobTitle: string
    labels: CvCopy['labels']
    summary: string
    contact: {
        email: string
        phone: string
        linkedin: string
        github: string
        website: string
    }
    skillGroups: { id: StackCategory['id']; label: string; items: string[] }[]
    jobs: CvJob[]
    projects: CvProject[]
    education: CvCopy['education']
    spokenLanguages: { label: string; level: string }[]
}

/** Keeps only the first sentence when a project blurb is longer than the CV budget. */
function toBlurb(description: string): string {
    if (description.length <= PROJECT_BLURB_MAX) return description
    const firstSentence = description.split(/(?<=\.)\s+/)[0]
    if (firstSentence.length <= PROJECT_BLURB_MAX) return firstSentence
    return `${firstSentence.slice(0, PROJECT_BLURB_MAX).trimEnd()}…`
}

/** Builds the complete, print-ready CV document for one language. */
export function getCvDocument(language: Language): CvDocument {
    const copy = cvCopy[language]
    const shared = translations[language]

    const jobs: CvJob[] = shared.experience.jobs.map((job) => {
        const id = employerByLink[job.link]
        return {
            id,
            role: copy.roles[id],
            company: job.company,
            link: job.link,
            // The site prefixes dates with a middle dot meant for inline display.
            dates: job.dates.replace(/^·\s*/, '').trim(),
            achievements: copy.achievements[id],
        }
    })

    const projects: CvProject[] = cvProjectUrls.flatMap((url) => {
        const project = shared.projects.items.find(
            (item) => 'url' in item && item.url === url
        )
        if (!project) return []
        return [
            {
                name: project.name,
                tech: project.tech,
                url,
                blurb: toBlurb(project.description),
            },
        ]
    })

    return {
        language,
        jobTitle: copy.jobTitle,
        labels: copy.labels,
        summary: copy.summary,
        contact: {
            email: site.email,
            phone: '+52 624 175 1162',
            linkedin: 'linkedin.com/in/noe-ixmak-quezada',
            github: 'github.com/GodNoden',
            website: 'www.ixmak.com',
        },
        skillGroups: stackCategories.map((category) => ({
            id: category.id,
            label: shared.stack.categories[category.id],
            items: category.items,
        })),
        jobs,
        projects,
        education: copy.education,
        spokenLanguages: copy.spokenLanguages,
    }
}
