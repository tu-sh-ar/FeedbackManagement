import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { ProductService } from 'src/app/services/product.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { User } from 'src/app/interfaces/user';
import { Product } from 'src/app/interfaces/product';
import { PostFeedbackResponse } from 'src/app/interfaces/feedback';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface FeedbackDetails {
  feedbackId:string,
  feedbackCreationDate:string,
  rating:string,
  comment:string,
  userId:string,
  productId:string
}

@Component({
  selector: 'app-feedback-detail',
  templateUrl: './feedback-detail.component.html',
  styleUrls: ['./feedback-detail.component.scss']
})
export class FeedbackDetailComponent implements OnInit{

  Arr = Array;
  user!: User;
  product!: Product;
  fetchingUser:boolean = true;
  fetchingProduct:boolean = true;
  response!:string;
  enableReply:boolean = false;
  responseAvailable:boolean = false;

  constructor(
    public dialogRef: MatDialogRef<FeedbackDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data:FeedbackDetails,
    private _userService: UserService,
    private _productService: ProductService,
    private _feedbackService: FeedbackService,
    private _snackbar: MatSnackBar
  ){}

  ngOnInit(): void {
    this._userService.getUser(this.data.userId).subscribe((res)=>{
      this.user = res;
      this.fetchingUser = false;
    })

    this._productService.getProduct(this.data.productId).subscribe((res)=>{
      this.product = res;
      this.fetchingProduct = false;
    })

    this._feedbackService.getResponse(this.data.feedbackId).subscribe((res)=>{
      this.response = res.response;
      this.responseAvailable = true;
    }, (err)=>{
      this.response = "";
      this.enableReply = true;
    })
  }

  replyToFeedback():void {
    const responseObject:PostFeedbackResponse = {feedback_id:this.data.feedbackId, response:this.response};
    this._feedbackService.postResponse(responseObject).subscribe((res)=>{
      this.dialogRef.close();
      this._snackbar.open("Response recorded.", "OK");
    }, (err)=>{
      this._snackbar.open("Failed to record the response.", "Dismiss");
    })
  }

  closeDialog():void {
    this.dialogRef.close();
  }

}