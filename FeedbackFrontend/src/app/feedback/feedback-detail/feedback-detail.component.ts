import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { ProductService } from 'src/app/services/product.service';
import { FeedbackService } from 'src/app/services/feedback.service';

export interface FeedbackDetails {
  feedbackId: string,
  feedbackCreation:string,
  feedbackRating:string,
  feedbackComment:string
}

@Component({
  selector: 'app-feedback-detail',
  templateUrl: './feedback-detail.component.html',
  styleUrls: ['./feedback-detail.component.scss']
})
export class FeedbackDetailComponent implements OnInit{

  Arr = Array;

  constructor(
    public dialogRef: MatDialogRef<FeedbackDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FeedbackDetails,
  ){}

  ngOnInit(): void {
    console.log(this.data, " - init");
  }

  replyToFeedback():void {

  }

  closeDialog():void {
    this.dialogRef.close();
  }

}
