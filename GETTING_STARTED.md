# Getting Started with Deviation

Quick start guide for the Deviation Angular 20 accessibility-focused project.

## 🚀 Run the Application

### 1. Start the Development Server

```bash
cd K:\deviation
npm start
```

The application will be available at: **http://localhost:4200/**

### 2. Explore the Features

Once the app is running, you'll see:

- **Header** with Netpower branding
- **Status Cards** showcasing different priority levels
- **Feature Cards** highlighting accessibility features
- **Accessible Form** with validation
- **Demo Modal** for testing

### 3. Test Accessibility Features

#### Keyboard Navigation
- Press `Tab` to navigate between interactive elements
- Press `Enter` or `Space` to activate buttons
- Press `Esc` to close the modal
- All interactive elements have visible focus indicators

#### Screen Reader Support
- Use your screen reader (NVDA, JAWS, VoiceOver, etc.)
- Skip link available at the top: press `Tab` to reveal it
- All form fields have proper labels and error messages
- ARIA attributes throughout

#### Status Indicators
The app demonstrates the Netpower color system:
- **Critical (Red)** - Overdue and urgent items
- **Warning (Orange)** - Medium priority
- **High (Yellow)** - High priority
- **Info (Purple-Blue)** - Status and information
- **Success (Green)** - Completed items

## 🧪 Test the Project

### Run Linting
```bash
npm run lint
```

Check for code quality and accessibility issues.

### Format Code
```bash
npm run format
```

Auto-format all TypeScript, HTML, and CSS files.

### Run Tests
```bash
npm test
```

Execute unit tests via Karma.

## 📁 Explore the Code

### Key Files to Check

1. **Accessible Components**
   - Button: `src/app/shared/components/accessible-button/`
   - Form: `src/app/shared/components/accessible-form/`
   - Modal: `src/app/shared/components/accessible-modal/`

2. **Styles**
   - Global: `src/styles.css` (color system defined here)
   - Tailwind Config: `tailwind.config.js`

3. **Main App**
   - Component: `src/app/app.ts`
   - Template: `src/app/app.html`

## 🎨 Customize Colors

### Modify Colors

Edit `src/styles.css` and update CSS variables:

```css
:root {
  --color-primary: #1d7fd8;  /* Netpower primary blue */
  --color-danger: #e53e3e;   /* Critical/overdue red */
  --color-warning: #ed8936;  /* Medium priority orange */
  --color-high: #ecc94b;     /* High priority yellow */
  --color-info: #667eea;      /* Status purple-blue */
  --color-success: #48bb78;  /* Completed green */
  /* ... other colors ... */
}
```

### Add New Semantic Color

1. Add to `src/styles.css`:
```css
:root {
  --color-custom: #123456;
  --color-custom-light: #abcdef;
}
```

2. Add to `tailwind.config.js`:
```javascript
colors: {
  custom: {
    DEFAULT: 'var(--color-custom)',
    light: 'var(--color-custom-light)',
  }
}
```

3. Use in templates:
```html
<div class="bg-custom text-white">Custom colored content</div>
```

## 🔧 Customize Tailwind

### Add Custom Utilities

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    spacing: {
      '128': '32rem',
    },
  },
},
```

## 🌐 Build for Production

### Create Production Build

```bash
npm run build:prod
```

Output will be in `dist/devi/browser/` directory.

### .NET Backend Integration

The build is configured to work with a .NET backend that serves SPAs. The configuration matches your `appsettings.json`:

- **PathMatch**: `/deviationV2` (configured in appsettings.json)
- **SourcePath**: `devi` (output directory name)
- **Base Href**: `/deviationV2/` (automatically set in production build)

**Deployment Steps:**

1. Build the application:
   ```bash
   npm run build:prod
   ```

2. Copy the contents of `dist/devi/browser/` to your .NET backend's `devi` folder (the folder should be at the root of your .NET project, matching the `SourcePath` in appsettings.json).

3. The .NET backend will serve the application at `/deviationV2` based on your `SpaConfigurations` settings.

**Note:** Make sure your .NET backend's `appsettings.json` includes:
```json
{
  "PathMatch": "/deviationV2",
  "SourcePath": "devi",
  "Enabled": true
}
```

## 🎯 Next Steps

### Add a New Feature

1. Create feature module:
```bash
mkdir src/app/features/my-feature
```

2. Create components:
```bash
ng generate component features/my-feature/my-component --standalone
```

### Add a New Route

Edit `src/app/app.routes.ts`:

```typescript
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'new-route', component: NewComponent },
];
```

### Create a Service

```bash
ng generate service core/services/my-service
```

## 🐛 Troubleshooting

### Port Already in Use

If port 4200 is occupied:
```bash
ng serve --port 4300
```

### Node Modules Issues

Clear and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

Clear Angular cache:
```bash
rm -rf .angular
npm start
```

## 💡 Tips

1. **Use Path Aliases** - Import from `@core/`, `@shared/`, etc.
2. **Follow Color System** - Use the Netpower design system colors
3. **Test Keyboard Navigation** - Ensure all features work without a mouse
4. **Check Accessibility** - Run linting to catch a11y issues
5. **Maintain Consistency** - Follow the Netpower design patterns from Figma

## 🎉 You're Ready!

Start building your Angular application with:
- ✅ Modern Angular 20
- ✅ Professional design system
- ✅ Full accessibility support
- ✅ Clean architecture
- ✅ Code quality tools

Happy coding! 🚀
