export type RoadmapStatus = 'completed' | 'in-progress' | 'planned'

export type RoadmapItem = {
    id: string
    title: string
    description: string
    targetDate: string
    status: RoadmapStatus
    url?: string
}