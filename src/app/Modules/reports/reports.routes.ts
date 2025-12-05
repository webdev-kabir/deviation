/**
 * Reports Module Routes
 * 
 * Defines all routes for the reports module with lazy loading.
 */

import { Routes } from '@angular/router';

export const reportsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./Pages/reports-dashboard/reports-dashboard.component').then(
        (m) => m.ReportsDashboardComponent
      ),
  },
];

