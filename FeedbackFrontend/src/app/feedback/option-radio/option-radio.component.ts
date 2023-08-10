import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-option-radio',
  templateUrl: './option-radio.component.html',
  styleUrls: ['./option-radio.component.scss']
})
export class OptionRadioComponent {
  @Input() options!:string[];
}
