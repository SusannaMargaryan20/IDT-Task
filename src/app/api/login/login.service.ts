import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.prod";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class LoginService {

    private http = inject(HttpClient);
    private apiUrl = environment.url;

    checkPhoneNumber(userName: string): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}checkPhone`, {username: userName});
    }
}