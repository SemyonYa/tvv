import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CabComponent } from './cab.component';
import { EnterComponent } from './pages/enter/enter.component';
import { CabRegionsComponent } from './pages/cab-regions/cab-regions.component';
import { CabPlacesComponent } from './pages/cab-places/cab-places.component';
import { CabPlacesListComponent } from './pages/cab-places-list/cab-places-list.component';
import { CabPlacesAddComponent } from './pages/cab-places-add/cab-places-add.component';
import { CabPlacesEditComponent } from './pages/cab-places-edit/cab-places-edit.component';

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
          { path: 'edit/:id', component: CabPlacesEditComponent },
        ]
      },
    ]
  },
  { path: 'enter', component: EnterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CabRoutingModule { }
