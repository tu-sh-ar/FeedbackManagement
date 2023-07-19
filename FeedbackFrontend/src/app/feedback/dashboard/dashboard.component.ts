import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  businessEmail!:string;
  
  constructor(private _router: Router){}

  ngOnInit():void{
   this.businessEmail = JSON.parse(localStorage.getItem('user')!).email;
  }

  logout():void{
    localStorage.clear();
    this._router.navigate(["admin-login"]);
  }
}
