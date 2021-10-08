import { Component } from '@angular/core';
import { BreadcrumbsItem, BreadcrumbsService } from 'src/services/breadcrumbs.service';

@Component({
  selector: 'i-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent {
  items: BreadcrumbsItem[];
  constructor(
    private breadcrumbsService: BreadcrumbsService
  ) {

    this.breadcrumbsService.subscribe(
      items => {
        this.items = items;
      }
    );
  }
}

