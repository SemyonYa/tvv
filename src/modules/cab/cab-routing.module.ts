import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CabComponent } from './cab.component';
import { EnterComponent } from './pages/enter/enter.component';
import { CabRegionsComponent } from './pages/cab-regions/cab-regions.component';
import { CabPlacesComponent } from './pages/cab-places/cab-places.component';
import { CabPlacesListComponent } from './pages/cab-places-list/cab-places-list.component';
import { CabPlacesAddComponent } from './pages/cab-places-add/cab-places-add.component';
import { CabPlacesEditComponent } from './pages/cab-places-edit/cab-places-edit.component';
import { CabPlaceComponent } from './pages/cab-place/cab-place.component';
import { CabProjectsAddComponent } from './pages/cab-projects-add/cab-projects-add.component';
import { CabProjectsEditComponent } from './pages/cab-projects-edit/cab-projects-edit.component';

const routes: Routes = [
  // CAB
  { path: '', redirectTo: 'regions', pathMatch: 'full' },
  {
    path: 'regions', component: CabComponent,
    children: [
      { path: '', component: CabRegionsComponent, pathMatch: 'full' },
      {
        path: ':region', component: CabPlacesComponent, children: [
          { path: '', component: CabPlacesListComponent, pathMatch: 'full' },
          { path: 'add', component: CabPlacesAddComponent },
          { path: 'edit/:placeId', component: CabPlacesEditComponent },
        ]
      },
    ]
  },
  {
    path: 'places', component: CabComponent,
    children: [
      { path: ':placeId', component: CabPlaceComponent },
      { path: ':placeId/add', component: CabProjectsAddComponent },
      { path: ':placeId/edit/:projectId', component: CabProjectsEditComponent },
    ]
  },


  { path: 'enter', component: EnterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CabRoutingModule { }
