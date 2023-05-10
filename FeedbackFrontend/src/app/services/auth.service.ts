import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Admin } from '../interfaces/admin';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoginError = new EventEmitter<boolean>(false);

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) { }

  adminLogin(loginData: Admin): void{
    this._http.get(
      `http://localhost:3000/admin?username=${loginData.username}&password=${loginData.password}`,
      {observe:'response'}
    )
    .subscribe((result:any)=>{
      if(result && result.body && result.body.length){
        localStorage.setItem("user", JSON.stringify(result.body[0].username));
        this._router.navigate(["admin/dashboard"])
      } else {
        this.isLoginError.emit(true);
      }
    })
  }
}
