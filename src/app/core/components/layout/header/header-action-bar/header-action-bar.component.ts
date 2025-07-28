import { Component, signal } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { ThemeService, ThemeType } from '../../../../services/theme.service';
import { MenuItem } from 'primeng/api';
import { LanguageSwitcherComponent } from "../../../language-switcher/language-switcher.component";

@Component({
  selector: 'app-header-action-bar',
  imports: [
    CommonModule,
    AvatarModule,
    MenuModule,
    ButtonModule,
    OverlayPanelModule,
    DialogModule,
    LanguageSwitcherComponent
],
  templateUrl: './header-action-bar.component.html',
  styleUrl: './header-action-bar.component.css'
})
export class HeaderActionBarComponent {
  currentTime = '9:41 AM';
  currentDate = 'September 2024';

  // UI state signals
  isFullscreen = signal(false);
  isGalleryOpen = signal(false);
  isWidgetPanelOpen = signal(false);

  // Theme menu items
  themeMenuItems: MenuItem[] = [];  constructor(private themeService: ThemeService) {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
    this.initializeThemeMenu();
    this.checkFullscreenStatus();
  }

  private updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: false
    });
    this.currentDate = now.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
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

}
