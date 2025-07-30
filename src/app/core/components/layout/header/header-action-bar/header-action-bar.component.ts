import { Component, signal } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DialogModule } from 'primeng/dialog';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { ThemeService, ThemeType } from '../../../../services/theme.service';
import { WidgetService } from '../../../../services/widget.service';
import { LayoutService } from '../../../../services/layout.service';
import { LanguageService } from '../../../../services/language.service';
import { MenuItem } from 'primeng/api';
import { LanguageSwitcherComponent } from "../../../language-switcher/language-switcher.component";
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PopoverModule } from 'primeng/popover';
import { SliderModule } from 'primeng/slider';
import { DropdownModule } from 'primeng/dropdown';
import { DividerModule } from 'primeng/divider';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';

@Component({
  selector: 'app-header-action-bar',
  imports: [
    AvatarModule,
    MenuModule,
    ButtonModule,
    OverlayPanelModule,
    DialogModule,
    LanguageSwitcherComponent,
    CheckboxModule,
    FormsModule,
    UpperCasePipe,
    PopoverModule,
    SliderModule,
    DropdownModule,
    DividerModule,
    RadioButtonModule,
    InputSwitchModule,
    CommonModule
],
  templateUrl: './header-action-bar.component.html',
  styleUrl: './header-action-bar.component.css'
})
export class HeaderActionBarComponent {
  currentTime = '9:41';

  // UI state signals
  isFullscreen = signal(false);
  isGalleryOpen = signal(false);
  isWidgetPanelOpen = signal(false);

  // Settings state
  fontSize = signal(16);
  rightSidebarVisible = signal(true);

  // Font size options
  fontSizeOptions = [
    { label: 'Kichik (14px)', value: 14 },
    { label: 'O\'rta (16px)', value: 16 },
    { label: 'Katta (18px)', value: 18 },
    { label: 'Juda katta (20px)', value: 20 },
    { label: 'Maksimal (24px)', value: 24 }
  ];

  // Menu mode options
  menuModeOptions = [
    { label: 'Statik', value: 'static' },
    { label: 'Overlay', value: 'overlay' }
  ];

  // Theme menu items
  themeMenuItems: MenuItem[] = [];

  userData = {
    name: 'Abbos Xazratov',
    email: 'abbos@example.com',
    profilePicture: './images/avatars/abbos.png'
  }

  constructor(
    private themeService: ThemeService,
    public widgetService: WidgetService,
    public layoutService: LayoutService,
    public languageService: LanguageService
  ) {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
    this.initializeThemeMenu();
    this.checkFullscreenStatus();
    this.initializeSettings();
  }

  private initializeSettings() {
    // Load saved font size
    const savedFontSize = localStorage.getItem('app-font-size');
    if (savedFontSize) {
      this.fontSize.set(parseInt(savedFontSize));
      this.applyFontSize(this.fontSize());
    }

    // Load right sidebar visibility state
    this.rightSidebarVisible.set(this.widgetService.getRightSidebarVisibility());
  }

  private updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: false
    });
  }

  private initializeThemeMenu() {
    this.themeMenuItems = [
      {
        label: 'Yorug\'',
        icon: 'pi pi-sun',
        command: () => this.setTheme('light')
      },
      {
        label: 'Qorong\'i',
        icon: 'pi pi-moon',
        command: () => this.setTheme('dark')
      },
      {
        label: 'Qora-Oq (Maxsus)',
        icon: 'pi pi-eye',
        command: () => this.setTheme('accessibility')
      }
    ];
  }

  private checkFullscreenStatus() {
    // Listen to fullscreen changes
    document.addEventListener('fullscreenchange', () => {
      this.isFullscreen.set(!!document.fullscreenElement);
    });
  }

  // Fullscreen functionality
  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.log(`Fullscreen rejiq bo'lmadi: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }

  // Theme functionality
  setTheme(theme: ThemeType) {
    this.themeService.setTheme(theme);
  }

  getCurrentTheme() {
    return this.themeService.getCurrentTheme();
  }

  private enableAccessibilityFeatures() {
    // Barcha tugmalar uchun aria-label qo'shish
    const buttons = document.querySelectorAll('button:not([aria-label])');
    buttons.forEach(button => {
      const img = button.querySelector('img');
      if (img && img.alt) {
        button.setAttribute('aria-label', img.alt);
      }
    });
  }

  private disableAccessibilityFeatures() {
    // Qo'shilgan aria-label larni olib tashlash
    const buttons = document.querySelectorAll('button[aria-label]');
    buttons.forEach(button => {
      button.removeAttribute('aria-label');
    });
  }

  // Widget functionality
  toggleRightSidebar() {
    this.widgetService.toggleRightSidebar();
  }

  toggleWidget(widgetId: string) {
    this.widgetService.toggleWidget(widgetId);
  }

  resetWidgets() {
    this.widgetService.resetToDefault();
  }

  // Font size functionality
  onFontSizeChange(newSize: number) {
    this.fontSize.set(newSize);
    this.applyFontSize(newSize);
    localStorage.setItem('app-font-size', newSize.toString());
  }

  private applyFontSize(size: number) {
    document.documentElement.style.setProperty('--app-font-size', `${size}px`);
    document.body.style.fontSize = `${size}px`;
  }

  // Layout functionality
  toggleSidebarMode() {
    if (this.layoutService.isOverlay()) {
      this.layoutService.setStaticMode();
    } else {
      this.layoutService.setOverlayMode();
    }
  }

  setSidebarMode(mode: string) {
    if (mode === 'overlay') {
      this.layoutService.setOverlayMode();
    } else {
      this.layoutService.setStaticMode();
    }
  }

  // Switch button uchun getter/setter
  get isSidebarOverlayMode(): boolean {
    return this.layoutService.isOverlay();
  }

  onSidebarModeToggle(isOverlay: boolean) {
    if (isOverlay) {
      this.layoutService.setOverlayMode();
    } else {
      this.layoutService.setStaticMode();
    }
  }

  // Right sidebar settings visibility
  toggleRightSidebarSettings() {
    this.rightSidebarVisible.set(!this.rightSidebarVisible());
  }

  // Language functionality
  setLanguage(lang: string) {
    this.languageService.setLanguage(lang);
  }

  getCurrentLanguage() {
    return this.languageService.currentLanguage;
  }

  getAvailableLanguages() {
    return this.languageService.availableLanguages;
  }

  // Settings reset functionality
  resetAllSettings() {
    // Font size ni default ga qaytarish
    this.fontSize.set(16);
    this.applyFontSize(16);
    localStorage.removeItem('app-font-size');

    // Theme ni default ga qaytarish
    this.themeService.setTheme('light');

    // Widget sozlamalarini reset qilish
    this.widgetService.resetToDefault();

    // Layout ni default ga qaytarish
    this.layoutService.setStaticMode();

    // Language ni default ga qaytarish
    this.languageService.setLanguage(this.languageService.getDefaultLang());

    // Right sidebar ni ko'rsatish
    this.rightSidebarVisible.set(true);
  }
}
