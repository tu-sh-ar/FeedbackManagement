import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';
import { FormGroup, FormControl,FormArray, FormBuilder } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { TemplatePreferencePopupComponent } from '../template-preference-popup/template-preference-popup.component';
import { BusinessSpecificFeedbackTemplatesDetails } from 'src/app/interfaces/feedback';

@Component({
  selector: 'app-feedback-templates',
  templateUrl: './feedback-templates.component.html',
  styleUrls: ['./feedback-templates.component.scss']
})
export class FeedbackTemplatesComponent implements OnInit{
  businessRelatedTemplates!:BusinessSpecificFeedbackTemplatesDetails;

  constructor(public _dialog: MatDialog, private  _feedbackService: FeedbackService){

  }

  ngOnInit(): void {
    this._feedbackService.getBusinessSpecificTemplateDetails().subscribe((res)=>{
      this.businessRelatedTemplates = res;
    })
  }

  openTemplatePrefrenceDialog(categoryId: string):void{
    this._dialog.open(TemplatePreferencePopupComponent, {
      data:{
        categoryId:categoryId
      }
    });
  }

}