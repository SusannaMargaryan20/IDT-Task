import { inject, Injectable, signal } from "@angular/core";
import { BehaviorSubject, catchError, Observable, of, switchMap, tap, throwError } from "rxjs";
import { Router } from "@angular/router";
import { LoginReqModel } from "../login/req-model/login-req.model";
import { UserService } from "../user/user.service";
import { UserDetailResModel } from "../user/res/user-detail.res.model";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  private user = signal<UserDetailResModel | null>(null);
  private readonly storageUserKey: string = 'User';
  private readonly storageUserToken: string = 'User-Token';
  private loggedInState = new BehaviorSubject<boolean | undefined>(undefined);

  private router = inject(Router);
  private userService = inject(UserService)


  logout() {
    this.removeAuth();
    this.router.navigate(['/auth/login']);
  }


  public login(data: LoginReqModel): Observable<any> {
    return this.userService.postApiUsersessionLogin(data)
      .pipe(
        tap((res) => {
          if (res !== null && res.token) {
            this.saveUserTokenToStorage(res.token);
          } else {
            this.removeAuth();
            throw res;
          }
        }),
        switchMap(() => this.checkUserInfo()),
      );
  }

  public checkUserInfo(): Observable<any> {
    if (this.getUserTokenFromStorage()) {
      return this.userService.getUserData()
        .pipe(
          tap((user: any) => {
            this.saveUserStorage(user.result);
            this.setUser(user.result);
          }),
          catchError(_ => {
            this.removeAuth();
            return throwError(false);
          }),
        );
    } else {
      this.removeAuth();
      return throwError(false);
    }
  }


  public checkLoginState(): Observable<any> {
    if (this.loggedInState.getValue() !== undefined) {
      if (this.loggedInState.getValue()) {
        return of(this.user);
      }
      return throwError(this.user);
    }
    return this.checkUserInfo();
  }

  public setUser(user: any): void {
    this.user.set(user);
    this.loggedInState.next(true);
  }

  saveUserStorage(user: any): void {
    localStorage.setItem(this.storageUserKey, JSON.stringify(user));
  }


  saveUserTokenToStorage(value: any): void {
    localStorage.setItem(this.storageUserToken, JSON.stringify(value));
  }


  getUserTokenFromStorage(): any {
    const value = localStorage.getItem(this.storageUserToken);
    if (value) {
      return JSON.parse(value);
    }
  }


  public getUserFromStorage(): any {
    const user = localStorage.getItem(this.storageUserKey);
    if (user) {
      return JSON.parse(user);
    }
  }

  removeUserIdStorage(): void {
    localStorage.removeItem(this.storageUserKey);
  }


  removeUserTokenStorage(): void {
    localStorage.removeItem(this.storageUserToken);
  }


  public removeAuth(): void {
    this.user.set(null);
    this.removeUserIdStorage();
    this.removeUserTokenStorage();
    this.loggedInState.next(false);
  }

  public getUser(): any {
    return this.user();
  }

}