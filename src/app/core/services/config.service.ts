import { inject, Injectable } from "@angular/core";
import { LanguageService } from "./language.service";

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    private readonly languageService = inject(LanguageService);

    // Initializes the application configuration.
    // This method is called during the application bootstrap process.
    initializeAppFactory(): Promise<boolean> {
        this.languageService.initLanguage();

        return Promise.resolve(true);
    }
}