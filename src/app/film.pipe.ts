import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'film',
  standalone: true
})
export class FilmPipe{

  transform(value: any = []) {
    return Array.from(value)
  }

}
