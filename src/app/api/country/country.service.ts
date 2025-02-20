import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.prod";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class CountryService {

    private http = inject(HttpClient);
    private apiUrl = environment.url;

    getCountryCodes(): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}GetCountryCode`);
    }
}