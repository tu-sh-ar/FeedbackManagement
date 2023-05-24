import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  baseURL:string = environment.baseUrl;

  //get particular user based on id
  getUser(userId:string):Observable<User>{
    return this._http.get<User>(`${this.baseURL}user/${userId}`)
  }

}
