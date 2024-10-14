import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faMagnifyingGlass,
  faMoon,
  faSun,
  faUser,
  faX,
} from '@fortawesome/free-solid-svg-icons';
import { ThemeToggleService } from '../theme-toggle.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  faSearch = faMagnifyingGlass;
  faUser = faUser;
  faSun = faSun;
  faMoon = faMoon;
  faX = faX;

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

  constructor(private themeToggleService: ThemeToggleService) {}
}
