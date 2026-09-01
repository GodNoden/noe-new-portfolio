import { RoadmapItem as RoadmapItemType, RoadmapStatus } from '@/app/lib/roadmap';

const statusConfig: Record<RoadmapStatus, { label: string; className: string; }> = {
    completed: {
        label: 'Completado',
        className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    },
    'in-progress': {
        label: 'En progreso',
        className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    },
    planned: {
        label: 'Planificado',
        className: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
    },
};

export default function RoadmapItemCard({ item }: { item: RoadmapItemType; }) {
    const status = statusConfig[item.status];

    return (
        <div className="group relative pl-6 pb-8 last:pb-0">
            <span
                className="absolute left-[5px] top-[10px] -bottom-1 w-0.5 bg-gray-200 dark:bg-gray-700 group-last:hidden"
                aria-hidden="true"
            />

            <span className="absolute left-0 top-1 w-3 h-3 rounded-full bg-gray-900 dark:bg-gray-100 z-10" />

            <div className="flex flex-wrap items-center gap-2 mb-1">
                <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    {item.title}
                </h3>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${status.className}`}>
                    {status.label}
                </span>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {item.description}
            </p>

            <p className="text-xs text-gray-500 dark:text-gray-500">
                Objetivo: {item.targetDate}
            </p>
        </div>
    );
}