import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { titleAnimation } from 'src/animations/title.animation';
import { BreadcrumbsService } from 'src/services/breadcrumbs.service';
import { PlaceRestService } from 'src/services/api/place.rest.service';
import { Region } from 'src/services/map.service';
import { Place } from '../../../../models/Place';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tvv-cab-places-list',
  templateUrl: './cab-places-list.component.html',
  styleUrls: ['./cab-places-list.component.scss'],
  animations: [titleAnimation]
})
export class CabPlacesListComponent implements OnInit, OnDestroy {
  region: Region;

  titles: string[] = ['ID', 'Наименование', 'Регион'];
  fields: string[] = ['id', 'name', 'region'];
  searchValue: string = '';
  ctors: Place[];
  filteredCtors: Place[];
  ctorForDelete: Place;
  subscription: Subscription;

  constructor(
    private placeRest: PlaceRestService,
    private breadcrumbsService: BreadcrumbsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.region = this.activatedRoute.snapshot.params.region;

    this.breadcrumbsService.setItems(
      [{ title: this.region, route: '' }]
    );

    this.fetchData();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  fetchData() {
    this.filteredCtors = null;
    this.subscription = this.placeRest.getBy(this.region)
      .subscribe(
        items => {
          this.ctors = items;
          this.filterCtors();
        }
      );
  }

  editCtor(id: number) {
    this.router.navigateByUrl(`/cab/regions/${this.region}/edit/${id}`)
  }

  onDelete(id: number) {
    this.ctorForDelete = this.ctors.find(c => c.id == id);
  }

  deleteCtor() {
    this.placeRest.delete(this.ctorForDelete.id)
      .subscribe(
        res => {
          this.placeRest.getAll();
          this.ctorForDelete = null;
        },
        this.placeRest.handleError
      );
  }

  closeCtor() {
    this.ctorForDelete = null;
  }

  search(value: string) {
    this.searchValue = value;
    this.filterCtors();
  }

  filterCtors() {
    this.filteredCtors = this.ctors
      ? this.ctors
        .filter(
          u => {
            const searchFields: string = [u.name].join(' ').toLocaleLowerCase();
            return this.searchValue
              ? searchFields.indexOf(this.searchValue.toLocaleLowerCase()) !== -1
              : true
          }
        )
      : null;
  }

  openItem(placeId: number) {
    console.log('Open place', placeId);
    this.router.navigateByUrl(`/cab/places/${placeId}`)
  }

}
