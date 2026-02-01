import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import * as $ from 'jquery';
(window as any).jQuery = $;
(window as any).$ = $;

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
