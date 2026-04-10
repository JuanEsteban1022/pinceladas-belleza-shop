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
      img: "/assets/brands/logo_atenea_pinceladas.webp",
      title: "ATENEA",
      viewInfo: true
    },
    {
      img: "/assets/brands/logo_montoc_pinceladas.webp",
      title: "MONTOC",
      viewInfo: true
    },
    {
      img: "/assets/brands/logo_purpure_pinceladas.avif",
      title: "PURPURE",
      viewInfo: true
    },
    {
      img: "/assets/brands/LOGO-GIRLY-NUEVO-BLANCO.png",
      title: "GIRLY",
      viewInfo: true
    }
  ];

  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 4,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];
}
