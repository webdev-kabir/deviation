# 📄 Complete File Reference - Deviation Project

This document explains **every major file** created in this project, why it exists, and how to use it.

## 🗂️ Root Directory Files

### Configuration Files

#### `package.json`
**Purpose**: Defines project dependencies and npm scripts

**Key Scripts Added**:
- `npm start` - Start development server
- `npm run build` - Development build
- `npm run build:prod` - Production build with optimizations
- `npm run lint` - Check code quality
- `npm run lint:fix` - Auto-fix linting issues
- `npm run format` - Format all code with Prettier
- `npm run format:check` - Check if code is formatted

#### `angular.json`
**Purpose**: Angular CLI configuration

**Key Additions**:
- Lint task configured with `@angular-eslint/builder`
- Build configurations for development and production
- Test setup with Karma

#### `tsconfig.json`
**Purpose**: TypeScript base configuration

**Key Features**:
- Strict mode enabled (maximum type safety)
- Modern ES2022 target
- Experimental decorators for Angular

#### `tsconfig.app.json`
**Purpose**: TypeScript configuration for application code

**Key Addition - Path Aliases**:
```typescript
"paths": {
  "@core/*": ["src/app/core/*"],
  "@shared/*": ["src/app/shared/*"],
  "@features/*": ["src/app/features/*"],
  "@devexpress/*": ["src/app/devexpress-ui/*"]
}
```

Use these for cleaner imports:
```typescript
// Instead of: import { SomeService } from '../../core/services/some.service';
import { SomeService } from '@core/services/some.service';
```

#### `tailwind.config.js`
**Purpose**: Tailwind CSS configuration

**Key Features**:
- `content`: Scans all HTML/TS files for classes
- `theme.extend.colors`: Custom colors using CSS variables (matching Figma design)
- Netpower color system integrated
- Custom spacing and border radius utilities

**Example**: Use semantic colors from the design system:
```html
<div class="bg-background text-text-primary border-border">
  Uses Netpower design system colors
</div>
```

#### `postcss.config.js`
**Purpose**: PostCSS configuration for processing styles

**Plugins**:
- `tailwindcss`: Processes Tailwind directives
- `autoprefixer`: Adds vendor prefixes for browser compatibility

#### `.eslintrc.json`
**Purpose**: ESLint code quality rules

**Key Rules**:
- Angular-specific rules (component/directive selectors)
- TypeScript rules (no implicit any, unused vars)
- **Accessibility rules** for HTML templates:
  - `alt-text`: Images must have alt text
  - `label-has-associated-control`: Form labels required
  - `click-events-have-key-events`: Keyboard alternatives required
  - `valid-aria`: ARIA attributes must be valid

#### `.prettierrc.json`
**Purpose**: Code formatting rules

**Key Settings**:
- 100 character line width
- Single quotes
- 2-space indentation
- Angular parser for HTML templates

#### `.prettierignore`
**Purpose**: Files to exclude from formatting

**Excluded**: node_modules, dist, coverage, build artifacts

---

## 📁 Source Files (`src/app/`)

### Root Application Files

#### `src/app/app.ts`
**Purpose**: Root component of the application

**What It Does**:
- Imports and uses all showcase components
- Manages modal state
- Demonstrates component usage

**Key Features**:
- Standalone component (no module needed)
- Uses Angular signals for state
- Imports accessible components (button, form, modal)

#### `src/app/app.html`
**Purpose**: Root template

**Key Sections**:
- Skip navigation link (accessibility)
- Header with Netpower branding
- Hero section with demo buttons
- Feature cards showcasing project capabilities
- Demo form
- Tech stack tags
- Footer
- Demo modal

#### `src/app/app.css`
**Purpose**: Root component styles

**Key Styles**:
- Screen reader only classes
- Smooth scroll behavior
- Focus state management

#### `src/app/app.config.ts`
**Purpose**: Application configuration

**What It Provides**:
- Router configuration
- Zone.js setup
- Application providers

#### `src/app/app.routes.ts`
**Purpose**: Application routing

**Current State**: Empty, ready for your routes
**Add Routes Here**:
```typescript
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
];
```

---

## 🎨 Styling Files

#### `src/styles.css`
**Purpose**: Global styles and design system definitions

**Key Sections**:

1. **Tailwind Directives**:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

2. **CSS Variables - Netpower Color System**:
- Primary colors (action blue)
- Semantic colors (danger, warning, high, info, success)
- Background colors
- Text colors
- Border colors
- All colors match the Figma design

3. **Base Styles**:
- Body styles with system fonts
- Focus indicators for accessibility
- Typography settings

4. **Custom Utilities**:
- Badge styles (critical, warning, high, info, success)
- Card styles
- Focus ring for accessibility
- Screen reader only classes

---

## 🔧 Core Module Files

### Services

The `core/services/` directory is ready for your application-wide services. Examples:
- API services
- State management services
- Utility services

### Models

The `core/models/` directory is ready for your data models and type definitions.

---

## 🎭 Shared Components

### Accessible Button Component

#### `src/app/shared/components/accessible-button/accessible-button.component.ts`
**Purpose**: Fully accessible button implementation

**Props**:
- `variant`: `'primary' | 'secondary' | 'success' | 'danger' | 'ghost'`
- `size`: `'small' | 'medium' | 'large'`
- `disabled`: boolean
- `loading`: boolean (shows spinner)
- `ariaLabel`: Custom ARIA label
- `type`: `'button' | 'submit' | 'reset'`
- `fullWidth`: boolean

**Events**:
- `clicked`: Emitted when button is activated

**Usage**:
```html
<app-accessible-button
  [variant]="'primary'"
  [size]="'large'"
  [loading]="isLoading"
  [disabled]="isDisabled"
  (clicked)="handleClick()">
  Click Me
</app-accessible-button>
```

**Features**:
- Keyboard support (Enter, Space)
- Loading spinner
- ARIA attributes
- Focus management
- Ripple effect on click

#### `accessible-button.component.html`
**Key Elements**:
- Loading spinner (animated SVG)
- Content projection with `<ng-content>`
- ARIA attributes (aria-label, aria-busy, aria-disabled)

#### `accessible-button.component.css`
**Effects**:
- Ripple animation on click
- High contrast mode styling
- Disabled state styling

---

### Accessible Form Component

#### `src/app/shared/components/accessible-form/accessible-form.component.ts`
**Purpose**: Example form with full accessibility

**Form Fields**:
- Name (text input with validation)
- Email (email input with validation)
- Subject (select dropdown)
- Message (textarea with min length)
- Terms agreement (checkbox)

**Features**:
- Reactive forms
- Real-time validation
- Error messages with aria-describedby
- Focus management on errors
- Required field indicators

**Key Methods**:
```typescript
// Check if field is invalid
isFieldInvalid(fieldName: string): boolean

// Get error message for field
getErrorMessage(fieldName: string): string

// Handle form submission
onSubmit(): void

// Reset form
resetForm(): void
```

**Usage**:
```html
<app-accessible-form></app-accessible-form>
```

#### `accessible-form.component.html`
**Accessibility Features**:
- Associated labels (for attribute)
- aria-required for required fields
- aria-invalid for invalid fields
- aria-describedby linking to error messages
- role="alert" on error messages
- aria-live="polite" for announcements

#### `accessible-form.component.css`
**Features**:
- Theme-aware styling
- Error state styling
- High contrast mode support
- Custom checkbox styling

---

### Accessible Modal Component

#### `src/app/shared/components/accessible-modal/accessible-modal.component.ts`
**Purpose**: WCAG-compliant modal dialog

**Props**:
- `isOpen`: boolean - Controls visibility
- `title`: string - Modal title
- `showCloseButton`: boolean
- `closeOnBackdrop`: boolean
- `closeOnEscape`: boolean
- `size`: `'small' | 'medium' | 'large' | 'fullscreen'`

**Events**:
- `close`: Emitted when modal should close

**Features**:
- **Focus trap** - Focus stays in modal
- **Focus restoration** - Returns focus on close
- **Escape key** to close
- **Backdrop click** to close
- **Body scroll lock** when open
- Configurable sizes

**Usage**:
```html
<app-accessible-modal
  [isOpen]="showModal"
  [title]="'Confirm Action'"
  [size]="'medium'"
  (close)="handleClose()">
  
  <!-- Main content -->
  <p>Modal content here</p>
  
  <!-- Footer (optional) -->
  <div footer>
    <button>Action</button>
  </div>
</app-accessible-modal>
```

**Lifecycle**:
1. `ngOnInit` - Check if initially open
2. `ngOnChanges` - Handle open/close
3. `ngOnDestroy` - Cleanup (restore focus, enable scroll)

#### `accessible-modal.component.html`
**Key Elements**:
- Backdrop with fade animation
- Modal container with focus trap (`cdkTrapFocus`)
- ARIA attributes (role="dialog", aria-modal, aria-labelledby)
- Close button with aria-label
- Content slots (main + footer)

#### `accessible-modal.component.css`
**Animations**:
- Fade-in for backdrop
- Slide-in for modal
- Custom scrollbar styling
- High contrast border

---

## 📐 Directives

### A11y Focus Directive

#### `src/app/shared/directives/a11y-focus.directive.ts`
**Purpose**: Enhanced focus management using Angular CDK

**Features**:
- Uses `FocusMonitor` from @angular/cdk/a11y
- Provides visual feedback for keyboard navigation
- Optional auto-focus

**Usage**:
```html
<button appA11yFocus [autoFocus]="true">
  Focused on load
</button>
```

**What It Does**:
- Monitors focus changes
- Applies appropriate CSS classes
- Cleans up on destroy

### A11y Skip Link Directive

#### `src/app/shared/directives/a11y-skip-link.directive.ts`
**Purpose**: Implements WCAG 2.4.1 - Bypass Blocks

**Features**:
- Allows keyboard users to skip to main content
- Smooth scrolling
- Focus management

**Usage**:
```html
<a appA11ySkipLink [targetId]="'main-content'" class="sr-only">
  Skip to main content
</a>
<main id="main-content" tabindex="-1">
  Main content here
</main>
```

**Why It's Important**:
Keyboard users can skip repetitive navigation and jump directly to the main content.

---

## 🏗️ DevExpress Placeholder

### `src/app/devexpress-ui/devexpress.module.ts`
**Purpose**: Placeholder module for DevExpress integration

**Current State**: Empty module with comments

**How to Activate**:
1. Install: `npm install devextreme devextreme-angular`
2. Import DevExtreme modules here
3. Export them for use in your app

### `src/app/devexpress-ui/README.md`
**Purpose**: Detailed DevExpress integration guide

**Contents**:
- Installation instructions
- Theme synchronization strategy
- Best practices
- Recommended structure

---

## 📚 Documentation Files

### `README.md`
**Purpose**: Main project documentation

**Sections**:
- Features overview
- Project structure
- Getting started
- Usage examples
- Configuration details
- Path aliases
- DevExpress setup
- CSS variables
- Testing instructions
- Building for production

### `GETTING_STARTED.md`
**Purpose**: Quick start guide

**Sections**:
- How to run the app
- Test accessibility features
- Explore the code
- Customize themes
- Build for production
- Troubleshooting
- Tips and tricks

### `ARCHITECTURE.md`
**Purpose**: Detailed architecture documentation

**Sections**:
- Directory structure
- Key files explained
- Styling architecture
- State management
- Accessibility features
- Future integrations
- Performance considerations
- Type safety
- Deployment
- Scalability
- Best practices

### `PROJECT_SUMMARY.md`
**Purpose**: High-level project overview

**Sections**:
- What was created
- How to run
- Key features demo
- Customization guide
- Build information
- Technologies used
- Checklist of features
- Next steps

### `FILES_EXPLAINED.md` (This File)
**Purpose**: Explains every major file in detail

---

## 🎯 How Files Work Together

### Component Communication Flow

```
App Component (app.ts)
  ├─ Accessible Button → Emits events
  ├─ Accessible Form → Validates and submits
  └─ Accessible Modal → Opens/closes based on state
```

### Design System Flow

1. **CSS Variables** → Defined in `src/styles.css` (Netpower colors)
2. **Tailwind Config** → Maps CSS variables to Tailwind classes
3. **Components** → Use Tailwind classes like `bg-primary`, `text-danger`
4. **Consistent Styling** → All components follow the same design system

### Accessibility Flow

1. **User tabs** → Focus moves to next element
2. **Directive monitors** → `A11yFocusDirective`
3. **Focus visible** → CSS focus-ring applies
4. **User presses Enter** → Component handles keydown
5. **Action executes** → Event emitted
6. **Screen reader announces** → ARIA labels/live regions

---

## 🔍 Finding What You Need

| Want to... | Check this file |
|-----------|----------------|
| Change colors | `src/styles.css` (CSS variables) |
| Add new colors | `src/styles.css` + `tailwind.config.js` |
| Add path aliases | `tsconfig.app.json` |
| Configure Tailwind | `tailwind.config.js` |
| Add linting rules | `.eslintrc.json` |
| Format code | Run `npm run format` |
| Create new component | `ng generate component <name>` |
| Add new route | `app.routes.ts` |
| Install DevExpress | Read `devexpress-ui/README.md` |

---

## 💡 Key Concepts

### Standalone Components
All components use `standalone: true` - no NgModules required!

```typescript
@Component({
  standalone: true,
  imports: [CommonModule, OtherComponent],
  // ...
})
```

### Angular Signals
Modern reactive state management:

```typescript
// Create
public theme = signal('light');

// Read
const currentTheme = this.theme();

// Update
this.theme.set('dark');

// Computed
public displayName = computed(() => this.theme().toUpperCase());

// Effect
effect(() => console.log('Theme:', this.theme()));
```

### CSS Variables + Tailwind
Perfect combination for consistent design system:

```css
/* Define in styles.css */
:root {
  --color-primary: #1d7fd8;
}

/* Use in Tailwind config */
theme: {
  extend: {
    colors: {
      primary: 'var(--color-primary)',
    },
  },
}

/* Use in HTML */
<div class="bg-primary">Uses design system color!</div>
```

---

## 📊 File Statistics

- **Total Configuration Files**: 10
- **Components Created**: 3 (Button, Form, Modal)
- **Directives Created**: 2 (Focus, Skip Link)
- **Documentation Files**: 5 (README, Getting Started, Architecture, Summary, This file)
- **Total Lines of Code**: ~2,500+
- **Build Size**: Optimized for production

---

## ✅ Quick Reference

### Most Important Files

1. **`styles.css`** - Design system and color definitions
2. **`app.ts`** - Main application
3. **`tailwind.config.js`** - Tailwind setup with design system
4. **`tsconfig.app.json`** - Path aliases
5. **`accessible-*.component.ts`** - Accessibility components

### Most Used Commands

```bash
npm start          # Run dev server
npm run build      # Build project
npm run lint       # Check code
npm run format     # Format code
```

### Most Important Concepts

1. **Angular Signals** - Reactive state
2. **CSS Variables** - Design system colors
3. **Standalone Components** - Modern Angular
4. **Path Aliases** - Clean imports
5. **WCAG Compliance** - Accessibility

---

**This completes the file reference!** Every major file has been explained with its purpose, usage, and how it fits into the overall architecture. 🎉


