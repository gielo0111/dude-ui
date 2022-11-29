import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { IssueModel } from '../model/IssueModel';
import { AdminService } from '../service/admin.service';
import { IReportedIssue } from './reported-issue';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.scss']
})
export class AdminFormComponent implements OnInit {

  newIssue: IReportedIssue = {
    id: '',
    pageName: '',
    moduleName: '',
    description: ''
  }

  newIssueId: string = '';
  modalTitle: string = '';
  modalMessage: string = '';

  constructor(
    private adminService: AdminService
  ) { }

  modalIssue: IssueModel = {
    id: '',
    serviceName: '',
    exception: '',
    pageName: '',
    moduleName: '',
    keywords: '',
    incidentNo: '',
    incidentLink: '',
    description: '',
    createdBy: '',
    createdDate: ''
  };

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    console.log(form.controls);
    if (form.valid) {
      this.modalTitle = "Issue has been submitted!";
      this.modalMessage = "Your Issue ID is " + this.newIssueId + ". An email has been sent to the application support delivery manager for further investigation. Please reach out to them for the actual incident number created.";
      
          
      console.log(this.modalIssue);
      this.adminService.createIssue(this.modalIssue).subscribe(result => {
        console.log(result);
        this.modalIssue = result;
      })
      
      
      // this.clearFields();
    } else {
      this.modalTitle = "";
      this.modalMessage = "The incident you are trying to report has a duplicate. Please refer to Incident No. INC12345678, or you may contact the application support team directly for further discussion.";
    }
  }

  clearFields(){
    this.modalIssue = {
      id: '',
      serviceName: '',
      exception: '',
      pageName: '',
      moduleName: '',
      keywords: '',
      incidentNo: '',
      incidentLink: '',
      description: '',
      createdBy: '',
      createdDate: ''
    };
  }

}
