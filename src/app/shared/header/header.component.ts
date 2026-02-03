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

  listaDeFotosDeBelleza: string[] = [
    'https://via.placeholder.com/800x400?text=Foto+1',
    'https://via.placeholder.com/800x400?text=Foto+2',
    'https://via.placeholder.com/800x400?text=Foto+3'
  ];

  constructor(private cartService: CarritoService) { }

  ngOnInit(): void {
    this.sub = this.cartService.getTotalItemsObservable().subscribe(total => {
      this.totalItems = total;
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