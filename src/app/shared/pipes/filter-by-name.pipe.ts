import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByName'
})
export class FilterByNamePipe implements PipeTransform {
  transform(list: any[], name: any): any {
    const splittedName = name ? name.split(/[\.\-_,; ]/) : [];
    return splittedName.length > 0
      ? list.filter((item: any) =>
          splittedName.some(
            (nameString: string) =>
              item.name.toLowerCase().indexOf(nameString.toLowerCase()) !== -1
          )
        )
      : list;
  }
}
