import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../env/enviroment';

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
  beneficios?: string | null;
}

export interface PaginatedProductosResponse {
  items: Producto[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

@Injectable({ providedIn: 'root' })
export class ProductosService {
  private readonly BASE_URL = environment.API_URL;
  constructor(private http: HttpClient) { }

  getAll(): Observable<PaginatedProductosResponse> {
    return this.http.get<PaginatedProductosResponse>(`${this.BASE_URL}/productos`);
  }

  getById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.BASE_URL}/productos/${id}`);
  }

  create(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(`${this.BASE_URL}/productos/create`, producto);
  }

  update(producto: Partial<Producto> & { id: number }): Observable<Producto> {
    return this.http.patch<Producto>(`${this.BASE_URL}/productos/update`, producto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/productos/${id}`);
  }
}
