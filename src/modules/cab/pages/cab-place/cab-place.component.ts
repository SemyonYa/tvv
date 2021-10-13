import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Place } from 'src/models/Place';
import { Project } from 'src/models/Project';
import { PlaceRestService } from 'src/services/api/place.rest.service';
import { ProjectRestService } from 'src/services/api/project.rest.service';
import { BreadcrumbsService } from 'src/services/breadcrumbs.service';

@Component({
  selector: 'tvv-cab-place',
  templateUrl: './cab-place.component.html',
  styleUrls: ['./cab-place.component.scss']
})
export class CabPlaceComponent implements OnInit {
  placeId: number;
  place: Place;

  titles: string[] = ['ID', 'Наименование'];
  fields: string[] = ['id', 'name'];
  searchValue: string = '';
  ctors: Project[];
  filteredCtors: Project[];
  ctorForDelete: Project;

  constructor(
    private activatedRoute: ActivatedRoute,
    private breadcrumbsService: BreadcrumbsService,
    private placeRest: PlaceRestService,
    private projectRest: ProjectRestService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.placeId = this.activatedRoute.snapshot.params.placeId;
    this.fetchData();

  }

  fetchData() {
    this.placeRest.get(this.placeId)
      .subscribe(
        item => {
          this.place = item;
          this.ctors = item.projects;
          this.filterCtors();
          this.breadcrumbsService.setItems(
            [
              { title: this.place.region, route: `/cab/regions/${this.place.region}` },
              { title: this.place.name, route: `` },
            ]
          );
        }
      );
  }

  editCtor(id: number) {
    this.router.navigateByUrl(`/cab/places/${this.placeId}/edit/${id}`);
  }

  onDelete(id: number) {
    this.ctorForDelete = this.ctors.find(c => c.id == id);
  }

  deleteCtor() {
    this.projectRest.delete(this.ctorForDelete.id)
      .subscribe(
        res => {
          this.fetchData();
          this.ctorForDelete = null;
        },
        this.projectRest.handleError
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
}
