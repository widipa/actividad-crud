import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado } from '../models/entities/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  actividadURL: string = 'http://localhost:8080/empleado/';

  constructor(private httpClient: HttpClient) {}

  public getAll(): Observable<Empleado[]> {
    return this.httpClient.get<Empleado[]>(this.actividadURL);
  }
}
