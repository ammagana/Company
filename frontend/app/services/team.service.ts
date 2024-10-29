import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private apiUrl = 'http://localhost:8080/team'

  constructor(private http: HttpClient) { }

  createTeam(companyId: number, teamData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${companyId}/create`, teamData);
  }

  getTeamProjects(teamId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${teamId}/projects`);
  }

  createTeamProject(teamId: number, projectData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${teamId}/createProject`, projectData);
  }

  getAllTeammates(teamId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${teamId}/teammates`);
  }

  getTeamById(teamId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${teamId}`);
  }
}
