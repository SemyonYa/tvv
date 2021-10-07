import { Component, OnInit } from '@angular/core';
import { titleAnimation } from 'src/animations/title.animation';

@Component({
  selector: 'tvv-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.scss'],
  animations: [titleAnimation]
})
export class HelloComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
