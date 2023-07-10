import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';
import { FeedbackDetailsComponent } from './feedback-details/feedback-details.component';
import { PageNotFoundComponent } from '../shared/page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { FeedbackTemplatesComponent } from './feedback-templates/feedback-templates.component';
import { ExpandedTemplateViewComponent } from './expanded-template-view/expanded-template-view.component';

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
      },
      {
        path:"feedback-templates",
        component:FeedbackTemplatesComponent
      },
      {
        path:"feedback-templates/template/:id",
        component:ExpandedTemplateViewComponent
      },
      {
        path:"profile",
        component:ProfileComponent
      },
      {
        path:"**",
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