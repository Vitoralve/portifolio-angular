import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-page-projects',
  templateUrl: './page-projects.component.html',
  styleUrls: ['./page-projects.component.scss'],
})


export class ProjectsComponent {
  listCardsFront: { title: string; description: string; }[] = [];
  listCardsBack: { title: string; description: string; }[] = [];
  listCardsBranco: { title: string; description: string; }[] = [];

  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('pt');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/en|es/) ? browserLang : 'pt');


    this.listCardsFront = [{title: 'projeto1', description: 'projeto1'}, {title: 'projeto2', description: 'projeto2'}, {title: 'projeto3', description: 'projeto3'}];
  }

  switchLanguege(language: string) {
    this.translate.use(language);
  }
}
