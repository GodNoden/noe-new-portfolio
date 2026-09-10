import { useTranslation } from '../lib/context'
import RoadmapItemCard from './RoadmapItem'

export default function RoadmapSection() {
    const { t } = useTranslation()

    return (
        <section id="roadmap" className="scroll-mt-8">
            <h2 className="text-xl font-semibold mb-6 border-b border-gray-200 dark:border-gray-800 pb-2">
                {t.roadmap.title}
            </h2>

            <div className="space-y-8">
                <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-4">
                        {t.roadmap.projects}
                    </h3>
                    <div className="space-y-0">
                        {t.roadmap.futureProjects.map((item) => (
                            <RoadmapItemCard
                                key={item.id}
                                item={item}
                                statusLabels={t.roadmap.statusLabels}
                                targetDateLabel={t.roadmap.targetDate}
                            />
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-4">
                        {t.roadmap.certifications}
                    </h3>
                    <div className="space-y-0">
                        {t.roadmap.targetCertifications.map((item) => (
                            <RoadmapItemCard
                                key={item.id}
                                item={item}
                                statusLabels={t.roadmap.statusLabels}
                                targetDateLabel={t.roadmap.targetDate}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}