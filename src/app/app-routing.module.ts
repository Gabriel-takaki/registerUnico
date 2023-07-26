import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { RegisterSucessComponent } from './components/register-sucess/register-sucess.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'register/individual-mensal',
    pathMatch: 'full'
  },
  {
    path: 'register/:plan',
    component: RegisterComponent,
  },
  {
    path: 'register-sucess',
    component: RegisterSucessComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
