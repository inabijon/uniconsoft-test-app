import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PanelModule } from 'primeng/panel';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme-demo',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    MessageModule,
    PanelModule
  ],
  template: `
    <div class="theme-demo-container">
      <h2>Theme Demo</h2>
      <p>Bu sahifada barcha theme'lar qanday ko'rinishini sinab ko'rishingiz mumkin.</p>
      
      <!-- Theme colors preview -->
      <p-panel header="Ranglar namunasi" class="mb-4">
        <div class="color-grid">
          <div class="color-item">
            <div class="color-sample" [style.background-color]="currentTheme().colors.primary"></div>
            <span>Primary</span>
          </div>
          <div class="color-item">
            <div class="color-sample" [style.background-color]="currentTheme().colors.secondary"></div>
            <span>Secondary</span>
          </div>
          <div class="color-item">
            <div class="color-sample" [style.background-color]="currentTheme().colors.success"></div>
            <span>Success</span>
          </div>
          <div class="color-item">
            <div class="color-sample" [style.background-color]="currentTheme().colors.warning"></div>
            <span>Warning</span>
          </div>
          <div class="color-item">
            <div class="color-sample" [style.background-color]="currentTheme().colors.error"></div>
            <span>Error</span>
          </div>
          <div class="color-item">
            <div class="color-sample" [style.background-color]="currentTheme().colors.info"></div>
            <span>Info</span>
          </div>
        </div>
      </p-panel>

      <!-- Components demo -->
      <div class="components-grid">
        <!-- Buttons demo -->
        <p-card header="Tugmalar">
          <div class="button-group">
            <p-button label="Primary" severity="primary"></p-button>
            <p-button label="Secondary" severity="secondary"></p-button>
            <p-button label="Success" severity="success"></p-button>
            <p-button label="Warning" severity="warn"></p-button>
            <p-button label="Danger" severity="danger"></p-button>
            <p-button label="Info" severity="info"></p-button>
          </div>
          <div class="button-group mt-3">
            <p-button label="Outlined" [outlined]="true"></p-button>
            <p-button label="Text" [text]="true"></p-button>
            <p-button label="Raised" [raised]="true"></p-button>
          </div>
        </p-card>

        <!-- Inputs demo -->
        <p-card header="Inputlar">
          <div class="input-group">
            <label for="username">Username:</label>
            <input pInputText id="username" placeholder="Username kiriting" />
          </div>
          <div class="input-group">
            <label for="email">Email:</label>
            <input pInputText id="email" type="email" placeholder="Email kiriting" />
          </div>
          <div class="input-group">
            <label for="password">Password:</label>
            <input pInputText id="password" type="password" placeholder="Password kiriting" />
          </div>
        </p-card>

        <!-- Messages demo -->
        <p-card header="Xabarlar">
          <p-message severity="success" text="Bu success xabari." class="mb-2"></p-message>
          <p-message severity="info" text="Bu info xabari." class="mb-2"></p-message>
          <p-message severity="warn" text="Bu warning xabari." class="mb-2"></p-message>
          <p-message severity="error" text="Bu error xabari."></p-message>
        </p-card>
      </div>

      <!-- Theme info -->
      <p-panel header="Joriy theme ma'lumotlari" class="mt-4">
        <div class="theme-info">
          <h4>Theme nomi: {{ currentTheme().displayName }}</h4>
          <p><strong>Theme type:</strong> {{ currentTheme().name }}</p>
          <p><strong>PrimeNG class:</strong> {{ currentTheme().primengClass }}</p>
          <p><strong>Dark theme:</strong> {{ themeService.isDarkTheme() ? 'Ha' : 'Yo\'q' }}</p>
          <p><strong>Accessibility theme:</strong> {{ themeService.isAccessibilityTheme() ? 'Ha' : 'Yo\'q' }}</p>
        </div>
      </p-panel>
    </div>
  `,
  styles: [`
    .theme-demo-container {
      padding: 2rem 0;
    }

    .color-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }

    .color-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }

    .color-sample {
      width: 50px;
      height: 50px;
      border-radius: 8px;
      border: 2px solid var(--theme-border);
    }

    .components-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin: 2rem 0;
    }

    .button-group {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .input-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .input-group label {
      font-weight: 600;
      color: var(--theme-text);
    }

    .theme-info h4 {
      color: var(--theme-primary);
      margin-bottom: 1rem;
    }

    .theme-info p {
      margin: 0.5rem 0;
    }

    /* Accessibility theme adjustments */
    .accessibility .color-sample {
      border-width: 3px;
    }

    .accessibility .button-group {
      gap: 1rem;
    }

    .accessibility .input-group {
      margin-bottom: 1.5rem;
    }

    .accessibility .input-group label {
      font-size: 1.1rem;
      font-weight: 700;
    }
  `]
})
export class ThemeDemoComponent {
  themeService = inject(ThemeService);
  currentTheme = this.themeService.currentTheme;
}
