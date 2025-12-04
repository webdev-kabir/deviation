# Deviation - Angular 20 Accessibility-First Project

A production-ready Angular 20 application with comprehensive WCAG accessibility support, built for the Netpower Deviation system.

## 🎯 Features

### Core Technologies
- **Angular 20** - Latest Angular with standalone components
- **TypeScript** - Strict mode enabled for type safety
- **Tailwind CSS** - Professional design system matching Netpower branding
- **Angular CDK** - Material Design Components accessibility features

### Accessibility (A11y) - Priority #1
- ♿ **WCAG 2.1 Compliant** - Following accessibility best practices
- ⌨️ **Keyboard Navigation** - Full keyboard support throughout
- 🎯 **Focus Management** - Proper focus indicators and management
- 📢 **ARIA Support** - Comprehensive ARIA attributes
- 🔍 **Screen Reader Compatible** - Works with assistive technologies
- 🎯 **Skip Links** - Allow users to skip to main content

### Design System - Netpower Colors (from Figma)
- 🔵 **Primary Blue** - Action buttons and primary UI elements
- 🔴 **Danger Red** - Critical alerts and overdue items
- 🟠 **Warning Orange** - Medium priority items
- 🟡 **High Yellow** - High priority indicators
- 🟣 **Info Purple** - Status and information
- 🟢 **Success Green** - Completed and successful states

All colors are defined as CSS variables and integrated with Tailwind CSS for consistent styling throughout the application.

### Project Structure
```
src/app/
├── core/                    # Core application services and models
│   ├── services/            # Application-wide services
│   ├── guards/              # Route guards
│   └── interceptors/        # HTTP interceptors
├── shared/                  # Shared components and utilities
│   ├── components/
│   │   ├── accessible-button/   # Accessible button component
│   │   ├── accessible-form/     # Accessible form component
│   │   └── accessible-modal/    # Accessible modal component
│   ├── directives/
│   │   ├── a11y-focus.directive.ts
│   │   └── a11y-skip-link.directive.ts
│   ├── pipes/
│   └── utils/
├── features/                # Feature modules
└── devexpress-ui/          # DevExpress integration (prepared for future use)
```

### Path Aliases
The project includes TypeScript path aliases for cleaner imports:
- `@core/*` → `src/app/core/*`
- `@shared/*` → `src/app/shared/*`
- `@features/*` → `src/app/features/*`
- `@devexpress/*` → `src/app/devexpress-ui/*`

Example usage:
```typescript
import { AccessibleButtonComponent } from '@shared/components/accessible-button/accessible-button.component';
```

### Code Quality
- **ESLint** - Configured with Angular and accessibility rules
- **Prettier** - Code formatting with Angular template support
- **Strict TypeScript** - Maximum type safety
- **Accessibility Linting** - Automatic a11y rule checking

## 🚀 Getting Started

### Prerequisites
- Node.js (v20 or later recommended)
- npm or yarn
- Angular CLI 20.3.11

### Installation

1. Navigate to the project directory:
```bash
cd K:\deviation
```

2. Install dependencies:
```bash
npm install
```

### Development Server

Start the development server:
```bash
npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any source files.

## 📜 Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for development
- `npm run build:prod` - Build for production
- `npm run watch` - Build with watch mode
- `npm test` - Run unit tests
- `npm run lint` - Lint the codebase
- `npm run lint:fix` - Lint and auto-fix issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## 🎨 Design System

### Color Palette

The application uses a professional color system matching the Netpower Deviation design from Figma:

```css
--color-primary: #1d7fd8;       /* Action blue */
--color-danger: #e53e3e;        /* Critical/overdue red */
--color-warning: #ed8936;       /* Medium priority orange */
--color-high: #ecc94b;          /* High priority yellow */
--color-info: #667eea;          /* Status purple-blue */
--color-success: #48bb78;       /* Completed green */
```

All colors are defined in `src/styles.css` as CSS variables and mapped to Tailwind classes in `tailwind.config.js`.

### Using Colors in Components

```html
<!-- Primary button -->
<button class="bg-primary text-white">Action</button>

<!-- Status badges -->
<span class="badge badge-critical">Critical</span>
<span class="badge badge-warning">Medium</span>
<span class="badge badge-info">Ongoing</span>
<span class="badge badge-success">Completed</span>

<!-- Cards -->
<div class="card card-hover">Content</div>
```

## ♿ Accessibility Components

### Accessible Button
```html
<app-accessible-button
  [variant]="'primary'"
  [size]="'medium'"
  [disabled]="false"
  (clicked)="handleClick()">
  Click Me
</app-accessible-button>
```

Variants: `'primary' | 'secondary' | 'success' | 'danger' | 'ghost'`
Sizes: `'small' | 'medium' | 'large'`

### Accessible Modal
```html
<app-accessible-modal
  [isOpen]="showModal"
  [title]="'My Modal'"
  (close)="handleClose()">
  <p>Modal content here</p>
  <div footer>
    <button>Footer actions</button>
  </div>
</app-accessible-modal>
```

### Accessible Form
Complete form example with validation, error messages, and ARIA support.
See `src/app/shared/components/accessible-form/` for implementation.

## 🔧 Configuration Files

### Tailwind CSS (`tailwind.config.js`)
- Content paths configured for all Angular files
- Custom colors using CSS variables (from Figma design)
- Netpower color system fully integrated
- Extended spacing and border radius utilities

### ESLint (`.eslintrc.json`)
- Angular-specific rules
- TypeScript rules
- Template accessibility rules
- No console warnings (except warn/error)

### Prettier (`.prettierrc.json`)
- 100 character line width
- Single quotes
- 2-space indentation
- Angular template parser for HTML files

### TypeScript (`tsconfig.json`)
- Strict mode enabled
- Path aliases configured
- Modern ES2022 target
- Experimental decorators enabled

## 🎯 DevExpress Integration (Future)

The project structure includes a dedicated `devexpress-ui` module prepared for DevExpress Angular components.

To integrate DevExpress:

1. Install DevExpress packages:
```bash
npm install devextreme devextreme-angular
```

2. Import DevExtreme styles in `src/styles.css`:
```css
@import "devextreme/dist/css/dx.light.css";
```

3. Create wrapper components in `src/app/devexpress-ui/components/`

See `src/app/devexpress-ui/README.md` for detailed instructions.

## 🧪 Testing

Run unit tests:
```bash
npm test
```

## 🏗️ Building for Production

Build the application for production:
```bash
npm run build:prod
```

The build artifacts will be stored in the `dist/` directory.

## 📝 Key Design Decisions

1. **Standalone Components** - Using Angular's modern standalone components approach
2. **Accessibility First** - All components built with WCAG guidelines from the start
3. **Type Safety** - Strict TypeScript configuration catches errors at compile time
4. **Modular Architecture** - Clear separation of concerns
5. **Professional Design System** - Colors and fonts from Figma design, integrated with Tailwind CSS

## 🎓 Learning Resources

- [Angular Documentation](https://angular.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Angular CDK A11y](https://material.angular.io/cdk/a11y/overview)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Angular Signals](https://angular.dev/guide/signals)

## 🤝 Contributing

This project follows Angular style guide and best practices. When contributing:

1. Run linting before commits: `npm run lint:fix`
2. Format code: `npm run format`
3. Ensure accessibility standards are maintained
4. Add tests for new features

## 📄 License

This project is private and proprietary.

---

Built with ❤️ for Netpower Deviation using Angular 20 and modern web standards.
