import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Actividad } from '../../models/entities/actividad';
import { ActividadService } from '../../services/actividad.service';

@Component({
  selector: 'app-actividad-list',
  templateUrl: './actividad-list.component.html',
  styleUrls: ['./actividad-list.component.css'],
})
export class ActividadListComponent implements OnInit {
  actividades: Actividad[] = [];

  constructor(
    private actividadService: ActividadService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.actividadService.getAll().subscribe(
      (data) => {
        this.actividades = data;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  eliminar(id: number) {
    this.actividadService.delete(id).subscribe(
      (data) => {
        this.toastrService.success('Actividad eliminada', 'OK', {
          timeOut: 5000,
          positionClass: 'toast-top-center',
        });
        this.getAll();
      },
      (err) => {
        if (err.error.mensaje) {
          this.toastrService.error('Error', err.error.mensaje, {
            timeOut: 5000,
            positionClass: 'toast-top-center',
          });
        }
      }
    );
  }
}
