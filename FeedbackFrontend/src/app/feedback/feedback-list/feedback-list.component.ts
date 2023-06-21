import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Feedback } from 'src/app/interfaces/feedback';
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
  feedbacks!: Feedback[];
  dataSource!: MatTableDataSource<Feedback>;
  displayFeedbackColumns: string[] = ['feedback_id', 'product_id', 'rating', 'comment', 'created_at', 'action'];
  
  constructor(
    private _feedbackService: FeedbackService,
    public _dialog: MatDialog,
    ){}

  ngOnInit(): void {
    this._feedbackService.getAllFeedbacks().subscribe((res)=>{
      this.feedbacks = res;
      this.dataSource = new MatTableDataSource(this.feedbacks);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
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
