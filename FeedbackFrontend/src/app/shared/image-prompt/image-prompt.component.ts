import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface ImagePath{
  imgPath:string;
}

@Component({
  selector: 'app-image-prompt',
  templateUrl: './image-prompt.component.html',
  styleUrls: ['./image-prompt.component.scss']
})
export class ImagePromptComponent {

  constructor(
    public dialogRef: MatDialogRef<ImagePromptComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ImagePath
  ){}

}
