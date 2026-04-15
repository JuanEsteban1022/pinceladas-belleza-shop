import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from '../../services/carrito.service';

interface TransactionResult {
  status: string;
  orderId: string;
  amount: number;
  transactionId: string;
  error?: string;
}

@Component({
  selector: 'app-resultado-transaccion',
  templateUrl: './resultado-transaccion.component.html',
  styleUrls: ['./resultado-transaccion.component.scss']
})
export class ResultadoTransaccionComponent implements OnInit {
  result: TransactionResult | null = null;
  loading = true;
  cartItems: CartItem[] = [];
  showProducts = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const status = params['status'] || params['bold-tx-status'] || 'unknown';
      const orderId = params['orderId'] || params['bold-order-id'] || '';
      const amount = params['amount'] || sessionStorage.getItem('bold_amount') || '0';
      const transactionId = params['bold-order-id']?.split('-')[1];

      this.result = {
        status,
        orderId,
        amount: parseFloat(amount),
        transactionId
      };

      // Leer productos del carrito desde sessionStorage
      const cartItemsStr = sessionStorage.getItem('bold_cart_items');
      this.cartItems = cartItemsStr ? JSON.parse(cartItemsStr) : [];

      // Limpiar sessionStorage después de usar los datos
      sessionStorage.removeItem('bold_amount');
      sessionStorage.removeItem('bold_cart_items');

      this.loading = false;
    });
  }

  get statusIcon(): string {
    switch (this.result?.status) {
      case 'approved': return 'check-circle';
      case 'rejected': return 'x-circle';
      case 'cancelled': return 'x-circle';
      default: return 'alert-circle';
    }
  }

  get statusColor(): string {
    switch (this.result?.status) {
      case 'approved': return '#28a745';
      case 'rejected':
      case 'cancelled': return '#dc3545';
      default: return '#6c757d';
    }
  }

  get statusText(): string {
    switch (this.result?.status) {
      case 'approved': return 'Pago Aprobado';
      case 'rejected': return 'Pago Rechazado';
      case 'cancelled': return 'Pago Cancelado';
      default: return 'Estado Desconocido';
    }
  }

  toggleProducts(): void {
    this.showProducts = !this.showProducts;
  }

  volver(): void {
    this.router.navigate(['/productos']);
  }
}
