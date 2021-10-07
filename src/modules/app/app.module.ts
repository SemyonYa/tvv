import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from '../shared/shared.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { RegionComponent } from './pages/region/region.component';
import { HelloComponent } from './pages/hello/hello.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegionComponent,
    HelloComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
