/**
 * Language detection as pure, dependency-free functions.
 *
 * Deliberately plain JS with JSDoc types instead of TS: the rules are the part
 * of the i18n store worth testing, and `node --test` can import this file with
 * no loader and no DOM (see `tests/language.test.mjs`). `context.tsx` is then a
 * thin React shell around these rules.
 */

/**
 * Key used to persist the visitor's explicit choice.
 */
export const STORAGE_KEY = 'language'

/**
 * Picks the language to render in.
 *
 * Priority: the stored choice (only if still supported) → the base language of
 * the browser (`en-GB` → `en`) → the caller's fallback.
 *
 * @template {string} L
 * @param {{ stored: string | null, browserLanguage: string, supported: readonly L[], fallback: L }} input
 * @returns {L}
 */
export function detectLanguage({ stored, browserLanguage, supported, fallback }) {
    if (stored !== null && supported.includes(/** @type {L} */ (stored))) {
        return /** @type {L} */ (stored)
    }
    const base = String(browserLanguage).split('-')[0]
    if (supported.includes(/** @type {L} */ (base))) {
        return /** @type {L} */ (base)
    }
    return fallback
}
