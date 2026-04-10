import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { CarritoService, CartItem } from '../../services/carrito.service';
import { environment } from '../../../env/enviroment';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent {
  cart$ = this.cartService.getCart();
  subtotal$ = this.cartService.getCart().pipe(
    map(() => this.cartService.getTotalPrice())
  );
  totalPrice$ = this.cartService.getCart().pipe(
    map(() => this.cartService.getTotalPrice() + this.valorEnvio)
  );
  valorEnvio: number = 9000;

  boldApiKey = environment.BOLD_API_KEY;
  boldCurrency = 'COP';
  boldRedirectionUrl = `${location.origin}/pagos/resultado`;
  boldDescription = 'Compra Pinceladas de Belleza';

  boldOrderId: string | null = null;
  boldAmount: number | null = null;
  boldIntegritySignature: string | null = 'pmX4VLWctK_PoCq2NOMNXrWH233qSgOTrf_eGP_Y1LI';

  constructor(
    private cartService: CarritoService,
    private router: Router
  ) { }

  prepararPago(total: number | null | undefined): void {
    if (!total || total <= 0) return;

    this.boldAmount = Math.round(total);

    // Placeholder: esto debe venir de tu backend (orden real + firma SHA256).
    // Lo dejamos aquí para que el botón quede implementado y tú conectes el backend después.
    this.boldOrderId = `ORD-${Date.now()}`;
    this.boldIntegritySignature = 'pmX4VLWctK_PoCq2NOMNXrWH233qSgOTrf_eGP_Y1LI';

    this.openEmbeddedBoldCheckout();
  }

  private openEmbeddedBoldCheckout(): void {
    if (!this.boldAmount || !this.boldOrderId) return;
    if (!this.boldIntegritySignature) {
      console.error('[Bold] Falta integritySignature. Debe venir desde tu backend.');
      return;
    }

    const open = () => {
      if (typeof (window as any).BoldCheckout === 'undefined') {
        console.error('[Bold] BoldCheckout no disponible');
        return;
      }

      const boldCheckout = new (window as any).BoldCheckout({
        orderId: this.boldOrderId,
        currency: this.boldCurrency,
        amount: String(this.boldAmount),
        apiKey: this.boldApiKey,
        integritySignature: this.boldIntegritySignature,
        description: this.boldDescription,
        redirectionUrl: this.boldRedirectionUrl,
        renderMode: 'embedded'
      });

      boldCheckout.open();
    };

    if (typeof (window as any).BoldCheckout === 'undefined') {
      const lib = document.createElement('script');
      lib.src = 'https://checkout.bold.co/library/boldPaymentButton.js';
      lib.onload = () => open();
      lib.onerror = () => console.error('[Bold] Error cargando la librería de Bold');
      document.head.appendChild(lib);
      return;
    }

    open();
  }

  remove(id: number): void {
    this.cartService.remove(id);
  }

  updateQuantity(id: number, quantity: number): void {
    if (quantity <= 0) {
      this.cartService.remove(id);
    } else {
      this.cartService.updateQuantity(id, quantity);
    }
  }

  irAProductos(): void {
    this.router.navigate(['/productos']);
  }

  clear(): void {
    this.cartService.clear();
  }

  getImageUrl(item: CartItem): string {
    if (!item.urlDrive) {
      return 'assets/logo-pinceladas.png';
    }

    // Si es URL de Cloudinary, retornarla directamente
    if (item.urlDrive.includes('cloudinary.com')) {
      // Si hay múltiples imágenes separadas por comas, tomar la primera
      const urls = item.urlDrive.split(',');
      return urls[0].trim();
    }

    // Para cualquier otro caso, retornar la URL tal cual
    return item.urlDrive;
  }
}