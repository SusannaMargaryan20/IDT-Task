import { Pipe, PipeTransform, inject, effect, signal } from '@angular/core';
import { SettingsService } from '../../api/helpers/settings-service.service';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false
})
export class TranslatePipe implements PipeTransform {
  private settingsService = inject(SettingsService);

  private translation: any = this.settingsService.translation;


  transform(value: string, ...data: any[]): string {
    const translations = this.translation();
    let translation: string = translations[value] || value;

    for (let i = 0; i < data.length; i++) {
      translation = translation.replace(`{${i}}`, data[i]);
    }

    return translation;
  }
}
