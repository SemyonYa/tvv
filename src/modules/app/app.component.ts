import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { MapService, Region } from 'src/services/map.service';
import { titleAnimation } from '../../animations/title.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [titleAnimation]
})
export class AppComponent {
  constructor(
    private router: Router,
    private mapService: MapService,
  ) {
    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        map(e => e as NavigationEnd),
        map(e => e.urlAfterRedirects.split('/').splice(1)),
      )
      .subscribe(
        e => {
          const [module, region, placeId, projectId] = e;

          if (module === 'map') {
            this.mapService.selectRegion(region as Region);
          } else {
            this.mapService.selectRegion();
          }
        }
      )
  }
}
