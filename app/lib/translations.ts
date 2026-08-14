export const translations = {
    en: {
        name: "Noe Ixmak Quezada Torres",
        title: "Software Development Engineer",
        subtitle: "Specialized in backend and systems architecture",
        nav: {
            experience: "Experience",
            projects: "Projects",
            stack: "Tech Stack",
            contact: "Contact",
        },
        experience: {
            title: "Experience",
            job1: {
                role: "Senior Backend Developer",
                company: "XYZ Company · 2022 - Present",
                description: "Design and implementation of RESTful APIs with Python and PostgreSQL. Reduced critical query response time by 40%.",
            },
        },
        projects: {
            title: "Projects",
            project1: {
                name: "Inventory System v2",
                tech: "Node.js · Express · MongoDB",
                description: "Internal application for managing real-time stock. Handles data synchronization between 3 branches.",
            },
        },
        stack: { title: "Tech Stack" },
        contact: {
            title: "Contact",
            intro: "I'm open to backend development and software architecture opportunities.",
        },
        roadmap: {
            title: 'Roadmap',
            nav: 'Roadmap',
            projects: 'Upcoming projects',
            certifications: 'Target certifications',
        },
    },
    es: {
        name: "Noe Ixmak Quezada Torres",
        title: "Ingeniero en Desarrollo de Software",
        subtitle: "Especializado en backend y arquitectura de sistemas",
        nav: {
            experience: "Experiencia",
            projects: "Proyectos",
            stack: "Stack",
            contact: "Contacto",
        },
        experience: {
            title: "Experiencia",
            job1: {
                role: "Desarrollador Backend Senior",
                company: "Empresa XYZ · 2022 - Presente",
                description: "Diseño e implementación de APIs RESTful con Python y PostgreSQL. Reduje el tiempo de respuesta de consultas críticas en un 40%.",
            },
        },
        projects: {
            title: "Proyectos",
            project1: {
                name: "Sistema de Inventario v2",
                tech: "Node.js · Express · MongoDB",
                description: "Aplicación interna para gestionar stock en tiempo real. Maneja sincronización de datos entre 3 sucursales.",
            },
        },
        stack: { title: "Stack Tecnológico" },
        contact: {
            title: "Contacto",
            intro: "Estoy abierto a oportunidades en desarrollo backend y arquitectura de software.",
        },
        roadmap: {
            title: 'Roadmap',
            nav: 'Roadmap',
            projects: 'Proyectos futuros',
            certifications: 'Certificaciones en mira',
        },
    },
    fr: {
        name: "Noe Ixmak Quezada Torres",
        title: "Ingénieur en Développement Logiciel",
        subtitle: "Spécialisé en backend et architecture systèmes",
        nav: {
            experience: "Expérience",
            projects: "Projets",
            stack: "Stack",
            contact: "Contact",
        },
        experience: {
            title: "Expérience",
            job1: {
                role: "Développeur Backend Senior",
                company: "Entreprise XYZ · 2022 - Présent",
                description: "Conception et implémentation d'APIs RESTful avec Python et PostgreSQL. Réduction du temps de réponse des requêtes critiques de 40%.",
            },
        },
        projects: {
            title: "Projets",
            project1: {
                name: "Système d'Inventaire v2",
                tech: "Node.js · Express · MongoDB",
                description: "Application interne pour gérer le stock en temps réel. Gère la synchronisation des données entre 3 succursales.",
            },
        },
        stack: { title: "Stack Technique" },
        contact: {
            title: "Contact",
            intro: "Je suis ouvert aux opportunités en développement backend et architecture logicielle.",
        },
        roadmap: {
            title: 'Roadmap',
            nav: 'Roadmap',
            projects: 'Projets à venir',
            certifications: 'Certifications visées',
        },
    },
} as const;

export type Language = keyof typeof translations;