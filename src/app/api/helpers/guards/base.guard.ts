import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../auth-service.service';

@Injectable()
export abstract class BaseAuthGuard implements CanActivate {
    protected authService = inject(AuthService);
    protected activatedRoute = inject(ActivatedRoute);
    protected router = inject(Router);

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): any {
    return this.authService.checkLoginState()
      .pipe(
        map(_ => {
          if (this.authService.getUserTokenFromStorage()) {
            return this.checkSuccessResponse();
          } else {
            throw new Error();
          }
        }),
        catchError(_ => this.checkAuthFail()),
      );
  }

  protected navigateByRole() {
    if (this.authService.getUserTokenFromStorage() == null
    || this.authService.getUserTokenFromStorage()?.trim() == '') {
      this.authService.removeAuth();
      this.router.navigate(['/auth'], { relativeTo: this.activatedRoute });
    } else {
      this.router.navigate(['/admin'], { relativeTo: this.activatedRoute });
    }
  }

  protected checkRoleOrNavigate() {
    if (this.authService.getUserTokenFromStorage() != null) {
      return true;
    } else {
      this.navigateByRole();
      return of(false);
    }
  }

  protected abstract checkAuthFail(): any;

  protected abstract checkSuccessResponse(): any;
}