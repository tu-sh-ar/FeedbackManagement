import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';

import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ActiveBadgeComponent } from './active-badge/active-badge.component';
import { NoDataAvailableComponent } from './no-data-available/no-data-available.component';
import { ImagePromptComponent } from './image-prompt/image-prompt.component';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    ActiveBadgeComponent,
    NoDataAvailableComponent,
    ImagePromptComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    PageNotFoundComponent,
    ActiveBadgeComponent,
    NoDataAvailableComponent,
    ImagePromptComponent
  ]
})
export class SharedModule { }
