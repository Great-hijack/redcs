import { Component } from '@angular/core';

/**
 * Generated class for the MyCompanyInfoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'my-company-info',
  templateUrl: 'my-company-info.html'
})
export class MyCompanyInfoComponent {

  text: string;

  constructor() {
    console.log('Hello MyCompanyInfoComponent Component');
    this.text = 'Hello World';
  }

}
