import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-http',
  templateUrl: 'http.html',
})
export class HttpPage {
  URL: string = 'google.com';
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private http: HttpClient
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HttpPage');
  }

  send(){
    let body = {};
    let option = {};
    this.http.post(this.URL,body,option)
    .subscribe((data)=>{
      console.log(data);
    })
  }

}
