import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'i-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent implements OnInit {
  @Input() initialValue: boolean;
  @Output() onToggle = new EventEmitter<boolean>();

  value: boolean;

  constructor() { }

  ngOnInit(): void {
    this.value = this.initialValue;
  }

  toggle() {
    this.value = !this.value;
    this.onToggle.emit(this.value);
  }

}
