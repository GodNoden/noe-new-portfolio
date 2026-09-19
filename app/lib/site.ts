/**
 * Single source of truth for canonical site metadata.
 *
 * Used by the root layout (metadata + JSON-LD), robots.txt and sitemap.xml so
 * the canonical host and the descriptions can never drift apart.
 */
export const siteUrl = 'https://www.ixmak.com'

export const site = {
    url: siteUrl,
    name: 'Noe Quezada',
    jobTitle: 'Backend Engineer',
    tagline: 'Building financial systems on AWS',
    title: 'Noe Quezada — Backend Engineer | Java · Spring Boot · AWS',
    description:
        'Backend Engineer building financial systems on AWS. Java, Spring Boot, serverless and event-driven architectures. Open to remote fintech roles.',
    email: 'quezadanoe@gmail.com',
    linkedin: 'https://www.linkedin.com/in/noe-ixmak-quezada/',
    github: 'https://github.com/GodNoden',
    location: {
        city: 'Guadalajara',
        region: 'Jalisco',
        country: 'México',
        countryCode: 'MX',
    },
    employer: 'Tekchoice LLC',
    almaMater: 'Universidad de Guadalajara',
    knowsAbout: [
        'Java',
        'Spring Boot',
        'AWS',
        'AWS Lambda',
        'Serverless',
        'Apache Kafka',
        'Event-driven architecture',
        'PostgreSQL',
        'Microservices',
        'REST API design',
    ],
} as const

/** JSON-LD `Person` graph describing the owner of the site. */
export const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    url: site.url,
    jobTitle: site.jobTitle,
    description: site.description,
    email: `mailto:${site.email}`,
    address: {
        '@type': 'PostalAddress',
        addressLocality: site.location.city,
        addressRegion: site.location.region,
        addressCountry: site.location.countryCode,
    },
    alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: site.almaMater,
    },
    worksFor: {
        '@type': 'Organization',
        name: site.employer,
    },
    knowsAbout: [...site.knowsAbout],
    sameAs: [site.linkedin, site.github],
}
