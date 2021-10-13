import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Place } from 'src/models/Place';
import { PlaceRestService } from 'src/services/api/place.rest.service';
import { ProjectRestService } from 'src/services/api/project.rest.service';


@Component({
  selector: 'tvv-cab-projects-add',
  templateUrl: './cab-projects-add.component.html',
  styleUrls: ['./cab-projects-add.component.scss']
})
export class CabProjectsAddComponent implements OnInit {
  // placeId: number;
  place: Place;

  constructor(
    public projectRest: ProjectRestService,
    private placeRest: PlaceRestService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const placeId = this.activatedRoute.snapshot.params.placeId;
    this.placeRest.get(placeId)
      .subscribe(
        item => {
          this.place = item;
          console.log(this.place); 
        }
      );
  }

}
