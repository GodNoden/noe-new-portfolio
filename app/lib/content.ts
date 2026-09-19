import type { RoadmapStatus } from './roadmap'

/** A project can only be finished or under construction, never "planned". */
export type ProjectStatus = Extract<RoadmapStatus, 'in-progress' | 'completed'>

/**
 * Shape of a portfolio project entry.
 *
 * Translation authors do not annotate the arrays with this type directly:
 * each `projects.items` array is checked with `satisfies ProjectItem[]` so the
 * compiler validates the entry (and above all its `status`) while `as const`
 * keeps the literal types the section components rely on.
 */
export type ProjectItem = {
    name: string
    tech: string
    description: string
    url?: string
    status?: ProjectStatus
}
