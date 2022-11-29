import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IReportedIssue } from './reported-issue';
import { UUID } from 'angular2-uuid';
import { ClientDataService } from 'src/app/services/client-data.service';
import { ICreatedIssue } from './created-issue';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {

  newIssue: IReportedIssue = {
    pageName: '',
    moduleName: '',
    description: '',
    createdBy: 'client'
  }

  createdIssue: ICreatedIssue = {
    incidentNo: '',
    incidentLink: '',
    duplicate: true
  }

  modalTitle: string = '';
  modalMessage: string = '';

  constructor(private clientDataService : ClientDataService) { }

  ngOnInit(): void {
    this.newIssue.pageName = "Which page did you encounter the issue?";
    this.newIssue.moduleName = "Which module does the page belong to?";
    this.newIssue.description = "Provide more details here for us to be able to check further...";
  }

  onSubmit(form:NgForm): void {
    console.log('in onSubmit: ', form.value);

    if(form.valid){
      console.log('FORM VALID: ', form.valid);
      console.log('NEW ISSUE', this.newIssue);
      this.clientDataService.postClientForm(this.newIssue).subscribe(
        result => {
          this.createdIssue = result;
          console.log('CREATED ISSUE', this.createdIssue);
          if(this.createdIssue.duplicate === false) {
            this.modalTitle = "Issue has been submitted!";
            this.modalMessage = "Your Issue is created. An email has been sent to the application support delivery manager for further investigation. Please reach out to them for the actual incident number created.";      
          }else{
            console.log("error result", result)
            this.modalTitle = "";
            this.modalMessage = "The incident you are trying to report has a duplicate. Please refer to Incident No. "+this.createdIssue.incidentLink+", or you may contact the application support team directly for further discussion.";        
          }
        }
      )
    }
  }

  clearFields(){
    this.newIssue.pageName = '';
    this.newIssue.moduleName = '';
    this.newIssue.description = '';
  }

}
