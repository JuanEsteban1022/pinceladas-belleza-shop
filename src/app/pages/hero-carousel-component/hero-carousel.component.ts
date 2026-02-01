import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hero-carousel',
  templateUrl: './hero-carousel.component.html',
  styleUrls: ['./hero-carousel.component.scss'],
})

export class HeroCarouselComponent {
  misFotos: any[] = [];

  slides = [
    {
      img: "/assets/carrusel.png",
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