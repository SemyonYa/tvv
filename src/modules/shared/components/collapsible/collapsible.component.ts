import { Component, Input, OnInit } from '@angular/core';
import { collapseAnimation } from 'src/animations/collapse.animation';

@Component({
  selector: 'i-collapsible',
  templateUrl: './collapsible.component.html',
  styleUrls: ['./collapsible.component.scss'],
  animations: [collapseAnimation]
})
export class CollapsibleComponent implements OnInit {
  @Input() expanded: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
