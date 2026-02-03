import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService, Producto } from '../../services/productos.service';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.scss']
})
export class ProductoDetalleComponent implements OnInit {
  producto: Producto | null = null;
  loading = false;
  error = '';
  cantidad = 1;

  constructor(
    private route: ActivatedRoute,
    private productosService: ProductosService,
    private carritoService: CarritoService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.productosService.getById(Number(id)).subscribe({
        next: (producto: Producto) => {
          this.producto = producto;
          this.loading = false;
        },
        error: (err: any) => {
          this.error = 'Error al cargar el producto';
          this.loading = false;
        }
      });
    }
  }

  getImagenes(): string[] {
    if (!this.producto) return [];

    // Si hay imágenes en el array, usarlas
    if (this.producto.imagenes && this.producto.imagenes.length > 0) {
      return this.producto.imagenes.map(img => this.procesarUrlImagen(img));
    }

    // Si no hay array de imágenes pero hay urlDrive, procesar urlDrive
    if (this.producto.urlDrive) {
      return this.producto.urlDrive.split(',').map(url => this.procesarUrlImagen(url.trim()));
    }

    // Si no hay imágenes ni urlDrive, devolver imagen por defecto
    return ['assets/img_no_found.png'];
  }

  procesarUrlImagen(url: string): string {
    if (!url) return 'assets/img_no_found.png';

    // Si ya es una URL directa de Google Drive, retornarla
    if (url.includes('googleusercontent.com')) {
      return url;
    }

    // Procesar URL de Google Drive
    let match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (!match) match = url.match(/id=([a-zA-Z0-9_-]+)/);

    return match?.[1] ? `https://lh3.googleusercontent.com/d/${match[1]}` : 'assets/img_no_found.png';
  }

  addToCart(producto: Producto): void {
    if (!producto || !producto.id) {
      console.error('Producto no válido');
      return;
    }

    // Validar que la cantidad no exceda el stock
    if (this.cantidad > producto.cantidadStock) {
      console.error('Cantidad solicitada excede el stock disponible');
      return;
    }

    // Agregar al carrito con la cantidad especificada
    this.carritoService.addWithQuantity(producto, this.cantidad);

    // Opcional: Mostrar mensaje de éxito
    console.log(`Se agregaron ${this.cantidad} unidades de ${producto.nombre} al carrito`);

    // Opcional: Resetear cantidad a 1 después de agregar
    this.cantidad = 1;
  }
}
