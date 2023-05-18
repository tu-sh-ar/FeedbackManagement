import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';
import { FeedbackDetailComponent } from './feedback-detail/feedback-detail.component';

const routes: Routes = [
  {
    path:"dashboard",
    component:DashboardComponent,
    title:"Admin - Dashboard",
    children:[
      {
        path:"",
        redirectTo:"feedbacks",
        pathMatch:"full"
      },
      {
        path:"feedbacks",
        component:FeedbackListComponent
      },
      {
        path:"feedback/:id",
        component:FeedbackDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackRoutingModule { }
