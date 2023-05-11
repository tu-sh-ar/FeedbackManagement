import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Feedback } from 'src/app/interfaces/feedback';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.scss']
})
export class FeedbackListComponent implements OnInit{
  @ViewChild('paginator') paginator!: MatPaginator;
  feedbacks!: Feedback[];
  dataSource!: MatTableDataSource<Feedback>;
  displayFeedbackColumns: string[] = ['id', 'user', 'product', 'rating', 'created_at', 'updated_at'];

  constructor(private _feedbackService: FeedbackService){}

  ngOnInit(): void {
    this._feedbackService.getAllFeedbacks().subscribe((res)=>{
      this.feedbacks = res;
      console.log(this.feedbacks, " - feedbacks");
      this.dataSource = new MatTableDataSource(this.feedbacks);
      this.dataSource.paginator = this.paginator;
    })
  }
}
