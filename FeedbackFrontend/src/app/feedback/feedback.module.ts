import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackRoutingModule } from './feedback-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeedbackDetailsComponent } from './feedback-details/feedback-details.component';
import { ReplyCardComponent } from './reply-card/reply-card.component';
import { ProfileComponent } from './profile/profile.component';
import { FeedbackTemplatesComponent } from './feedback-templates/feedback-templates.component';
import { FeedbackTemplatePreviewCardComponent } from './feedback-template-preview-card/feedback-template-preview-card.component';
import { ExpandedTemplateViewComponent } from './expanded-template-view/expanded-template-view.component';
import { DummyRadioComponentComponent } from './dummy-radio-component/dummy-radio-component.component';
import { DummyRatingComponentComponent } from './dummy-rating-component/dummy-rating-component.component';
import { DummyTextboxComponentComponent } from './dummy-textbox-component/dummy-textbox-component.component';
import { TemplatePreferencePopupComponent } from './template-preference-popup/template-preference-popup.component';
import { DummyExperienceBarComponent } from './dummy-experience-bar/dummy-experience-bar.component';
import { CustomFeedbackGeneratorComponent } from './custom-feedback-generator/custom-feedback-generator.component';
import { DummyImageUploaderComponent } from './dummy-image-uploader/dummy-image-uploader.component';
import { DummyCheckboxComponentComponent } from './dummy-checkbox-component/dummy-checkbox-component.component';
import { DummyEmojiComponentComponent } from './dummy-emoji-component/dummy-emoji-component.component';
import { CategoryBasedListComponent } from './category-based-list/category-based-list.component';
import { EntityBasedFeedbackListComponent } from './entity-based-feedback-list/entity-based-feedback-list.component';
import { TestNestedTableComponent } from './test-nested-table/test-nested-table.component';

@NgModule({
  declarations: [
    DashboardComponent,
    FeedbackDetailsComponent,
    ReplyCardComponent,
    ProfileComponent,
    FeedbackTemplatesComponent,
    FeedbackTemplatePreviewCardComponent,
    ExpandedTemplateViewComponent,
    DummyRadioComponentComponent,
    DummyRatingComponentComponent,
    DummyTextboxComponentComponent,
    TemplatePreferencePopupComponent,
    DummyExperienceBarComponent,
    CustomFeedbackGeneratorComponent,
    DummyImageUploaderComponent,
    DummyCheckboxComponentComponent,
    DummyEmojiComponentComponent,
    CategoryBasedListComponent,
    EntityBasedFeedbackListComponent,
    TestNestedTableComponent
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
