import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CabComponent } from './cab.component';
import { RegionsComponent } from './pages/regions/regions.component';

const routes: Routes = [
  // CAB
  { path: '', redirectTo: 'regions', pathMatch: 'full' },
  {
    path: 'regions', component: CabComponent,
    children: [
      { path: '', component: RegionsComponent, pathMatch: 'full' },
      // { path: ':regionId', component: CabContractsComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CabRoutingModule { }
