import { Component } from '@angular/core';

/**
 * Generated class for the MyAccountManageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'my-account-manage',
  templateUrl: 'my-account-manage.html'
})
export class MyAccountManageComponent {

  text: string;
  signIn = {
    email: '',
    password: ''
  }
  action: string = 'sign-in';
  constructor() {
    console.log('Hello MyAccountManageComponent Component');
    this.text = 'Hello World';
  }

}
