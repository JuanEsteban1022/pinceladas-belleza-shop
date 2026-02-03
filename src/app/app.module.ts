import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoginComponent } from './pages/login/login.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { registerLocaleData } from '@angular/common';
import localeEsCo from '@angular/common/locales/es-CO';
import { SkinTestFormComponent } from './pages/skin-test-modal/skin-test-modal.component';
import { DialogModule } from 'primeng/dialog';
import { CarouselModule } from 'primeng/carousel';
import { GalleriaModule } from 'primeng/galleria';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HeroCarouselComponent } from './pages/hero-carousel-component/hero-carousel.component';
import { BrandCarouselComponent } from './pages/brand-carousel/brand-carousel.component';
import { ProductoDetalleComponent } from './pages/producto-detalle/producto-detalle.component';
import { TarjetaRegaloComponent } from './pages/tarjeta-regalo/tarjeta-regalo.component';

registerLocaleData(localeEsCo);
@NgModule({
  declarations: [
    AppComponent,
    BrandCarouselComponent,
    CarritoComponent,
    HeaderComponent,
    HeroCarouselComponent,
    HomeComponent,
    LoginComponent,
    NosotrosComponent,
    ProductoDetalleComponent,
    ProductosComponent,
    SkinTestFormComponent,
    TarjetaRegaloComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CarouselModule,
    CommonModule,
    DialogModule,
    FormsModule,
    GalleriaModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    SlickCarouselModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { provide: LOCALE_ID, useValue: 'es-CO' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
