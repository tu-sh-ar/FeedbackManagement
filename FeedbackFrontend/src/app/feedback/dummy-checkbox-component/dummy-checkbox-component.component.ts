import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dummy-checkbox-component',
  templateUrl: './dummy-checkbox-component.component.html',
  styleUrls: ['./dummy-checkbox-component.component.scss']
})
export class DummyCheckboxComponentComponent {
  @Input() options!:string[];
}
