import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.css']
})
export class ProjectsPageComponent implements OnInit{
  @Input() projects: any[] = [];
  @Input() team: any = null;
  @Input() teamId: number = 0;
  @Output() backEvent = new EventEmitter<void>();

  user: any = null;
  adminView: boolean = false;
  showCreateProjectModal: boolean = false;
  showEditProjectModal: boolean = false;
  projectToEdit: any = null;

  constructor(private teamService: TeamService, private userService: UserService, private router: Router) { }

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
  }

  backToTeams(){
    this.backEvent.emit();
  }

  openCreateProjectModal(){
    this.showCreateProjectModal = true;
  }

  openEditProjectModal(project: any){
    this.projectToEdit = project;
    this.showEditProjectModal = true;
  }

  closeCreateProjectModal(){
    this.showCreateProjectModal = false;
  }

  closeEditProjectModal(){
    this.showEditProjectModal = false;
  }

  reloadProjects(){
    this.teamService.getTeamProjects(this.teamId).subscribe(
      (response) => {
        this.projects = response;
      },
      (error) => {
        console.error('error getting projects');
      });
    this.showCreateProjectModal = false;
    this.showEditProjectModal = false;
  }

}
