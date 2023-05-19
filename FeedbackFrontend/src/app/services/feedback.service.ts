import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Feedback } from '../interfaces/feedback';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private _http: HttpClient) { }

  baseURL:string = "http://localhost:4000/api/";

  //get all the feedbacks
  getAllFeedbacks():Observable<Feedback[]>{
    return this._http.get<Feedback[]>(`${this.baseURL}feedback`);
  }

  //gets particular feedback based on id
  getFeedbackById(feedbackId:string):Observable<Feedback>{
    return this._http.get<Feedback>(`${this.baseURL}feedback/${feedbackId}`)
  }

  //post response for particular feedback
  postResponse(feedbackResponseData:any){
    this._http.post(`${this.baseURL}`, feedbackResponseData)
  }

}
