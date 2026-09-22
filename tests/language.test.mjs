import assert from 'node:assert/strict'
import { test } from 'node:test'

import { detectLanguage, STORAGE_KEY } from '../app/lib/language.mjs'

const supported = ['en', 'es', 'fr']
const detect = (overrides) =>
    detectLanguage({ stored: null, browserLanguage: 'en-US', supported, fallback: 'en', ...overrides })

test('the storage key never changes silently (it is persisted data)', () => {
    assert.equal(STORAGE_KEY, 'language')
})

test('an explicit stored choice wins over the browser language', () => {
    assert.equal(detect({ stored: 'es', browserLanguage: 'en-US' }), 'es')
})

test('the base language of a regional tag is matched (en-GB → en)', () => {
    assert.equal(detect({ stored: null, browserLanguage: 'fr-FR' }), 'fr')
    assert.equal(detect({ stored: null, browserLanguage: 'es-MX' }), 'es')
})

test('a stored choice that is no longer supported is ignored', () => {
    // e.g. a language removed from translations.ts must not crash the store.
    assert.equal(detect({ stored: 'de', browserLanguage: 'fr-FR' }), 'fr')
    assert.equal(detect({ stored: 'de', browserLanguage: 'de-DE' }), 'en')
})

test('unknown browser language falls back to the caller default', () => {
    assert.equal(detect({ stored: null, browserLanguage: 'ja-JP' }), 'en')
})

test('an empty browser tag cannot crash detection', () => {
    assert.equal(detect({ stored: null, browserLanguage: '' }), 'en')
})

test('language codes are case sensitive keys, like localStorage returns them', () => {
    assert.equal(detect({ stored: 'ES', browserLanguage: 'fr-FR' }), 'fr')
})
