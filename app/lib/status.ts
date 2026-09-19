import type { RoadmapStatus } from './roadmap'

/**
 * Canonical status literals, shared by every language.
 *
 * Content data must reference these constants instead of writing the string
 * inline. That way the compiler verifies the value: a typo such as "Completed"
 * (capitalised) previously slipped through, rendered an empty badge with no
 * colour, and broke the production build at the same time.
 */
export const roadmapStatus = {
    completed: 'completed',
    inProgress: 'in-progress',
    planned: 'planned',
} as const satisfies Record<string, RoadmapStatus>
