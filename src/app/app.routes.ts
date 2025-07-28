import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/components/theme-demo/theme-demo.component').then(m => m.ThemeDemoComponent)
  },
  {
    path: 'theme-demo',
    loadComponent: () => import('./features/components/theme-demo/theme-demo.component').then(m => m.ThemeDemoComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
