import { Component } from '@angular/core';

/**
 * Generated class for the MyPopularCitiesComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'my-popular-cities',
  templateUrl: 'my-popular-cities.html'
})
export class MyPopularCitiesComponent {

  text: string;
  cities: any[] = [
    {city_url: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', city_name: 'SAIGON'},
    {city_url: 'https://images.pexels.com/photos/449627/pexels-photo-449627.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', city_name: 'HANOI'},
    {city_url: 'https://images.pexels.com/photos/374827/pexels-photo-374827.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', city_name: 'NEW YORK'},
    {city_url: 'https://images.pexels.com/photos/88212/pexels-photo-88212.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', city_name: 'TOKYO'},
    {city_url: 'https://images.pexels.com/photos/688660/pexels-photo-688660.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', city_name: 'SEOUL'},
    {city_url: 'https://res.cloudinary.com/twenty20/private_images/t_watermark-criss-cross-10/v1467610564000/photosp/fba89753-6f2b-4366-a238-3c1e0adf8fb2/stock-photo-outdoors-fishing-adventure-lake-child-recreation-boy-colorado-outdoor-fba89753-6f2b-4366-a238-3c1e0adf8fb2.jpg', city_name: 'SYDNEY'},
    
  ]
  constructor() {
    console.log('Hello MyPopularCitiesComponent Component');
    this.text = 'Hello World';
  }

}
