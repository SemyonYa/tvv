import { Component, OnInit } from '@angular/core';
import { popupAnimation } from 'src/animations/popup.animation';
import { PopupParams, UiService } from 'src/services/ui.service';

@Component({
  selector: 'i-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  animations: [popupAnimation]
})
export class PopupComponent implements OnInit {
  params: PopupParams;
  constructor(
    private ui: UiService
  ) { }

  ngOnInit(): void {
    this.ui.popup$
      .subscribe(
        item => {
          this.params = item;
        }
      );
  }

  call() {
    this.params.callback();
    this.hide();
  }

  hide(e: PointerEvent = null) {
    if (!e) this.ui.hidePopup();
    if (e?.target?.['id'] === 'popup-background') this.ui.hidePopup();
  }

}
