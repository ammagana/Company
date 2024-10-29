import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TeamsComponent } from './teams/teams.component';
import { CompanyComponent } from './company/company.component';
import { LoginComponent } from './login/login.component';
import { RegistryComponent } from './registry/registry.component';

const routes: Routes = [
  { path: "", component: LoginComponent},
  { path: "home", component: HomeComponent},
  { path: "teams", component: TeamsComponent},
  { path: "company", component: CompanyComponent},
  { path: "users", component: RegistryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
