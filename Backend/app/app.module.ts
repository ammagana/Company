import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { TeamsComponent } from './teams/teams.component';
import { CreateTeamOverlayComponent } from './teams/create-team-overlay/create-team-overlay.component';
import { ProjectsPageComponent } from './teams/projects-page/projects-page.component';
import { CompanyComponent } from './company/company.component';
import { CreateProjectOverlayComponent } from './teams/projects-page/create-project-overlay/create-project-overlay.component';
import { EditProjectOverlayComponent } from './teams/projects-page/edit-project-overlay/edit-project-overlay.component';
import { LoginComponent } from './login/login.component';
import { RegistryComponent } from './registry/registry.component';
import { OverlayComponent } from './registry/overlay/overlay.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    TeamsComponent,
    CreateTeamOverlayComponent,
    ProjectsPageComponent,
    CompanyComponent,
    CreateProjectOverlayComponent,
    EditProjectOverlayComponent,
    LoginComponent,
    RegistryComponent,
    OverlayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
