import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Feedback } from '../interfaces/feedback';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private _http: HttpClient) { }

  getAllFeedbacks():Observable<Feedback[]>{
    return this._http.get<Feedback[]>("http://localhost:3000/feedbacks")
  }
}
