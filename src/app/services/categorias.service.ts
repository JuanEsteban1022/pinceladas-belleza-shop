import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../env/enviroment';

export interface Categoria {
  id?: number;
  nombre: string;
  descripcion?: string;
}

@Injectable({ providedIn: 'root' })
export class CategoriasService {
  private readonly BASE_URL = environment.API_URL;
  
  constructor(private http: HttpClient) { }

  getAll(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.BASE_URL}/categorias`);
  }

  getById(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.BASE_URL}/categorias/${id}`);
  }

  create(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.BASE_URL}/categorias/create`, categoria);
  }

  update(categoria: Partial<Categoria> & { id: number }): Observable<Categoria> {
    return this.http.patch<Categoria>(`${this.BASE_URL}/categorias/update`, categoria);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/categorias/${id}`);
  }
}
