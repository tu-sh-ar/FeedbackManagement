import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';
import { FeedbackDetailsComponent } from './feedback-details/feedback-details.component';
import { PageNotFoundComponent } from '../shared/page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { FeedbackTemplatesComponent } from './feedback-templates/feedback-templates.component';
import { ExpandedTemplateViewComponent } from './expanded-template-view/expanded-template-view.component';
import { CustomFeedbackGeneratorComponent } from './custom-feedback-generator/custom-feedback-generator.component';
import { CategoryBasedListComponent } from './category-based-list/category-based-list.component';
import { EntityBasedFeedbackListComponent } from './entity-based-feedback-list/entity-based-feedback-list.component';

const routes: Routes = [
  {
    path:"",
    component:DashboardComponent,
    title:"Admin - Dashboard",
    children:[
      {
        path:"",
        redirectTo:"entity-categories",
        pathMatch:"full"
      },
      // {
      //   path:"feedbacks",
      //   component:FeedbackListComponent
      // },
      // {
      //   path:"feedbacks/feedback/:id",
      //   component:FeedbackDetailsComponent
      // },
      {
        path:"feedback-templates",
        component:FeedbackTemplatesComponent
      },
      {
        path:"feedback-templates/template/:categoryId/:templateId",
        component:ExpandedTemplateViewComponent
      },
      {
        path:"feedback-templates/custom/:categoryId",
        component:CustomFeedbackGeneratorComponent
      },
      {
        path:"feedback-templates/custom/:categoryId/:templateId",
        component:CustomFeedbackGeneratorComponent
      },
      {
        path:"profile",
        component:ProfileComponent
      },
      {
        path:"entity-categories",
        component:CategoryBasedListComponent
      },
      {
        path:"entity-categories/entity-feedbacks/:entityId/:templateId",
        component:EntityBasedFeedbackListComponent
      },
      {
        path:"entity-categories/entity-feedbacks/:entityId/:templateId/:responseId",
        component:FeedbackDetailsComponent
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