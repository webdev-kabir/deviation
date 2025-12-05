/**
 * Deviation Facade
 * 
 * Provides a simplified interface for deviation operations.
 * Coordinates between API service and state store.
 */

import { Injectable, inject } from '@angular/core';
import { Observable, tap, catchError, of, finalize, map } from 'rxjs';
import { DeviationApiService, DeviationListParams } from './Api/deviation.api';
import { DeviationStore } from './State/deviation.store';
import {
  Deviation,
  DeviationCreateDto,
  DeviationUpdateDto,
} from './Models/deviation.model';

@Injectable({
  providedIn: 'root',
})
export class DeviationFacade {
  private readonly api = inject(DeviationApiService);
  private readonly store = inject(DeviationStore);

  // Expose store selectors
  readonly deviations = this.store.deviations;
  readonly filteredDeviations = this.store.filteredDeviations;
  readonly selectedDeviation = this.store.selectedDeviation;
  readonly loading = this.store.loading;
  readonly error = this.store.error;
  readonly filters = this.store.filters;
  readonly pagination = this.store.pagination;
  readonly deviationsByStatus = this.store.deviationsByStatus;
  readonly deviationsByPriority = this.store.deviationsByPriority;

  /**
   * Load deviations with optional filters
   */
  loadDeviations(params?: DeviationListParams): Observable<void> {
    this.store.setLoading(true);
    this.store.setError(null);

    return this.api.getDeviations(params).pipe(
      tap((response) => {
        this.store.setDeviations(response.data);
        this.store.setPagination({
          page: response.page,
          pageSize: response.pageSize,
          total: response.total,
        });
      }),
      catchError((error) => {
        this.store.setError(error.message || 'Failed to load deviations');
        return of(undefined);
      }),
      finalize(() => this.store.setLoading(false)),
      map(() => undefined)
    );
  }

  /**
   * Load single deviation by ID
   */
  loadDeviation(id: string): Observable<void> {
    this.store.setLoading(true);
    this.store.setError(null);

    return this.api.getDeviationById(id).pipe(
      tap((deviation) => {
        this.store.setSelectedDeviation(deviation);
      }),
      catchError((error) => {
        this.store.setError(error.message || 'Failed to load deviation');
        return of(undefined);
      }),
      finalize(() => this.store.setLoading(false)),
      map(() => undefined)
    );
  }

  /**
   * Create new deviation
   */
  createDeviation(data: DeviationCreateDto): Observable<Deviation | null> {
    this.store.setLoading(true);
    this.store.setError(null);

    return this.api.createDeviation(data).pipe(
      tap((deviation) => {
        this.store.addDeviation(deviation);
      }),
      catchError((error) => {
        this.store.setError(error.message || 'Failed to create deviation');
        return of(null);
      }),
      finalize(() => this.store.setLoading(false))
    );
  }

  /**
   * Update existing deviation
   */
  updateDeviation(id: string, data: DeviationUpdateDto): Observable<Deviation | null> {
    this.store.setLoading(true);
    this.store.setError(null);

    return this.api.updateDeviation(id, data).pipe(
      tap((deviation) => {
        this.store.updateDeviation(id, deviation);
      }),
      catchError((error) => {
        this.store.setError(error.message || 'Failed to update deviation');
        return of(null);
      }),
      finalize(() => this.store.setLoading(false))
    );
  }

  /**
   * Delete deviation
   */
  deleteDeviation(id: string): Observable<boolean> {
    this.store.setLoading(true);
    this.store.setError(null);

    return this.api.deleteDeviation(id).pipe(
      tap(() => {
        this.store.removeDeviation(id);
      }),
      catchError((error) => {
        this.store.setError(error.message || 'Failed to delete deviation');
        return of(false);
      }),
      finalize(() => this.store.setLoading(false)),
      map(() => true)
    );
  }

  /**
   * Set filters
   */
  setFilters(filters: Parameters<typeof this.store.setFilters>[0]): void {
    this.store.setFilters(filters);
  }

  /**
   * Clear all filters
   */
  clearFilters(): void {
    this.store.clearFilters();
  }

  /**
   * Select deviation
   */
  selectDeviation(deviation: Deviation | null): void {
    this.store.setSelectedDeviation(deviation);
  }

  /**
   * Reset store
   */
  reset(): void {
    this.store.reset();
  }
}

