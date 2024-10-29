import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementsService {
  private apiUrl = 'http://localhost:8080/announcements/'
  constructor(private http: HttpClient) { }


  getAnnouncements(id:number){
    return this.http.get(this.apiUrl+id);
  }

  addAnnouncement(id: number, messageData: any){
      return this.http.post(`${this.apiUrl}${id}/create`, messageData);
  }
}
