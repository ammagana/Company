import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { CompanyService } from '../services/company.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css']
})
export class RegistryComponent {
  user: any;
  users: any[] = [];
  showAddUser: boolean = false;
  admin: boolean = false;
  addUserForm!: FormGroup;
  
  constructor(private userService: UserService, private companyService: CompanyService, private router: Router, private fb:FormBuilder){}

  ngOnInit(): void {
    this.userService.user.subscribe(user => {
      if (user) {
        this.user = user;
      } else {
        this.router.navigate([''])
      }
    });


    this.getUsers();

    this.addUserForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email:['', Validators.email],
      phone:['', Validators.required],
      password:['', Validators.required],
      confirm: ['' , Validators.required],
      admin: ['', Validators.required]
    });
  }  

  addUserView(){
    this.showAddUser = true;
  }

  addUser() {
    if(this.addUserForm.valid){
      const userData = {
        credentials:{
          username: this.addUserForm.get('firstName')?.value+'.'+this.addUserForm.get('lastName')?.value,
          password: this.addUserForm.get('password')?.value,
        },
        profile: {
          firstName: this.addUserForm.get('firstName')?.value,
          lastName: this.addUserForm.get('lastName')?.value,
          email: this.addUserForm.get('email')?.value,
          phone: this.addUserForm.get('phone')?.value
        },
        admin: this.addUserForm.get('admin')?.value
      }
      this.userService.postUser(this.user.companies[0].id, userData).subscribe();
      this.getUsers();
      this.showAddUser = false;
    }
    
  }

  hideAddUser(){
    this.showAddUser = false;
  }

  getUsers(){
    this.users = [];
    this.companyService.getUsers(this.user.companies[0].id).subscribe((response: any) => {
      for (let i = 0; i < response.length; i++) {
        this.users.push(response[i])
      }
    });
  }

}
