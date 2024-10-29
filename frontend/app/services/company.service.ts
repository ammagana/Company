import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private url = 'http://localhost:8080/company/'; 
  private companySubject = new BehaviorSubject<any>(null);
  public company: Observable<any> = this.companySubject.asObservable();

  constructor(private http: HttpClient) { }

  setCompany(company: any) {
    this.companySubject.next(company);
  }

  clearCompany() {
    this.companySubject.next(null);
  }

  getCompany() {
    return this.companySubject.value;
  }

  getUsers(id:number){
    return this.http.get(`${this.url}${id}/users`)
  }
}
