import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Actividad } from '../../models/entities/actividad';
import { Empleado } from '../../models/entities/empleado';
import { ActividadService } from '../../services/actividad.service';
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-actividad-update',
  templateUrl: './actividad-update.component.html',
  styleUrls: ['./actividad-update.component.css'],
})
export class ActividadUpdateComponent implements OnInit {
  actividadForm!: FormGroup;
  empleados: Empleado[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private actividadService: ActividadService,
    private empleadoService: EmpleadoService,
    private toastrService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.actividadForm = this.initForm();
    this.loadActividad();
    //this.loadForm();
    this.getAllEmpleados();
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      id: [{ value: 0, disabled: true }],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      fechaPlaneada: ['', [Validators.required]],
      fechaEjecucion: [],
      estatus: ['', [Validators.required]],
      empleadoId: [],
    });
  }

  loadActividad() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.actividadService.getById(id).subscribe(
      (data) => {
        this.actividadForm.controls['id'].setValue(data.id);
        this.actividadForm.controls['nombre'].setValue(data.nombre);
        this.actividadForm.controls['fechaPlaneada'].setValue(
          data.fechaPlaneada
        );
        this.actividadForm.controls['fechaEjecucion'].setValue(
          data.fechaEjecucion
        );
        this.actividadForm.controls['estatus'].setValue(data.estatus);
        this.actividadForm.controls['empleadoId'].setValue(data.empleado.id);
      },
      (err) => {
        if (err.error.mensaje) {
          this.toastrService.error('Error', err.error.mensaje, {
            timeOut: 5000,
            positionClass: 'toast-top-center',
          });
          this.router.navigate(['/actividades/']);
        }
      }
    );
  }

  loadForm() {
    /*     return this.formBuilder.group({
      id: [{ value: this.actividad.id, disabled: true }],
      nombre: [
        this.actividad.nombre,
        [Validators.required, Validators.minLength(3)],
      ],
      estatus: [this.actividad.estatus, [Validators.required]],
      fechaPlaneada: [this.actividad.fechaPlaneada, [Validators.required]],
      fechaEjecucion: [this.actividad.fechaEjecucion],
      empleadoId: [this.actividad.empleado.id],
    }); */
  }

  getAllEmpleados() {
    this.empleadoService.getAll().subscribe((data) => {
      this.empleados = data;
    });
  }

  onUpdate(): void {
    const _id = this.activatedRoute.snapshot.params['id'];

    if (this.actividadForm.value['estatus'] == 'TERMINADO') {
      this.actividadForm.controls['fechaEjecucion'].setValue(new Date());
    }

    const actividad: Actividad = {
      id: _id,
      nombre: this.actividadForm.value['nombre'],
      estatus: this.actividadForm.value['estatus'],
      fechaPlaneada: this.actividadForm.value['fechaPlaneada'],
      fechaEjecucion: this.actividadForm.value['fechaEjecucion'],
      diasRetraso: 0,
      empleado: {
        id: this.actividadForm.value['empleadoId'],
        nombre: '',
      },
    };

    this.actividadService.update(_id, actividad).subscribe(
      (data) => {
        this.toastrService.success('Actividad actualizada', 'OK', {
          timeOut: 5000,
          positionClass: 'toast-top-center',
        });
        this.router.navigate(['/actividades/']);
      },
      (err) => {
        if (err.error.mensaje) {
          this.toastrService.error('Error', err.error.mensaje, {
            timeOut: 5000,
            positionClass: 'toast-top-center',
          });
          this.router.navigate(['/actividades/']);
        }
      }
    );
  }
}
