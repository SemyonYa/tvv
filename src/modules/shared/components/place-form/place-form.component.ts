import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CtorItem } from '../../../../models/Ctor';
import { Place } from '../../../../models/Place';
import { PlaceRestService } from '../../../../services/api/place.rest.service';
import { MapService, Region } from '../../../../services/map.service';
import { BreadcrumbsService } from '../../../../services/breadcrumbs.service';
import { Image } from '../../../../models/Image';
import { Coordinates, MapObject } from 'src/models/MapObject';

@Component({
  selector: 'tvv-place-form',
  templateUrl: './place-form.component.html',
  styleUrls: ['./place-form.component.scss']
})
export class PlaceFormComponent implements OnInit {
  @Input() placeRest: PlaceRestService
  @Input() region: Region;
  @Input() placeId: number;

  place: Place;
  form: FormGroup;

  constructor(
    private breadcrumbsService: BreadcrumbsService,
    private mapService: MapService
  ) { }

  ngOnInit(): void {
    this.mapService.setObjects([]);
    if (this.placeId) {
      this.placeRest.get(this.placeId)
        .subscribe(
          item => {
            this.place = item;
            this.generateForm();
            this.valueChangesSubscription();
            this.breadcrumbsService.setItems(
              [
                { title: this.region, route: `/cab/regions/${this.region}` },
                { title: this.place.name, route: `` },
              ]
            );
            this.mapService.setObjects([{ id: this.placeId, title: this.place.name, coordinates: { x: this.place.x, y: this.place.y }, region: this.place.region }]);
          }
        );
    } else {
      this.place = new Place();
      this.generateForm();
      this.valueChangesSubscription();
      this.breadcrumbsService.setItems(
        [
          { title: this.region, route: `/cab/regions/${this.region}` },
          { title: 'Новый населенный пункт', route: `` },
        ]
      );
    }
  }

  get valid(): boolean {
    return (this.place?.items?.length > 0 ? this.place?.items.map(c => !!c.value).reduce((acc, next) => acc && next, true) : true) && this.form.valid;
  }

  private generateForm() {
    this.form = new FormGroup({
      id: new FormControl(this.place?.id ?? ''),
      name: new FormControl(this.place?.name ?? '', [Validators.required]),
      thumbId: new FormControl(this.place?.thumbId ?? ''),
      isActive: new FormControl(this.place.isActive),
      region: new FormControl(this.place?.region ?? this.region ?? ''),
      x: new FormControl(this.place?.x ?? 0),
      y: new FormControl(this.place?.y ?? 0),
    });
  }

  valueChangesSubscription() {
    this.form.valueChanges
      .subscribe(
        values => {
          if (this.place) {
            for (let key in values) {
              this.place[key] = values[key];
            }
          }
        });
  }

  selectThumb(image: Image) {
    this.form.patchValue({ thumbId: image.id });
  }

  toggleActivity(value: boolean) {
    this.form.patchValue({ isActive: value })
  }

  onMapClick(coordinates: Coordinates) {
    this.changeCoordinates(coordinates);
    this.renderObject({ id: 0, title: this.form.get('name').value, coordinates, region: this.place.region })
  }

  renderObject(object: MapObject) {
    this.mapService.setObjects([object]);
  }

  changeCoordinates(coordinates: Coordinates) {
    this.form.patchValue({
      x: coordinates.x,
      y: coordinates.y,
    });
  }

  addItem(afterItem: CtorItem = null) {
    if (!this.place?.id) {
      return;
    }

    if (afterItem) {
      const afterItemIndex: number = this.place.items.indexOf(afterItem);
      this.place.items = [
        ...this.place.items.slice(0, afterItemIndex + 1),
        new CtorItem(this.place.id),
        ...this.place.items.slice(afterItemIndex + 1)
      ];
    } else {
      this.place.items.push(new CtorItem(this.place.id));
    }
  }

  removeItem(index: number) {
    this.place.items.splice(index, 1);
  }

  submit() {
    console.log(this.form);

    if (!this.place?.id) {
      this.placeRest.post(this.place)
        .subscribe(
          item => {
            item.items = [];
            this.updatePlace(item);
          },
          this.placeRest.handleError,
          () => {
            // this.onSuccess.emit(this.ctor);
          }
        );
    } else {
      console.log(this.place);

      const items = [...this.place.items];
      this.placeRest.put(this.place, this.place.id)
        .subscribe(
          item => {
            this.updatePlace(item);
            this.saveChildren(items, this.place.id);
          },
          this.placeRest.handleError,
          () => {
            // this.onSuccess.emit(this.ctor);
          }
        );
    }
  }

  updatePlace(place: Place) {

    for (let key in place) {
      if (key !== 'items') {
        this.place[key] = place[key];
      }
    }
  }

  saveChildren(items: CtorItem[], ctorId: number) {
    this.placeRest.postChildren(items, ctorId)
      .subscribe(
        items => {
          this.place.items = items;
        },
        this.placeRest.handleError,
        () => {
          // this.onSuccess.emit(this.ctor);
        }
      );
  }
}
