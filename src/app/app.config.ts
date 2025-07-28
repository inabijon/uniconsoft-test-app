import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco } from '@jsverse/transloco';
import { providePrimeNG } from 'primeng/config';
import { LightThemePreset } from './primeng-custom-theme';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(), 
    provideAnimationsAsync(),
    provideTransloco({
      config: {
        availableLangs: ['uz', 'ru'],
        defaultLang: 'uz',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader
    }),
    providePrimeNG({
      theme: {
        preset: LightThemePreset,
        options: {
          // Theme switching qo'lda amalga oshiriladi
          darkModeSelector: false,
          cssLayer: false,
        },
      },
    }),
  ]
};
