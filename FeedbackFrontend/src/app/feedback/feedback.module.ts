import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackRoutingModule } from './feedback-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';
import { FeedbackDetailComponent } from './feedback-detail/feedback-detail.component';
import { DetailComponent } from './detail/detail.component';


@NgModule({
  declarations: [
    DashboardComponent,
    FeedbackListComponent,
    FeedbackDetailComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    FeedbackRoutingModule,
    SharedModule
  ],
  exports: [
  ]
})
export class FeedbackModule { }
