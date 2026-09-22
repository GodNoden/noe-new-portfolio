import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'

import {
    buildDrafts,
    collectProjects,
    detectKind,
    hashtagsFromText,
    localized,
    metricPhrase,
    normalizeStatus,
    parseProjectEntry,
    parseTranslations,
    pickHook,
    rankProjects,
    readSiteFacts,
    renderMarkdown,
    sentencesWithNumbers,
    signatureLine,
    signalScore,
    slug,
    splitSentences,
    truncate,
} from '../scripts/linkedin-drafts.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const translationsPath = path.join(root, 'app', 'lib', 'translations.ts')

/* -------------------------------------------------------------------------- */
/* Small utilities                                                            */
/* -------------------------------------------------------------------------- */

test('truncate normalises whitespace and marks the cut with an ellipsis', () => {
    assert.equal(truncate('  a   b\t c  ', 10), 'a b c')
    assert.equal(truncate('short', 10), 'short')
    const cut = truncate('word '.repeat(30).trim(), 50)
    assert.ok(cut.endsWith('…'))
    assert.ok(cut.length <= 51, `expected <= 51 chars, got ${cut.length}`)
})

test('truncate cuts at a word boundary when the space falls late', () => {
    const long = `${'x'.repeat(45)} tail words here that go on`
    assert.equal(truncate(long, 60), `${'x'.repeat(45)} tail words…`)
})

test('slug is stable, ascii-safe and bounded', () => {
    assert.equal(slug('BMV Auditoría 2025!'), 'bmv-auditoria-2025')
    assert.equal(slug('  ---Kapital (clone)--- '), 'kapital-clone')
    assert.ok(slug('a'.repeat(120)).length <= 60)
})

test('normalizeStatus maps the shared constants and rejects junk', () => {
    assert.equal(normalizeStatus('roadmapStatus.inProgress'), 'in-progress')
    assert.equal(normalizeStatus('roadmapStatus.completed'), 'completed')
    assert.equal(normalizeStatus('roadmapStatus.planned'), 'planned')
    assert.equal(normalizeStatus('undefined'), null)
    assert.equal(normalizeStatus(null), null)
    assert.equal(normalizeStatus('Completed'), 'completed')
    assert.equal(normalizeStatus('weird'), null)
})

/* -------------------------------------------------------------------------- */
/* translations.ts parsing                                                    */
/* -------------------------------------------------------------------------- */

test('parseProjectEntry requires name and description', () => {
    assert.equal(parseProjectEntry('name: "X", tech: "T"'), null)
    const entry = parseProjectEntry(
        `name: "Aggora", tech: "Kafka", description: "Market\\'s book", url: "https://example.test", status: roadmapStatus.completed,`,
    )
    assert.deepEqual(entry, {
        name: 'Aggora',
        tech: 'Kafka',
        description: "Market's book",
        url: 'https://example.test',
        status: 'completed',
    })
})

test('parseTranslations tolerates garbage without throwing', () => {
    const warnings = []
    assert.deepEqual(parseTranslations('nothing to see', warnings), {})
    assert.equal(warnings.length, 1)
})

test('the real translations.ts parses cleanly in all three languages', () => {
    const source = fs.readFileSync(translationsPath, 'utf8')
    const warnings = []
    const parsed = parseTranslations(source, warnings)

    assert.deepEqual(warnings, [], `unexpected parse warnings: ${warnings.join(' | ')}`)
    assert.deepEqual(Object.keys(parsed).sort(), ['en', 'es', 'fr'])
    for (const [language, projects] of Object.entries(parsed)) {
        assert.ok(projects.length > 0, `${language} has no projects`)
        for (const project of projects) {
            assert.ok(project.name, `${language} entry without name`)
            assert.ok(project.description, `${language} entry without description`)
        }
    }
})

test('the three language blocks cannot drift apart (same URLs, same order)', () => {
    // This is the invariant that keeps the CVs, the site and the drafts aligned:
    // a project added in one language must exist in the other two.
    const source = fs.readFileSync(translationsPath, 'utf8')
    const parsed = parseTranslations(source, [])
    const urls = (language) => parsed[language].map((project) => project.url ?? null)

    assert.deepEqual(urls('es'), urls('en'), 'es project URLs differ from en')
    assert.deepEqual(urls('fr'), urls('en'), 'fr project URLs differ from en')
})

test('collectProjects merges the translations by URL, falling back by position', () => {
    const warnings = []
    const merged = collectProjects(
        {
            en: [
                { name: 'One', tech: 'Java', description: 'First', url: 'https://x.test/1', status: 'completed' },
                { name: 'Two', tech: null, description: 'Second', url: 'https://x.test/2', status: null },
            ],
            es: [
                { name: 'Uno', tech: 'Java', description: 'Primero', url: 'https://x.test/1', status: 'completed' },
                { name: 'Dos', tech: 'Kafka', description: 'Segundo', url: 'https://x.test/2', status: 'in-progress' },
            ],
            fr: [],
        },
        warnings,
    )

    assert.equal(merged.length, 2)
    assert.equal(merged[0].localized.es.name, 'Uno')
    assert.equal(merged[1].tech, 'Kafka', 'tech should fall back to the Spanish entry')
    assert.equal(merged[1].status, 'in-progress')
    assert.equal(merged[1].localized.fr, null)
    assert.deepEqual(warnings, [])
})

test('localized only returns a copy that has the two required fields', () => {
    const project = {
        name: 'One',
        description: 'First',
        localized: { en: { name: 'One', description: 'First' }, es: { name: 'Uno' } },
    }
    assert.equal(localized(project, 'en').name, 'One')
    assert.equal(localized(project, 'es'), null, 'es copy lacks a description')
    assert.equal(localized(project, 'fr'), null)
})

/* -------------------------------------------------------------------------- */
/* Fact extraction                                                            */
/* -------------------------------------------------------------------------- */

test('splitSentences never breaks decimal numbers', () => {
    assert.deepEqual(splitSentences('CLS dropped from 0.689 to 0. It shipped.'), [
        'CLS dropped from 0.689 to 0.',
        'It shipped.',
    ])
})

test('sentencesWithNumbers keeps only quotable, concrete sentences', () => {
    const text = 'Shipped six Lambdas for the portal. Reduced CLS from 0.689 to 0 on mobile. Fine.'
    const metrics = sentencesWithNumbers(text, 4)
    assert.deepEqual(metrics, ['Reduced CLS from 0.689 to 0 on mobile.'])
})

test('metricPhrase cuts to the clause that carries the number', () => {
    assert.equal(
        metricPhrase('Includes a ~5 KB prototype font, reducing CLS from 0.689 to 0, using fallbacks.'),
        'CLS from 0.689 to 0',
    )
    assert.equal(metricPhrase('No verb trigger here, just 42 things done.'), 'No verb trigger here, just 42 things done.')
    assert.equal(metricPhrase(''), null)
})

test('detectKind recognises the two story shapes', () => {
    assert.equal(detectKind('A full audit of the catalog'), 'audit')
    assert.equal(detectKind('Una auditoría del catálogo'), 'audit')
    assert.equal(detectKind('Kapital rebuild notes'), 'rebuild')
    assert.equal(detectKind('Cualquier otra cosa'), 'generic')
})

test('hashtagsFromText never exceeds five tags', () => {
    const tags = hashtagsFromText('Java Spring Boot AWS Lambda Kafka PostgreSQL Docker', ['#Extra'])
    assert.ok(tags.length <= 5, `got ${tags.length} tags`)
    assert.ok(tags.includes('#Extra'))
    assert.equal(new Set(tags).size, tags.length, 'no duplicate tags')
})

test('pickHook is deterministic per variant and language', () => {
    const copy = { name: 'BMV Audit', description: 'An audit of the BMV catalog', tech: 'Java' }
    assert.match(pickHook('performance', 'en', copy, null, 'CLS 0→0.689'), /^I measured BMV Audit/)
    assert.match(pickHook('performance', 'es', copy, null, 'CLS 0→0.689'), /^Medí BMV Audit/)
    assert.match(pickHook('spotlight', 'en', copy, null, null), /^Currently building: BMV Audit/)
    assert.match(pickHook('spotlight', 'es', copy, null, null), /^Actualmente construyendo: BMV Audit/)
})

test('rankProjects prefers the strongest signal and keeps ties stable', () => {
    const projects = [
        { name: 'A', description: 'nothing here', tech: null },
        { name: 'B', description: 'p95 latency 120 ms, throughput up', tech: 'Java' },
        { name: 'C', description: 'some latency work', tech: null },
    ]
    const ranked = rankProjects(projects, [/latency/i, /\bms\b/i])
    assert.equal(ranked[0].name, 'B')
    assert.equal(ranked[1].name, 'C', 'first match keeps source order on a tie')
    assert.equal(signalScore(ranked[0], [/latency/i, /\bms\b/i]), 2)
})

test('signatureLine is short, informative and optional', () => {
    assert.equal(signatureLine(null), null)
    assert.equal(signatureLine({ name: 'Noe Quezada' }), 'Noe Quezada')
    assert.equal(
        signatureLine({ name: 'Noe Quezada', jobTitle: 'Backend Engineer', github: 'https://github.com/GodNoden' }),
        'Noe Quezada · Backend Engineer · https://github.com/GodNoden',
    )
})

test('readSiteFacts reads the real site.ts', () => {
    const site = readSiteFacts(root)
    assert.equal(site.name, 'Noe Quezada')
    assert.equal(site.jobTitle, 'Backend Engineer')
    assert.match(site.github, /^https:\/\/github\.com\//)
})

/* -------------------------------------------------------------------------- */
/* Draft assembly                                                             */
/* -------------------------------------------------------------------------- */

const project = (name, description, url, status = 'completed') => ({
    index: 0,
    name,
    tech: 'Java, Spring Boot',
    description,
    url,
    status,
    localized: {
        en: { name, description, tech: 'Java, Spring Boot', url, status },
        es: { name: `${name} ES`, description: `${description} (ES)`, tech: 'Java, Spring Boot', url, status },
        fr: null,
    },
})

test('buildDrafts produces at most three drafts, each in en and es', () => {
    const projects = [
        project('Fast API', 'Cut p95 latency by 40% and reduced CLS from 0.689 to 0.', 'https://x.test/1'),
        project('Streams', 'Kafka exactly-once consumer with a dead-letter topic.', 'https://x.test/2'),
        project('Other', 'A project without any measurable claim.', 'https://x.test/3'),
    ]
    const commits = [
        { hash: 'abc1234', date: '2026-01-05 10:00:00 +0000', subject: 'Fix the pipeline' },
        { hash: 'def5678', date: '2026-01-06 10:00:00 +0000', subject: 'Add metrics' },
    ]

    const drafts = buildDrafts({ projects, commits, site: readSiteFacts(root) })
    assert.ok(drafts.length >= 2 && drafts.length <= 3, `got ${drafts.length} drafts`)
    assert.ok(new Set(drafts.map((draft) => draft.id)).size === drafts.length, 'draft ids must be unique')
    for (const draft of drafts) {
        assert.ok(draft.en.post.length > 0)
        assert.ok(draft.es.post.length > 0)
        assert.ok(draft.evidence.length > 0, 'every draft cites its source')
    }
})

test('buildDrafts never invents a draft when there is nothing to say', () => {
    assert.deepEqual(buildDrafts({ projects: [], commits: [], site: null }), [])
})

test('renderMarkdown is deterministic and always explains the provenance', () => {
    const projects = [project('Fast API', 'Cut p95 latency by 40% on the hot path.', 'https://x.test/1')]
    const args = { projects, commits: [], site: readSiteFacts(root) }
    const drafts = buildDrafts(args)

    const first = renderMarkdown({ dryRun: true, gitRead: false, drafts, warnings: [], ...args })
    const second = renderMarkdown({ dryRun: true, gitRead: false, drafts, warnings: [], ...args })

    assert.equal(first, second)
    assert.match(first, /### English/)
    assert.match(first, /### Español/)
    assert.match(first, /Sources: app\/lib\/translations\.ts/)
    assert.match(first, /Nothing is published automatically/)
})

test('renderMarkdown admits when it has nothing, instead of inventing posts', () => {
    const markdown = renderMarkdown({
        dryRun: true,
        gitRead: false,
        drafts: [],
        warnings: ['Could not read app/lib/translations.ts'],
        projects: [],
        commits: [],
    })
    assert.match(markdown, /## No drafts generated/)
    assert.match(markdown, /Nothing was invented to fill the gap/)
    assert.match(markdown, /### Diagnostics/)
})
