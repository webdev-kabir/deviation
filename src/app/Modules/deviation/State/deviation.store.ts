/**
 * Deviation State Store
 * 
 * Manages deviation state using Angular Signals.
 */

import { Injectable, computed, signal } from '@angular/core';
import { Deviation, DeviationStatus, DeviationPriority } from '../Models/deviation.model';

export interface DeviationState {
  deviations: Deviation[];
  selectedDeviation: Deviation | null;
  loading: boolean;
  error: string | null;
  filters: {
    status?: DeviationStatus;
    priority?: DeviationPriority;
    search?: string;
  };
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
}

const initialState: DeviationState = {
  deviations: [],
  selectedDeviation: null,
  loading: false,
  error: null,
  filters: {},
  pagination: {
    page: 1,
    pageSize: 25,
    total: 0,
  },
};

@Injectable({
  providedIn: 'root',
})
export class DeviationStore {
  // State signals
  private readonly state = signal<DeviationState>(initialState);

  // Selectors (computed signals)
  readonly deviations = computed(() => this.state().deviations);
  readonly selectedDeviation = computed(() => this.state().selectedDeviation);
  readonly loading = computed(() => this.state().loading);
  readonly error = computed(() => this.state().error);
  readonly filters = computed(() => this.state().filters);
  readonly pagination = computed(() => this.state().pagination);

  // Computed selectors
  readonly filteredDeviations = computed(() => {
    const deviations = this.state().deviations;
    const filters = this.state().filters;

    return deviations.filter((deviation) => {
      if (filters.status && deviation.status !== filters.status) {
        return false;
      }
      if (filters.priority && deviation.priority !== filters.priority) {
        return false;
      }
      if (filters.search) {
        const search = filters.search.toLowerCase();
        return (
          deviation.title.toLowerCase().includes(search) ||
          deviation.description.toLowerCase().includes(search)
        );
      }
      return true;
    });
  });

  readonly deviationsByStatus = computed(() => {
    const deviations = this.state().deviations;
    return deviations.reduce(
      (acc, deviation) => {
        acc[deviation.status] = (acc[deviation.status] || 0) + 1;
        return acc;
      },
      {} as Record<DeviationStatus, number>
    );
  });

  readonly deviationsByPriority = computed(() => {
    const deviations = this.state().deviations;
    return deviations.reduce(
      (acc, deviation) => {
        acc[deviation.priority] = (acc[deviation.priority] || 0) + 1;
        return acc;
      },
      {} as Record<DeviationPriority, number>
    );
  });

  // Actions (state mutations)
  setDeviations(deviations: Deviation[]): void {
    this.state.update((state) => ({
      ...state,
      deviations,
    }));
  }

  addDeviation(deviation: Deviation): void {
    this.state.update((state) => ({
      ...state,
      deviations: [...state.deviations, deviation],
    }));
  }

  updateDeviation(id: string, updates: Partial<Deviation>): void {
    this.state.update((state) => ({
      ...state,
      deviations: state.deviations.map((d) =>
        d.id === id ? { ...d, ...updates } : d
      ),
    }));
  }

  removeDeviation(id: string): void {
    this.state.update((state) => ({
      ...state,
      deviations: state.deviations.filter((d) => d.id !== id),
    }));
  }

  setSelectedDeviation(deviation: Deviation | null): void {
    this.state.update((state) => ({
      ...state,
      selectedDeviation: deviation,
    }));
  }

  setLoading(loading: boolean): void {
    this.state.update((state) => ({
      ...state,
      loading,
    }));
  }

  setError(error: string | null): void {
    this.state.update((state) => ({
      ...state,
      error,
    }));
  }

  setFilters(filters: Partial<DeviationState['filters']>): void {
    this.state.update((state) => ({
      ...state,
      filters: { ...state.filters, ...filters },
    }));
  }

  clearFilters(): void {
    this.state.update((state) => ({
      ...state,
      filters: {},
    }));
  }

  setPagination(pagination: Partial<DeviationState['pagination']>): void {
    this.state.update((state) => ({
      ...state,
      pagination: { ...state.pagination, ...pagination },
    }));
  }

  reset(): void {
    this.state.set(initialState);
  }
}

