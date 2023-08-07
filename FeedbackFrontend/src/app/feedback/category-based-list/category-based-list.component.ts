import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryList, EntitiesAssociatedWithCategory, FeedbacksAssociatedWithEntity } from 'src/app/interfaces/feedback';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-category-based-list',
  templateUrl: './category-based-list.component.html',
  styleUrls: ['./category-based-list.component.scss']
})
export class CategoryBasedListComponent implements OnInit{
  selectedCategory!:string;
  categorySpecificEntitiesDataSource!:MatTableDataSource<{
    entityId:string;
    entityName:string;
    count:number;
  }>;
  categorySpecificEntitiesData!:EntitiesAssociatedWithCategory;
  categories!:CategoryList;
  businessCategory:number = JSON.parse(localStorage.getItem("user")!).businessCategory;

  displayEntityColumns:string[] = ["serial", "entityId", "entityName", "count", "action"]

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

  setActiveCategory(categoryId:string):void{
    this.selectedCategory = categoryId;
    this.getEntityListBasedOnCategory(this.selectedCategory);
  }

  getEntityListBasedOnCategory(categoryId:string):void{
    this._feedbackService.getEntitiesAssociatedWithCategory(categoryId).subscribe((res)=>{
      this.categorySpecificEntitiesData = res;
      this.categorySpecificEntitiesDataSource = new MatTableDataSource(this.categorySpecificEntitiesData?.response?.responseGroups);
      this._changeDetectorRefs.detectChanges();
    })
  }

}