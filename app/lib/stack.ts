export type StackCategory = {
    id: 'languages' | 'frameworks' | 'cloud' | 'databases' | 'architecture' | 'testing'
    items: string[]
}

export const stackCategories: StackCategory[] = [
    {
        id: 'languages',
        items: ["Java", "SQL", "PHP", "TypeScript"],
    },
    {
        id: 'frameworks',
        items: ["Spring Boot", "Laravel"],
    },
    {
        id: 'cloud',
        items: [
            "AWS (Lambda, API Gateway, CloudFormation, S3, Cognito, CloudWatch, IAM)",
            "Docker",
            "CI/CD (GitHub Actions)",
            "Linux",
        ],
    },
    {
        id: 'databases',
        items: ["PostgreSQL", "MySQL"],
    },
    {
        id: 'architecture',
        items: [
            "REST API Design",
            "Swagger",
            "Microservices",
            "Serverless",
            "Layered architecture (Controller–Service–Repository)",
            "MVC",
        ],
    },
    {
        id: 'testing',
        items: ["JUnit", "PHPUnit"],
    },
]