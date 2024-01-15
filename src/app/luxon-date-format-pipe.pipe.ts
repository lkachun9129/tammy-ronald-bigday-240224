import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'luxonDateFormat',
  standalone: true
})
export class LuxonDateFormatPipe implements PipeTransform {

  transform(value: DateTime | undefined, ...args: any[]): string {
    if (!value) {
      return '';
    }
    return value.isValid ? value.toFormat(args[0]) : '';
  }

}
