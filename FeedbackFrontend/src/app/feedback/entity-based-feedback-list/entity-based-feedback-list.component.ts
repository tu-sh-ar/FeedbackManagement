import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { FeedbacksAssociatedWithEntity } from 'src/app/interfaces/feedback';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-entity-based-feedback-list',
  templateUrl: './entity-based-feedback-list.component.html',
  styleUrls: ['./entity-based-feedback-list.component.scss']
})
export class EntityBasedFeedbackListComponent implements OnInit{
  entityId!:string;
  templateId!:string;
  entitySpecificFeedbacksData!:FeedbacksAssociatedWithEntity;
  entitySpecificFeedbacksDataSource!:MatTableDataSource<{
    _id:string
    authorId:string;
    authorName:string;
    entityName:string;
    createdAt:string;
  }>

  displayFeedbackColumns:string[] = ["serial", "authorName", "entityName", "createdAt", "actions"];

  constructor(
    private _activatedRoute:ActivatedRoute,
    private _feedbackService: FeedbackService
  ){}

  ngOnInit(): void {
    this.entityId = this._activatedRoute.snapshot.paramMap.get('entityId')!;
    this.templateId = this._activatedRoute.snapshot.paramMap.get('templateId')!;
    this.getFeedbacksListBasedOnEntity(this.entityId, this.templateId);

  }

  getFeedbacksListBasedOnEntity(entityId:string, templateId:string):void{
    this._feedbackService.getFeedbacksAssociatedWithEntity(entityId, templateId).subscribe((res)=>{
      this.entitySpecificFeedbacksData = res;
      console.log(res);
      this.entitySpecificFeedbacksDataSource = new MatTableDataSource(this.entitySpecificFeedbacksData?.response)
    })
  }

}
