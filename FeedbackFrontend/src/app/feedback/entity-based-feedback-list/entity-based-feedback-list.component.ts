import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
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
  entitySpecificFeedbacksData!:FeedbacksAssociatedWithEntity;
  entitySpecificFeedbacksDataSource!:MatTableDataSource<{
    _id:string
    authorId:string;
    authorName:string;
    entityName:string;
    createdAt:string;
  }>

  displayFeedbackColumns:string[] = ["serial", "authorName", "entityName", "createdAt", "actions"];

  totalFeedbacks!:number;
  @ViewChild('paginator') paginator!: MatPaginator;
  paginationConfig = {
    pageNumber:0,
    pageSize:50
  }

  constructor(
    private _activatedRoute:ActivatedRoute,
    private _feedbackService: FeedbackService
  ){}

  ngOnInit(): void {
    this.entityId = this._activatedRoute.snapshot.paramMap.get('entityId')!;
    this.getFeedbacksListBasedOnEntity(this.entityId, this.paginationConfig.pageNumber, this.paginationConfig.pageSize);
  }

  getFeedbacksListBasedOnEntity(entityId:string, pageNumber:number, pageSize:number):void{
    this._feedbackService.getFeedbacksAssociatedWithEntity(entityId, pageNumber+1, pageSize).subscribe((res)=>{
      this.entitySpecificFeedbacksData = res;
      this.totalFeedbacks = this.entitySpecificFeedbacksData.response.totalResponses;
      this.entitySpecificFeedbacksDataSource = new MatTableDataSource(this.entitySpecificFeedbacksData.response.data)
    })
  }

  handlePageEvent(e:PageEvent){
    this.paginationConfig.pageSize = e.pageSize;
    this.paginationConfig.pageNumber = e.pageIndex;
    this.getFeedbacksListBasedOnEntity(this.entityId, this.paginationConfig.pageNumber, this.paginationConfig.pageSize);
  }

}