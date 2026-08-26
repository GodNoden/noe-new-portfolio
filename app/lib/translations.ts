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
        role: "Backend Developer Jr.",
        company: "Folio3 Software Inc.",
        link: "https://folio3.com/",
    },
} as const;

export const translations = {
    en: {
        name: "Noe Quezada",
        title: "Software Development Engineer",
        subtitle: "Specialized in backend and systems architecture",
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
                        "Designed and deployed 6+ serverless AWS Lambda functions powering a customer self-service portal. Enabled clients to request loan deferments online, eliminating the need to visit physical branches. Integrated with the Fiserv–DNA core banking system through event-driven architectures.",
                },
                {
                    ...experienceMeta.dxc,
                    dates: "· Sep 2023 - Jun 2024",
                    description:
                        "Built and maintained backend services in Java and Spring Boot for Grupo Bimbo (NYSE: BIMBO), one of the world's largest bakery companies. Led the modernization of a legacy catalog and inventory system, exposing new capabilities through well-defined REST APIs following a layered Controller–Service–Repository architecture.",
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
            project1: {
                name: "Inventory System v2",
                tech: "Node.js · Express · MongoDB",
                description:
                    "Internal application for managing real-time stock. Handles data synchronization between 3 branches.",
            },
        },
        stack: { title: "Tech Stack" },
        contact: {
            title: "Contact",
            intro:
                "I'm open to backend development and software architecture opportunities.",
        },
        roadmap: {
            title: "Roadmap",
            nav: "Roadmap",
            projects: "Upcoming projects",
            certifications: "Target certifications",
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
        title: "Ingeniero en Desarrollo de Software",
        subtitle: "Especializado en backend y arquitectura de sistemas",
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
                        "Diseñé y desplegué más de 6 funciones serverless en AWS Lambda que alimentan un portal de autoservicio para clientes. Habilité que los clientes solicitaran prórrogas de préstamos en línea, eliminando la necesidad de visitar sucursales físicas. Integré con el sistema core bancario Fiserv–DNA mediante arquitecturas orientadas a eventos.",
                },
                {
                    ...experienceMeta.dxc,
                    dates: "· Sep 2023 - Jun 2024",
                    description:
                        "Desarrollé y mantuve servicios backend en Java y Spring Boot para Grupo Bimbo (NYSE: BIMBO), una de las empresas de panificación más grandes del mundo. Lideré la modernización de un sistema legacy de catálogo e inventario, exponiendo nuevas capacidades a través de APIs REST bien definidas siguiendo una arquitectura en capas Controller–Service–Repository.",
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
            project1: {
                name: "Sistema de Inventario v2",
                tech: "Node.js · Express · MongoDB",
                description:
                    "Aplicación interna para gestionar stock en tiempo real. Maneja sincronización de datos entre 3 sucursales.",
            },
        },
        stack: { title: "Stack Tecnológico" },
        contact: {
            title: "Contacto",
            intro:
                "Estoy abierto a oportunidades en desarrollo backend y arquitectura de software.",
        },
        roadmap: {
            title: "Roadmap",
            nav: "Roadmap",
            projects: "Proyectos futuros",
            certifications: "Certificaciones en mira",
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
        title: "Ingénieur en Développement Logiciel",
        subtitle: "Spécialisé en backend et architecture systèmes",
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
                        "Conception et déploiement de plus de 6 fonctions serverless AWS Lambda alimentant un portail en libre-service pour les clients. Permis aux clients de demander des reports de prêt en ligne, éliminant la nécessité de se rendre en agence. Intégration avec le système bancaire central Fiserv–DNA via des architectures événementielles.",
                },
                {
                    ...experienceMeta.dxc,
                    dates: "· Sept 2023 - Juin 2024",
                    description:
                        "Développement et maintenance de services backend en Java et Spring Boot pour Grupo Bimbo (NYSE: BIMBO), l'une des plus grandes entreprises de boulangerie au monde. Pilotage de la modernisation d'un système legacy de catalogue et d'inventaire, exposition de nouvelles capacités via des APIs REST bien définies suivant une architecture en couches Controller–Service–Repository.",
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
            project1: {
                name: "Système d'Inventaire v2",
                tech: "Node.js · Express · MongoDB",
                description:
                    "Application interne pour gérer le stock en temps réel. Gère la synchronisation des données entre 3 succursales.",
            },
        },
        stack: { title: "Stack Technique" },
        contact: {
            title: "Contact",
            intro:
                "Je suis ouvert aux opportunités en développement backend et architecture logicielle.",
        },
        roadmap: {
            title: "Roadmap",
            nav: "Roadmap",
            projects: "Projets à venir",
            certifications: "Certifications visées",
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