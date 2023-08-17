import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FeedbacksAssociatedWithEntity } from 'src/app/interfaces/feedback';

@Component({
  selector: 'app-test-nested-table',
  templateUrl: './test-nested-table.component.html',
  styleUrls: ['./test-nested-table.component.scss']
})
export class TestNestedTableComponent {
  displayFeedbackColumns:string[] = ["serialnumber", "authorName", "entityName", "createdAt", "action"]

  @Input() templateId!:string;
  @Input() entityId!:string;
  @Input() parentTableColumns: number = this.displayFeedbackColumns.length;
  @Input() feedbacksDetails!:FeedbacksAssociatedWithEntity;

  @Input() feedbackDataSource!: MatTableDataSource<{
    _id:string
    authorId:string;
    authorName:string;
    entityName:string;
    createdAt:string;
  }>

  ngOnInit(): void {
  }
}
