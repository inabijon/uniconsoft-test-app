# UniconsoftTestProject

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.15.

## Theme System

Ushbu loyiha 3 xil theme'ni qo'llab-quvvatlaydi:

### Theme turlari:
- **Light Theme (Yorug')** - Standart yorug' theme
- **Dark Theme (Qorong'i)** - Qorong'i rejim
- **Accessibility Theme (Ko'zi ojizlar uchun)** - Yuqori kontrast va katta matn o'lchamlari

### Xususiyatlari:
- Avtomatik theme saqlash (localStorage)
- Tizim ranglarini aniqlash
- PrimeNG va Tailwind CSS bilan integratsiya
- Responsive design
- Accessibility standartlariga muvofiq

### Foydalanish:

1. **ThemeService** - Asosiy theme boshqaruv xizmati
2. **ThemeSwitcherComponent** - Theme almashtirish komponenti
3. CSS Variables - Barcha ranglar uchun
4. Tailwind Classes - Theme-aware style'lar

```typescript
// ThemeService'dan foydalanish
import { ThemeService } from './core/services/theme.service';

constructor(private themeService: ThemeService) {}

// Theme o'rnatish
this.themeService.setTheme('dark');

// Joriy theme olish
const currentTheme = this.themeService.getCurrentTheme();

// Theme tekshirish
const isDark = this.themeService.isDarkTheme();
```

### CSS Variables:
```css
/* Har qanday joyda ishlatish mumkin */
background-color: var(--theme-background);
color: var(--theme-text);
border-color: var(--theme-border);
```

### Tailwind Classes:
```html
<!-- Theme-aware ranglar -->
<div class="bg-background text-text border-border">
  <button class="bg-primary text-white">Primary Button</button>
</div>
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
