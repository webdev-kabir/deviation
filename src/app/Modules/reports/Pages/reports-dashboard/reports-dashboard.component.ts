/**
 * Reports Dashboard Component
 * 
 * Placeholder for reports module dashboard.
 */

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports-dashboard.component.html',
  styleUrl: './reports-dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsDashboardComponent {}

