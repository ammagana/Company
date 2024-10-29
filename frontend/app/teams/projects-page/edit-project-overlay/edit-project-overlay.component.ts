import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-edit-project-overlay',
  templateUrl: './edit-project-overlay.component.html',
  styleUrls: ['./edit-project-overlay.component.css']
})
export class EditProjectOverlayComponent implements OnInit{
  @Input() project: any = null;
  @Input() team: any = null;
  @Input() adminView: boolean = false;
  @Output() backEvent = new EventEmitter<void>();
  @Output() projectEdited = new EventEmitter<void>();

  createEditProjectForm!: FormGroup;
  activeStatus: boolean = false;

  constructor(
    private projectService: ProjectsService,
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
    this.createEditProjectForm = this.fb.group({
      projectName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      activeStatus: ['', [Validators.required]]
    });

    if (this.project) {
      this.createEditProjectForm.patchValue({
        projectName: this.project.name,
        description: this.project.description,
        activeStatus: this.project.active
      });
    }
  }

  backToProjects() {
    this.backEvent.emit();
  }

  onSubmit(){
    if (this.createEditProjectForm.valid){
      const projectData = {
        name: this.createEditProjectForm.get('projectName')?.value,
        description: this.createEditProjectForm.get('description')?.value,
        active: this.createEditProjectForm.get('activeStatus')?.value,
        team: this.team
      }
      this.projectService.updateProject(this.project.id, projectData).subscribe(
        (response) => {
          console.log('project edited', response);
          this.projectEdited.emit();
        }
      )
    } else {
      console.log('form is invalid');
    }
  }

}
