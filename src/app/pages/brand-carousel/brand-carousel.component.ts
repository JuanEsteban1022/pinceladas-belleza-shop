import { Component } from '@angular/core';

@Component({
  selector: 'app-brand-carousel',
  templateUrl: './brand-carousel.component.html',
  styleUrls: ['./brand-carousel.component.scss']
})
export class BrandCarouselComponent {
  misFotos: any[] = [];

  slides = [
    {
      img: "/assets/brands/LOGO-GIRLY-NUEVO-BLANCO.png",
      title: "PINCELADAS DE BELLEZA",
      subtitle: "Glow with Elegance",
      viewInfo: true
    },
    {
      img: "/assets/carrusel2.jpeg",
      title: "PINCELADAS DE BELLEZA",
      subtitle: "Glow with Elegance",
      viewInfo: true
    },
    {
      img: "/assets/carrusel3.png",
      title: "PINCELADAS DE BELLEZA",
      subtitle: "Glow with Elegance",
      viewInfo: false
    }
  ];

  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];
}
