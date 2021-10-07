import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HelloComponent } from './pages/hello/hello.component';
import { HomeComponent } from './pages/home/home.component';
import { RegionComponent } from './pages/region/region.component';

const routes: Routes = [
  { path: '', redirectTo: 'map', pathMatch: 'full' },
  {
    path: 'map', component: HomeComponent, children: [
      { path: '', component: HelloComponent, pathMatch: 'full' },
      { path: ':region', component: RegionComponent },
    ]
  },

  { path: 'cab', loadChildren: () => import('../cab/cab.module').then(m => m.CabModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
