import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowRightFromBracket,
  faMagnifyingGlass,
  faMoon,
  faSun,
  faUser,
  faX,
} from '@fortawesome/free-solid-svg-icons';
import { ThemeToggleService } from '../theme-toggle.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, NgClass } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { changeSearchSubstr } from '../messages/store/messages.actions';
import { RouterLink } from '@angular/router';
import { StoreState } from '../store';
import { logout } from '../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FontAwesomeModule,
    AsyncPipe,
    RouterLink,
    NgClass,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  faSearch = faMagnifyingGlass;
  faUser = faUser;
  faSun = faSun;
  faMoon = faMoon;
  faX = faX;
  faArrowRightFromBracket = faArrowRightFromBracket;

  user = this.store.select((state) => state.auth.user);
  searchControl = new FormControl('');

  toggleTheme() {
    this.themeToggleService.toggleTheme();
  }

  onClick() {
    console.log('click');
  }

  clearSearchInput() {
    this.searchControl.setValue('');
  }

  logout() {
    console.log('logging out');
    this.store.dispatch(logout());
  }

  constructor(
    public themeToggleService: ThemeToggleService,
    private store: Store<StoreState>
  ) {
    this.searchControl.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((substr) => {
        this.store.dispatch(
          changeSearchSubstr({ newSearchSubstr: substr || '' })
        );
      });
  }
}
