/**
 * LocaleService
 */
export declare class LocaleService {
    private i18nProvider;
    constructor();
    /**
     *
     * @returns {string} The current locale code
     */
    getCurrentLocale(): string;
    /**
     *
     * @returns string[] The list of available locale codes
     */
    getLocales(): string[];
    /**
     *
     * @param locale The locale to set. Must be from the list of available locales.
     */
    setLocale(locale: string): void;
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
    translate(text: string, args?: Record<string, string>): string;
    /**
     *
     * @param phrase Object to translate
     * @param count The plural number
     * @returns {string} Translated string
     * @example
     *  __n('%s cat', 1) // --> "1 Katze"
        __n('%s cat', 3) // --> "3 Katzen"
     */
    translatePlurals(phrase: string, count: number): string;
}
