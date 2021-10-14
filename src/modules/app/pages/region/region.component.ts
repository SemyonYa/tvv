import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { titleAnimation } from 'src/animations/title.animation';
import { MapObject } from 'src/models/MapObject';
import { DataService } from 'src/services/data.service';
import { MapService, Region, SelectedRegion } from 'src/services/map.service';

@Component({
  selector: 'tvv-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss'],
  animations: [titleAnimation]
})
export class RegionComponent implements OnInit {
  region: Region;
  objects: MapObject[];

  constructor(
    private dataService: DataService,
    private mapService: MapService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.region = this.activatedRoute.snapshot.params.region;
    this.mapService.selectedRegion$
      .subscribe(
        item => {

          if (item) {
            this.region = item?.title;
            // this.fetchPlaces();
          }
        }
      );

    this.mapService.objects$
      .subscribe(
        items => {
          this.objects = null;
          this.objects = items;
        }
      );

    if (this.mapService.selectedRegion$.value?.title != this.region)
      this.mapService.selectRegion(this.region);
  }

  // fetchPlaces() {
  //   console.log(this.region);

  //   this.dataService.getPlaces(this.region)
  //     .subscribe(
  //       items => {
  //         const objects: MapObject[] = items.map(i => <MapObject>{ id: i.id, title: i.name, coordinates: { x: i.x, y: i.y }, region: i.region, projects: i.projects });
  //         this.mapService.setObjects(objects);
  //       }
  //     );
  // }

}
