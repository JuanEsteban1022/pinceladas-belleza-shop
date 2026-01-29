import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from './productos.service';

export interface CartItem extends Omit<Producto, 'id'> {
  id: number; // obligatorio
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private cart = new BehaviorSubject<CartItem[]>([]);

  getCart() {
    return this.cart.asObservable();
  }

  getTotalItems(): number {
    return this.cart.value.reduce((sum, item) => sum + item.quantity, 0);
  }

  getTotalPrice(): number {
    return this.cart.value.reduce((sum, item) => sum + item.precio * item.quantity, 0);
  }

  add(producto: Producto): void {
    if (!producto.id) return; // no hacer nada si no hay id

    const current = this.cart.value;
    const existing = current.find(item => item.id === producto.id);
    if (existing) {
      existing.quantity++;
    } else {
      this.cart.next([...current, { ...producto, id: producto.id, quantity: 1 }]);
    }
  }

  remove(id: number): void {
    this.cart.next(this.cart.value.filter(item => item.id !== id));
  }

  clear(): void {
    this.cart.next([]);
  }
}