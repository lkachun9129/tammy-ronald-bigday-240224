import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { InMemoryScrollingFeature, InMemoryScrollingOptions, provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';

const scrollConfig: InMemoryScrollingOptions = {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
  };
  
const inMemoryScrollingFeature: InMemoryScrollingFeature = withInMemoryScrolling(scrollConfig);

export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimations(),
        provideRouter(routes, inMemoryScrollingFeature)
    ]
};
