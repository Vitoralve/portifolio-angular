import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private jsonUrl = 'assets/data/listProject.json';

  constructor(private http: HttpClient) {}

  /**
   * Retorna os projetos do arquivo JSON.
   * @returns Observable com os dados do JSON.
   */
  getProjects(): Observable<any> {
    return this.http.get<any>(this.jsonUrl);
  }
}
