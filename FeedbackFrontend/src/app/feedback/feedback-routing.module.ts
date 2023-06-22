import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';
import { FeedbackDetailsComponent } from './feedback-details/feedback-details.component';

const routes: Routes = [
  {
    path:"",
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
        path:"feedbacks/feedback/:id",
        component:FeedbackDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackRoutingModule { }