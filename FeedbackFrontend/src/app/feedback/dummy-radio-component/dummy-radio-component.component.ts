import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dummy-radio-component',
  templateUrl: './dummy-radio-component.component.html',
  styleUrls: ['./dummy-radio-component.component.scss']
})
export class DummyRadioComponentComponent {
  @Input() options!:string[];
}
