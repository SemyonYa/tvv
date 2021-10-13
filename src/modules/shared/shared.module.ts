import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { MapComponent } from './components/map/map.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { CollapsibleComponent } from './components/collapsible/collapsible.component';
import { CtorItemComponent } from './components/ctor-item/ctor-item.component';
import { DataComponent } from './components/data/data.component';
import { DataItemComponent } from './components/data-item/data-item.component';
import { DropDownComponent } from './components/drop-down/drop-down.component';
import { ErrorComponent } from './components/error/error.component';
import { FileInputComponent } from './components/image-input/image-input.component';
import { FormItemComponent } from './components/form-item/form-item.component';
import { GridComponent } from './components/grid/grid.component';
import { GridRowComponent } from './components/grid/grid-row/grid-row.component';
import { InProgressComponent } from './components/in-progress/in-progress.component';
import { ImageLibraryModalComponent } from './components/image-library-modal/image-library-modal.component';
import { ModalComponent } from './components/modal/modal.component';
import { RadioToggleComponent } from './components/radio-toggle/radio-toggle.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { SuccessComponent } from './components/success/success.component';
import { ToggleComponent } from './components/toggle/toggle.component';
import { PlaceFormComponent } from './components/place-form/place-form.component';
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { PopupComponent } from './components/popup/popup.component';



@NgModule({
  declarations: [
    BreadcrumbsComponent,
    CollapsibleComponent,
    CtorItemComponent,
    DataComponent,
    DataItemComponent,
    DropDownComponent,
    ErrorComponent,
    FileInputComponent,
    FormItemComponent,
    GridComponent,
    GridRowComponent,
    ImageLibraryModalComponent,
    InProgressComponent,
    MapComponent,
    ModalComponent,
    PlaceFormComponent,
    PopupComponent,
    ProjectFormComponent,
    RadioToggleComponent,
    SearchInputComponent,
    SuccessComponent,
    ToggleComponent,
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
    CtorItemComponent,
    DataComponent,
    DataItemComponent,
    DropDownComponent,
    ErrorComponent,
    FileInputComponent,
    FormItemComponent,
    GridComponent,
    GridRowComponent,
    InProgressComponent,
    ImageLibraryModalComponent,
    MapComponent,
    ModalComponent,
    PlaceFormComponent,
    PopupComponent,
    ProjectFormComponent,
    RadioToggleComponent,
    SearchInputComponent,
    SuccessComponent,
    ToggleComponent,
  ]
})
export class SharedModule { }
