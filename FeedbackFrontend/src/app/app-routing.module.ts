import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './core/admin-login/admin-login.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path:"",
    redirectTo:"admin-login",
    pathMatch:"full"
  },
  {
    path:"admin-login",
    component:AdminLoginComponent
  },
  {
    path:"admin",
    loadChildren: () => import("./feedback/feedback.module").then(mod=>mod.FeedbackModule)
  }
  ,
  {
    path:"**",
    component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
