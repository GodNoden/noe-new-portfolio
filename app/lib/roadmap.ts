export type RoadmapStatus = 'completed' | 'in-progress' | 'planned';

export type RoadmapItem = {
    title: string;
    description: string;
    status: RoadmapStatus;
    targetDate: string;
    url?: string;
};

export const futureProjects: RoadmapItem[] = [
    {
        title: 'API de pagos con conciliación automática',
        description: 'Sistema que reconcilia transacciones entre la pasarela de pagos y la base de datos interna, detectando discrepancias automáticamente.',
        status: 'in-progress',
        targetDate: 'Q4 2026',
    },
    {
        title: 'Motor de colas con Redis',
        description: 'Implementar un sistema de procesamiento asíncrono para tareas pesadas, reemplazando el procesamiento síncrono actual.',
        status: 'planned',
        targetDate: 'Q1 2027',
    },
];

export const targetCertifications: RoadmapItem[] = [
    {
        title: 'AWS Solutions Architect Associate',
        description: 'Para profundizar en diseño de arquitecturas distribuidas y servicios gestionados.',
        status: 'in-progress',
        targetDate: 'Dic 2026',
    },
    {
        title: 'CKAD (Certified Kubernetes Application Developer)',
        description: 'Formalizar mi experiencia desplegando contenedores en producción.',
        status: 'planned',
        targetDate: 'Q2 2027',
    },
];