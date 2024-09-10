import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkMode = false;

  constructor() {
    // Verifica a preferência de tema salva no localStorage
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
      this.darkMode = savedTheme === 'dark';
    } else {
      // Se não houver preferência salva, usa a preferência do sistema operacional
      this.darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      // Salva a preferência detectada automaticamente
      localStorage.setItem('theme', this.darkMode ? 'dark' : 'light');
    }

    // Aplica o tema inicial
    this.updateTheme();
  }

  toggleTheme() {
    this.darkMode = !this.darkMode;
    localStorage.setItem('theme', this.darkMode ? 'dark' : 'light');
    this.updateTheme();
  }

  private updateTheme() {
    if (this.darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  isDarkMode() {
    return this.darkMode;
  }
}
