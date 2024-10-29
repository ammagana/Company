import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private apiUrl = 'http://localhost:8080/projects'

  constructor(private http: HttpClient) { }

  updateProject(projectId: number, projectData: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${projectId}/update`, projectData);
  }
}
