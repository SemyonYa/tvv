import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from 'src/services/breadcrumbs.service';
import { DataService } from 'src/services/data.service';
import { Region } from 'src/services/map.service';

@Component({
  selector: 'tvv-cab-places',
  templateUrl: './cab-places.component.html',
  styleUrls: ['./cab-places.component.scss']
})
export class CabPlacesComponent implements OnInit {
  region: Region;

  constructor(

    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.region = this.activatedRoute.snapshot.params.region;
    console.log(this.region);
  }
}
