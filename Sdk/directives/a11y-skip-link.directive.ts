import { Directive, ElementRef, HostListener, Input } from '@angular/core';

/**
 * A11y Skip Link Directive
 * 
 * Enables keyboard users to skip directly to main content
 * Implements WCAG 2.4.1 Bypass Blocks
 * 
 * Usage:
 * ```html
 * <a appA11ySkipLink [targetId]="'main-content'">Skip to main content</a>
 * <main id="main-content">...</main>
 * ```
 */
@Directive({
  selector: '[appA11ySkipLink]',
  standalone: true
})
export class A11ySkipLinkDirective {
  @Input() targetId = '';

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    event.preventDefault();
    
    if (this.targetId) {
      const target = document.getElementById(this.targetId);
      if (target) {
        target.focus();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }
}


