import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-feedback-templates',
  templateUrl: './feedback-templates.component.html',
  styleUrls: ['./feedback-templates.component.scss']
})
export class FeedbackTemplatesComponent implements OnInit{

  data:any;

  constructor(
    private _feedbackService: FeedbackService
  ){}

  ngOnInit(): void {
    this._feedbackService.getFeedbackTemplate().subscribe((res)=>{
      this.data = res;
    })
  }

}
