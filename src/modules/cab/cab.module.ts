import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnterComponent } from './pages/enter/enter.component';
import { CabComponent } from './cab.component';
import { RegionsComponent } from './pages/regions/regions.component';
import { CabRoutingModule } from './cab-routing.module';



@NgModule({
  declarations: [
    EnterComponent,
    CabComponent,
    RegionsComponent,
  ],
  imports: [
    CommonModule,
    CabRoutingModule
  ]
})
export class CabModule { }
