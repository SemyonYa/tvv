import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { pageAnimation } from '../../../../animations/page.animation';
import { modalAnimation } from '../../../../animations/modal.animation';

@Component({
  selector: 'i-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [pageAnimation, modalAnimation]
})
export class ModalComponent {
  @Output() onCancel = new EventEmitter();
  @Output() onOk = new EventEmitter();

  cancel() {
    this.onCancel.emit();
  }

  ok() {
    this.onOk.emit();
  }

  backClick(e: any) {
    if (e.target['id'] === 'cab-i-modal-back') {
      this.cancel();
    }
  }
}
