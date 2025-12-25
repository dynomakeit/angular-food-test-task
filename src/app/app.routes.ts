import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/catalog/catalog-page/catalog-page.component').then(
        (m) => m.CatalogPageComponent
      ),
  },
];
