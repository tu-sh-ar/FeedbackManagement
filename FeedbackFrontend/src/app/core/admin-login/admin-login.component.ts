import { Component, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent {

  disableLogin:boolean = false;

  isLoginError = new EventEmitter<boolean>(false);

  constructor(
    private _service: AuthService,
    private _router: Router,
    private _snackbar: MatSnackBar
  ){}

  adminLoginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  login():void{

    this.disableLogin = true;

    if(this.adminLoginForm.value.username && this.adminLoginForm.value.password){
      this._service.adminLogin({username:this.adminLoginForm.value.username, password:this.adminLoginForm.value.password})
      .subscribe((res)=>{
        // console.log(res);
        if(res){
          localStorage.setItem("user", JSON.stringify(res));
          this._router.navigate(["admin/dashboard"])
        }
      }, (err)=>{
        this.isLoginError.emit(true);
        this.disableLogin = false;
      });

      this.isLoginError.subscribe((isError)=>{
        if(isError){
          this._snackbar.open("Invalid username or password", "Try again", {duration: 2000});
        }
      })
    } else {
      this._snackbar.open("Please enter required fields.", "Dismiss", {duration: 2000});
    }
  }

}