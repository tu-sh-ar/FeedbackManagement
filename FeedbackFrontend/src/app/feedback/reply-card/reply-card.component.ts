import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FeedbackService } from 'src/app/services/feedback.service';
import { PostFeedbackResponse } from 'src/app/interfaces/feedback';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface FeedbackDetails {
  feedbackId:string,
  feedbackCreationDate:string,
}

@Component({
  selector: 'app-reply-card',
  templateUrl: './reply-card.component.html',
  styleUrls: ['./reply-card.component.scss']
})
export class ReplyCardComponent implements OnInit{

  Arr = Array;
  response!:string;
  enableReply:boolean = false;
  responseAvailable:boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ReplyCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data:FeedbackDetails,
    private _feedbackService: FeedbackService,
    private _snackbar: MatSnackBar
  ){}

  ngOnInit(): void {
    this._feedbackService.getResponse(this.data.feedbackId).subscribe((res)=>{
      this.response = res.response;
      this.responseAvailable = true;
    }, (err)=>{
      this.response = "";
      this.enableReply = true;
    })
  }

  replyToFeedback():void {
    const responseObject:PostFeedbackResponse = {feedback_id:this.data.feedbackId, response:this.response};
    this._feedbackService.postResponse(responseObject).subscribe((res)=>{
      this.dialogRef.close();
      this._snackbar.open("Reply to the feedback successfully recorded.", "OK");
    }, (err)=>{
      this._snackbar.open("Failed to record the response.", "Dismiss");
    })
  }

}
