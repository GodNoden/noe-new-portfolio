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
            items: [
                {
                    name: "My Portfolio",
                    tech: "NextJS · TypeScript · TailwindCSS · AWS Amplify",
                    description:
                        "A personal portfolio website showcasing my experience, projects, and skills. Built with NextJS and TypeScript, styled with TailwindCSS, and deployed on AWS Amplify.",
                },
                {
                    name: "ComerBien (Recipe and Nutritional Tracking App)",
                    tech: "React · Java · Spring Boot · PostgreSQL · Docker · Railway · Netlify",
                    description:
                        "A web application that allows users to track their meals, recipes, and nutritional intake. Built with React for the frontend and Java with Spring Boot for the backend, using PostgreSQL as the database. Developed using Docker for containerization and DB and Backend deployed on Railway and Frontend deployed on Netlify.",
                },
                {
                    name: "Personal Blog",
                    tech: "NextJS · C# · ASP.NET Core · MySQL · Docker · GCP",
                    description:
                        "A personal blog platform where I can create and share my thoughts. Built with NextJS for the frontend and C# with ASP.NET Core for the backend, using MySQL as the database. Developed using Docker for containerization and deployed on Google Cloud Platform.",
                },
            ]
        },

        stack: {
            title: "Tech Stack",
            categories: {
                languages: "Languages",
                frameworks: "Frameworks & Libraries",
                cloud: "Cloud & DevOps",
                databases: "Databases",
                architecture: "Architecture & Patterns",
            },
        },
        contact: {
            title: "Contact",
            intro: "I'm open to backend development and software architecture opportunities.",
            availability: "Available for remote work",
            location: "Based in Mexico City",
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
            items: [{
                name: "Mi Portafolio",
                tech: "NextJS · TypeScript · TailwindCSS · AWS Amplify",
                description:
                    "Un sitio web de portafolio personal que muestra mi experiencia, proyectos y habilidades. Construido con NextJS y TypeScript, estilizado con TailwindCSS y desplegado en AWS Amplify.",
            }, {
                name: "ComerBien (Aplicación de seguimiento de recetas y nutrición)",
                tech: "React · Java · Spring Boot · PostgreSQL · Docker · Railway · Netlify",
                description:
                    "Una aplicación web que permite a los usuarios realizar un seguimiento de sus comidas, recetas e ingesta nutricional. Construida con React para el frontend y Java con Spring Boot para el backend, utilizando PostgreSQL como base de datos. Desarrollada usando Docker para la contenedorización y desplegada en Railway (DB y Backend) y Netlify (Frontend).",
            }, {
                name: "Blog Personal",
                tech: "NextJS · C# · ASP.NET Core · MySQL · Docker · GCP",
                description:
                    "Una plataforma de blog personal donde puedo crear y compartir mis pensamientos. Construida con NextJS para el frontend y C# con ASP.NET Core para el backend, utilizando MySQL como base de datos. Desarrollada usando Docker para la contenedorización y desplegada en Google Cloud Platform.",
            }]
        },
        stack: {
            title: "Stack Tecnológico",
            categories: {
                languages: "Lenguajes",
                frameworks: "Frameworks y librerías",
                cloud: "Cloud y DevOps",
                databases: "Bases de datos",
                architecture: "Arquitectura y patrones",
            },
        },
        contact: {
            title: "Contacto",
            intro: "Estoy abierto a oportunidades en desarrollo backend y arquitectura de software.",
            availability: "Disponible para trabajo remoto",
            location: "Basado en Ciudad de México",
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
            items: [{
                name: "Mon Portefeuille",
                tech: "NextJS · TypeScript · TailwindCSS · AWS Amplify",
                description:
                    "Un site web de portefeuille personnel présentant mon expérience, mes projets et mes compétences. Construit avec NextJS et TypeScript, stylisé avec TailwindCSS et déployé sur AWS Amplify.",
            }, {
                name: "ComerBien (Application de suivi de recettes et nutrition)",
                tech: "React · Java · Spring Boot · PostgreSQL · Docker · Railway · Netlify",
                description:
                    "Une application web qui permet aux utilisateurs de suivre leurs repas, recettes et apports nutritionnels. Construite avec React pour le frontend et Java avec Spring Boot pour le backend, utilisant PostgreSQL comme base de données. Développée en utilisant Docker pour la conteneurisation et déployée sur Railway (DB et Backend) et Netlify (Frontend).",
            }, {
                name: "Blog Personnel",
                tech: "NextJS · C# · ASP.NET Core · MySQL · Docker · GCP",
                description:
                    "Une plateforme de blog personnel où je peux créer et partager mes pensées. Construite avec NextJS pour le frontend et C# avec ASP.NET Core pour le backend, en utilisant MySQL comme base de données. Développée en utilisant Docker pour la conteneurisation et déployée sur Google Cloud Platform.",
            }]
        },
        stack: {
            title: "Stack Technique",
            categories: {
                languages: "Langages",
                frameworks: "Frameworks et bibliothèques",
                cloud: "Cloud et DevOps",
                databases: "Bases de données",
                architecture: "Architecture et patterns",
            },
        },
        contact: {
            title: "Contact",
            intro: "Je suis ouvert aux opportunités en développement backend et architecture logicielle.",
            availability: "Disponible pour travail à distance",
            location: "Basé à Mexico",
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