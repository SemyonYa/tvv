import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BreadcrumbsService } from 'src/services/breadcrumbs.service';
import { breadcrumbs, BreadcrumbsItem } from './breadcrumbs-list';

@Component({
  selector: 'i-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent {
  items: BreadcrumbsItem[];
  constructor(
    private breadcrumbsService: BreadcrumbsService
    // private router: Router,
    // private activatedRoute: ActivatedRoute
  ) {

    this.breadcrumbsService.subscribe(
      items => {
        this.items = items;
      }
    );
    // this.router.events
    //   .subscribe(
    //     e => {
    //       if (e instanceof NavigationEnd) {
    //         for (let key in breadcrumbs) {
    //           if (e.url.search(key) === 0) {
    //             this.items = breadcrumbs[e.url];
    //             break;
    //           } else {
    //             this.items = [];
    //           }
    //         }
    //       }
    //     }
    //   );

    // this.activatedRoute.url
    //   .subscribe(
    //     segments => {
    //       const url = segments.map(s => `/${s.path}`).join('');
    //       console.log(url);
    //       for (let key in breadcrumbs) {
    //         if (url.search(key) === 0) {
    //           this.items = breadcrumbs[url];
    //         }
    //       }
    //     }
    //   );
  }
}

