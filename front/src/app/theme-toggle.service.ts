import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeToggleService {
  private body = document.body;
  private isDark = false;

  toggleTheme() {
    this.isDark = !this.isDark;

    if (this.isDark) this.body.classList.add('dark');
    else this.body.classList.remove('dark');
  }
}
