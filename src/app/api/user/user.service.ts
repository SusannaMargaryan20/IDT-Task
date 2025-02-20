import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.prod";
import { Observable } from "rxjs";
import { LoginReqModel } from "../login/req-model/login-req.model";

@Injectable({
    providedIn: "root"
})
export class UserService {

    private http = inject(HttpClient);
    private apiUrl = environment.url;

    getUserData(): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}getUserData`);
    }

    getTransactions(): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}getTransactions`);
    }

    getBankAccounts(): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}getBankAccounts`);
    }

    getAdditionalInfo(): Observable<any> {
       return this.http.get<any>(`${this.apiUrl}getAdditionalData`)
    }

    postApiUsersessionLogin(userModel: LoginReqModel): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}login`, userModel);
    }
}