import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryList, EntitiesAssociatedWithCategory, FeedbacksAssociatedWithEntity } from 'src/app/interfaces/feedback';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-category-based-list',
  templateUrl: './category-based-list.component.html',
  styleUrls: ['./category-based-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class CategoryBasedListComponent implements OnInit{
  selectedCategory!:string;
  categories!:CategoryList;

  businessCategory:number = JSON.parse(localStorage.getItem("user")!).businessCategory;

  categorySpecificEntitiesDataSource!:MatTableDataSource<{
    entityId:string;
    entityName:string;
    count:number;
    isExpanded?:boolean;
  }>;
  categorySpecificEntitiesData!:EntitiesAssociatedWithCategory;
  displayEntityColumns:string[] = ["serial", "entityId", "entityName", "count", "action"]

  entitySpecificFeedbacksData!:FeedbacksAssociatedWithEntity;
  entitySpecificFeedbacksDataSource!:MatTableDataSource<{
    _id:string
    authorId:string;
    authorName:string;
    entityName:string;
    createdAt:string;
  }>;

  nestedGridPageConfig = {
    pageNumber: 1,
    pageSize: 10
  }
  
  constructor(
    private _feedbackService: FeedbackService,
    private _changeDetectorRefs: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    this._feedbackService.getCategoryList(this.businessCategory).subscribe((res)=>{
      this.categories = res;
      this.selectedCategory = this.categories.response[0].id;

      this.getEntityListBasedOnCategory(this.selectedCategory);
    })
  }

  switchCategory(categoryId:string):void{
    this.selectedCategory = categoryId;
    this.getEntityListBasedOnCategory(this.selectedCategory);
  }

  getEntityListBasedOnCategory(categoryId:string):void{
    this._feedbackService.getEntitiesAssociatedWithCategory(categoryId).subscribe((res)=>{
      this.categorySpecificEntitiesData = res;
      for(let entity of this.categorySpecificEntitiesData.response.responseGroups){
        entity.isExpanded = false;
      }
      this.categorySpecificEntitiesDataSource = new MatTableDataSource(this.categorySpecificEntitiesData?.response?.responseGroups);
      this._changeDetectorRefs.detectChanges();
    })
  }

  getFeedbacksListBasedOnEntity(entityId:string, pageNumber:number, pageSize:number):void{
    this._feedbackService.getFeedbacksAssociatedWithEntity(entityId, pageNumber, pageSize).subscribe((res)=>{
      this.entitySpecificFeedbacksData = res;
      this.entitySpecificFeedbacksDataSource = new MatTableDataSource(this.entitySpecificFeedbacksData?.response.data);
      this._changeDetectorRefs.detectChanges();
    })
  }

}