import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // CAB
  { path: '', redirectTo: 'orders', pathMatch: 'full' },
  {
    // path: 'orders', component: CabComponent, children: [
    //   { path: '', component: CabHomeComponent, pathMatch: 'full' },
    //   { path: 'contracts', component: CabContractsComponent },
    //   { path: 'cart', component: CabCartComponent },
    //   {
    //     path: 'history', component: CabHistoryComponent, children: [
    //       { path: '', component: CabHistoryAllComponent, pathMatch: 'full' },
    //       { path: 'active', component: CabHistoryActiveComponent },
    //     ]
    //   }
    // ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CabRoutingModule { }
