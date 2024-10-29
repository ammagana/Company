import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/services/company.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-create-team-overlay',
  templateUrl: './create-team-overlay.component.html',
  styleUrls: ['./create-team-overlay.component.css']
})
export class CreateTeamOverlayComponent implements OnInit{
  @Input() members: any[] = [];
  @Output() backEvent = new EventEmitter<void>();
  @Output() teamCreated = new EventEmitter<void>();

  companyId!: number;
  createTeamForm!: FormGroup;
  selectedMembers: any[] = [];
  selectedMemberId: number | null = null;

  backToTeams() {
    this.backEvent.emit();
  }

  onSelectMember() {
    const selectedMemberId = this.createTeamForm.get('members')?.value;
    const selectedMember = this.members.find(member => member.id === selectedMemberId);
    console.log(selectedMember);
    if (selectedMember && !this.selectedMembers.includes(selectedMember)) {
      console.log('added user to selected members list', selectedMember)
      this.selectedMembers.push(selectedMember);
    } else {
      console.log('member is undefined or in the list')
    }
  }

  removeMember(memberId: number) {
    this.selectedMembers = this.selectedMembers.filter(member => member.id !== memberId);
  }

  submitForm() {
    if (this.createTeamForm.valid) {
      const teamData = {
        name: this.createTeamForm.get('teamName')?.value,
        description: this.createTeamForm.get('description')?.value,
        teammates: this.selectedMembers.map(member => ({
          id: member.id,
          profile: member.profile,
          admin: member.admin,
          active: member.active,
          status: member.status,
        }))
      };
      this.teamService.createTeam(this.companyId, teamData).subscribe(
        (response) => {
          console.log('team created', response);

          const currentCompany = this.companyService.getCompany();
          if(currentCompany){
            currentCompany.teams.push(response);
            this.companyService.setCompany(currentCompany);
          }
          this.teamCreated.emit();
        },
        (error) => {
          console.error('error creating ts');
        }
      )
      console.log('Form Submitted', this.createTeamForm.value, this.selectedMembers);
    } else {
      console.log('Form is invalid');
    }
  }

  constructor(private fb: FormBuilder, private teamService: TeamService, private companyService: CompanyService) {}

  ngOnInit(): void {
      this.createTeamForm = this.fb.group({
        teamName: ['', Validators.required],
        description: ['', Validators.required],
        members: [null],
      });

      this.companyService.company.subscribe((company) => {
        if (company){
          this.companyId = company.id;
        }
      });
  }

}
