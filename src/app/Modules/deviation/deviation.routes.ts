/**
 * Deviation Module Routes
 * 
 * Defines all routes for the deviation module with lazy loading.
 */

import { Routes } from '@angular/router';
import { canDeactivateDeviationForm } from './Guards/deviation-form.deactivate';
import { deviationResolver } from './Resolvers/deviation.resolver';

export const deviationRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./Pages/deviation-list/deviation-list.component').then(
        (m) => m.DeviationListComponent
      ),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./Pages/deviation-form/deviation-form.component').then(
        (m) => m.DeviationFormComponent
      ),
    canDeactivate: [canDeactivateDeviationForm],
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./Pages/deviation-form/deviation-form.component').then(
        (m) => m.DeviationFormComponent
      ),
    resolve: {
      deviation: deviationResolver,
    },
    canDeactivate: [canDeactivateDeviationForm],
  },
];

