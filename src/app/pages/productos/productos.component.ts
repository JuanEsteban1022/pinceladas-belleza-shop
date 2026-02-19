import { Component, OnInit } from '@angular/core';
import { ProductosService, Producto } from '../../services/productos.service';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  productos: (Producto & { cantidad: number })[] = [];
  loading = false;
  error: string | null = null;

  constructor(private productosService: ProductosService, private cartService: CarritoService) { }

  ngOnInit(): void {
    this.cargarProductos();
  }

  private cargarProductos(): void {
    this.loading = true;
    this.error = null;

    this.productosService.getAll().subscribe({
      next: (response) => {
        this.productos = response.items.map(p => ({ ...p, cantidad: 1 }));
        this.loading = false;
      },
      error: () => {
        this.error = 'Ocurrió un error al cargar los productos.';
        this.loading = false;
      }
    });
  }

  getImageUrl(p: Producto): string {
    if (!p.urlDrive) {
      return 'assets/img_no_found.png';
    }

    // Si hay varias URLs separadas por coma, usa la primera
    const firstUrl = p.urlDrive.split(',')[0].trim();

    if (!firstUrl) {
      return 'assets/img_no_found.png';
    }

    // Si ya es una URL directa de Google (googleusercontent), retornarla tal cual
    if (firstUrl.includes('googleusercontent.com')) {
      return firstUrl;
    }

    // Si es un link de Google Drive clásico, convertirlo a enlace directo
    let match = firstUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (!match) match = firstUrl.match(/id=([a-zA-Z0-9_-]+)/);

    return match?.[1]
      ? `https://lh3.googleusercontent.com/d/${match[1]}`
      : firstUrl || 'assets/img_no_found.png';
  }

  // getImageUrl(p: Producto): string {
  //   if (!p.urlDrive) {
  //     return 'assets/logo-pinceladas.png';
  //   }

  //   // Si hay varias URLs separadas por coma, usa la primera
  //   const firstUrl = p.urlDrive.split(',')[0].trim();

  //   // Si es un link de Google Drive, lo convertimos a enlace directo
  //   if (firstUrl.includes('drive.google.com')) {
  //     // Extrae el ID de la forma /d/ID/view o ?id=ID
  //     const match =
  //       firstUrl.match(/\/d\/([^/]+)/) ||
  //       firstUrl.match(/id=([^&]+)/);

  //     const id = match && match[1];
  //     if (id) {
  //       return `https://drive.google.com/uc?export=view&id=${id}`;
  //     }
  //   }

  // En cualquier otro caso, usamos la URL tal cual
  //   return firstUrl;
  // }

  addToCart(producto: Producto & { cantidad: number }): void {
    for (let i = 0; i < producto.cantidad; i++) {
      this.cartService.add(producto);
    }
  }
}