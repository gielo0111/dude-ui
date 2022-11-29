import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IssueModel } from '../model/IssueModel';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-admin-issues',
  templateUrl: './admin-issues.component.html',
  styleUrls: ['./admin-issues.component.scss']
})
export class AdminIssuesComponent implements OnInit {

  issueList: IssueModel[] = [];

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

  private format = 'dd/MM/yyyy hh:mm:ss';
  private locale = 'en-US';
  totalSize: any;
  totalPages: any;
  currentPage: any;

  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.getIssues('0', '5');
  }

  onSubmit(issueModel: IssueModel): void {
    this.modalIssue = issueModel;
  }

  previousPage() {
    if(this.currentPage > 0) {
      this.currentPage = this.currentPage - 1;
      this.getIssues(this.currentPage, 5);
    }
  }

  nextPage() {
    if(this.currentPage < (this.totalPages - 1)) {
      this.currentPage = this.currentPage + 1;
      this.getIssues(this.currentPage, 5);
    }
  }

  getIssues(page: any, size: any) {
    this.adminService.searchAllIssues()
      .subscribe(result => {
        this.totalSize = result.length;
        this.calculatePage();
      });

      
    this.currentPage = page;

    this.adminService.searchIssues(page, size)
      .subscribe(results => {
        console.log(results);

        results.forEach(result => {
          result.createdDate = formatDate(result.createdDate, this.format, this.locale);
        })
        this.issueList = results
      });
  }

  calculatePage() {
    const pages: any = this.totalSize / 5
    this.totalPages = Math.ceil(pages);
  };
}

