import { Empleado } from '../entities/empleado';

export class CreateActividadDTO {
  private _nombre: string;
  private _fechaPlaneada: Date;
  private _empleado: Empleado;

  constructor(nombre: string, fechaPlaneada: Date, empleado: Empleado) {
    this._nombre = nombre;
    this._fechaPlaneada = fechaPlaneada;
    this._empleado = empleado;
  }

  public get nombre(): string {
    return this._nombre;
  }
  public set nombre(value: string) {
    this._nombre = value;
  }
  public get fechaPlaneada(): Date {
    return this._fechaPlaneada;
  }
  public set fechaPlaneada(value: Date) {
    this._fechaPlaneada = value;
  }
  public get empleado(): Empleado {
    return this._empleado;
  }
  public set empleado(value: Empleado) {
    this._empleado = value;
  }
}
