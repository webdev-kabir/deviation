import { Component, ChangeDetectionStrategy, output } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Main Toolbar Component
 * 
 * Provides the main application toolbar with navigation and actions.
 * Uses standalone component architecture with OnPush change detection.
 */
@Component({
  selector: 'app-main-toolbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-toolbar.component.html',
  styleUrl: './main-toolbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainToolbarComponent {
  /**
   * Event emitted when the menu toggle button is clicked
   */
  menuToggle = output<void>();

  /**
   * Handle menu toggle click
   */
  onMenuToggle(): void {
    this.menuToggle.emit();
  }
}

