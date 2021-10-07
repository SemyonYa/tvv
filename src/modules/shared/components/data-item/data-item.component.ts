import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'i-data-item',
  templateUrl: './data-item.component.html',
  styleUrls: ['./data-item.component.scss']
})
export class DataItemComponent implements OnInit {
  @Input() item: any;
  @Input() error: string;

  constructor() { }

  ngOnInit(): void {
  }

}
