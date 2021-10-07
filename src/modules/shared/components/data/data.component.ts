import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'i-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  @Input() list: any[];
  @Input() error: string;

  constructor() { }

  ngOnInit(): void {
  }

}
