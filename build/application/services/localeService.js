"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocaleService = void 0;
const path_1 = require("path");
const i18n_1 = require("i18n");
/**
 * LocaleService
 */
class LocaleService {
    constructor() {
        this.i18nProvider = new i18n_1.I18n();
        this.i18nProvider.configure({
            locales: ['en'],
            defaultLocale: 'en',
            directory: (0, path_1.join)(__dirname, '../../', 'locale'),
            objectNotation: true,
        });
    }
    /**
     *
     * @returns {string} The current locale code
     */
    getCurrentLocale() {
        return this.i18nProvider.getLocale();
    }
    /**
     *
     * @returns string[] The list of available locale codes
     */
    getLocales() {
        return this.i18nProvider.getLocales();
    }
    /**
     *
     * @param locale The locale to set. Must be from the list of available locales.
     */
    setLocale(locale) {
        if (this.getLocales().indexOf(locale) !== -1) {
            this.i18nProvider.setLocale(locale);
        }
        else {
            throw new Error('LOCALE NOT EXISTS IN CONFIG');
        }
    }
    /**
     *
     * @param text String to translate
     * @param args Extra parameters
     * @returns {string} Translated string
     *
     * @example
     *  __('Hello') -> "Hallo"
        __('Hello %s', 'Marcus') -> "Hallo Marcus"
        __('Hello {{name}}', { name: 'Marcus' }) -> "Hallo Marcus"
     */
    translate(text, args) {
        if (args) {
            return this.i18nProvider.__(text, args);
        }
        return this.i18nProvider.__(text);
    }
    /**
     *
     * @param phrase Object to translate
     * @param count The plural number
     * @returns {string} Translated string
     * @example
     *  __n('%s cat', 1) // --> "1 Katze"
        __n('%s cat', 3) // --> "3 Katzen"
     */
    translatePlurals(phrase, count) {
        return this.i18nProvider.__n(phrase, count);
    }
}
exports.LocaleService = LocaleService;
