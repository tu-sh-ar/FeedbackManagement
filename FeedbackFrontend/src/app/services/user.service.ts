import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  baseURL:string = "http://localhost:4000/api/";

  //get particular user based on id
  getUser(userId:string):Observable<User>{
    return this._http.get<User>(`${this.baseURL}user/${userId}`)
  }

}
