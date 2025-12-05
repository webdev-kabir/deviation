import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';

/**
 * Accessible Modal Component
 * 
 * Implements WCAG modal/dialog best practices:
 * - Focus trap (focus stays within modal)
 * - Escape key to close
 * - Focus management (return focus on close)
 * - ARIA roles and properties
 * - Backdrop click to close
 * 
 * Usage:
 * ```html
 * <app-accessible-modal
 *   [isOpen]="showModal"
 *   [title]="'Confirm Action'"
 *   (close)="handleClose()">
 *   <p>Modal content here</p>
 * </app-accessible-modal>
 * ```
 */
@Component({
  selector: 'app-accessible-modal',
  standalone: true,
  imports: [CommonModule, A11yModule],
  templateUrl: './accessible-modal.component.html',
  styleUrls: ['./accessible-modal.component.css']
})
export class AccessibleModalComponent implements OnInit, OnDestroy {
  @Input() isOpen = false;
  @Input() title = 'Modal';
  @Input() showCloseButton = true;
  @Input() closeOnBackdrop = true;
  @Input() closeOnEscape = true;
  @Input() size: 'small' | 'medium' | 'large' | 'fullscreen' = 'medium';

  @Output() close = new EventEmitter<void>();

  private previousActiveElement: HTMLElement | null = null;

  ngOnInit(): void {
    if (this.isOpen) {
      this.onOpen();
    }
  }

  ngOnChanges(): void {
    if (this.isOpen) {
      this.onOpen();
    } else {
      this.onClose();
    }
  }

  ngOnDestroy(): void {
    this.restoreFocus();
    this.enableBodyScroll();
  }

  /**
   * Get modal size classes
   */
  public getModalClasses(): string {
    const sizeClasses = {
      'small': 'max-w-md',
      'medium': 'max-w-2xl',
      'large': 'max-w-4xl',
      'fullscreen': 'max-w-full h-full m-0'
    };

    return `${sizeClasses[this.size]} w-full`;
  }

  /**
   * Handle modal open
   */
  private onOpen(): void {
    this.previousActiveElement = document.activeElement as HTMLElement;
    this.disableBodyScroll();
  }

  /**
   * Handle modal close
   */
  private onClose(): void {
    this.restoreFocus();
    this.enableBodyScroll();
  }

  /**
   * Close modal
   */
  public closeModal(): void {
    this.close.emit();
  }

  /**
   * Handle backdrop click
   */
  public onBackdropClick(event: MouseEvent): void {
    if (this.closeOnBackdrop && (event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.closeModal();
    }
  }

  /**
   * Handle keyboard events
   */
  public onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.closeOnEscape) {
      event.preventDefault();
      this.closeModal();
    }
  }

  /**
   * Restore focus to the element that opened the modal
   */
  private restoreFocus(): void {
    if (this.previousActiveElement) {
      setTimeout(() => {
        this.previousActiveElement?.focus();
      }, 0);
    }
  }

  /**
   * Disable body scroll when modal is open
   */
  private disableBodyScroll(): void {
    document.body.style.overflow = 'hidden';
  }

  /**
   * Enable body scroll when modal is closed
   */
  private enableBodyScroll(): void {
    document.body.style.overflow = '';
  }
}

