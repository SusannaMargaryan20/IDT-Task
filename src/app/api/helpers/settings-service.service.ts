import { Injectable, signal, computed, effect } from '@angular/core';
import EN from '../../../assets/translations/en';
import RU from '../../../assets/translations/ru';
import HY from '../../../assets/translations/am';
import { LanguageEnum } from './enums/language.enum';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private readonly storageLanguageKey = 'language';

  language = signal<LanguageEnum>(this.getStoredLanguage());

  translation = computed(() => {
    switch (this.language()) {
      case LanguageEnum.English:
        return EN;
      case LanguageEnum.Russian:
        return RU;
      case LanguageEnum.Armenian:
        return HY;
      default:
        return EN;
    }
  });

  constructor() {
    effect(() => {
      localStorage.setItem(this.storageLanguageKey, JSON.stringify(this.language()));
    });
  }

  private getStoredLanguage(): LanguageEnum {
    const storedLanguage = localStorage.getItem(this.storageLanguageKey);
    return storedLanguage ? (JSON.parse(storedLanguage) as LanguageEnum) : LanguageEnum.English;
  }

  public setLanguage(language: LanguageEnum): void {
    this.language.set(language); 
  }
}
