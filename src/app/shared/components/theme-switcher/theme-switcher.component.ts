import { Component, inject, OnInit, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, ThemeConfig } from '../../../core/services/theme.service';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TranslocoModule } from '@jsverse/transloco';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [CommonModule, DropdownModule, ButtonModule, TranslocoModule, TooltipModule, FormsModule],
  template: `
    <div class="theme-switcher-container">
      <!-- Dropdown theme selector -->
      <p-dropdown
        [options]="themes"
        [(ngModel)]="selectedTheme"
        (ngModelChange)="onThemeChange($event)"
        optionLabel="displayName"
        optionValue="name"
        [placeholder]="'Theme tanlang' | transloco"
        styleClass="theme-dropdown"
        [showClear]="false">
        
        <ng-template pTemplate="selectedItem" let-theme>
          <div class="theme-option" *ngIf="theme">
            <div class="theme-color-preview" [style.background-color]="theme?.colors?.primary"></div>
            <span>{{ theme?.displayName }}</span>
          </div>
        </ng-template>
        
        <ng-template pTemplate="item" let-theme>
          <div class="theme-option">
            <div class="theme-color-preview" [style.background-color]="theme.colors.primary"></div>
            <span>{{ theme.displayName }}</span>
          </div>
        </ng-template>
      </p-dropdown>

      <!-- Quick toggle buttons -->
      <div class="theme-toggle-buttons">
        <p-button
          icon="pi pi-sun"
          [outlined]="currentTheme().name !== 'light'"
          [text]="currentTheme().name === 'light'"
          (onClick)="setTheme('light')"
          pTooltip="Yorug' theme"
          tooltipPosition="bottom"
          size="small"
          styleClass="theme-btn">
        </p-button>
        
        <p-button
          icon="pi pi-moon"
          [outlined]="currentTheme().name !== 'dark'"
          [text]="currentTheme().name === 'dark'"
          (onClick)="setTheme('dark')"
          pTooltip="Qorong'i theme"
          tooltipPosition="bottom"
          size="small"
          styleClass="theme-btn">
        </p-button>
        
        <p-button
          icon="pi pi-eye"
          [outlined]="currentTheme().name !== 'accessibility'"
          [text]="currentTheme().name === 'accessibility'"
          (onClick)="setTheme('accessibility')"
          pTooltip="Rang ajrata olmaganlar uchun (Oq-Qora)"
          tooltipPosition="bottom"
          size="small"
          styleClass="theme-btn">
        </p-button>
      </div>
    </div>
  `,
  styles: [`
    .theme-switcher-container {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .theme-dropdown {
      min-width: 200px;
    }

    .theme-option {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.25rem 0;
    }

    .theme-color-preview {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 2px solid var(--theme-border);
      flex-shrink: 0;
    }

    .theme-toggle-buttons {
      display: flex;
      gap: 0.25rem;
    }

    .theme-btn {
      min-width: 2.5rem !important;
    }

    /* Responsive design */
    @media (max-width: 768px) {
      .theme-switcher-container {
        flex-direction: column;
        align-items: stretch;
      }
      
      .theme-dropdown {
        min-width: 100%;
      }
      
      .theme-toggle-buttons {
        justify-content: center;
      }
    }

    /* Accessibility theme adjustments */
    .accessibility .theme-switcher-container {
      gap: 1rem;
    }

    .accessibility .theme-btn {
      min-width: 3rem !important;
      min-height: 3rem !important;
    }

    .accessibility .theme-color-preview {
      width: 20px;
      height: 20px;
      border-width: 3px;
    }
  `]
})
export class ThemeSwitcherComponent implements OnInit {
  private themeService = inject(ThemeService);

  themes: ThemeConfig[] = [];
  currentTheme = this.themeService.currentTheme;
  selectedTheme = signal<string>('light');

  ngOnInit() {
    this.themes = this.themeService.getThemes();
    this.selectedTheme.set(this.currentTheme().name);
    
    // Update selected theme when current theme changes
    effect(() => {
      this.selectedTheme.set(this.currentTheme().name);
    });
  }

  onThemeChange(themeName: string) {
    this.setTheme(themeName as any);
  }

  setTheme(themeName: 'light' | 'dark' | 'accessibility') {
    this.themeService.setTheme(themeName);
  }
}
