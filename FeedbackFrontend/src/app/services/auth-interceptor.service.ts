import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private _router: Router) { }

  intercept(request:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>>{

    const tokenString = localStorage.getItem("user");
    if(tokenString){
      let tokenObject = JSON.parse(tokenString);
      let dummy = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImFkbWluIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiYWRtaW4iLCJ0ZW5hbnRJZCI6IlQxIiwiZXhwIjoxNjkxMTM2NTkwLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MTM3IiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzEzNyJ9.mcNjnnKYGjq7iqbLgUQ8bwKQfp-oZ7dpFnFVrgChniQ";

      request = request.clone({
        setHeaders:{
          'Authorization': `Bearer ${tokenObject.jwtToken}`,
          // 'Authorization': `Bearer ${dummy}`,
          'Client': `${tokenObject.id}`,
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    return next.handle(request).pipe(
      catchError((err)=>{
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            localStorage.clear();
            this._router.navigate(["admin-login"]);
          }
        }
        return throwError(err);
      })
    )
  }
}