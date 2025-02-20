import { Component, computed, inject, signal } from '@angular/core';
import { TranslatePipe } from '../../../global/pipes/translations.pipe';
import { LanguageEnum } from '../../../api/helpers/enums/language.enum';
import { NgFor, NgIf } from '@angular/common';
import { SettingsService } from '../../../api/helpers/settings-service.service';
import { CountryService } from '../../../api/country/country.service';
import { CountryCodeResModel } from '../../../api/country/res-model/countryCodes.res.model';
import { ReactiveFormsModule, FormBuilder, Validators } from "@angular/forms";
import { LoginService } from '../../../api/login/login.service';
import { LanguagesComponent } from "../../../global/components/languages/languages.component";
import { AuthService } from '../../../api/helpers/auth-service.service';
import { LoginReqModel } from '../../../api/login/req-model/login-req.model';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-page',
  imports: [TranslatePipe, NgFor, NgIf, ReactiveFormsModule, LanguagesComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  private settingsService = inject(SettingsService);
  private countryService = inject(CountryService);
  private loginService = inject(LoginService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private formGroup = inject(FormBuilder);

  countryCodes = signal<CountryCodeResModel[]>([]);
  dropdownOpen = signal<boolean>(false);
  stepForLogin = signal<number>(1);
  submitted = signal<boolean>(false);
  inProgress = signal<boolean>(false);
  isPassVisible = signal<boolean>(false)

  selectedCountry = signal<CountryCodeResModel | null>(null);

  languages = signal([
    { id: LanguageEnum.English, name: 'EN' },
    { id: LanguageEnum.Russian, name: 'РУ' },
    { id: LanguageEnum.Armenian, name: 'ՀԱՅ' },
  ]);

  filteredLanguages = computed(() =>
    this.languages().filter((lang) => lang.id !== this.settingsService.language())
  );


  loginForm = this.formGroup.group({
    userName: [null, [Validators.required]],
    password: [null, [Validators.required]]
  })


  get f() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.loadCountryCodes();
  }

  toggleDropdown(): void {
    this.dropdownOpen.set(!this.dropdownOpen());
  }

  onSelect(country: CountryCodeResModel) {
    this.selectedCountry.set(country);
    this.loginForm.patchValue({
      userName: null
    });
    this.stepForLogin.set(1);
    this.toggleDropdown();
  }

  async loadCountryCodes() {
    const countryCodes = await this.countryService.getCountryCodes().toPromise();
    if (countryCodes && countryCodes.message === "Success") {
      this.countryCodes.set(countryCodes.result as CountryCodeResModel[]);
      this.selectedCountry.set(this.countryCodes().find((el: CountryCodeResModel) => el.countryCode == 374) ?? this.countryCodes()[0])
    }
  }

  changeLanguage(lang: { id: LanguageEnum, name: string }) {
    this.settingsService.setLanguage(lang.id);
  }

  async checkPhoneNumber() {
    const userPhoneNumber = (this.loginForm.controls['userName'].value as any);
    const userName: string = '' + this.selectedCountry()!.countryCode + userPhoneNumber;

    const checkValidaion = await this.loginService.checkPhoneNumber(userName).toPromise();
    if (checkValidaion && checkValidaion.message === 'Success') {
      this.stepForLogin.set(2);
      this.submitted.set(false);
      this.inProgress.set(false);
    }
  }

  async login() {
    const reqModel: LoginReqModel = this.loginForm.value as any;
    const userPhoneNumber = (this.loginForm.controls['userName'].value as any);
    reqModel.username = '' + this.selectedCountry()!.countryCode + userPhoneNumber;
    const data = await this.authService.login(reqModel).pipe(finalize(() => this.inProgress.set(false))).toPromise();
    if(data) {
      this.router.navigate(['/admin']);
    }
  }

  async saveChanges() {

    this.submitted.set(true);
    this.inProgress.set(true);

    if (!!!this.loginForm.controls['userName'].value && this.stepForLogin() == 1) {
      this.inProgress.set(false);
      return;
    }

    if (this.stepForLogin() == 2 && this.loginForm.invalid) {
      this.inProgress.set(false);
      return;
    }

    if (this.stepForLogin() === 1) {
      await this.checkPhoneNumber();
    } else {
      await this.login();
    }
  }
}
