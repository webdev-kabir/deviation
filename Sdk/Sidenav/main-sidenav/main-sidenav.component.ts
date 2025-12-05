import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface NavItem {
  label: string;
  route: string;
  icon?: string;
  badge?: string | number;
  ariaLabel?: string;
}

/**
 * Main Sidenav Component
 * 
 * Provides the main application side navigation with collapsible behavior.
 * Uses standalone component architecture with OnPush change detection.
 */
@Component({
  selector: 'app-main-sidenav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './main-sidenav.component.html',
  styleUrl: './main-sidenav.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainSidenavComponent {
  /**
   * Whether the sidenav is open
   */
  isOpen = input<boolean>(true);

  /**
   * Navigation items to display
   */
  navItems = input<NavItem[]>([]);

  /**
   * Event emitted when sidenav state changes
   */
  sidenavToggle = output<boolean>();

  /**
   * Close the sidenav
   */
  close(): void {
    this.sidenavToggle.emit(false);
  }
}

