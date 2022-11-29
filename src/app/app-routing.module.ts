import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin/admin-page/admin-page.component';
import { ClientFormComponent } from './client/client-form/client-form.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'client',
  canActivate: [AuthGuard] ,
   component: ClientFormComponent},
  {path: 'admin',
   canActivate: [AuthGuard] ,
   component: AdminPageComponent},
   {path: '**',
   canActivate: [AuthGuard] ,
   component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

