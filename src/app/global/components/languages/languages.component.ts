import { Component, computed, inject, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { SettingsService } from '../../../api/helpers/settings-service.service';
import { LanguageEnum } from '../../../api/helpers/enums/language.enum';

@Component({
  selector: 'app-languages',
  imports: [NgFor],
  templateUrl: './languages.component.html',
  styleUrl: './languages.component.scss'
})
export class LanguagesComponent {
  private settingsService = inject(SettingsService);

  languages = signal([
    { id: LanguageEnum.English, name: 'EN' },
    { id: LanguageEnum.Russian, name: 'РУ' },
    { id: LanguageEnum.Armenian, name: 'ՀԱՅ' },
  ]);

  filteredLanguages = computed(() =>
    this.languages().filter((lang) => lang.id !== this.settingsService.language())
  );

  changeLanguage(lang: { id: LanguageEnum, name: string }) {
    this.settingsService.setLanguage(lang.id);
  }
}
