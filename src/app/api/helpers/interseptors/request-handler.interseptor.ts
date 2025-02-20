import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { finalize, Observable } from "rxjs";
import { LoadingServiceService } from "../loading-service.service";
import { AuthService } from "../auth-service.service";

export const requestHandlerInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const loadingService = inject(LoadingServiceService);
  const authService = inject(AuthService);
  const authToken = authService.getUserTokenFromStorage();

  const authReq = authToken ? req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    }
  }) : req.clone({
    setHeaders: {
      'Content-Type': 'application/json'
    }
  });

  loadingService.show();

  return next(authReq).pipe(
    finalize(() => loadingService.hide())
  );
};