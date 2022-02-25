import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { Routes, RouterModule } from '@angular/router';
import { HelloComponent } from './pages/hello/hello.component';
import { HomeComponent } from './pages/home/home.component';
import { PlaceComponent } from './pages/place/place.component';
import { ProjectGaleryComponent } from './pages/project-galery/project-galery.component';
import { ProjectComponent } from './pages/project/project.component';
import { RegionComponent } from './pages/region/region.component';

const routes: Routes = [
  { path: '', redirectTo: 'map', pathMatch: 'full' },
  {
    path: 'map', component: HomeComponent, children: [
      { path: '', component: HelloComponent, pathMatch: 'full' },
      { path: ':region', component: RegionComponent, pathMatch: 'full' },
      { path: ':region/:placeId', component: PlaceComponent },
      {
        path: ':region/:placeId/:projectId', component: ProjectComponent,
        children: [
          { path: 'before', component: ProjectGaleryComponent },
          { path: 'after', component: ProjectGaleryComponent },
        ]
      },
    ]
  },

  { path: 'cab', loadChildren: () => import('../cab/cab.module').then(m => m.CabModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
