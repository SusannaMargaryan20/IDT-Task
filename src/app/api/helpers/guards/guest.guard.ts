import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import { BaseAuthGuard } from './base.guard';

@Injectable()
export class GuestGuard extends BaseAuthGuard {

  protected checkAuthFail(): Observable<boolean> {
    return of(true);
  }

  protected checkSuccessResponse(): boolean {
    this.navigateByRole();
    return false;
  }
}