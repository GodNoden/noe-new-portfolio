export type StackCategory = {
    id: 'languages' | 'frameworks' | 'cloud' | 'databases' | 'architecture'
    items: string[]
}

export const stackCategories: StackCategory[] = [
    {
        id: 'languages',
        items: ["Java", "Python", "PHP", "TypeScript", "SQL"],
    },
    {
        id: 'frameworks',
        items: ["Spring Boot", "Laravel", "FastAPI", "Express", "JUnit", "PHPUnit"],
    },
    {
        id: 'cloud',
        items: [
            "AWS (Lambda, API Gateway, SQS, RDS, S3)",
            "CloudFormation",
            "Docker",
            "CI/CD (GitHub Actions)",
            "Linux",
        ],
    },
    {
        id: 'databases',
        items: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
    },
    {
        id: 'architecture',
        items: [
            "REST API Design",
            "OpenAPI / Swagger",
            "Event-driven architecture",
            "Microservices",
            "Serverless",
            "Layered architecture (Controller–Service–Repository)",
            "MVC",
        ],
    },
]