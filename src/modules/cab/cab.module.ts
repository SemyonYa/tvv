import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnterComponent } from './pages/enter/enter.component';
import { CabComponent } from './cab.component';
import { CabRegionsComponent } from './pages/cab-regions/cab-regions.component';
import { CabRoutingModule } from './cab-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CabPlacesComponent } from './pages/cab-places/cab-places.component';
import { CabPlacesListComponent } from './pages/cab-places-list/cab-places-list.component';
import { CabPlacesAddComponent } from './pages/cab-places-add/cab-places-add.component';
import { CabPlacesEditComponent } from './pages/cab-places-edit/cab-places-edit.component';
import { CabPlaceComponent } from './pages/cab-place/cab-place.component';
import { CabProjectsAddComponent } from './pages/cab-projects-add/cab-projects-add.component';
import { CabProjectsEditComponent } from './pages/cab-projects-edit/cab-projects-edit.component';



@NgModule({
  declarations: [
    EnterComponent,
    CabComponent,
    CabRegionsComponent,
    CabPlacesComponent,
    CabPlacesListComponent,
    CabPlacesAddComponent,
    CabPlacesEditComponent,
    CabPlaceComponent,
    CabProjectsAddComponent,
    CabProjectsEditComponent,
  ],
  imports: [
    CommonModule,
    CabRoutingModule,
    SharedModule
  ]
})
export class CabModule { }
