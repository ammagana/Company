import { Component } from '@angular/core';
import { UserService } from '../services/user.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = "";
  password: string = "";
  constructor(private userService: UserService, private router:Router){}
  login(){
    this.userService.login({username:this.username, password:this.password}).subscribe(result => {
      this.userService.setUser(result);
      sessionStorage.setItem(
        'userId', result.profile.firstName
      );
      sessionStorage.setItem(
        'admin', result.admin
      );
      if(result && result.admin){
        this.router.navigate(['company']);
      } else if(result && !result.admin){
        this.router.navigate(['home']);
      } else { alert('Incorrect credentials')}
    }); 
  }
}
