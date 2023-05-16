import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Feedback, FeedbackRes } from '../interfaces/feedback';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private _http: HttpClient) { }

  getAllFeedbacks():Observable<Feedback[]>{
    return this._http.get<Feedback[]>("http://localhost:3000/feedbacks");
  }

  getFeedbacks():Observable<FeedbackRes[]>{
    return this._http.get<FeedbackRes[]>("http://localhost:4000/api/feedback");
  }
}
