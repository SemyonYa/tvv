import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { MapComponent } from './components/map/map.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { CollapsibleComponent } from './components/collapsible/collapsible.component';
import { DataComponent } from './components/data/data.component';
import { DataItemComponent } from './components/data-item/data-item.component';
import { DropDownComponent } from './components/drop-down/drop-down.component';
import { ErrorComponent } from './components/error/error.component';
import { FormItemComponent } from './components/form-item/form-item.component';
import { InProgressComponent } from './components/in-progress/in-progress.component';
import { ModalComponent } from './components/modal/modal.component';
import { RadioToggleComponent } from './components/radio-toggle/radio-toggle.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { ToggleComponent } from './components/toggle/toggle.component';



@NgModule({
  declarations: [
    BreadcrumbsComponent,
    CollapsibleComponent,
    DataComponent,
    DataItemComponent,
    DropDownComponent,
    ErrorComponent,
    FormItemComponent,
    InProgressComponent,
    ModalComponent,
    RadioToggleComponent,
    SearchInputComponent,
    ToggleComponent,
    MapComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    BreadcrumbsComponent,
    CollapsibleComponent,
    DataComponent,
    DataItemComponent,
    DropDownComponent,
    ErrorComponent,
    FormItemComponent,
    InProgressComponent,
    ModalComponent,
    RadioToggleComponent,
    SearchInputComponent,
    ToggleComponent,
    MapComponent,
  ]
})
export class SharedModule { }
