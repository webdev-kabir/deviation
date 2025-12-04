import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';

/**
 * A11y Focus Directive
 * 
 * Enhances focus management using Angular CDK's FocusMonitor
 * Provides visual feedback for keyboard navigation
 * 
 * Usage:
 * ```html
 * <button appA11yFocus>Click me</button>
 * ```
 */
@Directive({
  selector: '[appA11yFocus]',
  standalone: true
})
export class A11yFocusDirective implements OnInit {
  @Input() autoFocus = false;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private focusMonitor: FocusMonitor
  ) {}

  ngOnInit(): void {
    // Monitor focus changes and apply appropriate classes
    this.focusMonitor.monitor(this.elementRef, true);

    if (this.autoFocus) {
      setTimeout(() => {
        this.elementRef.nativeElement.focus();
      }, 0);
    }
  }

  ngOnDestroy(): void {
    this.focusMonitor.stopMonitoring(this.elementRef);
  }
}


