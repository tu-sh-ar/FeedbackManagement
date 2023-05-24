import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Feedback, PostFeedbackResponse, GetFeedbackResponse } from '../interfaces/feedback';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private _http: HttpClient) { }

  baseURL:string = environment.baseUrl;

  //get all the feedbacks
  getAllFeedbacks():Observable<Feedback[]>{
    return this._http.get<Feedback[]>(`${this.baseURL}feedback`);
  }

  //gets particular feedback based on id
  getFeedbackById(feedbackId:string):Observable<Feedback>{
    return this._http.get<Feedback>(`${this.baseURL}feedback/${feedbackId}`)
  }

  //post response for particular feedback
  postResponse(feedbackResponseData:PostFeedbackResponse){
    console.log(JSON.stringify(feedbackResponseData));
    // this._http.post(`${this.baseURL}response`, JSON.stringify(feedbackResponseData));
  }

  //get response for particular feedback based on id
  getResponse(feedbackId:string):Observable<GetFeedbackResponse>{
    return this._http.get<GetFeedbackResponse>(`${this.baseURL}response?feedback_id=${feedbackId}`)
  }

}