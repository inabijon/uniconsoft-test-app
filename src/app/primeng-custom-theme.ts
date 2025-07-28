import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

// Light theme preset
export const LightThemePreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '#f0fcff',
            100: '#e0f8ff',
            200: '#baf1ff',
            300: '#7de7ff',
            400: '#36BFFA',
            500: '#36BFFA', // Asosiy rang
            600: '#0ea5e9',
            700: '#0284c7',
            800: '#0369a1',
            900: '#075985',
            950: '#0c4a6e',
        },
        colorScheme: {
            light: {
                surface: {
                    0: '#ffffff',
                    50: '#f8fafc',
                    100: '#f1f5f9',
                    200: '#e2e8f0',
                    300: '#cbd5e1',
                    400: '#94a3b8',
                    500: '#64748b',
                    600: '#475569',
                    700: '#334155',
                    800: '#1e293b',
                    900: '#0f172a',
                    950: '#020617'
                }
            }
        }
    },
});

// Dark theme preset
export const DarkThemePreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '#f0fcff',
            100: '#e0f8ff',
            200: '#baf1ff',
            300: '#7de7ff',
            400: '#36BFFA',
            500: '#36BFFA', // Asosiy rang
            600: '#0ea5e9',
            700: '#0284c7',
            800: '#0369a1',
            900: '#075985',
            950: '#0c4a6e',
        },
        colorScheme: {
            dark: {
                surface: {
                    0: '#0f172a',
                    50: '#1e293b',
                    100: '#334155',
                    200: '#475569',
                    300: '#64748b',
                    400: '#94a3b8',
                    500: '#cbd5e1',
                    600: '#e2e8f0',
                    700: '#f1f5f9',
                    800: '#f8fafc',
                    900: '#ffffff',
                    950: '#ffffff'
                }
            }
        }
    },
});

// Accessibility theme preset - Oq-Qora rejim (Rang ajrata olmaganlar uchun)
export const AccessibilityThemePreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '#ffffff',
            100: '#f0f0f0',
            200: '#e0e0e0',
            300: '#c0c0c0',
            400: '#808080',
            500: '#000000', // Qora asosiy rang
            600: '#000000',
            700: '#000000',
            800: '#000000',
            900: '#000000',
            950: '#000000',
        },
        colorScheme: {
            light: {
                surface: {
                    0: '#ffffff',
                    50: '#f0f0f0',
                    100: '#e0e0e0',
                    200: '#c0c0c0',
                    300: '#a0a0a0',
                    400: '#808080',
                    500: '#606060',
                    600: '#404040',
                    700: '#202020',
                    800: '#101010',
                    900: '#000000',
                    950: '#000000'
                }
            }
        }
    },
});
