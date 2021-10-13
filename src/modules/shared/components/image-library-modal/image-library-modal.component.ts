import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/services/ui.service';
import { Image, ImagePeriod } from '../../../../models/Image';
import { ImageRestService } from '../../../../services/api/image.rest.service';

@Component({
  selector: 'i-image-library-modal',
  templateUrl: './image-library-modal.component.html',
  styleUrls: ['./image-library-modal.component.scss']
})
export class ImageLibraryModalComponent implements OnInit, OnDestroy {
  @Input() selectedImage: Image;
  @Input() projectId: number;
  @Input() period: ImagePeriod;
  @Output() onSelect = new EventEmitter<Image>();
  @Output() onHide = new EventEmitter<null>();

  images: Image[];
  subscription: Subscription;

  constructor(
    private imageRest: ImageRestService,
    private ui: UiService
  ) { }

  ngOnInit(): void {
    this.fetchData();
    // this.imageRest.list$
    //   .subscribe(
    //     is => {
    //       this.images = is?.map(i => new Image(i.id, i.name, i.projectId, i.period));
    //     }
    //   );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  fetchData() {
    // if (this.projectId || this.period) {
    let params = new HttpParams();
    if (this.projectId) {
      params = params.set('project_id', this.projectId.toString())
    }
    if (this.period) {
      params = params.set('period', this.period);
    }
    this.subscription = this.imageRest.getByParams(params)
      .subscribe(
        items => {
          console.log("🚀 ~ file: image-library-modal.component.ts ~ line 53 ~ ImageLibraryModalComponent ~ fetchData ~ items", items)
          this.images = items.map(i => new Image(i.id, i.name, i.projectId, i.period));;
        }
      );
    // } else {
    //   this.imageRest.getAll();
    // }
  }

  selectImage(image: Image) {
    // this.selectedImage = image;
    if (!this.projectId) this.onSelect.emit(image);
  }

  hide() {
    this.onHide.emit();
  }

  showPopup(e: PointerEvent, id: number) {
    console.log(e);

    this.ui.showPopup({
      x: e.clientX,
      y: e.clientY,
      msg: 'Удалить',
      callback: () => {
        console.log(`DELETE ${id}`);
        this.deleteItem(id);
        this.fetchData();
      }
    });
  }

  deleteItem(id: number) {
    this.imageRest.delete(id)
      .subscribe(
        () => {
          this.fetchData();
        }
      );
  }

}
