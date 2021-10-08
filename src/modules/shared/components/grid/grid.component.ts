import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'i-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent<T> {
  @Input() items: T[];
  @Input() titles: string[];
  @Input() withEdit: boolean;
  @Input() withDelete: boolean;
  @Input() fields: string[] = [];
  // @Input() exclude: string[] = [];
  @Output() onEditItem = new EventEmitter<string>()
  @Output() onDeleteItem = new EventEmitter<string>()

  itemsAsArrays: (string | number)[][];

  editItem(id: string) {
    this.onEditItem.emit(id);
  }

  deleteItem(id: string) {
    this.onDeleteItem.emit(id);
  }
}
