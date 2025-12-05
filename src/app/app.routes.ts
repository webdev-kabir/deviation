import { Routes } from '@angular/router';

export const routes: Routes = [
  // Guest/Public routes (no layout)
  {
    path: 'public',
    loadChildren: () =>
      import('./Guest-View/guest-view.routes').then((m) => m.guestViewRoutes),
  },

  // Main application routes (with layout)
  {
    path: '',
    loadComponent: () =>
      import('@sdk/layout').then((m) => m.MainLayoutComponent),
    children: [
      // Dashboard/Home
      {
        path: '',
        redirectTo: 'deviations',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        redirectTo: 'deviations',
        pathMatch: 'full',
      },

      // Deviation Module
      {
        path: 'deviations',
        loadChildren: () =>
          import('./Modules/deviation/deviation.routes').then(
            (m) => m.deviationRoutes
          ),
      },

      // Reports Module
      {
        path: 'reports',
        loadChildren: () =>
          import('./Modules/reports/reports.routes').then((m) => m.reportsRoutes),
      },

      // Settings (placeholder)
      {
        path: 'settings',
        loadComponent: () =>
          import('./Modules/reports/Pages/reports-dashboard/reports-dashboard.component').then(
            (m) => m.ReportsDashboardComponent
          ),
      },
    ],
  },

  // Fallback route
  {
    path: '**',
    redirectTo: 'deviations',
  },
];
