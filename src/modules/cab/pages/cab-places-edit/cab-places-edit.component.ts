import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CtorItem } from 'src/models/Ctor';
import { Image } from 'src/models/Image';
import { Place } from 'src/models/Place';
import { PlaceRestService } from 'src/services/api/place.rest.service';
import { BreadcrumbsService } from 'src/services/breadcrumbs.service';
import { Region } from 'src/services/map.service';

@Component({
  selector: 'tvv-cab-places-edit',
  templateUrl: './cab-places-edit.component.html',
  styleUrls: ['./cab-places-edit.component.scss']
})
export class CabPlacesEditComponent implements OnInit {
  region: Region;
  placeId: number;
  // form: FormGroup;

  constructor(
    public placeRest: PlaceRestService,
    // private breadcrumbsService: BreadcrumbsService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.placeId = this.activatedRoute.snapshot.params.placeId;
    this.region = this.activatedRoute.parent.snapshot.paramMap.get('region') as Region;
    // this.placeRest.get(placeId)
    //   .subscribe(
    //     item => {
    //       console.log("🚀 ~ file: cab-places-edit.component.ts ~ line 33 ~ CabPlacesEditComponent ~ ngOnInit ~ item", item)
    //       this.place = item;
    //       this.generateForm();
    //       this.valueChangesSubscription();
    //       this.breadcrumbsService.setItems(
    //         [
    //           { title: this.region, route: `/cab/regions/${this.region}` },
    //           { title: this.place.name, route: `` },
    //         ]
    //       );
    //     }
    //   )
  }

  // get valid(): boolean {
  //   return (this.place?.items?.length > 0 ? this.place?.items.map(c => !!c.value).reduce((acc, next) => acc && next, true) : true) && this.form.valid;
  // }

  // private generateForm() {
  //   this.form = new FormGroup({
  //     id: new FormControl(this.place?.id ?? '', [Validators.required]),
  //     name: new FormControl(this.place?.name ?? '', [Validators.required]),
  //     thumbId: new FormControl(this.place?.thumbId ?? ''),
  //     isActive: new FormControl(this.place.isActive),
  //     region: new FormControl(this.place?.region ?? this.region ?? ''),
  //     x: new FormControl(this.place?.x ?? 0),
  //     y: new FormControl(this.place?.y ?? 0),
  //   });
  // }

  // valueChangesSubscription() {
  //   this.form.valueChanges
  //     .subscribe(
  //       values => {
  //         if (this.place) {
  //           for (let key in values) {
  //             this.place[key] = values[key];
  //           }
  //         }
  //       });
  // }

  // selectThumb(image: Image) {
  //   this.form.patchValue({ thumbId: image.id });
  // }

  // toggleActivity(value: boolean) {
  //   this.form.patchValue({ isActive: value })
  // }

  // changeCoordinates(coordinates: Coordinates) {
  //   this.form.patchValue({
  //     x: coordinates.x,
  //     y: coordinates.y,
  //   });
  // }

  // addItem(afterItem: CtorItem = null) {
  //   if (!this.place?.id) {
  //     return;
  //   }

  //   if (afterItem) {
  //     const afterItemIndex: number = this.place.items.indexOf(afterItem);
  //     this.place.items = [
  //       ...this.place.items.slice(0, afterItemIndex + 1),
  //       new CtorItem(this.place.id),
  //       ...this.place.items.slice(afterItemIndex + 1)
  //     ];
  //   } else {
  //     this.place.items.push(new CtorItem(this.place.id));
  //   }
  // }

  // removeItem(index: number) {
  //   this.place.items.splice(index, 1);
  // }

  // submit() {
  //   console.log(this.form);

  //   if (!this.place?.id) {
  //     this.placeRest.post(this.place)
  //       .subscribe(
  //         item => {
  //           item.items = [];
  //           this.updatePlace(item);
  //         },
  //         this.placeRest.handleError,
  //         () => {
  //           // this.onSuccess.emit(this.ctor);
  //         }
  //       );
  //   } else {
  //     console.log(this.place);

  //     const items = [...this.place.items];
  //     this.placeRest.put(this.place, this.place.id)
  //       .subscribe(
  //         item => {
  //           this.updatePlace(item);
  //           this.saveChildren(items, this.place.id);
  //         },
  //         this.placeRest.handleError,
  //         () => {
  //           // this.onSuccess.emit(this.ctor);
  //         }
  //       );
  //   }
  // }

  // updatePlace(place: Place) {

  //   for (let key in place) {
  //     if (key !== 'items') {
  //       this.place[key] = place[key];
  //     }
  //   }
  // }

  // saveChildren(items: CtorItem[], ctorId: number) {
  //   this.placeRest.postChildren(items, ctorId)
  //     .subscribe(
  //       items => {
  //         this.place.items = items;
  //       },
  //       this.placeRest.handleError,
  //       () => {
  //         // this.onSuccess.emit(this.ctor);
  //       }
  //     );
  // }

}
