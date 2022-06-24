import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';

import { ActividadListComponent } from './components/actividad-list/actividad-list.component';
import { ActividadDetailComponent } from './components/actividad-detail/actividad-detail.component';
import { ActividadCreateComponent } from './components/actividad-create/actividad-create.component';
import { ActividadUpdateComponent } from './components/actividad-update/actividad-update.component';
import { ActividadRoutingModule } from './actividad-routing.module';

@NgModule({
  declarations: [
    ActividadListComponent,
    ActividadDetailComponent,
    ActividadCreateComponent,
    ActividadUpdateComponent,
  ],
  imports: [
    CommonModule,
    ActividadRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-CO' }],
})
export class ActividadModule {}
