import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
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
  objects$: Observable<MapObject[]>;

  constructor(
    private dataService: DataService,
    private mapService: MapService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.region = this.activatedRoute.snapshot.params.region;
    this.objects$ = this.mapService.objects$;
  }

}
