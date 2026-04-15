import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { CarritoService, CartItem } from '../../services/carrito.service';
import { environment } from '../../../env/enviroment';
import * as CryptoJS from 'crypto-js';

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
  boldSecretKey = environment.BOLD_SECRET_KEY;
  boldCurrency = 'COP';
  boldRedirectionUrl = `${location.origin}/pagos/resultado`;
  boldDescription = 'Compra Pinceladas de Belleza';

  boldOrderId: string = '';
  boldAmount: number = 0;
  boldIntegritySignature: string = '';

  constructor(
    private cartService: CarritoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  prepararPago(total: number | null | undefined): void {
    if (!total || total <= 0) return;

    this.boldAmount = Math.round(total);
    this.boldOrderId = `ORD-${Date.now()}`;

    // Guardar monto y productos para la página de resultado (Bold no siempre envía amount)
    sessionStorage.setItem('bold_amount', String(this.boldAmount));
    this.cartService.getCart().subscribe(items => {
      sessionStorage.setItem('bold_cart_items', JSON.stringify(items));
    });

    this.boldIntegritySignature = CryptoJS.SHA256(
      this.boldOrderId +
      this.boldAmount +
      this.boldCurrency +
      this.boldSecretKey
    ).toString();

    this.openEmbeddedBoldCheckout();
  }

  private openEmbeddedBoldCheckout(): void {
    if (!this.boldAmount || !this.boldOrderId) return;

    if (!this.boldIntegritySignature) {
      console.error('[Bold] Falta integritySignature.');
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
        integritySignature: this.boldIntegritySignature, // ✅ USAR LA CORRECTA
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

    if (item.urlDrive.includes('cloudinary.com')) {
      const urls = item.urlDrive.split(',');
      return urls[0].trim();
    }

    return item.urlDrive;
  }
}