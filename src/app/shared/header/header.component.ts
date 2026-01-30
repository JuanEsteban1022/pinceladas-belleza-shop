import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  totalItems = 0;
  private sub!: Subscription;
  isModalOpen: boolean = false;
  constructor(private cartService: CarritoService) { }

  ngOnInit(): void {
    this.sub = this.cartService.getCart().subscribe(() => {
      this.totalItems = this.cartService.getTotalItems();
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
}