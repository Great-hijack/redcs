import { Component } from '@angular/core';

/**
 * Generated class for the TestOneComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'test-one',
  templateUrl: 'test-one.html'
})
export class TestOneComponent {

  text: string;

  constructor() {
    console.log('Hello TestOneComponent Component');
    this.text = 'Hello World';
  }

}
