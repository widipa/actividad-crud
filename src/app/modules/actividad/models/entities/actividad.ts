import { Empleado } from './empleado';

export interface Actividad {
  id: number;
  nombre: string;
  estatus: number;
  fechaPlaneada: Date;
  fechaEjecucion: Date;
  diasRetraso: number;
  empleado: Empleado;
}
