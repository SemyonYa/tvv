import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Place } from 'src/models/Place';
import { PlaceRestService } from 'src/services/api/place.rest.service';
import { ProjectRestService } from 'src/services/api/project.rest.service';

@Component({
  selector: 'tvv-cab-projects-edit',
  templateUrl: './cab-projects-edit.component.html',
  styleUrls: ['./cab-projects-edit.component.scss']
})
export class CabProjectsEditComponent implements OnInit {
  place: Place;
  projectId: number;

  constructor(
    public projectRest: ProjectRestService,
    private placeRest: PlaceRestService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.projectId = this.activatedRoute.snapshot.params.projectId;
    const placeId = this.activatedRoute.snapshot.params.placeId;
    this.placeRest.get(placeId)
      .subscribe(
        item => {
          this.place = item;
        }
      );
  }
}
