import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActividadCreateComponent } from './components/actividad-create/actividad-create.component';
import { ActividadDetailComponent } from './components/actividad-detail/actividad-detail.component';
import { ActividadListComponent } from './components/actividad-list/actividad-list.component';
import { ActividadUpdateComponent } from './components/actividad-update/actividad-update.component';

const routes: Routes = [
  {
    path: '',
    component: ActividadListComponent,
  },
  {
    path: 'create',
    component: ActividadCreateComponent,
  },
  {
    path: 'update/:id',
    component: ActividadUpdateComponent,
  },
  {
    path: 'detail/:id',
    component: ActividadDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActividadRoutingModule {}
