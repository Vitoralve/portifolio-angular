import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-morph-botoes',
  templateUrl: './morph-botoes.component.html',
  styleUrls: ['./morph-botoes.component.scss'],
})
export class MorphButtonsComponent {
  // Itens das listas
  listaAndarItens = ['Mover Direita', 'Mover Esquerda', 'Mover Centro'];
  listaFacialItens = ['Bravo', 'Uooo', 'Triste'];
  listaCorpoItens = ['Pular', 'Sim', 'Não', 'Adeus', 'Joia'];

  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('pt');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/en|es/) ? browserLang : 'pt');
  }

  switchLanguege(language: string) {
    this.translate.use(language);
  }

  // Função de Ação que obtém os itens selecionados de todas as listas
  acaoFinal(listaAndar: any, listaFacial: any, listaCorpo: any) {
    const selecionadosAndar = listaAndar.selectedOptions.selected.map(
      (option: any) => option.value
    );
    const selecionadosFacial = listaFacial.selectedOptions.selected.map(
      (option: any) => option.value
    );
    const selecionadosCorpo = listaCorpo.selectedOptions.selected.map(
      (option: any) => option.value
    );

    const todasAcoes = [
      ...selecionadosAndar,
      ...selecionadosFacial,
      ...selecionadosCorpo,
    ];

    console.log('Ações selecionadas:', todasAcoes.join('; '));
  }
}
