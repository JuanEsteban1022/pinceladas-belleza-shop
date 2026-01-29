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

    const firstUrl = item.urlDrive.split(',')[0].trim();

    if (firstUrl.includes('drive.google.com')) {
      const match =
        firstUrl.match(/\/d\/([^/]+)/) ||
        firstUrl.match(/id=([^&]+)/);

      const id = match && match[1];
      if (id) {
        return `https://drive.google.com/uc?export=view&id=${id}`;
      }
    }

    return firstUrl;
  }
}