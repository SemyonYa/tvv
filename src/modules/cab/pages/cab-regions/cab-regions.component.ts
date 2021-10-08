import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/services/data.service';
import { MapService, Region } from 'src/services/map.service';

@Component({
  selector: 'tvv-cab-regions',
  templateUrl: './cab-regions.component.html',
  styleUrls: ['./cab-regions.component.scss']
})
export class CabRegionsComponent implements OnInit {
  title: string = 'Регионы'
  regions: Region[];
  error: string;

  constructor(
    private dataService: DataService,
    private mapService: MapService,
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.regions = [];
      for (let key in this.mapService.regions) {
        this.regions.push(key as Region);
      }
    }, 1000);
  }

}
