import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Admin } from '../interfaces/admin';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoginError = new EventEmitter<boolean>(false);

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) { }

  adminLogin(loginData: Admin): Observable<any> {
    return this._http.post<any>("https://app-deliveryagent-dev.azurewebsites.net/api/v1/testing/login", loginData)
  }

}