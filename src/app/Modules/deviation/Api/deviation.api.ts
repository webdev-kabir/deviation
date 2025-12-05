/**
 * Deviation API Service
 * 
 * Handles all HTTP requests for deviation operations.
 */

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Deviation, DeviationCreateDto, DeviationUpdateDto } from '../Models/deviation.model';
import { DEVIATION_ENDPOINTS } from './deviation.endpoints';

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface DeviationListParams {
  page?: number;
  pageSize?: number;
  status?: string;
  priority?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

@Injectable({
  providedIn: 'root',
})
export class DeviationApiService {
  private readonly http = inject(HttpClient);

  /**
   * Get paginated list of deviations
   */
  getDeviations(params?: DeviationListParams): Observable<PaginatedResponse<Deviation>> {
    let httpParams = new HttpParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          httpParams = httpParams.set(key, value.toString());
        }
      });
    }

    return this.http.get<PaginatedResponse<Deviation>>(DEVIATION_ENDPOINTS.LIST, {
      params: httpParams,
    });
  }

  /**
   * Get deviation by ID
   */
  getDeviationById(id: string): Observable<Deviation> {
    return this.http.get<Deviation>(DEVIATION_ENDPOINTS.BY_ID(id));
  }

  /**
   * Create new deviation
   */
  createDeviation(data: DeviationCreateDto): Observable<Deviation> {
    return this.http.post<Deviation>(DEVIATION_ENDPOINTS.CREATE, data);
  }

  /**
   * Update existing deviation
   */
  updateDeviation(id: string, data: DeviationUpdateDto): Observable<Deviation> {
    return this.http.patch<Deviation>(DEVIATION_ENDPOINTS.UPDATE(id), data);
  }

  /**
   * Delete deviation
   */
  deleteDeviation(id: string): Observable<void> {
    return this.http.delete<void>(DEVIATION_ENDPOINTS.DELETE(id));
  }

  /**
   * Get deviation statistics
   */
  getStats(): Observable<DeviationStats> {
    return this.http.get<DeviationStats>(DEVIATION_ENDPOINTS.STATS);
  }
}

export interface DeviationStats {
  total: number;
  byStatus: Record<string, number>;
  byPriority: Record<string, number>;
}

