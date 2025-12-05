/**
 * Guest View Routes
 * 
 * Defines public routes accessible without authentication.
 */

import { Routes } from '@angular/router';

export const guestViewRoutes: Routes = [
  {
    path: 'deviation/:id',
    loadComponent: () =>
      import('./public-deviation-view/public-deviation-view.component').then(
        (m) => m.PublicDeviationViewComponent
      ),
  },
];

