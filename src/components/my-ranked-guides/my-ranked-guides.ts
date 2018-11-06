import { Component } from '@angular/core';

/**
 * Generated class for the MyRankedGuidesComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'my-ranked-guides',
  templateUrl: 'my-ranked-guides.html'
})
export class MyRankedGuidesComponent {

  text: string;
  guides: { url: string, name: string, stars: string }[] = [
    {
      url: 'https://ionicframework.com/dist/preview-app/www/assets/img/badu-live.png',
      name: 'Nguyen P Trong',
      stars: '5 stars'
    },
    {
      url: 'https://ionicframework.com/dist/preview-app/www/assets/img/badu-live.png',
      name: 'Nguyen P Trong',
      stars: '5 stars'
    },
    {
      url: 'https://ionicframework.com/dist/preview-app/www/assets/img/badu-live.png',
      name: 'Nguyen P Trong',
      stars: '5 stars'
    },
    {
      url: 'https://ionicframework.com/dist/preview-app/www/assets/img/badu-live.png',
      name: 'Nguyen P Trong',
      stars: '5 stars'
    },
    {
      url: 'https://ionicframework.com/dist/preview-app/www/assets/img/badu-live.png',
      name: 'Nguyen P Trong',
      stars: '5 stars'
    }
  ]
  constructor() {
    console.log('Hello MyRankedGuidesComponent Component');
    this.text = 'Hello World';
  }

}
