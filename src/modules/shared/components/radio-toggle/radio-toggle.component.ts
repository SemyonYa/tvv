import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'i-radio-toggle',
  templateUrl: './radio-toggle.component.html',
  styleUrls: ['./radio-toggle.component.scss']
})
export class RadioToggleComponent<T extends { id: number, name: string }> implements OnInit {
  @Input() items: T[];
  @Input() initialSelectedItem: T;
  @Output() onSelect = new EventEmitter<T>();

  selectedItem: T;

  constructor() { }

  ngOnInit(): void {
    this.selectedItem = this.initialSelectedItem;
  }

  select(item: T) {
    this.selectedItem = item;
    this.onSelect.emit(item);
  }

}
