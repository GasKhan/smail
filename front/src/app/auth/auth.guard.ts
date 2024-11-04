import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreState } from '../store';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export const authGuard = () => {
  const store: Store<StoreState> = inject(Store);
  const router = inject(Router);

  return store
    .select((state) => state.auth.user)
    .pipe(
      takeUntilDestroyed(),
      map((user) => {
        if (user === null) {
          router.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
};
