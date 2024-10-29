import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeToggleService {
  private body = document.body;
  isDark = false;

  toggleTheme() {
    this.isDark = !this.isDark;
    localStorage.setItem('isDark', JSON.stringify(this.isDark));

    if (this.isDark) this.body.classList.add('dark');
    else this.body.classList.remove('dark');
  }

  constructor() {
    const isDark = localStorage.getItem('isDark');

    if (isDark) {
      const isThemeDark = JSON.parse(isDark);
      if (isThemeDark) {
        this.isDark = isThemeDark;
        this.body.classList.add('dark');
      }
    }
  }
}
