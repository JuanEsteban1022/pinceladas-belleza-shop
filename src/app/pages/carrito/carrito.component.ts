import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { CarritoService, CartItem } from '../../services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent {
  cart$ = this.cartService.getCart();
  totalPrice$ = this.cartService.getCart().pipe(
    map(() => this.cartService.getTotalPrice())
  );

  constructor(private cartService: CarritoService) { }

  remove(id: number): void {
    this.cartService.remove(id);
  }

  clear(): void {
    this.cartService.clear();
  }

  getImageUrl(item: CartItem): string {
    if (!item.urlDrive) {
      return 'assets/logo-pinceladas.png';
    }

    // Usar el mismo método que funcionaba en React
    let match = item.urlDrive.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (!match) match = item.urlDrive.match(/id=([a-zA-Z0-9_-]+)/);

    return match?.[1] ? `https://lh3.googleusercontent.com/d/${match[1]}` : 'assets/logo-pinceladas.png';
  }
}