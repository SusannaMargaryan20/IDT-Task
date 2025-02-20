import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskedInfo',
  pure: false
})
export class MaskedInfoPipe implements PipeTransform {

  transform(value: number, maskedSuffix: string ='.', sliceCount: number = 0, showFull: boolean = false): unknown {
    if (!value) return ' - ';

    let newValue = value.toString();
    const hiddenPart = maskedSuffix.repeat(newValue.length - sliceCount);

    if(showFull) {
      return sliceCount > 0 ? `${newValue.slice(0, 4) } ${hiddenPart} ${newValue.slice(-4)}` : newValue
    } else {
      return maskedSuffix.split('').join(' ').repeat(newValue.length);
    }

  }

}
