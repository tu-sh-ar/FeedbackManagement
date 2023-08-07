import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { DetailedFeedbackResponse, Feedback, GetFeedbackResponse, PostFeedbackResponse, UpdateResponse } from 'src/app/interfaces/feedback';
import { FeedbackService } from 'src/app/services/feedback.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-feedback-details',
  templateUrl: './feedback-details.component.html',
  styleUrls: ['./feedback-details.component.scss']
})
export class FeedbackDetailsComponent implements OnInit{
  detailedFeedbackResponse!:DetailedFeedbackResponse;
  responseId!:string;
  authorName!:string;
  entityName!:string;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _feedbackService: FeedbackService,
    private _snackbar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.responseId = this._activatedRoute.snapshot.paramMap.get("responseId")!;

    this._feedbackService.getDetailedFeedbackResponse(this.responseId).subscribe((res)=>{
      this.detailedFeedbackResponse = res;
      console.log(res)
      this.authorName = this.detailedFeedbackResponse.response.authorName;
      this.entityName = this.detailedFeedbackResponse.response.entityName;
    })
  }

  checkIfAnswerIsArray(answer:string | string[] | number | null):boolean{
    if(answer == null || typeof(answer)=='string' || typeof(answer)=='number'){
      return false
    } else{
      return true
    }
  }

}