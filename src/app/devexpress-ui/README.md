# DevExpress UI Module

This directory is prepared for future DevExpress Angular components integration.

## Installation (When Ready)

When you're ready to add DevExpress components, follow these steps:

1. Install DevExpress Angular package:
```bash
npm install devextreme devextreme-angular
```

2. Import DevExtreme styles in `src/styles.css`:
```css
@import "devextreme/dist/css/dx.light.css";
```

3. Create wrapper components in this directory to maintain consistency with the app's design system.

## Structure

Organize DevExpress components as follows:

```
devexpress-ui/
  ├── components/
  │   ├── dx-data-grid/
  │   ├── dx-chart/
  │   └── dx-form/
  ├── services/
  │   └── dx-accessibility.service.ts  (accessibility enhancements)
  └── README.md
```

## Styling Integration

When integrating DevExpress components:

1. Use the default DevExpress light theme: `dx.light.css`
2. Ensure DevExpress components follow WCAG accessibility guidelines
3. Apply consistent styling with Tailwind utility classes where appropriate
4. Use the app's design system colors for custom styling

## Best Practices

1. Wrap DevExpress components in custom Angular components
2. Ensure all DevExpress components follow WCAG accessibility guidelines
3. Apply consistent styling with Tailwind utility classes where appropriate
4. Use the Netpower design system colors for custom styling
5. Test keyboard navigation and screen reader compatibility


