import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';
import { FeedbackDetailComponent } from './feedback-detail/feedback-detail.component';
import { PageNotFoundComponent } from '../shared/page-not-found/page-not-found.component';

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
        path:"feedbacks/:id",
        component:PageNotFoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackRoutingModule { }
