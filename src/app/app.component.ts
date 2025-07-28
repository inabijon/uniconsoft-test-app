import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/theme.service';
import { ThemeSwitcherComponent } from './shared/components/theme-switcher/theme-switcher.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ThemeSwitcherComponent],
  templateUrl: './app.component.html',
  styles: [`
    .app-container {
      min-height: 100vh;
      background-color: var(--theme-background);
      color: var(--theme-text);
    }

    .app-header {
      background-color: var(--theme-surface);
      border-bottom: 2px solid var(--theme-border);
      padding: 1rem 0;
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .header-content h1 {
      margin: 0;
      color: var(--theme-primary);
      font-family: 'Montserrat', sans-serif;
      font-weight: 600;
    }

    .app-main {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem 1rem;
      min-height: calc(100vh - 120px);
    }

    /* Responsive design */
    @media (max-width: 768px) {
      .header-content {
        flex-direction: column;
        text-align: center;
      }
      
      .app-main {
        padding: 1rem;
      }
    }

    /* Accessibility theme adjustments */
    .accessibility .app-header {
      border-bottom-width: 4px;
    }

    .accessibility .header-content h1 {
      font-size: 2rem;
      font-weight: 700;
    }
  `]
})
export class AppComponent implements OnInit {
  title = 'Uniconsoft Test Project';
  private themeService = inject(ThemeService);

  ngOnInit() {
    // Theme service automatically initializes and applies the saved theme
  }
}
