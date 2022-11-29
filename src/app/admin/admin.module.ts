import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminFormComponent } from './admin-form/admin-form.component';

import { FormsModule } from '@angular/forms';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminIssuesComponent } from './admin-issues/admin-issues.component';

@NgModule({
  declarations: [
    AdminFormComponent,
    AdminPageComponent,
    AdminIssuesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {path: 'admin', component: AdminPageComponent}
    ])
  ]
})
export class AdminModule { }

