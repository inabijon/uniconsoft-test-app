import { Injectable, effect, signal } from "@angular/core";
import { BrowserStorageService } from "./browser-storage.service";

export type ThemeType = 'light' | 'dark' | 'accessibility';

export interface ThemeConfig {
  name: ThemeType;
  displayName: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    error: string;
    info: string;
  };
  primengClass: string;
}

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private readonly THEME_STORAGE_KEY = 'selected-theme';
    
    // Theme configurations
    private readonly themes: Record<ThemeType, ThemeConfig> = {
        light: {
            name: 'light',
            displayName: 'Yorug\'',
            colors: {
                primary: '#36BFFA',
                secondary: '#6366f1',
                background: '#ffffff',
                surface: '#f8fafc',
                text: '#1e293b',
                textSecondary: '#64748b',
                border: '#e2e8f0',
                success: '#10b981',
                warning: '#f59e0b',
                error: '#ef4444',
                info: '#3b82f6'
            },
            primengClass: 'light-theme'
        },
        dark: {
            name: 'dark',
            displayName: 'Qorong\'i',
            colors: {
                primary: '#36BFFA',
                secondary: '#818cf8',
                background: '#0f172a',
                surface: '#1e293b',
                text: '#f1f5f9',
                textSecondary: '#94a3b8',
                border: '#334155',
                success: '#34d399',
                warning: '#fbbf24',
                error: '#f87171',
                info: '#60a5fa'
            },
            primengClass: 'dark-theme'
        },
        accessibility: {
            name: 'accessibility',
            displayName: 'Rang ajrata olmaganlar uchun (Oq-Qora)',
            colors: {
                primary: '#000000',
                secondary: '#000000',
                background: '#ffffff',
                surface: '#f0f0f0',
                text: '#000000',
                textSecondary: '#000000',
                border: '#000000',
                success: '#000000',    // Barcha ranglar qora
                warning: '#000000',    // Barcha ranglar qora
                error: '#000000',      // Barcha ranglar qora
                info: '#000000'        // Barcha ranglar qora
            },
            primengClass: 'accessibility-theme'
        }
    };

    // Signal for current theme
    public currentTheme = signal<ThemeConfig>(this.themes.light);

    constructor(private storageService: BrowserStorageService) {
        // Load saved theme on init
        this.loadSavedTheme();
        
        // Apply theme whenever it changes
        effect(() => {
            this.applyTheme(this.currentTheme());
        });
    }

    /**
     * Get all available themes
     */
    getThemes(): ThemeConfig[] {
        return Object.values(this.themes);
    }

    /**
     * Get current theme config
     */
    getCurrentTheme(): ThemeConfig {
        return this.currentTheme();
    }

    /**
     * Set theme by type
     */
    setTheme(themeType: ThemeType): void {
        const theme = this.themes[themeType];
        if (theme) {
            this.currentTheme.set(theme);
            this.storageService.setLocalItem(this.THEME_STORAGE_KEY, themeType);
        }
    }

    /**
     * Toggle between light and dark themes
     */
    toggleTheme(): void {
        const current = this.currentTheme().name;
        const newTheme: ThemeType = current === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    /**
     * Check if current theme is dark
     */
    isDarkTheme(): boolean {
        return this.currentTheme().name === 'dark';
    }

    /**
     * Check if current theme is accessibility
     */
    isAccessibilityTheme(): boolean {
        return this.currentTheme().name === 'accessibility';
    }

    /**
     * Load saved theme from storage
     */
    private loadSavedTheme(): void {
        const savedTheme = this.storageService.getLocalItem(this.THEME_STORAGE_KEY) as ThemeType;
        if (savedTheme && this.themes[savedTheme]) {
            this.currentTheme.set(this.themes[savedTheme]);
        } else {
            // Detect system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.currentTheme.set(prefersDark ? this.themes.dark : this.themes.light);
        }
    }

    /**
     * Apply theme to DOM
     */
    private applyTheme(theme: ThemeConfig): void {
        const root = document.documentElement;
        
        // Remove all theme classes
        Object.values(this.themes).forEach(t => {
            document.body.classList.remove(t.primengClass);
            root.classList.remove(t.name);
        });
        
        // Add current theme classes
        document.body.classList.add(theme.primengClass);
        root.classList.add(theme.name);
        
        // Set CSS custom properties
        root.style.setProperty('--theme-primary', theme.colors.primary);
        root.style.setProperty('--theme-secondary', theme.colors.secondary);
        root.style.setProperty('--theme-background', theme.colors.background);
        root.style.setProperty('--theme-surface', theme.colors.surface);
        root.style.setProperty('--theme-text', theme.colors.text);
        root.style.setProperty('--theme-text-secondary', theme.colors.textSecondary);
        root.style.setProperty('--theme-border', theme.colors.border);
        root.style.setProperty('--theme-success', theme.colors.success);
        root.style.setProperty('--theme-warning', theme.colors.warning);
        root.style.setProperty('--theme-error', theme.colors.error);
        root.style.setProperty('--theme-info', theme.colors.info);
        
        // Set meta theme-color for mobile browsers
        this.updateMetaThemeColor(theme.colors.primary);
    }

    /**
     * Update meta theme-color for mobile browsers
     */
    private updateMetaThemeColor(color: string): void {
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.setAttribute('name', 'theme-color');
            document.head.appendChild(metaThemeColor);
        }
        metaThemeColor.setAttribute('content', color);
    }
}