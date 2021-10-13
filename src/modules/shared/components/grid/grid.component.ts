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
  @Output() onEditItem = new EventEmitter<number>()
  @Output() onDeleteItem = new EventEmitter<number>()
  @Output() onItemDoubleClick = new EventEmitter<number>();

  itemsAsArrays: (string | number)[][];

  editItem(id: number) {
    this.onEditItem.emit(id);
  }

  deleteItem(id: number) {
    this.onDeleteItem.emit(id);
  }

  doubleClick(id: number) {
    this.onItemDoubleClick.emit(id);
  }
}
