import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClientFormComponent } from './client-form/client-form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ClientFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {path: 'client', component: ClientFormComponent}
    ])
  ]
})
export class ClientModule { }

