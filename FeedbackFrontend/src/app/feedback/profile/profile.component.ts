import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  businessEmail!:string;

  ngOnInit():void{
    this.businessEmail = JSON.parse(localStorage.getItem('user')!).email;
  }
}