import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<any>(null);
  public user: Observable<any> = this.userSubject.asObservable();

  private apiUrl = 'http://localhost:8080/users'

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: {username: string, password: string}): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }

  setUser(user: any){
    this.userSubject.next(user);
  }

  logout(){
    this.userSubject.next(null);
    this.router.navigate(['']);
  }

  getUser() {
    return this.userSubject.value;
  }

  getAllUsers(){
    // console.log(this.http.get(this.apiUrl).subscribe(data => console.log(data)));
    return this.http.get(this.apiUrl);
  }

  postUser(id:number,data:any): Observable<any>{
    return this.http.post(`${this.apiUrl}/register/${id}`, data)
  }

}

