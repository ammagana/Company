import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit{
  selectedCompany: any = null;
  companies: any[] = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private companyService: CompanyService) {}

  onSubmit(form: NgForm){
    if (form.valid){
      this.selectedCompany = form.value.company;
      this.companyService.setCompany(this.selectedCompany);
      console.log('Company selected:', this.selectedCompany);

      this.router.navigate(['/home']);
    } else {
      console.log('form is invalid');
    }
  }

  ngOnInit(): void {
    this.userService.user.subscribe(user => {
      if (user) {
        this.companies = user.companies;
      } else {
        this.router.navigate([''])
      }
    });
  }
}
