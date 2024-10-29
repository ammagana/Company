import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { CompanyService } from '../services/company.service';
import { TeamService } from '../services/team.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit{
  companyMembers: any[] = [];
  showAddTeamModal: boolean = false;
  showProject: boolean = false;
  selectedTeamId: number | null = null;
  selectedTeam: any | null = null;
  teams: any[] = [];
  adminView: boolean = false;
  user: any = null;

  selectedTeamProjects: any = [];

  constructor(private userService: UserService, private companyService: CompanyService, private teamService: TeamService, private router: Router) { }

  ngOnInit(): void {
    this.userService.user.subscribe(user => {
      if (user) {
        this.user = user;
        this.adminView = user.admin;
        console.log('admin view?', this.adminView)
      } else {
        this.router.navigate([''])
      }
    });
    if (this.adminView){
      this.companyService.company.subscribe(company => {
        if(company){
          console.log('showing teams for this company:', company.name)
          this.teams = company.teams;
          this.companyMembers = company.employees;
        }
      });
    } else {
      this.teams = this.user.teams;
    }
  }

  onSelectTeam(teamId: number){
    const selectedTeam = this.teams.find(team => team.id === teamId);
    this.selectedTeam = selectedTeam;
    this.selectedTeamId = teamId;
    this.teamService.getTeamProjects(this.selectedTeamId).subscribe(
      (response) => {
        this.selectedTeamProjects = response;
      },
      (error) => {
        console.error('error getting projects');
      });
  }

  deselectTeam(){
    this.selectedTeamId = null;
  }

  addTeam(){
    this.showAddTeamModal = true;
  }

  stopShowingModal(){
    this.showAddTeamModal = false;
  }

  reloadTeams(){
    this.companyService.company.subscribe(company => {
      if(company){
        console.log('showing teams for this company:', company.name)
        this.teams = company.teams;
        console.log('teams reloaded', this.teams)
      }
    });
    this.showAddTeamModal = false;
  }
}
