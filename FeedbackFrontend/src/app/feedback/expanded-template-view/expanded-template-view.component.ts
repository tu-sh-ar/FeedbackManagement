import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expanded-template-view',
  templateUrl: './expanded-template-view.component.html',
  styleUrls: ['./expanded-template-view.component.scss']
})
export class ExpandedTemplateViewComponent implements OnInit{
  product!:boolean;
  packaging!:boolean;
  overall!:boolean;

  ngOnInit(): void {
    this.product = true;
    this.packaging = false;
    this.overall = false;
  }

  activateProduct():void{
    this.product = true;
    this.packaging = false;
    this.overall = false;
  }

  activatePackaging():void{
    this.product = false;
    this.packaging = true;
    this.overall = false;
  }

  activateOverall():void{
    this.product = false;
    this.packaging = false;
    this.overall = true;
  }

}
