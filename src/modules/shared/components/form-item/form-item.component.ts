import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'i-form-item',
  templateUrl: './form-item.component.html',
  styleUrls: ['./form-item.component.scss']
})
export class FormItemComponent {
  @Input() control: string;
  @Input() form: FormGroup;
}
