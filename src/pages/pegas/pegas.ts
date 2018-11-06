import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@IonicPage()
@Component({
  selector: 'page-pegas',
  templateUrl: 'pegas.html',
})
export class PegasPage {
  URL: string = "https://api-ext-test.pegasys.pegast.com/HotelSearch.svc";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpClient
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PegasPage');
  }

  send() {
    const headers = new HttpHeaders({ responseType: 'text', 'Content-Type': 'text/xml' }).set('Accept', 'text/xml');
    let body = '<request>'
    '<username>Username</username>'
    '<password>Password</password>'
    '</request>';
    const hdr = { headers: headers, body: body };
    console.log("Checking:  ", hdr, this.URL);
    this.http.post(this.URL,hdr)
    .subscribe(data=>{
      console.log(data);
    },err=> console.log(err))
    
  }

  get(){
    this.http.get(this.URL,{})
    .subscribe(data=>{
      console.log(data);
    }) 
  }

  sendx() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function (e) {
      if (this.readyState == 4 && this.status == 200) {
        //  document.getElementById(“demo”).innerHTML = this.responseText;
        console.log('send success')
      } else {
        console.log('send ...');
      }
      console.log(e);

      switch (this.readyState) {
        case 0:
          console.log('0: request not initialized ')
          break;
        case 1:
          console.log('1: server connection established')
          break;
        case 2:
          console.log('2: request received')
          break;
        case 3:
          console.log('3: processing request')
          break;
        case 4:
          console.log('4: request finished and response is ready')
          break;

        default:
          break;
      }
    };
    xhttp.open("POST", this.URL, true);
    xhttp.send();
  }



}
