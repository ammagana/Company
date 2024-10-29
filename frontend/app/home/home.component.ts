import { Component } from '@angular/core';
import { AnnouncementsService } from '../services/announcements.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  user:any;
  isAdmin: boolean = false;
  showAddMessage: boolean = false;
  companies: any[] = [];
  messages: any[] = [];
  createMessage!: FormGroup;

  constructor(private announcementService: AnnouncementsService,private router: Router, private userService: UserService, private fb: FormBuilder){}

  ngOnInit(){
    this.userService.user.subscribe(user => {
      if (user) {
        this.user = user;
        this.companies = user.companies;
        this.isAdmin = user.admin
      } else {
        this.router.navigate([''])
      }
    });
    for(let i = 0; i< this.companies.length; i++){
      this.getAll(this.companies[i].id);
    }
  }

  getAll(id:number){
    this.messages = [];
    this.announcementService.getAnnouncements(id).subscribe(
      (data:any) => 
      {
        for(let i = 0; i < data.length; i++){
          this.messages.push(data[i]);
        }
      }
    );
  }

  newMessage() {
    this.showAddMessage = true;
    this.createMessage = this.fb.group({
      title: ['', Validators.required],
      msg: ['', Validators.required]
    })
  }

  backToHome() {
    this.showAddMessage = false;
  }

  addMessage(){
    if(this.createMessage.valid){
      const messageData = {
        date: Date.now(),
        title: this.createMessage.get('title')?.value,
        message: this.createMessage.get('msg')?.value,
        author: this.user
      }
      this.announcementService.addAnnouncement(this.user.companies[0].id, messageData).subscribe();
    }
    this.getAll(this.user.companies[0].id);
    this.showAddMessage = false;
    this.createMessage = this.fb.group({});
  }
}
