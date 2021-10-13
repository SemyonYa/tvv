import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaceRestService } from 'src/services/api/place.rest.service';
import { Region } from 'src/services/map.service';

@Component({
  selector: 'tvv-cab-places-add',
  templateUrl: './cab-places-add.component.html',
  styleUrls: ['./cab-places-add.component.scss']
})
export class CabPlacesAddComponent implements OnInit {
  region: Region;

  constructor(
    public placeRest: PlaceRestService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.region = this.activatedRoute.parent.snapshot.paramMap.get('region') as Region;
  }

}
