import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vncurrency',
})
export class VncurrencyPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(intValue: number) {

    // let CHARS = intValue.split('');
    // let arrs = this.arraySplitIntoSubArray(CHARS, 3)
    // let STR = '';
    // arrs.reverse().forEach((arr: string[]) => {
    //   let substr = arr.join()
    // })
    return this.convertNumber2CurrenyFormat(intValue.toString(), 'đ');
  }

  // arraySplitIntoSubArray(arr: any[], count: number) {
  //   var newArray = [];
  //   while (arr.length > 0) {
  //     newArray.push(arr.splice(0, count));
  //   }
  //   return newArray;
  // }

  convertNumber2CurrenyFormat(VALUE: string, SYMBOL: string) {
    console.log(VALUE, SYMBOL);
    let _length = VALUE.length;
    let n = Math.floor(_length / 3);
    console.log(_length, n);
    for (let index = 0; index < n; index++) {
      let length = VALUE.length;
      VALUE = this.insertCharIntoString(VALUE, length - 3 * (index + 1) - index, ',');
      console.log(VALUE);
    }
    console.log(VALUE + ' ' + SYMBOL);
    return VALUE + ' ' + SYMBOL;
  }

  insertCharIntoString(STR: string, index: number, char: string) {
    console.log(index);
    if (index < 1 || index > STR.length) {
      return STR;
    } else {
      let _str1 = STR.slice(0, index);
      let _str2 = STR.slice(index);
      let _new_string = _str1 + char + _str2;
      // console.log(_str1, _str2, _new_string);
      return _new_string;
    }

  }
}
