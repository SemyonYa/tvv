import { Component, Input, OnInit } from '@angular/core';
import { modalAnimation } from 'src/animations/modal.animation';
import { UiService } from 'src/services/ui.service';

@Component({
  selector: 'i-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  animations: [modalAnimation]
})
export class ErrorComponent {
  text: string;

  constructor(
    private ui: UiService
  ) {
    this.ui.error$
      .subscribe(
        item => {
          this.text = item;
        }
      );
  }
}
