import { Component } from '@angular/core';

/**
 * Generated class for the MyFooterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'my-footer',
  templateUrl: 'my-footer.html'
})
export class MyFooterComponent {

  logoes: string[] = [
    '../../assets/imgs/96.png',
    '../../assets/imgs/logo.jpg'
  ]

  constructor() {
    
  }

}
