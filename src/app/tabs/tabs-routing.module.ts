import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[
      {
        path:'home',
        children:[
          {
            path:'',
            loadChildren:() => import('../home/home.module').then(m =>m.HomePageModule)
          }
        ]
      },
      {
        path:'exp',
        children:[
          {
            path:'',
            loadChildren:() => import('../exp/exp.module').then(m =>m.ExpPageModule)
          }
        ]
      },
      {
        path:'profile',
        children:[
          {
            path:'',
            loadChildren:() => import('../profile/profile.module').then(m =>m.ProfilePageModule)
          }
        ]
      },
      {
        path:'',
        redirectTo:'tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path:'',
    redirectTo:'tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
