import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/actividades', pathMatch: 'full' },
  {
    path: 'actividades',
    loadChildren: () =>
      import('./modules/actividad/actividad.module').then(
        (m) => m.ActividadModule
      ),
  },
  { path: '**', redirectTo: '/actividades', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
