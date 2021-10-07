import { Component, OnInit } from '@angular/core';
import { MapService, Region } from 'src/services/map.service';

@Component({
  selector: 'tvv-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  regions: string[] = [];
  currentRegion: Region;

  constructor(
    private mapService: MapService
  ) { }

  ngOnInit(): void {
    for (let key in this.mapService.regions) {
      this.regions.push(key);
    }

    console.log(this.regions);

  }

  moveCameraTo(item: Region = null) {
    this.mapService.moveCameraTo(item);
  }

  // animateMapTo() {
  //   this.currentRegion = this.currentRegion == 'Ярославская область' ? null : 'Ярославская область';
  //   this.mapService.moveCameraTo(this.currentRegion);
  //   // this.mapService.cameraPosition$.next({ scale: 3.5, xPercent: 50, yPercent: 51 });
  // }
}
