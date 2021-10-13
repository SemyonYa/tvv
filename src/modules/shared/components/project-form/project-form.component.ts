import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CtorItem } from '../../../../models/Ctor';
import { Place } from '../../../../models/Place';
import { ProjectRestService } from '../../../../services/api/project.rest.service';
import { Coordinates, Region } from '../../../../services/map.service';
import { BreadcrumbsService } from '../../../../services/breadcrumbs.service';
import { Image } from '../../../../models/Image';
import { Project, ProjectType } from '../../../../models/Project';

@Component({
  selector: 'tvv-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
  @Input() projectRest: ProjectRestService
  @Input() place: Place;
  @Input() projectId: number;

  project: Project;
  form: FormGroup;
  types: ProjectType[] = [
    'Больница',
    'Детский сад',
    'Дом культуры',
    'Школа',
    'Коммуникации',
  ];

  constructor(
    private breadcrumbsService: BreadcrumbsService,
  ) { }

  ngOnInit(): void {
    console.log(this.place);

    if (this.projectId) {
      this.projectRest.get(this.projectId)
        .subscribe(
          item => {
            this.project = item;
            this.generateForm();
            this.valueChangesSubscription();
            this.breadcrumbsService.setItems(
              [
                { title: this.place.region, route: `/cab/regions/${this.place.region}` },
                { title: this.place.name, route: `/cab/places/${this.place.id}` },
                { title: this.project.name, route: `` }
              ]
            );
          }
        );
    } else {
      this.project = new Project();
      this.generateForm();
      this.valueChangesSubscription();
      this.breadcrumbsService.setItems(
        [
          { title: this.place.region, route: `/cab/regions/${this.place.region}` },
          { title: this.place.name, route: `/cab/places/${this.place.id}` },
          { title: 'Новый проект', route: `` }
        ]
      );
    }
  }

  get valid(): boolean {
    return (this.project?.items?.length > 0 ? this.project?.items.map(c => !!c.value).reduce((acc, next) => acc && next, true) : true) && this.form.valid;
  }

  private generateForm() {
    this.form = new FormGroup({
      id: new FormControl(this.project?.id ?? ''),
      name: new FormControl(this.project?.name ?? '', [Validators.required]),
      period: new FormControl(this.project?.period ?? '', [Validators.required]),
      costs: new FormControl(this.project?.costs ?? '', [Validators.required]),
      people: new FormControl(this.project?.people ?? '', [Validators.required]),
      type: new FormControl(this.project?.type ?? '', [Validators.required]),
      thumbId: new FormControl(this.project?.thumbId ?? ''),
      placeId: new FormControl(this.project?.placeId ?? this.place?.id),
      isActive: new FormControl(this.project.isActive),
    });
  }

  valueChangesSubscription() {
    this.form.valueChanges
      .subscribe(
        values => {
          if (this.project) {
            for (let key in values) {
              this.project[key] = values[key];
            }
          }
        });
  }

  selectThumb(image: Image) {
    this.form.patchValue({ thumbId: image.id });
  }

  toggleActivity(value: boolean) {
    this.form.patchValue({ isActive: value })
  }

  changeCoordinates(coordinates: Coordinates) {
    this.form.patchValue({
      x: coordinates.x,
      y: coordinates.y,
    });
  }

  addItem(afterItem: CtorItem = null) {
    if (!this.project?.id) {
      return;
    }

    if (afterItem) {
      const afterItemIndex: number = this.project.items.indexOf(afterItem);
      this.project.items = [
        ...this.project.items.slice(0, afterItemIndex + 1),
        new CtorItem(this.project.id),
        ...this.project.items.slice(afterItemIndex + 1)
      ];
    } else {
      this.project.items.push(new CtorItem(this.project.id));
    }
  }

  removeItem(index: number) {
    this.project.items.splice(index, 1);
  }

  submit() {
    console.log(this.form);

    if (!this.project?.id) {
      this.projectRest.post(this.project)
        .subscribe(
          item => {
            item.items = [];
            this.updateProject(item);
          },
          this.projectRest.handleError,
          () => {
            // this.onSuccess.emit(this.ctor);
          }
        );
    } else {
      console.log(this.project);

      const items = [...this.project.items];
      this.projectRest.put(this.project, this.project.id)
        .subscribe(
          item => {
            this.updateProject(item);
            this.saveChildren(items, this.project.id);
          },
          this.projectRest.handleError,
          () => {
            // this.onSuccess.emit(this.ctor);
          }
        );
    }
  }

  updateProject(project: Project) {

    for (let key in project) {
      if (key !== 'items') {
        this.project[key] = project[key];
      }
    }
  }

  saveChildren(items: CtorItem[], ctorId: number) {
    this.projectRest.postChildren(items, ctorId)
      .subscribe(
        items => {
          this.project.items = items;
        },
        this.projectRest.handleError,
        () => {
          // this.onSuccess.emit(this.ctor);
        }
      );
  }
}
