import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private translate:TranslateService, private router: Router) {
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('pt');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/en|es/) ? browserLang : 'pt');
  }

  switchLanguege(language: string) {
    this.translate.use(language);
  }

  routeProjects(){
    this.router.navigate(['/projects']);
  }

  routeApresentation(){
    this.router.navigate(['/']);
  }
}
