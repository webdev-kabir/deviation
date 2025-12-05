/**
 * Deviation Card Component
 * 
 * Displays a deviation in card format.
 */

import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Deviation } from '../../Models/deviation.model';

@Component({
  selector: 'app-deviation-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './deviation-card.component.html',
  styleUrl: './deviation-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeviationCardComponent {
  deviation = input.required<Deviation>();

  getStatusBadgeClass(status: string): string {
    const statusMap: Record<string, string> = {
      open: 'badge-info',
      in_progress: 'badge-warning',
      under_review: 'badge-high',
      closed: 'badge-success',
      rejected: 'badge-critical',
    };
    return `badge ${statusMap[status] || 'badge-info'}`;
  }

  getPriorityBadgeClass(priority: string): string {
    const priorityMap: Record<string, string> = {
      critical: 'badge-critical',
      high: 'badge-warning',
      medium: 'badge-high',
      low: 'badge-info',
    };
    return `badge ${priorityMap[priority] || 'badge-info'}`;
  }
}

