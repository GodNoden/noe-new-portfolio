#!/usr/bin/env node
/**
 * Builds LinkedIn post drafts out of facts that already exist in this
 * repository. Two data sources are used, never anything invented:
 *
 *   1. `app/lib/translations.ts` — the portfolio project entries, parsed
 *      tolerantly (a malformed file degrades instead of throwing).
 *   2. `git log --since="<cadence> days ago"` — recent commits, read-only and
 *      always through `execFileSync` with an argument array, never shell
 *      interpolation.
 *
 * Usage:
 *   node scripts/linkedin-drafts.mjs --dry-run   # markdown to stdout, no git
 *   node scripts/linkedin-drafts.mjs             # writes a temp .md, prints its path
 *
 * Safety contract
 * ---------------
 *   • No dependencies: only node:fs, node:path, node:child_process, node:process.
 *   • Nothing is ever published and the LinkedIn API is never called.
 *   • `--dry-run` renders only the static repository files: it does not run git,
 *     does not touch the network, writes no file and exits 0. Pass the explicit
 *     opt-in `--include-commits` to preview the git-based draft too (read-only).
 *   • Normal mode writes the markdown to a temp file and prints ONLY the
 *     absolute path on stdout, so a workflow can feed it to `--body-file`.
 *     Diagnostics always go to stderr, keeping stdout machine-readable.
 *   • Deterministic: no randomness, so the same inputs render the same markdown.
 */

import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import process from 'node:process'

/* -------------------------------------------------------------------------- */
/* Configuration                                                              */
/* -------------------------------------------------------------------------- */

const LANGUAGES = ['en', 'es', 'fr']
const PRIMARY_LANGUAGE = 'en'
const SECONDARY_LANGUAGE = 'es'
const OUTPUT_LANGUAGES = [PRIMARY_LANGUAGE, SECONDARY_LANGUAGE]

/**
 * Posting rhythm, in days. The workflow fires weekly and a guard keeps only
 * every third run, so the commit window has to match the cadence: with a
 * 7-day window a 21-day cadence would only ever see the tail of the period.
 */
const CADENCE_DAYS = 21

const COMMIT_SINCE = `${CADENCE_DAYS} days ago`
const COMMIT_PRETTY = '%h%x09%ci%x09%s'

const TRANSLATIONS_FROM_ROOT = path.join('app', 'lib', 'translations.ts')
const SITE_FROM_ROOT = path.join('app', 'lib', 'site.ts')

const USAGE = `Generates LinkedIn drafts from real repository facts.

Usage:
  node scripts/linkedin-drafts.mjs --dry-run                   Print the markdown to stdout (no git, no network)
  node scripts/linkedin-drafts.mjs --dry-run --include-commits Print the markdown including the git-based draft
  node scripts/linkedin-drafts.mjs                             Write the markdown to a temp file and print its path

Options:
  --dry-run          Render to stdout; never runs git and never writes a file.
  --include-commits  With --dry-run, also read the git log (read-only) so the
                     commit-based draft appears in the preview.
  -h, --help         Show this message.`

/** Signals that a project has measurable performance work worth a post. */
const PERFORMANCE_SIGNALS = [
    /\bCLS\b/,
    /\bTBT\b/,
    /\bLCP\b/,
    /\bLighthouse\b/,
    /\baxe\b/,
    /performance/i,
    /\d+(?:[.,]\d+)?\s*%/,
    /\b\d+\s*ms\b/i,
    /\bKB\b/,
    /\bHTTP requests?\b/i,
    /reduced|reducing|cut|eliminating|redujo|reduciendo|reducci[oó]n/i,
]

/** Signals that a project is backend/event-driven work worth a post. */
const STREAMING_SIGNALS = [
    /\bKafka\b/i,
    /Kafka Streams/i,
    /event[- ]driven|orientad[oa]s? a eventos|événementiel/i,
    /exactly[- ]once/i,
    /dead[- ]?letter/i,
    /\bDLT\b/,
    /poison/i,
    /\bPrometheus\b/i,
    /AWS Lambda/i,
    /serverless/i,
    /microservices?|microservicios?/i,
    /Spring Boot/i,
    /\bQuarkus\b/i,
    /\btopics?\b/i,
    /\bstream/i,
]

/** Technology token -> LinkedIn hashtag. Order matters; `\b` keeps Java != JavaScript. */
const HASHTAG_RULES = [
    [/\bapache kafka\b|\bkafka streams\b|\bkafka\b/i, '#ApacheKafka'],
    [/\bspring boot\b/i, '#SpringBoot'],
    [/\bquarkus\b/i, '#Quarkus'],
    [/\bprometheus\b/i, '#Prometheus'],
    [/\bpostgresql\b/i, '#PostgreSQL'],
    [/\bmysql\b/i, '#MySQL'],
    [/\btypescript\b/i, '#TypeScript'],
    [/\bjavascript\b/i, '#JavaScript'],
    [/\bnext\.?js\b/i, '#NextJS'],
    [/\breact\b/i, '#React'],
    [/\bastro\b/i, '#Astro'],
    [/\btailwind\b/i, '#TailwindCSS'],
    [/\bi18n\b/i, '#i18n'],
    [/\blighthouse\b|\bcls\b|\btbt\b/i, '#WebPerformance'],
    [/\baxe\b/i, '#A11y'],
    [/\baws\b|\blambda\b/i, '#AWS'],
    [/\bdocker\b/i, '#Docker'],
    [/\bc#\b|asp\.net/i, '#DotNET'],
    [/\bgcp\b|google cloud/i, '#GCP'],
    [/\bjava\b/i, '#Java'],
]

const GENERIC_HASHTAGS = ['#SoftwareEngineering', '#BackendEngineering', '#BuildInPublic']

/* -------------------------------------------------------------------------- */
/* Small utilities                                                            */
/* -------------------------------------------------------------------------- */

const utcDate = () => new Date().toISOString().slice(0, 10)

function truncate(text, max) {
    const value = String(text ?? '')
        .replace(/\s+/g, ' ')
        .trim()
    if (value.length <= max) return value
    const cut = value.slice(0, max)
    const at = cut.lastIndexOf(' ')
    return `${(at > 40 ? cut.slice(0, at) : cut).trim()}…`
}

function slug(text) {
    return String(text ?? '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 60)
}

function readFileSafe(file) {
    try {
        return { ok: true, text: fs.readFileSync(file, 'utf8') }
    } catch (error) {
        return { ok: false, error: error && error.code ? error.code : String(error) }
    }
}

/** Repo root is derived from the entry script path, with cwd as a fallback. */
function resolveRepoRoot() {
    const candidates = []
    if (process.argv[1]) candidates.push(path.resolve(path.dirname(process.argv[1]), '..'))
    candidates.push(process.cwd())
    for (const candidate of candidates) {
        if (fs.existsSync(path.join(candidate, TRANSLATIONS_FROM_ROOT))) return candidate
    }
    return candidates[0] ?? process.cwd()
}

/* -------------------------------------------------------------------------- */
/* Git history (read-only, array args, never a shell)                         */
/* -------------------------------------------------------------------------- */

function collectCommits(root, warnings) {
    try {
        const output = execFileSync(
            'git',
            ['log', `--since=${COMMIT_SINCE}`, `--pretty=format:${COMMIT_PRETTY}`],
            {
                cwd: root,
                encoding: 'utf8',
                stdio: ['ignore', 'pipe', 'pipe'],
                timeout: 20_000,
                maxBuffer: 10 * 1024 * 1024,
            },
        )
        return output
            .split('\n')
            .map((line) => line.trim())
            .filter(Boolean)
            .map((line) => {
                const [hash, date, ...rest] = line.split('\t')
                return { hash, date, subject: rest.join('\t').trim() }
            })
            .filter((commit) => commit.hash && commit.subject)
    } catch (error) {
        const reason = error && error.code ? error.code : String(error)
        warnings.push(`\`git log\` failed (${reason}); commit drafts are unavailable.`)
        return []
    }
}

/* -------------------------------------------------------------------------- */
/* translations.ts parsing (tolerant: never throws)                           */
/* -------------------------------------------------------------------------- */

function decodeTsString(raw) {
    return raw
        .replace(/\\n/g, '\n')
        .replace(/\\"/g, '"')
        .replace(/\\'/g, "'")
        .replace(/\\\\/g, '\\')
        .trim()
}

function readStringField(chunk, field) {
    const pattern = new RegExp(`\\b${field}\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"`, 's')
    const match = chunk.match(pattern)
    return match ? decodeTsString(match[1]) : null
}

function normalizeStatus(raw) {
    if (!raw) return null
    if (/undefined|null/.test(raw)) return null
    if (/in[-_]?progress|inProgress/i.test(raw)) return 'in-progress'
    if (/completed/i.test(raw)) return 'completed'
    if (/planned/i.test(raw)) return 'planned'
    return null
}

/** Slice the source into the top-level `en: { ... }`, `es: { ... }`, `fr: { ... }` blocks. */
function splitLanguageSections(source) {
    const pattern = /(?:^|\n)[ \t]*(en|es|fr)[ \t]*:[ \t]*\{/g
    const markers = []
    let match
    while ((match = pattern.exec(source)) !== null) {
        markers.push({ language: match[1], index: match.index })
    }
    const sections = {}
    markers.forEach((marker, i) => {
        const end = i + 1 < markers.length ? markers[i + 1].index : source.length
        sections[marker.language] = source.slice(marker.index, end)
    })
    return sections
}

function extractItemsBlock(section) {
    const strict = section.match(
        /projects\s*:\s*\{[\s\S]*?items\s*:\s*\[([\s\S]*?)\]\s*satisfies\s+ProjectItem\s*\[\s*\]/,
    )
    if (strict) return strict[1]
    const loose = section.match(/items\s*:\s*\[([\s\S]*?)\n[ \t]*\]/)
    return loose ? loose[1] : null
}

function splitEntries(block) {
    const starts = []
    const pattern = /\bname\s*:\s*"/g
    let match
    while ((match = pattern.exec(block)) !== null) starts.push(match.index)
    return starts.map((start, i) => block.slice(start, i + 1 < starts.length ? starts[i + 1] : block.length))
}

function parseProjectEntry(chunk) {
    const name = readStringField(chunk, 'name')
    const description = readStringField(chunk, 'description')
    if (!name || !description) return null
    const statusMatch = chunk.match(/\bstatus\s*:\s*([A-Za-z0-9_.'-]+)/)
    return {
        name,
        tech: readStringField(chunk, 'tech'),
        description,
        url: readStringField(chunk, 'url'),
        status: normalizeStatus(statusMatch ? statusMatch[1] : null),
    }
}

function parseTranslations(source, warnings) {
    const sections = splitLanguageSections(source)
    if (Object.keys(sections).length === 0) {
        warnings.push('Could not locate the en/es/fr blocks in translations.ts; parsing degraded.')
        return {}
    }
    const parsed = {}
    for (const [language, section] of Object.entries(sections)) {
        const items = extractItemsBlock(section)
        if (!items) {
            warnings.push(`No \`projects.items\` block found for "${language}" in translations.ts.`)
            parsed[language] = []
            continue
        }
        parsed[language] = splitEntries(items).map(parseProjectEntry).filter(Boolean)
        if (parsed[language].length === 0) {
            warnings.push(`\`projects.items\` for "${language}" was found but no entry could be parsed.`)
        }
    }
    return parsed
}

function matchLocalized(list, primaryEntry, index) {
    if (!Array.isArray(list) || list.length === 0) return null
    if (primaryEntry && primaryEntry.url) {
        const byUrl = list.find((candidate) => candidate.url === primaryEntry.url)
        if (byUrl) return byUrl
    }
    return index < list.length ? list[index] : null
}

function pickPrimaryList(parsedByLanguage) {
    for (const language of [PRIMARY_LANGUAGE, SECONDARY_LANGUAGE, ...LANGUAGES]) {
        const list = parsedByLanguage[language]
        if (Array.isArray(list) && list.length > 0) return list
    }
    return []
}

/** Merge the per-language entries into one project per position, keeping every translation. */
function collectProjects(parsedByLanguage, warnings) {
    const primary = pickPrimaryList(parsedByLanguage)
    if (primary.length === 0) {
        warnings.push('No project entries could be parsed from translations.ts; project drafts are unavailable.')
        return []
    }
    return primary.map((entry, index) => {
        const localized = {}
        for (const language of LANGUAGES) {
            localized[language] = matchLocalized(parsedByLanguage[language] ?? [], entry, index)
        }
        const secondary = localized[SECONDARY_LANGUAGE]
        return {
            index,
            name: entry.name,
            tech: entry.tech ?? secondary?.tech ?? null,
            description: entry.description,
            url: entry.url ?? secondary?.url ?? null,
            status: entry.status ?? secondary?.status ?? null,
            localized,
        }
    })
}

function localized(project, language) {
    const copy = project.localized ? project.localized[language] : null
    if (copy && copy.name && copy.description) return copy
    if (language === PRIMARY_LANGUAGE && project.name && project.description) {
        return {
            name: project.name,
            description: project.description,
            tech: project.tech,
            url: project.url,
            status: project.status,
        }
    }
    return null
}

/* -------------------------------------------------------------------------- */
/* site.ts facts (optional signature line)                                    */
/* -------------------------------------------------------------------------- */

function readSiteFacts(root) {
    const read = readFileSafe(path.join(root, SITE_FROM_ROOT))
    if (!read.ok) return null
    const pick = (field) => {
        const match = read.text.match(new RegExp(`\\b${field}\\s*:\\s*'((?:[^'\\\\]|\\\\.)*)'`))
        return match ? decodeTsString(match[1].replace(/\\'/g, "'")) : null
    }
    const facts = {
        name: pick('name'),
        jobTitle: pick('jobTitle'),
        github: pick('github'),
    }
    return facts.name ? facts : null
}

function signatureLine(site) {
    if (!site || !site.name) return null
    const parts = [site.name]
    if (site.jobTitle) parts.push(site.jobTitle)
    let line = parts.join(' · ')
    if (site.github) line += ` · ${site.github}`
    return truncate(line, 160)
}

/* -------------------------------------------------------------------------- */
/* Fact extraction                                                            */
/* -------------------------------------------------------------------------- */

/** Split prose into sentences without breaking decimal numbers such as 0.689. */
function splitSentences(text) {
    if (!text) return []
    return text
        .split(/(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚÜÑ¿¡"“«])/u)
        .map((sentence) => sentence.trim())
        .filter(Boolean)
}

/** Sentences that contain at least one digit — i.e. concrete, quotable metrics. */
function sentencesWithNumbers(text, limit) {
    return splitSentences(text)
        .filter((sentence) => /\d/.test(sentence) && sentence.length >= 20)
        .slice(0, limit)
}

/**
 * Reduces a metric sentence to the punchiest clause it contains. For example
 * "Includes a ~5 KB prototype ..., reducing CLS from 0.689 to 0 ..." becomes
 * "CLS from 0.689 to 0 ...". Falls back to the whole sentence.
 */
function metricPhrase(sentence) {
    if (!sentence) return null
    const lead = sentence.match(
        /\b(?:reducing|reduced|cutting|cut|lowers?|lowering|eliminating|reduciendo|redujo|reducci[oó]n de|bajando|recortando)\b/i,
    )
    if (lead && typeof lead.index === 'number') {
        const tail = sentence
            .slice(lead.index + lead[0].length)
            .split(/,\s+(?:using|usando|utilizando)\b/i)[0]
            .trim()
        if (/\d/.test(tail) && tail.length >= 12) return tail
    }
    return sentence
}

function pickHeadline(metrics) {
    if (metrics.length === 0) return null
    const ranked = metrics
        .map((value, index) => ({
            value,
            index,
            weight:
                (/\d+(?:[.,]\d+)?\s*%/.test(value) ? 2 : 0) +
                (/\b(?:CLS|TBT|LCP|KB|MB|ms)\b/i.test(value) ? 2 : 0),
        }))
        .sort((a, b) => b.weight - a.weight || a.value.length - b.value.length || a.index - b.index)
    return ranked[0].value
}

function projectHaystack(project) {
    return [project.name, project.tech, project.description].filter(Boolean).join(' \n ')
}

function signalScore(project, signals) {
    const haystack = projectHaystack(project)
    let score = 0
    for (const pattern of signals) {
        const found = haystack.match(new RegExp(pattern.source, 'gi'))
        if (found) score += found.length
    }
    return score
}

function rankProjects(projects, signals) {
    return projects
        .map((project, index) => ({ project, index, score: signalScore(project, signals) }))
        .sort((a, b) => b.score - a.score || a.index - b.index)
        .map((entry) => entry.project)
}

function detectKind(text) {
    if (/audit|auditor[ií]a/i.test(text)) return 'audit'
    if (/rebuild|reconstru|engineering study|estudio de ingenier/i.test(text)) return 'rebuild'
    return 'generic'
}

function hashtagsFromText(text, extra = []) {
    const haystack = text ?? ''
    const tags = []
    for (const [pattern, tag] of HASHTAG_RULES) {
        if (tags.length >= 4) break
        if (pattern.test(haystack) && !tags.includes(tag)) tags.push(tag)
    }
    for (const tag of extra) {
        if (tags.length >= 5) break
        if (!tags.includes(tag)) tags.push(tag)
    }
    for (const tag of GENERIC_HASHTAGS) {
        if (tags.length >= 3) break
        if (!tags.includes(tag)) tags.push(tag)
    }
    return tags.slice(0, 5)
}

/* -------------------------------------------------------------------------- */
/* Draft builders                                                             */
/* -------------------------------------------------------------------------- */

function pickHook(variant, language, copy, otherCopy, headline) {
    const name = copy.name
    const other = otherCopy ? otherCopy.description : ''

    if (variant === 'performance') {
        const kind = detectKind(`${copy.description} ${other} ${name}`)
        if (language === 'en') {
            if (kind === 'audit') return `I measured ${name} myself. The number that mattered: ${headline}`
            if (kind === 'rebuild') return `Before and after on ${name}: ${headline}`
            return `What ${name} taught me, in numbers: ${headline}`
        }
        if (kind === 'audit') return `Medí ${name} por mi cuenta. El número que importaba: ${headline}`
        if (kind === 'rebuild') return `Antes y después en ${name}: ${headline}`
        return `Lo que ${name} me enseñó, en números: ${headline}`
    }

    if (variant === 'engineering') {
        const haystack = `${copy.description} ${other}`
        const poison = /poison|dead[- ]?letter|\bDLT\b|envenenad|rebut/i.test(haystack)
        const exactlyOnce = /exactly[- ]once|exactamente una vez/i.test(haystack)
        if (language === 'en') {
            if (poison) return 'Exactly-once sounds great until a poison pill reaches the dead-letter topic.'
            if (exactlyOnce) return `I built ${name} twice to find out what "exactly-once" really means.`
            return `Notes from building ${name} with production failures in mind.`
        }
        if (poison) return 'La semántica exactly-once suena perfecta… hasta que un mensaje envenenado llega al topic de descarte.'
        if (exactlyOnce) return `Construí ${name} dos veces para entender qué significa de verdad "exactly-once".`
        return `Notas construyendo ${name} pensando en fallos de producción.`
    }

    if (language === 'en') return `Currently building: ${name}.`
    return `Actualmente construyendo: ${name}.`
}

function buildPostLines({ copy, hook, site, metrics, primary, headline }) {
    const lines = [hook, '', copy.description, '', '**Receipts from the repo**']
    if (copy.tech) lines.push(`- Stack: ${copy.tech}`)
    if (headline) lines.push(`- Headline metric: ${truncate(headline, 200)}`)
    for (const sentence of metrics.filter((value) => value !== primary).slice(0, 2)) {
        lines.push(`- Metric: ${truncate(sentence, 200)}`)
    }
    if (copy.url) lines.push(`- Code: ${copy.url}`)
    if (copy.status === 'in-progress') lines.push('- Status: in progress')
    const signature = signatureLine(site)
    if (signature) lines.push('', signature)
    return lines
}

function buildProjectDraft(project, variant, site) {
    const en = localized(project, PRIMARY_LANGUAGE)
    const es = localized(project, SECONDARY_LANGUAGE)
    if (!en || !es) return null

    const metricsEn = sentencesWithNumbers(en.description, 4)
    const metricsEs = sentencesWithNumbers(es.description, 4)
    const primaryEn = pickHeadline(metricsEn)
    const primaryEs = pickHeadline(metricsEs)
    const headlineEn = metricPhrase(primaryEn)
    const headlineEs = metricPhrase(primaryEs)

    const hookEn = pickHook(
        variant,
        'en',
        en,
        es,
        headlineEn ? truncate(headlineEn, 170) : truncate(en.description, 150),
    )
    const hookEs = pickHook(
        variant,
        'es',
        es,
        en,
        headlineEs ? truncate(headlineEs, 170) : truncate(es.description, 150),
    )

    const title =
        variant === 'performance'
            ? 'Measured performance work'
            : variant === 'engineering'
              ? 'Backend / event-driven engineering notes'
              : 'Project spotlight'

    const hashtags = hashtagsFromText(
        [project.tech, en.name].filter(Boolean).join(' · '),
        variant === 'engineering' ? ['#EventDriven'] : [],
    )

    return {
        id: `${variant}:${slug(en.name)}`,
        title,
        en: {
            post: buildPostLines({
                copy: en,
                hook: hookEn,
                site,
                metrics: metricsEn,
                primary: primaryEn,
                headline: headlineEn,
            }),
            hashtags,
        },
        es: {
            post: buildPostLines({
                copy: es,
                hook: hookEs,
                site,
                metrics: metricsEs,
                primary: primaryEs,
                headline: headlineEs,
            }),
            hashtags,
        },
        evidence: [`app/lib/translations.ts → ${en.name}${project.url ? ` (${project.url})` : ''}`],
    }
}

function buildCommitDraft(commits, site) {
    if (commits.length === 0) return null

    const count = commits.length
    const subjects = commits.map((commit) => commit.subject)
    const dates = commits
        .map((commit) => (commit.date ?? '').slice(0, 10))
        .filter(Boolean)
        .sort()
    const distinctDays = new Set(dates).size
    const range = dates.length > 0 ? `${dates[0]} → ${dates[dates.length - 1]}` : null
    const first = truncate(subjects[0], 130)

    const bullets = commits.slice(0, 8).map((commit) => {
        const when = commit.date ? ` _(${commit.date.slice(0, 10)})_` : ''
        return '- `' + commit.hash + '` ' + truncate(commit.subject, 160) + when
    })

    const receipts = [
        `**Commits in the last ${CADENCE_DAYS} days**`,
        ...bullets,
        '',
        `${count} commit${count === 1 ? '' : 's'}` +
            `${distinctDays > 0 ? ` across ${distinctDays} day${distinctDays === 1 ? '' : 's'}` : ''}` +
            `${range ? ` (${range})` : ''}.`,
    ]

    const signature = signatureLine(site)
    const buildPost = (language) => {
        const hook =
            language === 'en'
                ? `Last ${CADENCE_DAYS} days in the repo: ${count} commit${count === 1 ? '' : 's'}, starting with "${first}".`
                : `Últimos ${CADENCE_DAYS} días en el repo: ${count} commit${count === 1 ? '' : 's'}, empezando por "${first}".`
        const lines = [hook, '', ...receipts]
        if (signature) lines.push('', signature)
        return lines
    }

    return {
        id: 'commits',
        title: 'Progress from the commit log',
        en: { post: buildPost('en'), hashtags: hashtagsFromText(subjects.join(' '), ['#GitHub', '#BuildInPublic', '#SoftwareEngineering']) },
        es: { post: buildPost('es'), hashtags: hashtagsFromText(subjects.join(' '), ['#GitHub', '#BuildInPublic', '#SoftwareEngineering']) },
        evidence: [`git log --since="${COMMIT_SINCE}" → ${count} commit${count === 1 ? '' : 's'}`],
    }
}

/** Pick two or three drafts that the repository can actually back up. */
function buildDrafts({ projects, commits, site }) {
    const drafts = []
    const used = new Set()

    const performance = rankProjects(projects, PERFORMANCE_SIGNALS).find(
        (project) => signalScore(project, PERFORMANCE_SIGNALS) > 0,
    )
    if (performance) {
        const draft = buildProjectDraft(performance, 'performance', site)
        if (draft) {
            drafts.push(draft)
            used.add(performance)
        }
    }

    const streaming = rankProjects(projects, STREAMING_SIGNALS).find(
        (project) => project !== performance && signalScore(project, STREAMING_SIGNALS) > 0,
    )
    if (streaming && drafts.length < 3) {
        const draft = buildProjectDraft(streaming, 'engineering', site)
        if (draft) {
            drafts.push(draft)
            used.add(streaming)
        }
    }

    if (commits.length > 0 && drafts.length < 3) {
        const draft = buildCommitDraft(commits, site)
        if (draft) drafts.push(draft)
    }

    // Guarantee at least two drafts when the repository has more projects to show.
    for (const project of projects) {
        if (drafts.length >= 2) break
        if (used.has(project)) continue
        const draft = buildProjectDraft(project, 'spotlight', site)
        if (draft) {
            drafts.push(draft)
            used.add(project)
        }
    }

    return drafts.slice(0, 3)
}

/* -------------------------------------------------------------------------- */
/* Rendering                                                                  */
/* -------------------------------------------------------------------------- */

function renderMarkdown({ dryRun, gitRead, drafts, warnings, projects, commits }) {
    const lines = []
    lines.push(`# LinkedIn drafts — ${utcDate()}`, '')
    lines.push(
        'Drafts generated from facts that already exist in this repository: the project entries in `app/lib/translations.ts`' +
            (gitRead ? ` and the last ${CADENCE_DAYS} days of \`git log\`.` : '.'),
    )
    lines.push('')
    lines.push('> Nothing is published automatically and the LinkedIn API is never called. Review, edit and post manually.')
    if (dryRun && !gitRead) {
        lines.push('>')
        lines.push('> Running with `--dry-run`: git history is not read, so commit-based drafts are intentionally absent.')
    }
    lines.push('')

    if (drafts.length === 0) {
        lines.push('## No drafts generated', '')
        lines.push(
            'No project entries could be parsed from `app/lib/translations.ts`' +
                (gitRead ? ` and no commits were found in the last ${CADENCE_DAYS} days.` : '.'),
        )
        lines.push('')
        lines.push('Nothing was invented to fill the gap: there is no fact in the repository to base a post on.')
        if (warnings.length > 0) {
            lines.push('', '### Diagnostics')
            for (const warning of warnings) lines.push(`- ${warning}`)
        }
        lines.push('')
        return `${lines.join('\n')}\n`
    }

    drafts.forEach((draft, index) => {
        lines.push(`## Draft ${index + 1} — ${draft.title}`, '')
        for (const language of OUTPUT_LANGUAGES) {
            const version = draft[language]
            lines.push(language === PRIMARY_LANGUAGE ? '### English' : '### Español', '')
            lines.push(...version.post.filter((line) => line !== null && line !== undefined))
            lines.push('')
            lines.push(version.hashtags.join(' '))
            lines.push('')
        }
        lines.push(`<sub>Sources: ${draft.evidence.join(' · ')}</sub>`, '')
        lines.push('---', '')
    })

    lines.push('')
    lines.push(
        `_${projects.length} project entr${projects.length === 1 ? 'y' : 'ies'} parsed; ` +
            (gitRead ? `${commits.length} commit(s) in the last ${CADENCE_DAYS} days` : 'git history not read (--dry-run)') +
            '._',
    )

    if (warnings.length > 0) {
        lines.push('', '### Parse notes')
        for (const warning of warnings) lines.push(`- ${warning}`)
    }
    lines.push('')
    return `${lines.join('\n')}\n`
}

/* -------------------------------------------------------------------------- */
/* Output                                                                     */
/* -------------------------------------------------------------------------- */

function writeTempFile(markdown) {
    const base = process.env.TMPDIR || process.env.TEMP || process.env.TMP || '/tmp'
    for (const directory of [base, '/tmp']) {
        try {
            const dir = fs.mkdtempSync(path.join(directory, 'linkedin-drafts-'))
            const file = path.join(dir, `linkedin-drafts-${utcDate()}.md`)
            fs.writeFileSync(file, markdown, 'utf8')
            return { ok: true, file }
        } catch {
            // Try the next candidate directory.
        }
    }
    return { ok: false, error: `no writable temp directory (tried ${base} and /tmp)` }
}

/* -------------------------------------------------------------------------- */
/* Entry point                                                                */
/* -------------------------------------------------------------------------- */

function main() {
    if (process.argv.includes('--help') || process.argv.includes('-h')) {
        process.stdout.write(`${USAGE}\n`)
        return 0
    }

    const dryRun = process.argv.includes('--dry-run')
    const includeCommits = process.argv.includes('--include-commits')
    const root = resolveRepoRoot()
    const warnings = []

    const translations = readFileSafe(path.join(root, TRANSLATIONS_FROM_ROOT))
    let projects = []
    if (translations.ok) {
        projects = collectProjects(parseTranslations(translations.text, warnings), warnings)
    } else {
        warnings.push(
            `Could not read ${TRANSLATIONS_FROM_ROOT} (${translations.error}); project drafts are unavailable.`,
        )
    }

    const site = readSiteFacts(root)
    if (!site) warnings.push(`Could not read ${SITE_FROM_ROOT}; drafts omit the signature line.`)

    // `--dry-run` deliberately never runs git unless `--include-commits` opts in:
    // the default preview is a pure render of the static repository files, so it
    // cannot touch git state or the network.
    const gitRead = !dryRun || includeCommits
    const commits = gitRead ? collectCommits(root, warnings) : []

    const drafts = buildDrafts({ projects, commits, site })
    const markdown = renderMarkdown({ dryRun, gitRead, drafts, warnings, projects, commits })

    for (const warning of warnings) process.stderr.write(`linkedin-drafts: ${warning}\n`)

    if (dryRun) {
        process.stdout.write(markdown)
        return 0
    }

    const output = writeTempFile(markdown)
    if (!output.ok) {
        process.stderr.write(`linkedin-drafts: could not write the draft file: ${output.error}\n`)
        return 1
    }
    process.stdout.write(`${output.file}\n`)
    return 0
}

process.exitCode = main()
