import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-create-project-overlay',
  templateUrl: './create-project-overlay.component.html',
  styleUrls: ['./create-project-overlay.component.css']
})
export class CreateProjectOverlayComponent implements OnInit{
  @Input() teamId: number = 0;
  @Input() team: any = null;
  @Output() backEvent = new EventEmitter<void>();
  @Output() projectCreated = new EventEmitter<void>();

  createProjectForm!: FormGroup;

  constructor(private fb: FormBuilder, private teamService: TeamService) { }

  ngOnInit(): void {
      this.createProjectForm = this.fb.group({
        projectName: ['', [Validators.required]],
        description: ['', [Validators.required]],
      });
  }

  backToProjects() {
    this.backEvent.emit();
  }

  onSubmit() {
    if (this.createProjectForm.valid){
      const formValues = this.createProjectForm.value;
      console.log('form submitted', formValues)
      const projectData = {
        name: this.createProjectForm.get('projectName')?.value,
        description: this.createProjectForm.get('description')?.value,
        active: true,
        team: this.team,
      }
      this.teamService.createTeamProject(this.teamId, projectData).subscribe(
        (response) => {
          console.log('project created', response);
          this.projectCreated.emit();
        }
      )
    } else {
      console.log('form is invalid');
    }
  }

}
