import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-page-projects',
  templateUrl: './page-projects.component.html',
  styleUrls: ['./page-projects.component.scss'],
})
export class ProjectsComponent {
  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('pt');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/en|es/) ? browserLang : 'pt');
  }

  switchLanguege(language: string) {
    this.translate.use(language);
  }
}
