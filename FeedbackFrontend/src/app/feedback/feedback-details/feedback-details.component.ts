import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { Product } from 'src/app/interfaces/product';
import { Feedback, GetFeedbackResponse, PostFeedbackResponse, UpdateResponse } from 'src/app/interfaces/feedback';
import { UserService } from 'src/app/services/user.service';
import { ProductService } from 'src/app/services/product.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-feedback-details',
  templateUrl: './feedback-details.component.html',
  styleUrls: ['./feedback-details.component.scss']
})
export class FeedbackDetailsComponent implements OnInit{
  feedbackId!:string;
  userId!:string;
  productId!:string;
  feedback!:Feedback;
  user!: User;
  product!: Product;
  responseAvailable:boolean = false;
  enableReply:boolean = false;
  enableField!:boolean;
  response!:string;
  responseId!:string;
  showSave:boolean = false;
  isLoaded:boolean = false;
  Arr = Array;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService,
    private _productService: ProductService,
    private _feedbackService: FeedbackService,
    private _snackbar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.feedbackId = this._activatedRoute.snapshot.paramMap.get('id')!;

    this._feedbackService.getFeedbackById(this.feedbackId).subscribe((res)=>{
      this.feedback = res;
      this.userId = this.feedback.user_id;
      this.productId = this.feedback.product_id;

      this._userService.getUser(this.userId).subscribe((res)=>{
        this.user = res;
      })
  
      this._productService.getProduct(this.productId).subscribe((res)=>{
        this.product = res;
        this.isLoaded = true;
      })

    })

    this._feedbackService.getResponse(this.feedbackId).subscribe((res)=>{
      this.responseId = res._id;
      this.response = res.response;
      this.responseAvailable = true;
    }, (err)=>{
      this.response = "";
      this.responseId = "";
      this.enableReply = true;
    })
  }

  replyToFeedback():void{
    const responseObject:PostFeedbackResponse = {feedback_id:this.feedbackId, response:this.response};
    this._feedbackService.postResponse(responseObject).subscribe((res)=>{
      this._snackbar.open("Reply to the feedback successfully recorded.", "OK");
      setTimeout(()=>{
        window.location.reload();
      }, 2000)
    }, (err)=>{
      this._snackbar.open("Failed to record the response.", "Dismiss");
    })
  }

  enableTextareaAndSaveButton():void{
    this.responseAvailable = false;
    this.showSave = true;
  }

  updateReply():void{
    console.log(this.responseId);
    let dataObject =  {_id:this.responseId, feedback_id:this.feedbackId, response:this.response};
    this._feedbackService.updateResponse(this.responseId, dataObject).subscribe((res)=>{
      window.location.reload();
    })
  }

  deleteReply():void{
    if(confirm("Do you want to delete your response for this feedback?")){
      this._feedbackService.deleteResponse(this.responseId).subscribe((res:Object)=>{
        window.location.reload();
      })
    } 
  }

}