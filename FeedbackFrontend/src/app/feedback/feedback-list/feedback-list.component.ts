// import { Component, OnInit, ViewChild} from '@angular/core';
// import { MatPaginator, PageEvent } from '@angular/material/paginator';
// import { MatDialog } from '@angular/material/dialog';
// import { MatTableDataSource } from '@angular/material/table';
// import { Feedback, PaginatedFeedbackResponse } from 'src/app/interfaces/feedback';
// import { FeedbackService } from 'src/app/services/feedback.service';
// import { ReplyCardComponent } from '../reply-card/reply-card.component';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

export interface DetailSection {
  serial:number;
  customerName:string;
  rating:number;
  postedOn:string;
}

export interface Dummy{
  serial:number;
  productId:string;
  productName:string;
  productCategory:string;
  numberOfFeedbacks:number;
  isExpanded:boolean;
  details?:DetailSection[] | MatTableDataSource<DetailSection>;
}

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class FeedbackListComponent implements OnInit{
  // @ViewChild('paginator') paginator!: MatPaginator;
  // paginatedFeedbacks!: PaginatedFeedbackResponse;
  // feedbacks!:Feedback[];
  // dataSource!: MatTableDataSource<Feedback>;
  // displayFeedbackColumns: string[] = ['user_name', 'product_id', 'feedback_id', 'rating', 'created_at', 'action'];
  // todayDate:Date = new Date();
  // pageIndex!:number;
  // pageSize!:number;
  // totalData!:number;

  // constructor(
  //   private _feedbackService: FeedbackService,
  //   public _dialog: MatDialog,
  //   ){}

  // ngOnInit(): void {
  //   this.pageIndex = 0;
  //   this.pageSize = 20;
  //   this.getFeedbacks();
  // }

  // getFeedbacks(){
  //   this._feedbackService.getPaginatedFeedbacks(this.pageIndex+1, this.pageSize)
  //   .subscribe((res)=>{
  //     this.paginatedFeedbacks = res;
  //     this.dataSource = new MatTableDataSource(this.paginatedFeedbacks.feedbacks);
  //     this.totalData = this.paginatedFeedbacks.totalFeedbacks;
  //   })
  // }

  // handlePageEvent(e:PageEvent){
  //   this.pageSize = e.pageSize;
  //   this.pageIndex = e.pageIndex;
  //   this.getFeedbacks();
  // }

  // openFeedbackDetailDialogue(feedbackId:string, feedbackCreationDate:string): void {
  //   this._dialog.open(ReplyCardComponent,
  //     {data:
  //       {
  //         feedbackId:feedbackId,
  //         feedbackCreationDate:feedbackCreationDate
  //       }
  //     });
  // }

  @ViewChildren('innerSort') innerSort!: QueryList<MatSort>;
  @ViewChildren('innerTables') innerTables!: QueryList<MatTable<DetailSection>>;

  dummyData:Dummy[] = [
    {
      serial:1,
      productId:"pid-1",
      productName:"Sony 1000XM5",
      productCategory:"Electronics",
      numberOfFeedbacks:2,
      isExpanded:false,
      details:[
        {
          serial:1,
          customerName:"Harshad",
          rating:4,
          postedOn:"2023/04/12"
        },
        {
          serial:2,
          customerName:"Tanmay",
          rating:3,
          postedOn:"2023/05/11"
        }
      ]
    },
    {
      serial:2,
      productId:"pid-2",
      productName:"Skullcandy JIB",
      productCategory:"Electronics",
      numberOfFeedbacks:5,
      isExpanded:false,
      details:[
        {
          serial:1,
          customerName:"Arun",
          rating:4,
          postedOn:"2023/04/25"
        },
        {
          serial:2,
          customerName:"Sushil",
          rating:3,
          postedOn:"2023/05/19"
        },
        {
          serial:3,
          customerName:"Ajit",
          rating:3,
          postedOn:"2023/05/27"
        },
        {
          serial:4,
          customerName:"Sparsh",
          rating:2,
          postedOn:"2023/06/05"
        },
        {
          serial:5,
          customerName:"Kushal",
          rating:5,
          postedOn:"2023/07/02"
        }
      ]
    },
    {
      serial:3,
      productId:"pid-3",
      productName:"Galaxy Wireless Dock",
      productCategory:"Electronics",
      numberOfFeedbacks:0,
      isExpanded:false,
      details:[]
    },
  ];

  dummyDataToDisplay : Dummy[] = [];
  expandedElement!: Dummy | null;
  innerDisplayedColumns = ['serial', 'customerName', 'rating', 'postedOn'];

  dataSource!:MatTableDataSource<Dummy>;
  columnsToDisplay: string[] = ["serial", "productId", "productName", "productCategory", "numberOfFeedbacks"];

  constructor(private cd: ChangeDetectorRef){}

  ngOnInit(): void {
    this.getFeedbackGridData();
  }

  getFeedbackGridData():void{
    this.dummyData.forEach(data => {
      if (data.details && Array.isArray(data.details) && data.details.length) {
          this.dummyDataToDisplay = [...this.dummyDataToDisplay, { ...data, details: new MatTableDataSource(data.details) }];
      } else {
          this.dummyDataToDisplay = [...this.dummyDataToDisplay, data];
      }
  });
    this.dataSource = new MatTableDataSource(this.dummyDataToDisplay);
    // this.dataSource = new MatTableDataSource(this.dummyData);
  }
  
  toggleRow(element: Dummy) {
    element.details && (element.details as MatTableDataSource<DetailSection>).data.length ? (this.expandedElement = this.expandedElement === element ? null : element) : null;
    console.log(this.expandedElement)
    this.cd.detectChanges();
    this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<DetailSection>).sort = this.innerSort.toArray()[index]);
  }

}