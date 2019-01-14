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

}