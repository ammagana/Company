import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistryService {

  constructor(private http: HttpClient) { }

  getAllUsers(): any {
    return this.http.get("http://localhost:8080/users");
  }
  
}
