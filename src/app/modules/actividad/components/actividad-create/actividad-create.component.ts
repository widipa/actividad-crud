import { Component, OnInit } from '@angular/core';
import { ActividadService } from '../../services/actividad.service';
import { Actividad } from '../../models/entities/actividad';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado } from '../../models/entities/empleado';

@Component({
  selector: 'app-actividad-create',
  templateUrl: './actividad-create.component.html',
  styleUrls: ['./actividad-create.component.css'],
})
export class ActividadCreateComponent implements OnInit {
  actividadForm!: FormGroup;
  empleados: Empleado[] = [];

  constructor(
    private actividadService: ActividadService,
    private empleadoService: EmpleadoService,
    private toastrService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.actividadForm = this.initForm();
    this.getAllEmpleados();
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      fechaPlaneada: ['', [Validators.required]],
      fechaEjecucion: [],
      empleadoId: [],
    });
  }

  getAllEmpleados() {
    this.empleadoService.getAll().subscribe((data) => {
      this.empleados = data;
    });
  }

  onCreate(): void {
    console.log('crear actividad: ', this.actividadForm.value['nombre']);

    const actividad: Actividad = {
      id: 0,
      nombre: this.actividadForm.value['nombre'],
      estatus: 0,
      fechaPlaneada: this.actividadForm.value['fechaPlaneada'],
      fechaEjecucion: this.actividadForm.value['fechaEjecucion'],
      diasRetraso: 0,
      empleado: {
        id: this.actividadForm.value['empleadoId'],
        nombre: '',
      },
    };

    this.actividadService.create(actividad).subscribe(
      (data) => {
        this.toastrService.success('Actividad creada', 'OK', {
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
