import { RoadmapItem, RoadmapStatus } from '../lib/roadmap'
import { ExternalLink } from 'lucide-react'

type StatusLabels = Record<RoadmapStatus, string>

const statusStyles: Record<RoadmapStatus, string> = {
    completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    planned: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
}

type Props = {
    item: RoadmapItem
    statusLabels: StatusLabels
    targetDateLabel: string
}

export default function RoadmapItemCard({ item, statusLabels, targetDateLabel }: Props) {
    return (
        <div className="group relative pl-6 pb-8 last:pb-0">
            <span
                className="absolute left-[5px] top-[10px] -bottom-1 w-0.5 bg-gray-200 dark:bg-gray-700 group-last:hidden"
                aria-hidden="true"
            />
            <span className="absolute left-0 top-1 w-3 h-3 rounded-full bg-gray-900 dark:bg-gray-100 z-10" />

            <div className="flex flex-wrap items-center gap-2 mb-1">
                <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    {item.url ? (
                        <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 hover:underline"
                        >
                            {item.title}
                            <ExternalLink className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                        </a>
                    ) : (
                        item.title
                    )}
                </h3>
                <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyles[item.status]}`}
                >
                    {statusLabels[item.status]}
                </span>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {item.description}
            </p>

            <p className="text-xs text-gray-500 dark:text-gray-500">
                {targetDateLabel}: {item.targetDate}
            </p>
        </div>
    )
}