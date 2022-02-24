import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { titleAnimation } from 'src/animations/title.animation';
import { Place } from 'src/models/Place';
import { CtorItemType } from 'src/modules/shared/components/ctor-item/ctor-item.component';
import { DataService } from 'src/services/data.service';
import { MapService, Region } from 'src/services/map.service';

@Component({
  selector: 'tvv-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss'],
  animations: [titleAnimation]
})
export class PlaceComponent implements OnInit {
  place: Place;
  region: Region;

  CtorItemType = CtorItemType;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    // private mapService: MapService
  ) { }

  ngOnInit(): void {
    // const placeId = this.activatedRoute.snapshot.params.placeId;
    // this.fetchPlace(placeId);

    this.activatedRoute.params
      .subscribe(
        params => {
          if (params?.placeId && this.place?.id !== params.placeId) {
            const placeId = this.activatedRoute.snapshot.params.placeId;
            this.fetchPlace(placeId);
          }
        }
      );

    // this.region = this.activatedRoute.snapshot.params.region;
    // if (this.mapService.selectedRegion$.value?.title != this.region)
    //   this.mapService.selectRegion(this.region);
  }

  fetchPlace(placeId: number) {
    this.place = null;
    this.dataService.getPlace(placeId)
      .subscribe(
        item => {
          console.log('PLACE', item);

          this.place = item;
        }
      );
  }

}
