import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { MapService, Region } from '../../services/map.service';
import { titleAnimation } from '../../animations/title.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [titleAnimation]
})
export class AppComponent implements OnInit {
  title = 'tvv';
  currentRegion: Region;

  constructor(
    private dataService: DataService,
    private mapService: MapService,
    private router: Router
  ) {
    const objects = dataService.mock;
    mapService.objects$.next(objects);
  }

  ngOnInit() {
    this.router.events
      .subscribe(
        e => {
          if (e instanceof NavigationEnd) {
            console.log('NavigationEnd', e);

            // if (this.backgroundElem) {
            //   const rnd1: number = Math.round((Math.random() * 10));
            //   const rnd2: number = Math.round((Math.random() * 10));
            //   this.renderer.setStyle(this.backgroundElem.nativeElement, 'background-size', `${100 + rnd1}% auto`);
            //   this.renderer.setStyle(this.backgroundElem.nativeElement, 'background-position-x', `${50 + rnd2 / 3}%`);
            // }
          }
        }
      );
  }

  animateMapTo(region: Region) {
    this.mapService.moveCameraTo(region);
    this.currentRegion = null;
    setTimeout(() => {
      this.currentRegion = region;
    }, 700);
    // this.mapService.cameraPosition$.next({ scale: 3.5, xPercent: 50, yPercent: 51 });
  }
}
