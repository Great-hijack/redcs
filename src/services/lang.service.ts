import { Injectable } from '@angular/core';

@Injectable()


export class LangService {
     LANGUAGES: string[] = ['EN', 'VI'];
     index: any = '0';
     LANG: string = 'EN';

     setLanguage(index: number, LANG: string) {
          this.index = index;
          this.LANG = LANG;
     }

     pricesUpdate: any = {
          A1: { EN: 'Above knee prosthese', VI: '' },
          A2: { EN: 'Below knee prosthese', VI: '' },
          A3: { EN: 'Below knee prosthese with high corset', VI: '' },
          A4: { EN: 'Trans-Tibal, short stump with hight', VI: '' },
          A5: { EN: 'Knee disarticulaation prosthese', VI: '' },
          A6: { EN: 'KMC', VI: '' },
          A7: { EN: 'Mang nhua cang', VI: '' },
          B1: { EN: 'Above knee prosthese', VI: '' },
          B2: { EN: 'Below knee prosthese', VI: '' },
          B3: { EN: 'Below knee prosthese with high corset', VI: '' },
          B4: { EN: 'Trans-Tibal, short stump with hight', VI: '' },
          B5: { EN: 'Knee disarticulaation prosthese', VI: '' },
          B6: { EN: 'KMC', VI: '' },
          B7: { EN: 'Mang nhua cang', VI: '' },
          C1: { EN: 'Above knee prosthese', VI: '' },
          C2: { EN: 'Below knee prosthese', VI: '' },
          C3: { EN: 'Below knee prosthese with high corset', VI: '' },
     }





}