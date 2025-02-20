import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import { BaseAuthGuard } from './base.guard';

@Injectable()
export class AuthGuard extends BaseAuthGuard {

  protected checkAuthFail(): Observable<boolean> {
    this.router.navigate([ '/auth/login' ]);
    return of(true);
  }

  protected checkSuccessResponse(): Observable<boolean> | boolean {
    return this.checkRoleOrNavigate();
  }
}