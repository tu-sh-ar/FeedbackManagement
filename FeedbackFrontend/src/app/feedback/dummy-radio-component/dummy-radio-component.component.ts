import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dummy-radio-component',
  templateUrl: './dummy-radio-component.component.html',
  styleUrls: ['./dummy-radio-component.component.scss']
})
export class DummyRadioComponentComponent {
  data:string[] = ['1', '2', '3', '4'];
  @Input() options!:string[];
}
