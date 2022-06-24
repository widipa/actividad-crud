import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actividad } from '../models/entities/actividad';

@Injectable({
  providedIn: 'root',
})
export class ActividadService {
  actividadURL: string = 'http://localhost:8080/actividad/';

  constructor(private httpClient: HttpClient) {}

  public getAll(): Observable<Actividad[]> {
    return this.httpClient.get<Actividad[]>(this.actividadURL);
  }

  public getById(id: number): Observable<Actividad> {
    return this.httpClient.get<Actividad>(this.actividadURL + `${id}`);
  }

  public create(actividad: Actividad): Observable<any> {
    return this.httpClient.post<any>(this.actividadURL, actividad);
  }
  public update(id: number, actividad: Actividad): Observable<any> {
    return this.httpClient.put<any>(this.actividadURL + `${id}`, actividad);
  }
  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.actividadURL + `${id}`);
  }
}
