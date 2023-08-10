import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-option-checkbox',
  templateUrl: './option-checkbox.component.html',
  styleUrls: ['./option-checkbox.component.scss']
})
export class OptionCheckboxComponent {
  @Input() options!:string[];
}
