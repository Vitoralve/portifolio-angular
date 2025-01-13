import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { DialogDetailsComponent } from '../../shared/components/dialog-details/dialog-details.component';
import { ProjectsService } from '../../shared/services/project.service';

@Component({
  selector: 'app-page-projects',
  templateUrl: './page-projects.component.html',
  styleUrls: ['./page-projects.component.scss'],
})


export class ProjectsComponent {
  listCardsFront: any ;
  listCardsBack: any;
  listCardsBancoDados: any;

  toastVisible = false;
  toastMessage = '';
  projects: any;


  constructor(private translate: TranslateService, public dialog: MatDialog, private projectsService: ProjectsService) {
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('pt');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/en|es/) ? browserLang : 'pt');

  }

  ngOnInit(): void {
    this.projectsService.getProjects().subscribe((data) => {
      this.projects = data.projects;
      this.listCardsFront = this.projects.frontend;
      this.listCardsBack = this.projects.backend;
      this.listCardsBancoDados = this.projects.bancoDeDados;
      console.log(this.projects);
    });
  }


  switchLanguege(language: string) {
    this.translate.use(language);
  }

  openDialog(item: any): void {
    this.dialog.open(DialogDetailsComponent, {
      data: item,
    });
  }

}
