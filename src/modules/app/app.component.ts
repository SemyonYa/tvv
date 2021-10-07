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
export class AppComponent {
  // title = 'tvv';
  // currentRegion: Region;

  // constructor(
  //   private dataService: DataService,
  //   private mapService: MapService,
  //   private router: Router
  // ) {
  //   const objects = dataService.mock;
  //   mapService.objects$.next(objects);
  // }

  // ngOnInit() {
  //   this.router.events
  //     .subscribe(
  //       e => {
  //         if (e instanceof NavigationEnd) {
  //           console.log('NavigationEnd', e);

  //           // if (this.backgroundElem) {
  //           //   const rnd1: number = Math.round((Math.random() * 10));
  //           //   const rnd2: number = Math.round((Math.random() * 10));
  //           //   this.renderer.setStyle(this.backgroundElem.nativeElement, 'background-size', `${100 + rnd1}% auto`);
  //           //   this.renderer.setStyle(this.backgroundElem.nativeElement, 'background-position-x', `${50 + rnd2 / 3}%`);
  //           // }
  //         }
  //       }
  //     );

  //   this.mapService.selectedRegion$
  //     .subscribe(
  //       item => {
  //         this.currentRegion = null;
  //         setTimeout(() => {
  //           this.currentRegion = item?.title;
  //         }, 700);
  //       }
  //     )
  // }

  // selectRegion(region: Region = null) {
  //   this.mapService.selectRegion(region);
  //   if (region) {
  //     this.router.navigateByUrl(`/region/${region}`)
  //   } else {
  //     this.router.navigateByUrl('/');
  //   }
  // }
}
