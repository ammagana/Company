import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css']
})
export class OverlayComponent {
  @Output() backEvent = new EventEmitter<void>();
  addUserForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  backToRegistry() {
    this.backEvent.emit();
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
      // this.userService.postUser(userData).subscribe();

    }
    
    
  }

  ngOnInit(): void {
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




}
