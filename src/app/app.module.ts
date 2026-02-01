import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
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
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HeroCarouselComponent } from './pages/hero-carousel-component/hero-carousel.component';
import { BrandCarouselComponent } from './pages/brand-carousel/brand-carousel.component';

registerLocaleData(localeEsCo);
@NgModule({
  declarations: [
    AppComponent,
    CarritoComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    NosotrosComponent,
    ProductosComponent,
    SkinTestFormComponent,
    HeroCarouselComponent,
    BrandCarouselComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    DialogModule,
    CarouselModule,
    FormsModule,
    HttpClientModule,
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
