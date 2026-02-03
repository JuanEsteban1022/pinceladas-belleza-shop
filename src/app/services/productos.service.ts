import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:8080';

export interface Producto {
  id?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidadStock: number;
  categoriaId: number;
  proveedorId: number;
  urlDrive?: string;
  imagenes?: string[];
}

@Injectable({ providedIn: 'root' })
export class ProductosService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${BASE_URL}/productos`);
  }

  getById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${BASE_URL}/productos/${id}`);
  }

  create(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(`${BASE_URL}/productos/create`, producto);
  }

  update(producto: Partial<Producto> & { id: number }): Observable<Producto> {
    return this.http.patch<Producto>(`${BASE_URL}/productos/update`, producto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/productos/${id}`);
  }
}
