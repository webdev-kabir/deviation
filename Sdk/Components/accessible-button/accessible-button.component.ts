import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11yFocusDirective } from '../../directives/a11y-focus.directive';

/**
 * Accessible Button Component
 * 
 * A fully accessible button implementation following WCAG guidelines:
 * - Proper ARIA attributes
 * - Keyboard navigation support
 * - Loading and disabled states
 * - Multiple variants for different use cases
 * 
 * Usage:
 * ```html
 * <app-accessible-button 
 *   [variant]="'primary'"
 *   [disabled]="false"
 *   (clicked)="handleClick()">
 *   Click Me
 * </app-accessible-button>
 * ```
 */
@Component({
  selector: 'app-accessible-button',
  standalone: true,
  imports: [CommonModule, A11yFocusDirective],
  templateUrl: './accessible-button.component.html',
  styleUrls: ['./accessible-button.component.css']
})
export class AccessibleButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost' = 'primary';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() ariaLabel?: string;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() fullWidth = false;

  @Output() clicked = new EventEmitter<Event>();

  /**
   * Get button CSS classes based on variant and size
   */
  public getButtonClasses(): string {
    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all focus-ring disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variantClasses = {
      'primary': 'bg-primary text-white hover:bg-primary-dark active:bg-primary-dark',
      'secondary': 'bg-secondary text-white hover:bg-secondary-dark active:bg-secondary-dark',
      'success': 'bg-green-600 text-white hover:bg-green-700 active:bg-green-800',
      'danger': 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
      'ghost': 'bg-transparent text-text border border-border hover:bg-background-secondary'
    };

    const sizeClasses = {
      'small': 'px-3 py-1.5 text-sm',
      'medium': 'px-4 py-2 text-base',
      'large': 'px-6 py-3 text-lg'
    };

    const widthClass = this.fullWidth ? 'w-full' : '';

    return `${baseClasses} ${variantClasses[this.variant]} ${sizeClasses[this.size]} ${widthClass}`;
  }

  /**
   * Handle button click
   */
  public handleClick(event: Event): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit(event);
    }
  }

  /**
   * Handle keyboard events
   */
  public handleKeydown(event: KeyboardEvent): void {
    if ((event.key === 'Enter' || event.key === ' ') && !this.disabled && !this.loading) {
      event.preventDefault();
      this.clicked.emit(event);
    }
  }
}


