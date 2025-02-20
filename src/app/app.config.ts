import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { requestHandlerInterceptor } from './api/helpers/interseptors/request-handler.interseptor';
import { errorHandlerInterceptor } from './api/helpers/interseptors/error-handler.interseptor';
import {ReactiveFormsModule} from "@angular/forms";
import { AuthGuard } from './api/helpers/guards/auth.guard';
import { GuestGuard } from './api/helpers/guards/guest.guard';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(ReactiveFormsModule),
    AuthGuard,
    GuestGuard,
    provideHttpClient(withInterceptors([requestHandlerInterceptor, errorHandlerInterceptor]))
  ]
};
