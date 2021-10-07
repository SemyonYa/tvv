import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'i-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {
  @Input() text: string; 
}
