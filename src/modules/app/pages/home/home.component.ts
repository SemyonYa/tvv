import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { titleAnimation } from 'src/animations/title.animation';
import { MapObject } from 'src/models/MapObject';
import { DataService } from 'src/services/data.service';
import { MapService, Region } from 'src/services/map.service';

@Component({
  selector: 'tvv-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [titleAnimation]
})
export class HomeComponent implements OnInit {
  title = 'tvv';
  currentRegion: Region;

  constructor(
    private dataService: DataService,
    private mapService: MapService,
    private router: Router
  ) {
    // const objects = dataService.mock;
    // mapService.setObjects(objects);
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

    this.mapService.selectedRegion$
      .subscribe(
        item => {
          this.currentRegion = null;
          setTimeout(() => {
            this.currentRegion = item?.title;
            if (this.currentRegion) {
              this.dataService.getPlaces(this.currentRegion)
                .subscribe(
                  items => {
                    const objects: MapObject[] = items.map(i => <MapObject>{ id: i.id, title: i.name, coordinates: { x: i.x, y: i.y }, region: i.region, projects: i.projects });
                    this.mapService.setObjects(objects);
                  }
                );
            } else {
              this.mapService.setObjects([]);
            }
          }, 700);
        }
      )
  }

  selectRegion(region: Region = null) {
    this.mapService.selectRegion(region);
    if (region) {
      this.router.navigateByUrl(`/map/${region}`)
    } else {
      this.router.navigateByUrl('/');
    }
  }
}
