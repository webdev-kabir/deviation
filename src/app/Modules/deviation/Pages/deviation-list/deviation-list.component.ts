/**
 * Deviation List Page Component
 * 
 * Displays a list of all deviations with filtering and pagination.
 */

import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DeviationFacade } from '../../deviation.facade';
import { DeviationCardComponent } from '../../UI/deviation-card/deviation-card.component';

@Component({
  selector: 'app-deviation-list',
  standalone: true,
  imports: [CommonModule, RouterLink, DeviationCardComponent],
  templateUrl: './deviation-list.component.html',
  styleUrl: './deviation-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeviationListComponent implements OnInit {
  private readonly facade = inject(DeviationFacade);

  // Expose facade signals to template
  readonly deviations = this.facade.filteredDeviations;
  readonly loading = this.facade.loading;
  readonly error = this.facade.error;

  ngOnInit(): void {
    this.loadDeviations();
  }

  loadDeviations(): void {
    this.facade.loadDeviations().subscribe();
  }

  onSearch(search: string): void {
    this.facade.setFilters({ search });
  }

  clearFilters(): void {
    this.facade.clearFilters();
  }
}

