/**
 * Deviation Resolver
 * 
 * Pre-fetches deviation data before activating the route.
 */

import { inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Deviation } from '../Models/deviation.model';
import { DeviationFacade } from '../deviation.facade';

export const deviationResolver: ResolveFn<Deviation | null> = (
  route: ActivatedRouteSnapshot
): Observable<Deviation | null> => {
  const facade = inject(DeviationFacade);
  const id = route.paramMap.get('id');

  if (!id) {
    return new Observable((observer) => {
      observer.next(null);
      observer.complete();
    });
  }

  return facade.loadDeviation(id).pipe(map(() => facade.selectedDeviation()));
};

