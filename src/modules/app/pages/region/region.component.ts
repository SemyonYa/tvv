import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { titleAnimation } from 'src/animations/title.animation';
import { DataService } from 'src/services/data.service';
import { MapObject, MapService, SelectedRegion } from 'src/services/map.service';

@Component({
  selector: 'tvv-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss'],
  animations: [titleAnimation]
})
export class RegionComponent implements OnInit {
  selectedRegion: SelectedRegion;
  objects: MapObject[];

  constructor(
    private dataService: DataService,
    private mapService: MapService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.mapService.selectedRegion$
      .subscribe(
        item => {
          this.selectedRegion = item;

          // TODO: delete
          this.mapService.setObjects(this.dataService.mock);
        }
      );

    this.mapService.objects$
      .subscribe(
        items => {
          this.objects = null;
          setTimeout(() => {
            this.objects = items;
          }, 1000);
        }
      );

    const regionParam = this.activatedRoute.snapshot.params.region;
    this.mapService.selectRegion(regionParam);
  }

}
