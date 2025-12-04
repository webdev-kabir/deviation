# Architecture Documentation - Deviation

## 📐 Project Overview

Deviation is an Angular 20 application built with modern best practices, featuring:
- Standalone components architecture
- Reactive state management with Angular signals
- Professional design system (Netpower colors from Figma)
- Full WCAG accessibility compliance
- Tailwind CSS integration

## 🏗️ Directory Structure

```
deviation/
├── src/
│   ├── app/
│   │   ├── core/                 # Singleton services, guards, interceptors
│   │   │   ├── models/           # Data models and type definitions
│   │   │   ├── services/         # Application-wide services
│   │   │   ├── guards/           # Route guards (future)
│   │   │   └── interceptors/     # HTTP interceptors (future)
│   │   │
│   │   ├── shared/               # Reusable components, directives, pipes
│   │   │   ├── components/
│   │   │   │   ├── accessible-button/
│   │   │   │   ├── accessible-form/
│   │   │   │   └── accessible-modal/
│   │   │   ├── directives/
│   │   │   │   ├── a11y-focus.directive.ts
│   │   │   │   └── a11y-skip-link.directive.ts
│   │   │   ├── pipes/            # Custom pipes (future)
│   │   │   └── utils/            # Utility functions (future)
│   │   │
│   │   ├── features/             # Feature modules
│   │   │   └── (add feature modules here)
│   │   │
│   │   ├── devexpress-ui/        # DevExpress integration (prepared)
│   │   │   ├── devexpress.module.ts
│   │   │   └── README.md
│   │   │
│   │   ├── app.ts                # Root component
│   │   ├── app.html              # Root template
│   │   ├── app.css               # Root styles
│   │   ├── app.config.ts         # App configuration
│   │   └── app.routes.ts         # Route definitions
│   │
│   ├── styles.css                # Global styles + Tailwind
│   ├── main.ts                   # Application entry point
│   └── index.html                # HTML entry point
│
├── public/                       # Static assets
│   └── favicon.ico
│
├── .eslintrc.json               # ESLint configuration
├── .prettierrc.json             # Prettier configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript base config
├── tsconfig.app.json            # TypeScript app config
├── angular.json                 # Angular CLI configuration
└── package.json                 # Dependencies and scripts
```

## 🔑 Key Files Explained

### 1. Accessible Button Component (`shared/components/accessible-button/`)

**Purpose**: Fully accessible button implementation.

**Features**:
- Multiple variants (primary, secondary, success, danger, ghost)
- Multiple sizes (small, medium, large)
- Loading state with spinner
- Disabled state
- Keyboard support (Enter, Space)
- ARIA attributes
- Focus management

**Props**:
- `variant`: Button style variant
- `size`: Button size
- `disabled`: Disable state
- `loading`: Loading state
- `ariaLabel`: Custom ARIA label
- `type`: Button type (button, submit, reset)
- `fullWidth`: Full width flag

**Events**:
- `clicked`: Emits when button is clicked

### 2. Accessible Form Component (`shared/components/accessible-form/`)

**Purpose**: Example form with full accessibility.

**Features**:
- Reactive forms with validation
- Associated labels for all inputs
- Error messages with aria-describedby
- Required field indicators
- Real-time validation feedback
- Focus management on errors
- Keyboard navigation

**Form Fields**:
- Text input (name)
- Email input with validation
- Select dropdown (subject)
- Textarea (message)
- Checkbox (terms agreement)

### 3. Accessible Modal Component (`shared/components/accessible-modal/`)

**Purpose**: WCAG-compliant modal dialog.

**Features**:
- Focus trap (focus stays in modal)
- Focus restoration (returns focus when closed)
- Escape key to close
- Backdrop click to close
- ARIA dialog role
- Body scroll lock when open
- Configurable sizes

**Props**:
- `isOpen`: Control modal visibility
- `title`: Modal title
- `showCloseButton`: Show/hide close button
- `closeOnBackdrop`: Allow backdrop click to close
- `closeOnEscape`: Allow Escape key to close
- `size`: Modal size (small, medium, large, fullscreen)

**Events**:
- `close`: Emits when modal should close

### 4. A11y Focus Directive (`shared/directives/a11y-focus.directive.ts`)

**Purpose**: Enhanced focus management using Angular CDK.

**Features**:
- Monitors focus changes
- Provides visual feedback for keyboard navigation
- Auto-focus capability
- Uses FocusMonitor from @angular/cdk/a11y

**Usage**:
```html
<button appA11yFocus [autoFocus]="true">Click me</button>
```

### 5. A11y Skip Link Directive (`shared/directives/a11y-skip-link.directive.ts`)

**Purpose**: Implements WCAG 2.4.1 - Bypass Blocks.

**Features**:
- Allows keyboard users to skip to main content
- Smooth scrolling
- Focus management

**Usage**:
```html
<a appA11ySkipLink [targetId]="'main-content'">Skip to main content</a>
<main id="main-content">...</main>
```

## 🎨 Styling Architecture

### CSS Variables System

**Location**: `src/styles.css`

**Structure**:
```css
:root {
  /* Netpower design system colors */
  --color-primary: #1d7fd8;
  --color-danger: #e53e3e;
  --color-warning: #ed8936;
  --color-high: #ecc94b;
  --color-info: #667eea;
  --color-success: #48bb78;
  /* ... more colors ... */
}
```

**Variable Categories**:
1. Primary colors (`--color-primary*`)
2. Semantic colors (danger, warning, high, info, success)
3. Background colors (`--color-background*`)
4. Text colors (`--color-text*`)
5. Border colors (`--color-border`)

### Tailwind Integration

**Configuration**: `tailwind.config.js`

**Key Settings**:
- `content`: Scans all `src/**/*.{html,ts}` files
- `theme.extend.colors`: Maps CSS variables to Tailwind classes
- Custom spacing and border radius utilities
- All colors match the Figma design system

**Usage in Components**:
```html
<div class="bg-background text-text-primary border border-border">
  Uses Netpower design system colors
</div>
```

## 🔄 State Management

### Angular Signals

The project uses Angular signals for reactive state management:

**Benefits**:
- Fine-grained reactivity
- Automatic change detection
- Better performance than traditional observables for simple state
- Type-safe

**Example (Component State)**:
```typescript
// Define signal
public showModal = signal(false);

// Read signal
const isOpen = this.showModal();

// Update signal
this.showModal.set(true);

// Computed signal
public modalTitle = computed(() => {
  return this.showModal() ? 'Modal Open' : 'Modal Closed';
});
```

## ♿ Accessibility Features

### WCAG 2.1 Compliance

The application implements WCAG 2.1 Level AA standards:

**Perceivable**:
- Text alternatives for non-text content
- Sufficient color contrast (4.5:1 for normal text)
- High contrast theme available
- Visible focus indicators

**Operable**:
- All functionality available via keyboard
- Skip links to bypass repetitive content
- No keyboard traps
- Sufficient time for interactions

**Understandable**:
- Predictable navigation
- Input assistance (labels, instructions, error messages)
- Error identification and suggestions

**Robust**:
- Valid HTML
- ARIA attributes for custom components
- Compatible with assistive technologies

### ARIA Implementation

**Roles**:
- `role="dialog"` for modals
- `role="menu"` for dropdowns
- `role="alert"` for error messages

**Properties**:
- `aria-label`: Labels for screen readers
- `aria-labelledby`: References to labels
- `aria-describedby`: Additional descriptions
- `aria-invalid`: Invalid state for form fields
- `aria-required`: Required fields
- `aria-expanded`: Expanded/collapsed state
- `aria-modal`: Modal dialogs
- `aria-hidden`: Hide from screen readers

**Live Regions**:
- `aria-live="polite"`: Announces changes when appropriate
- Used for form validation errors

### Keyboard Navigation

**Supported Keys**:
- `Tab`: Navigate between focusable elements
- `Shift + Tab`: Navigate backwards
- `Enter`: Activate buttons and links
- `Space`: Activate buttons and checkboxes
- `Escape`: Close modals and dropdowns
- `Arrow Keys`: Navigate within menus (future enhancement)

## 🔌 Future Integrations

### DevExpress Setup

**Prepared Structure**:
- Module: `src/app/devexpress-ui/devexpress.module.ts`
- Documentation: `src/app/devexpress-ui/README.md`

**Integration Steps**:
1. Install packages
2. Import DevExtreme styles
3. Create wrapper components
4. Implement theme synchronization service

**Integration Strategy**:
```typescript
// Service to integrate DevExpress components
// Ensure DevExpress components follow accessibility guidelines
// Use Tailwind classes for consistent styling
```

## 🧪 Testing Strategy

### Unit Tests

**Location**: `*.spec.ts` files alongside components

**Test Coverage**:
- Component initialization
- User interactions
- State changes
- Event emissions
- Accessibility attributes

**Example Test Structure**:
```typescript
describe('AccessibleButtonComponent', () => {
  it('should emit clicked event on Enter key', () => {
    // Arrange
    const component = fixture.componentInstance;
    const spy = jasmine.createSpy('clicked');
    component.clicked.subscribe(spy);
    
    // Act
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    component.handleKeydown(event);
    
    // Assert
    expect(spy).toHaveBeenCalled();
  });
});
```

### Accessibility Testing

**Manual Testing**:
1. Keyboard navigation
2. Screen reader testing
3. Color contrast verification
4. High contrast mode testing

**Automated Testing**:
- ESLint accessibility rules
- Angular template accessibility rules

## 📊 Performance Considerations

### Bundle Optimization

**Strategies**:
- Standalone components for better tree-shaking
- Lazy loading for feature modules
- Production build optimizations

**Bundle Budgets**:
- Initial bundle: 500kB warning, 1MB error
- Component styles: 4kB warning, 8kB error

### Runtime Performance

**Optimizations**:
- Angular signals for efficient change detection
- OnPush change detection strategy (where applicable)
- Virtual scrolling for large lists (future)
- Memoization of computed values

## 🔒 Type Safety

### Strict TypeScript

**Enabled Strict Flags**:
- `strict: true`: All strict checks
- `noImplicitAny`: No implicit any types
- `strictNullChecks`: Null safety
- `noImplicitReturns`: Explicit returns
- `noFallthroughCasesInSwitch`: Switch case safety

**Path Aliases**:
```typescript
// Instead of: import { ThemeService } from '../../core/services/theme.service';
// Use: 
import { ThemeService } from '@core/services/theme.service';
```

## 🚀 Deployment

### Build Process

**Development Build**:
```bash
npm run build
```

**Production Build**:
```bash
npm run build:prod
```

**Output**:
- Location: `dist/deviation/browser/`
- Includes: Optimized JS, CSS, HTML, assets
- Source maps: Generated for debugging

### Environment Configuration

**Future Enhancement**: Add environment files
- `environment.ts` for development
- `environment.prod.ts` for production

## 📈 Scalability

### Adding New Features

**Feature Module Pattern**:
```
features/
  user-management/
    components/
    services/
    models/
    user-management.routes.ts
```

**Lazy Loading**:
```typescript
{
  path: 'users',
  loadChildren: () => import('./features/user-management/user-management.routes')
}
```

### Code Organization Principles

1. **Single Responsibility**: Each component/service has one clear purpose
2. **DRY**: Reusable code in shared module
3. **Separation of Concerns**: Clear boundaries between layers
4. **Dependency Injection**: Services injected, not instantiated
5. **Type Safety**: Strong typing throughout

## 🎓 Best Practices Implemented

1. **Standalone Components**: Modern Angular architecture
2. **Angular Signals**: Reactive state management
3. **Accessibility First**: WCAG compliance from the start
4. **TypeScript Strict Mode**: Maximum type safety
5. **Linting & Formatting**: Consistent code style
6. **Path Aliases**: Clean imports
7. **CSS Variables**: Design system colors
8. **Semantic HTML**: Proper element usage
9. **ARIA Attributes**: Assistive technology support
10. **Keyboard Navigation**: Full keyboard access
11. **Design System**: Consistent colors from Figma

## 📝 Documentation Standards

Each major file includes:
- JSDoc comments explaining purpose
- Usage examples
- Parameter descriptions
- Return type documentation

Example:
```typescript
/**
 * Theme Service
 * 
 * Manages application theming with Angular signals.
 * Features:
 * - Automatic localStorage persistence
 * - System preference detection
 * 
 * Usage:
 * ```typescript
 * constructor(private themeService: ThemeService) {}
 * this.themeService.setTheme('dark');
 * ```
 */
```

---

This architecture provides a solid foundation for building scalable, accessible, and maintainable Angular applications.


