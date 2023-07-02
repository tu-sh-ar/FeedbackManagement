import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Feedback, PostFeedbackResponse, GetFeedbackResponse, UpdateResponse, PaginatedFeedbackResponse } from '../interfaces/feedback';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface DateRange {
  start:string;
  end:string;
}

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private _http: HttpClient) { }

  baseURL:string = environment.feedbackApiUrl;

  getAllFeedbacks():Observable<Feedback[]>{
    return this._http.get<Feedback[]>(`${this.baseURL}feedback/getAllFeedbacks`)
  }

  //get paginated feedbacks
  getPaginatedFeedbacks(pageNumber:number, pageSize:number):Observable<PaginatedFeedbackResponse>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("page", pageNumber);
    queryParams = queryParams.append("size", pageSize);
    return this._http.get<PaginatedFeedbackResponse>(`${this.baseURL}feedback`, {params:queryParams});
  }

  //get feedbacks received between particular dates
  getFeedbacksByDate(startDate:string, endDate:string):Observable<Feedback[]>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("start",startDate);
    queryParams = queryParams.append("end",endDate);
    return this._http.get<Feedback[]>(`${this.baseURL}feedback/getFeedbacksByDate`, {params:queryParams});
  }

  //gets particular feedback based on feedback id
  getFeedbackById(feedbackId:string):Observable<Feedback>{
    return this._http.get<Feedback>(`${this.baseURL}feedback/${feedbackId}`)
  }

  //post response for particular feedback
  postResponse(feedbackResponseData:PostFeedbackResponse):Observable<any>{
    const headers = { 'content-type': 'application/json'};
    return this._http.post<any>(`${this.baseURL}response`, JSON.stringify(feedbackResponseData), {'headers':headers});
  }

  //get response for particular feedback based on feedback id
  getResponse(feedbackId:string):Observable<GetFeedbackResponse>{
    return this._http.get<GetFeedbackResponse>(`${this.baseURL}response?feedback_id=${feedbackId}`)
  }

  //delete a response
  deleteResponse(responseId:string):Observable<Object> {
    return this._http.delete<Object>(`${this.baseURL}response/${responseId}`)
  }

  //update a response
  updateResponse(responseId:string, data:UpdateResponse):Observable<UpdateResponse>{
    return this._http.put<UpdateResponse>(`${this.baseURL}response/${responseId}`, data)
  }

  //get active feedback template
  getFeedbackTemplate(): Observable<any>{
    return this._http.get<any>(`${this.baseURL}feedbackTemplate`);
  }

}