import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feedback-template-preview-card',
  templateUrl: './feedback-template-preview-card.component.html',
  styleUrls: ['./feedback-template-preview-card.component.scss']
})
export class FeedbackTemplatePreviewCardComponent {
  @Input() templates!:{id:string; templateName:string; templateType:number; active:boolean, used:boolean}[];
  @Input() category!:string;
}
