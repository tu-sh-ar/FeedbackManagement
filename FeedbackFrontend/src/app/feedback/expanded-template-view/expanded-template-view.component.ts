import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';
import { ActivatedRoute } from '@angular/router';
import { SingleFeedbackTemplateBody } from 'src/app/interfaces/feedback';

@Component({
  selector: 'app-expanded-template-view',
  templateUrl: './expanded-template-view.component.html',
  styleUrls: ['./expanded-template-view.component.scss']
})
export class ExpandedTemplateViewComponent implements OnInit {
  templateId!:string;
  template!:SingleFeedbackTemplateBody;
  currentIdx:number = 0;

  constructor(private _feedbackService: FeedbackService, private _activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.templateId = this._activatedRoute.snapshot.paramMap.get("id")!;

    this._feedbackService.getTemplateById(this.templateId).subscribe((res)=>{
      this.template = res;
    })
  }

  handleCards(leftIdx:number):void{
    this.currentIdx = leftIdx;
  }

}