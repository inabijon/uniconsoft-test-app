import { inject, Injectable } from "@angular/core";
import { getBrowserCultureLang, getBrowserLang, LangDefinition, TranslocoService } from "@jsverse/transloco";
import { BrowserStorageService } from "./browser-storage.service";

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    private readonly translocoService = inject(TranslocoService);
    private readonly browserStorageService = inject(BrowserStorageService);

    constructor() {}

    get currentLanguage(): string {
        return this.translocoService.getActiveLang(); // e.g. "en"
    }

    /**
     * Sets the active language for the application.
     * @param lang - The language code to set as active.
     */
    setLanguage(lang: string): void {
        this.translocoService.setActiveLang(lang);
        this.browserStorageService.setLocalItem('lang', lang);
        this.translocoService.load(lang).subscribe();
    }

    /**
     * Returns the available languages in the application.
     * @returns An array of language codes.
     */
    get availableLanguages(): any {
        return this.translocoService.getAvailableLangs();
    }

    /**
     * Returns the default language of the application.
     * @returns The default language code.
     */
    getDefaultLang(): string {
        return this.translocoService.getDefaultLang();
    }

    /**
     * Returns the browser's language and culture settings.
     * @returns An object containing the browser's language and culture language.
     */
    getBrowserLanguage(): string | undefined {
        return getBrowserLang(); // e.g. "en"
    }

    getBrowserCultureLanguage(): string {
        return getBrowserCultureLang(); // e.g. "en-US"
    }

    /**
     * Initializes the language based on browser settings or saved preferences.
     */
    initLanguage(): void {
        const browserLang = this.getBrowserLanguage();
        const savedLang = this.browserStorageService.getLocalItem('lang');

        if (savedLang && this.availableLanguages.includes(savedLang)) {
            this.setLanguage(savedLang);
        } else if (browserLang && this.availableLanguages.includes(browserLang)) {
            this.setLanguage(browserLang);
        } else {
            this.setLanguage(this.getDefaultLang());
        }
    }

    // GET LOCAL ITEM
    getLocalItem(key: string): string | null {
        return this.browserStorageService.getLocalItem(key);
    }
}
