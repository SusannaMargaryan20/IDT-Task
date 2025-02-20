import { Component, computed, inject, signal } from '@angular/core';
import { LanguagesComponent } from "../languages/languages.component";
import { NgIf } from '@angular/common';
import { AuthService } from '../../../api/helpers/auth-service.service';
import { TranslatePipe } from '../../pipes/translations.pipe';
import { UserDetailResModel } from '../../../api/user/res/user-detail.res.model';

@Component({
  selector: 'app-header',
  imports: [LanguagesComponent, NgIf, TranslatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  private authService = inject(AuthService);
  dropdownOpen = signal<boolean>(false);

  userFullName = computed<string>(() => this.authService.getUser()?.firstName + ' ' + this.authService.getUser()?.lastName);
  userInfo = signal<UserDetailResModel>(this.authService.getUser());

  logOut() {
    this.authService.logout();
  }

  toggleDropDown(): void {
    this.dropdownOpen.set(!this.dropdownOpen());
  }

  closeDropDown(): void {
    this.dropdownOpen.set(false);
  }
}
