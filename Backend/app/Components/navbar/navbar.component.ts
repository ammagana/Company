import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  showNavbar: boolean = true;
  adminView: boolean = false;
  user: any = null;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.user.subscribe(user => {
      if (user) {
        this.user = user;
        this.adminView = user.admin;
        console.log('admin view?', this.adminView)
      }
    });

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.showNavbar = this.router.url !== '/';
        console.log('Router URL:', this.router.url);
        console.log(this.showNavbar);
      });
  }

  logout(event: Event){
    event.preventDefault();
    this.userService.logout();
  }

}
