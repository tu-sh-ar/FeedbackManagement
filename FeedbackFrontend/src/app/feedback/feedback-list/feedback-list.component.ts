import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Feedback } from 'src/app/interfaces/feedback';
import { FeedbackService } from 'src/app/services/feedback.service';
import { PageNotFoundComponent } from 'src/app/shared/page-not-found/page-not-found.component';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.scss']
})
export class FeedbackListComponent implements OnInit{
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  feedbacks!: Feedback[];
  dataSource!: MatTableDataSource<Feedback>;
  displayFeedbackColumns: string[] = ['id', 'user', 'product', 'rating', 'created_at', 'updated_at', 'review'];

  constructor(private _feedbackService: FeedbackService, public _dialog: MatDialog){}

  ngOnInit(): void {
    this._feedbackService.getAllFeedbacks().subscribe((res)=>{
      this.feedbacks = res;
      console.log(this.feedbacks, " - feedbacks");
      this.dataSource = new MatTableDataSource(this.feedbacks);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  doFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openFeedbackDetailDialogue(){
    this._dialog.open(PageNotFoundComponent);
  }
}
