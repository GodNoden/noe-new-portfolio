const experienceMeta = {
    tekchoice: {
        role: "Backend Developer",
        company: "Tekchoice LLC",
        link: "https://tekchoice.com/",
    },
    dxc: {
        role: "Backend Developer Jr.",
        company: "DXC Technology Company",
        link: "https://dxc.com/",
    },
    folio3: {
        role: "Software Developer Jr.",
        company: "Folio3 Software Inc.",
        link: "https://folio3.com/",
    },
} as const;

export const translations = {
    en: {
        name: "Noe Quezada",
        title: "Backend Engineer",
        subtitle: "Building financial systems on AWS",
        nav: {
            experience: "Experience",
            projects: "Projects",
            stack: "Tech Stack",
            contact: "Contact",
            roadmap: "Roadmap",
        },
        experience: {
            title: "Experience",
            jobs: [
                {
                    ...experienceMeta.tekchoice,
                    dates: "· Jun 2024 - Present",
                    description:
                        "Built backend services for a banking self-service portal, integrating with the Fiserv–DNA core banking system through event-driven architectures. Designed and deployed 6+ AWS Lambda functions that enabled customers to request loan deferments online, eliminating the need to visit physical branches.",
                },
                {
                    ...experienceMeta.dxc,
                    dates: "· Sep 2023 - Jun 2024",
                    description:
                        "Built and maintained backend services in Java and Spring Boot for Grupo Bimbo (NYSE: BIMBO). Led the modernization of a legacy catalog and inventory system, exposing new capabilities through well-defined REST APIs following a layered Controller–Service–Repository architecture.",
                },
                {
                    ...experienceMeta.folio3,
                    dates: "· Aug 2022 - Apr 2023",
                    description:
                        "Developed a compliant REST API for an FDA-regulated healthcare company using Laravel with MVC architecture. Established a testing culture by writing PHPUnit coverage for every feature and bug fix, improving regression detection and deployment confidence.",
                },
            ],
        },
        projects: {
            title: "Projects",
            inProgress: "In-progress",
            items: [
                {
                    name: "BMV Technical Audit",
                    tech: "Lighthouse · axe · TypeScript · SVG · Performance",
                    description:
                        "Independent, non-commercial audit of bmv.com.mx focused on measurable performance, accessibility, and architecture findings. Includes a ~5 KB vanilla TypeScript prototype that replaces the market block, reducing CLS from 0.689 to 0 and TBT from 940 ms to 0 ms.",
                    url: "https://github.com/GodNoden/bmv-audit",
                    status: undefined,
                },
                {
                    name: "Kapital Landing Rebuild",
                    tech: "Astro · TypeScript · Tailwind v4 · i18n",
                    description:
                        "Engineering study rebuilding Kapital's landing page. Reduced HTTP requests by 60%, transferred bytes by 62%, JavaScript payload by 98%, and CSS by 95% compared to the original, using CSS Container Queries for a typed three-language i18n system.",
                    url: "https://github.com/GodNoden/kapital-clone",
                    status: undefined,
                },
                {
                    name: "ComerBien (Recipe and Nutritional Tracking App)",
                    tech: "React · Java · Spring Boot · PostgreSQL · Docker · Railway · Netlify",
                    description:
                        "A web application that allows users to track their meals, recipes, and nutritional intake. Built with React for the frontend and Java with Spring Boot for the backend, using PostgreSQL as the database. Developed using Docker for containerization and DB and Backend deployed on Railway and Frontend deployed on Netlify.",
                    url: "https://github.com/GodNoden/ComerBien",
                    status: undefined,
                },
                {
                    name: "Personal Blog",
                    tech: "NextJS · C# · ASP.NET Core · MySQL · Docker · GCP",
                    description:
                        "A personal blog platform where I can create and share my thoughts. Built with NextJS for the frontend and C# with ASP.NET Core for the backend, using MySQL as the database. Developed using Docker for containerization and deployed on Google Cloud Platform.",
                    url: undefined,
                    status: "in-progress",
                },
                {
                    name: "My Portfolio",
                    tech: "Next.js · App Router · TypeScript · Tailwind · next-themes · i18n",
                    description:
                        "Personal portfolio with three-language support (EN/ES/FR), system-aware dark mode, and a component-driven architecture. Built on Next.js App Router with server components where possible.",
                    url: "https://github.com/GodNoden/noe-new-portfolio",
                    status: undefined,
                },
            ]
        },
        stack: {
            title: "Tech Stack",
            categories: {
                languages: "Languages",
                frameworks: "Frameworks",
                cloud: "Cloud & DevOps",
                databases: "Databases",
                architecture: "Architecture & Patterns",
                testing: "Testing libraries"
            },
        },
        contact: {
            title: "Contact",
            intro: "Backend engineer with experience in financial systems, event-driven architectures, and AWS. Currently looking for backend roles at fintech and financial institutions.",
            availability: "Available for remote work",
            location: "Based in Guadalajara, Jalisco",
            relocation: "Open to relocation",
            email: "Email",
            linkedin: "LinkedIn",
            github: "GitHub",
            contactMe: "Contact Me",
        },
        roadmap: {
            title: "Roadmap",
            nav: "Roadmap",
            projects: "Upcoming projects",
            certifications: "Target certifications",
            targetDate: "Target",
            statusLabels: {
                completed: "Completed",
                "in-progress": "In progress",
                planned: "Planned",
            },
            futureProjects: [
                {
                    id: "payment-api",
                    title: "Payment API with automatic reconciliation",
                    description:
                        "System that reconciles transactions between the payment gateway and the internal database, automatically detecting discrepancies.",
                    targetDate: "Q4 2026",
                    status: "in-progress",
                },
                {
                    id: "redis-queue",
                    title: "Queue engine with Redis",
                    description:
                        "Implement an asynchronous processing system for heavy tasks, replacing the current synchronous flow.",
                    targetDate: "Q1 2027",
                    status: "planned",
                },
            ],
            targetCertifications: [
                {
                    id: "aws-saa",
                    title: "AWS Certified Solutions Architect – Associate",
                    description:
                        "To deepen knowledge of distributed architecture design and managed services.",
                    targetDate: "Dec 2026",
                    status: "in-progress",
                    url: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
                },
                {
                    id: "ckad",
                    title: "CKAD (Certified Kubernetes Application Developer)",
                    description:
                        "Formalize my experience deploying containers in production.",
                    targetDate: "Q2 2027",
                    status: "planned",
                    url: "https://www.cncf.io/training/certification/ckad/",
                },
            ],
        },
        resume: {
            title: "Resume",
            viewButton: "View Resume",
            downloadButton: "Download",
            close: "Close",
        },
    },
    es: {
        name: "Noe Quezada",
        title: "Backend Engineer",
        subtitle: "Construyendo sistemas financieros sobre AWS",
        nav: {
            experience: "Experiencia",
            projects: "Proyectos",
            stack: "Stack",
            contact: "Contacto",
            roadmap: "Roadmap",
        },
        experience: {
            title: "Experiencia",
            jobs: [
                {
                    ...experienceMeta.tekchoice,
                    dates: "· Jun 2024 - Presente",
                    description:
                        "Construí servicios backend para un portal de autoservicio bancario, integrados con el core bancario Fiserv–DNA mediante arquitecturas orientadas a eventos. Diseñé y desplegué más de 6 funciones serverless en AWS Lambda que habilitaron a los clientes solicitar prórrogas de préstamos en línea, eliminando la necesidad de visitar sucursales físicas.",
                },
                {
                    ...experienceMeta.dxc,
                    dates: "· Sep 2023 - Jun 2024",
                    description:
                        "Desarrollé y mantuve servicios backend en Java y Spring Boot para Grupo Bimbo (NYSE: BIMBO). Lideré la modernización de un sistema legacy de catálogo e inventario, exponiendo nuevas capacidades a través de APIs REST bien definidas siguiendo una arquitectura en capas Controller–Service–Repository.",
                },
                {
                    ...experienceMeta.folio3,
                    dates: "· Ago 2022 - Abr 2023",
                    description:
                        "Desarrollé una API REST compliant para una empresa del sector salud regulada por la FDA usando Laravel con arquitectura MVC. Establecí una cultura de testing escribiendo cobertura con PHPUnit para cada feature y bug fix, mejorando la detección de regresiones y la confianza en los deployments.",
                },
            ],
        },
        projects: {
            title: "Proyectos",
            inProgress: "En proceso",
            items: [
                {
                    name: "Auditoría técnica a la BMV",
                    tech: "Lighthouse · axe · TypeScript · SVG · Performance",
                    description:
                        "Auditoría técnica independiente y no comercial al sitio bmv.com.mx, enfocada en hallazgos medibles de performance, accesibilidad y arquitectura. Incluye un prototipo en TypeScript vanilla de ~5 KB que reemplaza el bloque de mercado, reduciendo el CLS de 0.689 a 0 y el TBT de 940 ms a 0 ms.",
                    url: "https://github.com/GodNoden/bmv-audit",
                    status: undefined,
                },
                {
                    name: "Reconstrucción de la landing de Kapital",
                    tech: "Astro · TypeScript · Tailwind v4 · i18n",
                    description:
                        "Estudio de ingeniería que reconstruye la landing de Kapital. Redujo las peticiones HTTP en 60%, los bytes transferidos en 62%, el payload de JavaScript en 98% y el CSS en 95% respecto al original, usando CSS Container Queries para un sistema i18n tipado en tres idiomas.",
                    url: "https://github.com/GodNoden/kapital-clone",
                    status: undefined,
                },
                {
                    name: "ComerBien (Aplicación de seguimiento de recetas y nutrición)",
                    tech: "React · Java · Spring Boot · PostgreSQL · Docker · Railway · Netlify",
                    description:
                        "Una aplicación web que permite a los usuarios realizar un seguimiento de sus comidas, recetas e ingesta nutricional. Construida con React para el frontend y Java con Spring Boot para el backend, utilizando PostgreSQL como base de datos. Desarrollada usando Docker para la contenedorización y desplegada en Railway (DB y Backend) y Netlify (Frontend).",
                    url: "https://github.com/GodNoden/ComerBien",
                    status: undefined,
                },
                {
                    name: "Blog Personal",
                    tech: "NextJS · C# · ASP.NET Core · MySQL · Docker · GCP",
                    description:
                        "Una plataforma de blog personal donde puedo crear y compartir mis pensamientos. Construida con NextJS para el frontend y C# con ASP.NET Core para el backend, utilizando MySQL como base de datos. Desarrollada usando Docker para la contenedorización y desplegada en Google Cloud Platform.",
                    url: undefined,
                    status: "in-progress",
                },
                {
                    name: "Mi Portafolio",
                    tech: "Next.js · App Router · TypeScript · Tailwind · next-themes · i18n",
                    description:
                        "Portafolio personal con soporte para tres idiomas (EN/ES/FR), modo oscuro que respeta la preferencia del sistema, y una arquitectura basada en componentes. Construido sobre Next.js App Router con server components donde es posible.",
                    url: "https://github.com/GodNoden/noe-new-portfolio",
                    status: undefined,
                },
            ]
        },
        stack: {
            title: "Stack Tecnológico",
            categories: {
                languages: "Lenguajes",
                frameworks: "Frameworks",
                cloud: "Cloud y DevOps",
                databases: "Bases de datos",
                architecture: "Arquitectura y patrones",
                testing: "Librerías de testing"
            },
        },
        contact: {
            title: "Contacto",
            intro: "Backend engineer con experiencia en sistemas financieros, arquitecturas orientadas a eventos y AWS. Actualmente busco roles backend en fintech e instituciones financieras.",
            availability: "Disponible para trabajo remoto",
            location: "Basado en Guadalajara, Jalisco",
            relocation: "Disponible para mudarse",
            email: "Correo",
            linkedin: "LinkedIn",
            github: "GitHub",
            contactMe: "Contactarme",
        },
        roadmap: {
            title: "Roadmap",
            nav: "Roadmap",
            projects: "Proyectos futuros",
            certifications: "Certificaciones en mira",
            targetDate: "Objetivo",
            statusLabels: {
                completed: "Completado",
                "in-progress": "En progreso",
                planned: "Planificado",
            },
            futureProjects: [
                {
                    id: "payment-api",
                    title: "API de pagos con conciliación automática",
                    description:
                        "Sistema que reconcilia transacciones entre la pasarela de pagos y la base de datos interna, detectando discrepancias automáticamente.",
                    targetDate: "Q4 2026",
                    status: "in-progress",
                },
                {
                    id: "redis-queue",
                    title: "Motor de colas con Redis",
                    description:
                        "Implementar un sistema de procesamiento asíncrono para tareas pesadas, reemplazando el procesamiento síncrono actual.",
                    targetDate: "Q1 2027",
                    status: "planned",
                },
            ],
            targetCertifications: [
                {
                    id: "aws-saa",
                    title: "AWS Certified Solutions Architect – Associate",
                    description:
                        "Para profundizar en diseño de arquitecturas distribuidas y servicios gestionados.",
                    targetDate: "Dic 2026",
                    status: "in-progress",
                    url: "https://aws.amazon.com/es/certification/certified-solutions-architect-associate/",
                },
                {
                    id: "ckad",
                    title: "CKAD (Certified Kubernetes Application Developer)",
                    description:
                        "Formalizar mi experiencia desplegando contenedores en producción.",
                    targetDate: "Q2 2027",
                    status: "planned",
                    url: "https://www.cncf.io/training/certification/ckad/",
                },
            ],
        },
        resume: {
            title: "Currículum",
            viewButton: "Ver Currículum",
            downloadButton: "Descargar",
            close: "Cerrar",
        },
    },
    fr: {
        name: "Noe Quezada",
        title: "Ingénieur Backend",
        subtitle: "Construction de systèmes financiers sur AWS",
        nav: {
            experience: "Expérience",
            projects: "Projets",
            stack: "Stack",
            contact: "Contact",
            roadmap: "Roadmap",
        },
        experience: {
            title: "Expérience",
            jobs: [
                {
                    ...experienceMeta.tekchoice,
                    dates: "· Juin 2024 - Présent",
                    description:
                        "Développement de services backend pour un portail bancaire en libre-service, intégrés au système bancaire central Fiserv–DNA via des architectures événementielles. Conception et déploiement de plus de 6 fonctions serverless AWS Lambda permettant aux clients de demander des reports de prêt en ligne, supprimant la nécessité de se rendre en agence.",
                },
                {
                    ...experienceMeta.dxc,
                    dates: "· Sept 2023 - Juin 2024",
                    description:
                        "Développement et maintenance de services backend en Java et Spring Boot pour Grupo Bimbo (NYSE: BIMBO). Pilotage de la modernisation d'un système legacy de catalogue et d'inventaire, exposant de nouvelles capacités via des APIs REST bien définies suivant une architecture en couches Controller–Service–Repository.",
                },
                {
                    ...experienceMeta.folio3,
                    dates: "· Août 2022 - Avril 2023",
                    description:
                        "Développement d'une API REST conforme pour une entreprise de santé réglementée par la FDA utilisant Laravel avec architecture MVC. Établissement d'une culture de tests en écrivant une couverture PHPUnit pour chaque fonctionnalité et correction de bug, améliorant la détection des régressions et la confiance dans les déploiements.",
                },
            ],
        },
        projects: {
            title: "Projets",
            inProgress: "En cours",
            items: [
                {
                    name: "Audit technique de la BMV",
                    tech: "Lighthouse · axe · TypeScript · SVG · Performance",
                    description:
                        "Audit technique indépendant et non commercial du site bmv.com.mx, axé sur des constats mesurables de performance, accessibilité et architecture. Inclut un prototype en TypeScript vanilla de ~5 Ko qui remplace le bloc de marché, réduisant le CLS de 0,689 à 0 et le TBT de 940 ms à 0 ms.",
                    url: "https://github.com/GodNoden/bmv-audit",
                    status: undefined,
                },
                {
                    name: "Reconstruction de la landing de Kapital",
                    tech: "Astro · TypeScript · Tailwind v4 · i18n",
                    description:
                        "Étude d'ingénierie reconstruisant la landing de Kapital. Réduction des requêtes HTTP de 60%, des octets transférés de 62%, du payload JavaScript de 98% et du CSS de 95% par rapport à l'original, en utilisant les CSS Container Queries pour un système i18n typé en trois langues.",
                    url: "https://github.com/GodNoden/kapital-clone",
                    status: undefined,
                },
                {
                    name: "ComerBien (Application de suivi de recettes et nutrition)",
                    tech: "React · Java · Spring Boot · PostgreSQL · Docker · Railway · Netlify",
                    description:
                        "Une application web qui permet aux utilisateurs de suivre leurs repas, recettes et apports nutritionnels. Construite avec React pour le frontend et Java avec Spring Boot pour le backend, utilisant PostgreSQL comme base de données. Développée en utilisant Docker pour la conteneurisation et déployée sur Railway (DB et Backend) et Netlify (Frontend).",
                    url: "https://github.com/GodNoden/ComerBien",
                    status: undefined,
                },
                {
                    name: "Blog Personnel",
                    tech: "NextJS · C# · ASP.NET Core · MySQL · Docker · GCP",
                    description:
                        "Une plateforme de blog personnel où je peux créer et partager mes pensées. Construite avec NextJS pour le frontend et C# avec ASP.NET Core pour le backend, en utilisant MySQL comme base de données. Développée en utilisant Docker pour la conteneurisation et déployée sur Google Cloud Platform.",
                    url: undefined,
                    status: "in-progress",
                },
                {
                    name: "Mon Portfolio",
                    tech: "Next.js · App Router · TypeScript · Tailwind · next-themes · i18n",
                    description:
                        "Portfolio personnel avec support de trois langues (EN/ES/FR), mode sombre respectant la préférence système, et une architecture basée sur des composants. Construit sur Next.js App Router avec des server components là où c'est pertinent.",
                    url: "https://github.com/GodNoden/noe-new-portfolio",
                    status: undefined,
                },
            ]
        },
        stack: {
            title: "Stack Technique",
            categories: {
                languages: "Langages",
                frameworks: "Frameworks",
                cloud: "Cloud et DevOps",
                databases: "Bases de données",
                architecture: "Architecture et patterns",
                testing: "Bibliothèques de tests"
            },
        },
        contact: {
            title: "Contact",
            intro: "Ingénieur backend avec de l'expérience en systèmes financiers, architectures événementielles et AWS. Actuellement à la recherche de postes backend en fintech et institutions financières.",
            availability: "Disponible pour travail à distance",
            location: "Basé à Guadalajara, Jalisco",
            relocation: "Disponible pour se déplacer",
            email: "Email",
            linkedin: "LinkedIn",
            github: "GitHub",
            contactMe: "Contactez-moi",
        },
        roadmap: {
            title: "Roadmap",
            nav: "Roadmap",
            projects: "Projets à venir",
            certifications: "Certifications visées",
            targetDate: "Objectif",
            statusLabels: {
                completed: "Terminé",
                "in-progress": "En cours",
                planned: "Planifié",
            },
            futureProjects: [
                {
                    id: "payment-api",
                    title: "API de paiement avec réconciliation automatique",
                    description:
                        "Système qui réconcilie les transactions entre la passerelle de paiement et la base de données interne, en détectant automatiquement les écarts.",
                    targetDate: "T4 2026",
                    status: "in-progress",
                },
                {
                    id: "redis-queue",
                    title: "Moteur de files d'attente avec Redis",
                    description:
                        "Mettre en place un système de traitement asynchrone pour les tâches lourdes, en remplacement du flux synchrone actuel.",
                    targetDate: "T1 2027",
                    status: "planned",
                },
            ],
            targetCertifications: [
                {
                    id: "aws-saa",
                    title: "AWS Certified Solutions Architect – Associate",
                    description:
                        "Approfondir la conception d'architectures distribuées et des services managés.",
                    targetDate: "Déc 2026",
                    status: "in-progress",
                    url: "https://aws.amazon.com/fr/certification/certified-solutions-architect-associate/",
                },
                {
                    id: "ckad",
                    title: "CKAD (Certified Kubernetes Application Developer)",
                    description:
                        "Formaliser mon expérience de déploiement de conteneurs en production.",
                    targetDate: "T2 2027",
                    status: "planned",
                    url: "https://www.cncf.io/training/certification/ckad/",
                },
            ],
        },
        resume: {
            title: "CV",
            viewButton: "Voir le CV",
            downloadButton: "Télécharger",
            close: "Fermer",
        },
    },
} as const;

export type Language = keyof typeof translations;