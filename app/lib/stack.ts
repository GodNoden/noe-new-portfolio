export type StackCategory = {
    id:
        | 'languages'
        | 'frameworks'
        | 'streaming'
        | 'cloud'
        | 'databases'
        | 'architecture'
        | 'testing'
        | 'tools'
    items: string[]
}

/**
 * Canonical technical skills. The portfolio section, the generated CVs and any
 * future output all read from this list, so a skill is declared exactly once.
 */
export const stackCategories: StackCategory[] = [
    {
        id: 'languages',
        items: ["Java", "SQL", "PHP", "TypeScript", "Bash"],
    },
    {
        id: 'frameworks',
        items: ["Spring Boot", "Spring Batch", "Quarkus", "Laravel"],
    },
    {
        id: 'streaming',
        items: [
            "Apache Kafka",
            "Kafka Streams (windowed analytics, state stores)",
            "Exactly-once semantics (transactional producers)",
            "Dead-letter & retry topics",
            "Schema Registry (Avro)",
            "Prometheus",
        ],
    },
    {
        id: 'cloud',
        items: [
            "AWS (Lambda, API Gateway, CloudFormation, S3, Cognito, CloudWatch, IAM)",
            "Azure",
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
    {
        id: 'tools',
        items: ["Git", "Jira", "Postman"],
    },
]
