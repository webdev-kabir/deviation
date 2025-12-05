# 🏗️ New Angular Architecture Implementation

## Overview

This document describes the new modular architecture implemented for the Deviation Management System. The architecture focuses on scalability, maintainability, and clear separation of concerns.

## 📁 Project Structure

```
deviation/
├── Sdk/                           # Shared SDK (at project root)
│   ├── Components/                # Reusable UI components
│   │   ├── accessible-button/
│   │   ├── accessible-form/
│   │   ├── accessible-modal/
│   │   └── index.ts              # Barrel export
│   ├── Layout/                    # Layout components
│   │   ├── main-layout/
│   │   └── index.ts
│   ├── Toolbar/                   # Toolbar components
│   │   ├── main-toolbar/
│   │   └── index.ts
│   ├── Sidenav/                   # Sidenav components
│   │   ├── main-sidenav/
│   │   └── index.ts
│   ├── directives/                # Shared directives
│   └── index.ts                   # Root barrel export
│
├── src/
│   ├── app/
│   │   ├── Modules/               # Feature modules
│   │   │   ├── deviation/         # Deviation module (example)
│   │   │   │   ├── Api/
│   │   │   │   │   ├── deviation.api.ts
│   │   │   │   │   └── deviation.endpoints.ts
│   │   │   │   ├── Pages/
│   │   │   │   │   ├── deviation-list/
│   │   │   │   │   └── deviation-form/
│   │   │   │   ├── UI/
│   │   │   │   │   └── deviation-card/
│   │   │   │   ├── Guards/
│   │   │   │   │   └── deviation-form.deactivate.ts
│   │   │   │   ├── Resolvers/
│   │   │   │   │   └── deviation.resolver.ts
│   │   │   │   ├── Models/
│   │   │   │   │   └── deviation.model.ts
│   │   │   │   ├── Forms/
│   │   │   │   │   └── deviation-creation.form.ts
│   │   │   │   ├── Services/
│   │   │   │   ├── State/
│   │   │   │   │   └── deviation.store.ts
│   │   │   │   ├── deviation.facade.ts
│   │   │   │   └── deviation.routes.ts
│   │   │   └── reports/           # Reports module (placeholder)
│   │   │       ├── Pages/
│   │   │       └── reports.routes.ts
│   │   ├── Guest-View/            # Public routes (no auth)
│   │   │   ├── public-deviation-view/
│   │   │   └── guest-view.routes.ts
│   │   ├── core/                  # Core services & guards
│   │   ├── shared/                # Legacy shared (being migrated)
│   │   ├── app.routes.ts
│   │   └── app.config.ts
│   ├── Environments/              # Environment configuration
│   │   ├── appSettings.json
│   │   ├── appSettings.prod.json
│   │   ├── environment.ts
│   │   └── environment.prod.ts
│   └── styles.css
└── tsconfig.app.json              # Path aliases configured
```

## 🎯 Key Features

### 1. SDK Structure

The SDK is a shared library at the project root containing:

- **Components**: Reusable UI components (buttons, forms, modals)
- **Layout**: Application layout components (main layout, toolbar, sidenav)
- **Directives**: Shared directives for accessibility and common behaviors
- **Barrel Exports**: Easy imports via `@sdk/*` aliases

### 2. Module Architecture

Each feature module follows a consistent structure:

#### **Api/** - HTTP Services
- `*.api.ts`: API service with HTTP calls
- `*.endpoints.ts`: Centralized endpoint definitions

#### **Pages/** - Route Components
- Page-level components (list, form, detail views)
- Standalone components with lazy loading

#### **UI/** - Presentational Components
- Reusable UI components specific to the module
- Cards, widgets, specialized forms

#### **State/** - State Management
- Signal-based stores using Angular Signals
- Reactive state management
- Computed values and selectors

#### **Models/** - TypeScript Interfaces
- Type definitions
- DTOs (Data Transfer Objects)
- Enums

#### **Forms/** - Form Definitions
- Typed reactive forms
- Validation logic
- Form utilities

#### **Guards/** - Route Guards
- Authentication guards
- Authorization guards
- Form deactivation guards

#### **Resolvers/** - Route Resolvers
- Pre-fetch data before route activation
- Improve UX with resolved data

#### **Facade** - Public API
- Simplified interface for module operations
- Coordinates between API service and state store
- Single entry point for consumers

#### **Routes** - Module Routes
- Lazy-loaded route definitions
- Child routes configuration

### 3. Guest View

Public-facing routes accessible without authentication:

- Shared via links
- No layout/navigation
- Isolated from main application

### 4. Path Aliases

Configured in `tsconfig.app.json`:

```typescript
{
  "@sdk/*": ["Sdk/*"],
  "@sdk/components": ["Sdk/Components"],
  "@sdk/layout": ["Sdk/Layout"],
  "@modules/*": ["src/app/Modules/*"],
  "@guest/*": ["src/app/Guest-View/*"],
  "@environments/*": ["src/Environments/*"],
  "@core/*": ["src/app/core/*"],
  "@shared/*": ["src/app/shared/*"]
}
```

## 📖 Usage Examples

### Importing from SDK

```typescript
// Import layout
import { MainLayoutComponent } from '@sdk/layout';

// Import components
import { AccessibleButtonComponent } from '@sdk/components';

// Import from root SDK
import { MainLayoutComponent, AccessibleButtonComponent } from '@sdk';
```

### Creating a New Module

1. Create module directory in `src/app/Modules/`
2. Follow the structure:
   ```
   new-module/
   ├── Api/
   ├── Pages/
   ├── UI/
   ├── Models/
   ├── State/
   ├── new-module.facade.ts
   └── new-module.routes.ts
   ```

3. Add route in `app.routes.ts`:
   ```typescript
   {
     path: 'new-module',
     loadChildren: () =>
       import('./Modules/new-module/new-module.routes').then(
         (m) => m.newModuleRoutes
       ),
   }
   ```

### Using the Facade Pattern

```typescript
// In component
export class DeviationListComponent implements OnInit {
  private readonly facade = inject(DeviationFacade);

  // Expose signals
  readonly deviations = this.facade.filteredDeviations;
  readonly loading = this.facade.loading;

  ngOnInit(): void {
    this.facade.loadDeviations().subscribe();
  }

  onFilter(filters: any): void {
    this.facade.setFilters(filters);
  }
}
```

### State Management with Signals

```typescript
// Store
@Injectable({ providedIn: 'root' })
export class DeviationStore {
  private readonly state = signal<DeviationState>(initialState);

  // Selectors
  readonly deviations = computed(() => this.state().deviations);
  readonly loading = computed(() => this.state().loading);

  // Actions
  setDeviations(deviations: Deviation[]): void {
    this.state.update((state) => ({ ...state, deviations }));
  }
}
```

## 🚀 Benefits

### Scalability
- Clear module boundaries
- Easy to add new features
- Independent module development

### Maintainability
- Consistent structure across modules
- Easy to locate functionality
- Predictable file organization

### Performance
- Lazy loading by default
- Standalone components
- Optimized bundle sizes

### Developer Experience
- Path aliases for clean imports
- Facade pattern simplifies usage
- Signal-based reactivity
- TypeScript strict mode

## 🔄 Migration Path

### From Old Structure
1. Move shared components to SDK
2. Organize features into Modules
3. Update imports to use path aliases
4. Implement facades for complex modules
5. Add state management with signals

### Adding New Features
1. Create new module directory
2. Implement following the structure
3. Add routes with lazy loading
4. Export via barrel files
5. Document the module

## 📚 Additional Resources

- **Angular Signals**: [Angular Docs](https://angular.dev/guide/signals)
- **Standalone Components**: [Angular Docs](https://angular.dev/guide/components/importing)
- **Lazy Loading**: [Angular Docs](https://angular.dev/guide/ngmodules/lazy-loading)
- **Route Guards**: [Angular Docs](https://angular.dev/guide/routing/common-router-tasks#preventing-unauthorized-access)

## ✅ Completed Implementation

- ✅ SDK structure created
- ✅ Main layout with toolbar and sidenav
- ✅ Deviation module (full implementation)
- ✅ Reports module (placeholder)
- ✅ Guest view structure
- ✅ Environment configuration
- ✅ Path aliases configured
- ✅ Lazy-loaded routing
- ✅ Signal-based state management
- ✅ Facade pattern implementation
- ✅ Build verification successful

## 🎓 Best Practices

1. **Always use path aliases** for imports
2. **Follow the module structure** consistently
3. **Use facades** for complex state/API interactions
4. **Implement lazy loading** for all feature modules
5. **Use signals** for reactive state
6. **Keep components standalone**
7. **Use OnPush change detection**
8. **Implement accessibility** features
9. **Add proper TypeScript types**
10. **Document complex logic**

## 🔧 Development Commands

```bash
# Start development server
npm start

# Build for production
npm run build:prod

# Lint code
npm run lint

# Format code
npm run format

# Run tests
npm test
```

---

**Last Updated**: December 2025
**Version**: 1.0.0

