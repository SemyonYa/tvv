import { Component, Input } from '@angular/core';

@Component({
  selector: 'in-progress',
  templateUrl: './in-progress.component.html',
  styleUrls: ['./in-progress.component.scss']
})
export class InProgressComponent {
  @Input() size: number = 60;
}