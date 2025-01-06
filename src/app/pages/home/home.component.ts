import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private translate: TranslateService, private router: Router) {
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('pt');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/en|es/) ? browserLang : 'pt');
  }

  switchLanguege(language: string) {
    this.translate.use(language);
  }

  rotaRobo() {
    this.router.navigate(['/morph']);
  }
}
