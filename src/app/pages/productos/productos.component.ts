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
  productosFiltrados: (Producto & { cantidad: number })[] = [];
  categorias: any[] = [];
  categoriaSeleccionada: number | null = null;
  terminoBusqueda: string = '';
  loading = false;
  error: string | null = null;

  constructor(
    private productosService: ProductosService,
    private cartService: CarritoService
  ) { }

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarCategorias();
  }

  private cargarProductos(): void {
    this.loading = true;
    this.error = null;

    this.productosService.getAll().subscribe({
      next: (response) => {
        this.productos = response.items.map(p => ({ ...p, cantidad: 1 }));
        this.filtrarProductos();
        this.loading = false;
      },
      error: () => {
        this.error = 'Ocurrió un error al cargar los productos.';
        this.loading = false;
      }
    });
  }

  private cargarCategorias(): void {
    this.productosService.getAllCategorias().subscribe({
      next: (response) => {

        if (response && response.items) {
          this.categorias = response.items;
        } else if (Array.isArray(response)) {
          this.categorias = response;
        } else {
          this.categorias = [
            { id: 1, nombre: 'Cuidado corporal' },
            { id: 2, nombre: 'Skincare coreano' },
            { id: 3, nombre: 'Maquillaje' },
            { id: 4, nombre: 'Accesorios' },
            { id: 5, nombre: 'Cuidado Facial' },
            { id: 6, nombre: 'Obsequio' }
          ];
        }
      },
      error: (error) => {
        this.categorias = [
          { id: 1, nombre: 'Cuidado corporal' },
          { id: 2, nombre: 'Skincare coreano' },
          { id: 3, nombre: 'Maquillaje' },
          { id: 4, nombre: 'Accesorios' },
          { id: 5, nombre: 'Cuidado Facial' },
          { id: 6, nombre: 'Obsequio' }
        ];
      }
    });
  }

  filtrarProductos(): void {
    let productosFiltrados = [...this.productos];

    // Filtrar por categoría
    if (this.categoriaSeleccionada !== null) {
      productosFiltrados = productosFiltrados.filter(
        producto => producto.categoriaId === this.categoriaSeleccionada
      );
    }

    // Filtrar por término de búsqueda
    if (this.terminoBusqueda.trim() !== '') {
      const termino = this.terminoBusqueda.toLowerCase().trim();
      productosFiltrados = productosFiltrados.filter(
        producto => producto.nombre.toLowerCase().includes(termino)
      );
    }

    this.productosFiltrados = productosFiltrados;
  }

  seleccionarCategoria(categoriaId: number | null): void {
    this.categoriaSeleccionada = categoriaId;
    this.filtrarProductos();
  }

  onCategoriaChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    this.seleccionarCategoria(value ? parseInt(value, 10) : null);
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