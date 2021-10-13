import { Component, OnInit } from '@angular/core';
import { modalAnimation } from '../../../../animations/modal.animation';
import { UiService } from '../../../../services/ui.service';


@Component({
  selector: 'i-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss'],
  animations: [modalAnimation]
})
export class SuccessComponent implements OnInit {
  text: string;

  constructor(private uiService: UiService) { }

  ngOnInit() {
    this.uiService.success$
      .subscribe(
        text => {
          this.text = text;
        }
      );
  }

  hide() {
    this.uiService.hideSuccess();
  }

}
