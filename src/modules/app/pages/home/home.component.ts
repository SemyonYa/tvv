import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
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
    private router: Router,
  ) { }

  ngOnInit() {

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
          }, 500);
        }
      )
  }

  selectRegion(region: Region = null) {
    if (region) {
      this.router.navigateByUrl(`/map/${region}`)
    } else {
      this.router.navigateByUrl('/map');
    }
  }
}
