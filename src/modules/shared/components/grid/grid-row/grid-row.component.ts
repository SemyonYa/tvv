import { Component, Input, OnInit, Output } from '@angular/core';
import { formatDate } from '@angular/common';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'i-grid-row',
  templateUrl: './grid-row.component.html',
  styleUrls: ['./grid-row.component.scss']
})
export class GridRowComponent<T extends { id: string }> implements OnInit {
  @Input() item: T;
  @Input() withEdit: boolean;
  @Input() withDelete: boolean;
  @Input() fields: string[] = [];
  // @Input() exclude: string[] = [];
  @Output() onEdit = new EventEmitter<string>();
  @Output() onDelete = new EventEmitter<string>();

  itemAsArray: (string | number)[] = [];

  ngOnInit(): void {
    for (let field of this.fields) {
      if (field in this.item) {
        if (typeof this.item[field] === 'number' || typeof this.item[field] === 'string') {
          this.itemAsArray.push(this.item[field])
        } else if (typeof this.item[field] === 'boolean') {
          this.itemAsArray.push(this.item[field].toString())
        } else if (typeof this.item[field] === 'object') {
          if (this.item[field] instanceof Date) {
            this.itemAsArray.push(formatDate(this.item[field], 'dd.MM.y HH:mm', 'en-EN'));
          }
        }
      }
    }
    // for (let key in this.item) {
    //   const field = this.item[key];
    //   if (!this.exclude.includes(key)) {
    //     if (typeof field === 'number' || typeof field === 'string') {
    //       this.itemAsArray.push(field)
    //     } else if (typeof field === 'boolean') {
    //       this.itemAsArray.push(field.toString())
    //     } else if (typeof field === 'object') {
    //       if (field instanceof Date) {
    //         this.itemAsArray.push(formatDate(field, 'dd.MM.y HH:mm', 'en-EN'));
    //       }
    //     }
    //   }
    // }
  }

  edit() {
    this.onEdit.emit(this.item.id);
  }

  delete() {
    this.onDelete.emit(this.item.id);
  }
}
