import { Component, Input } from '@angular/core';

@Component({
  selector: 'i-in-progress',
  templateUrl: './in-progress.component.html',
  styleUrls: ['./in-progress.component.scss']
})
export class InProgressComponent {
  @Input() size: string = '24px';
  @Input() margin: string = '0';
}