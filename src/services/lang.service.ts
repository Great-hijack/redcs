import { Injectable } from '@angular/core';

@Injectable()


export class LangService {
     index: any = '0';
     setIndex(index: number) {
          this.index = index;
     }

}