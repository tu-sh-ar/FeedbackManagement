import { Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Feedback, PaginatedFeedbackResponse } from 'src/app/interfaces/feedback';
import { FeedbackService } from 'src/app/services/feedback.service';
import { ReplyCardComponent } from '../reply-card/reply-card.component';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.scss']
})
export class FeedbackListComponent implements OnInit{
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  paginatedFeedbacks!: PaginatedFeedbackResponse;
  feedbacks!:Feedback[];
  dataSource!: MatTableDataSource<Feedback>;
  displayFeedbackColumns: string[] = ['feedback_id', 'product_id', 'rating', 'created_at', 'action'];
  todayDate:Date = new Date();
  pageIndex:number = 0;
  pageSize:number = 100;
  totalData!:number;

  constructor(
    private _feedbackService: FeedbackService,
    public _dialog: MatDialog,
    ){}

  ngOnInit(): void {
    this.pageIndex = 0;
    this.pageSize = 100;
    this.getFeedbacks();
  }

  getFeedbacks(){
    this._feedbackService.getPaginatedFeedbacks(this.pageIndex+1, this.pageSize).subscribe((res)=>{
      this.paginatedFeedbacks = res;
      this.dataSource = new MatTableDataSource(this.paginatedFeedbacks.feedbacks);
      this.totalData = this.paginatedFeedbacks.totalFeedbacks;
      this.dataSource.sort = this.sort;
    })
  }

  handlePageEvent(e:PageEvent){
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getFeedbacks();
  }

  openFeedbackDetailDialogue(feedbackId:string, feedbackCreationDate:string): void {
    this._dialog.open(ReplyCardComponent,
      {data:
        {
          feedbackId:feedbackId,
          feedbackCreationDate:feedbackCreationDate
        }
      });
  }

}
