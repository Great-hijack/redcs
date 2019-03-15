import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LangService } from '../../services/lang.service';
import { ViewController } from 'ionic-angular/navigation/view-controller';

/**
 * Generated class for the SelectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select',
  templateUrl: 'select.html',
})
export class SelectPage {
  ITEMS: iPart[] = [
    {EN: "Student", VI: "Học sinh hoặc Sinh viên"},
    {EN: "Unemployed", VI: "Thất nghiệp"}
  ];
  LANG: string = 'EN';
  ARRAY = [];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private langService: LangService
    ) {
    this.ITEMS = this.navParams.data.ITEMS;
    this.LANG = this.langService.LANG;
    this.ITEMS.forEach(item=> {
      let ITEM = item;
      ITEM['isCheck'] = false;
      this.ARRAY.push(ITEM);
    });
    console.log(this.ARRAY);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectPage');
  }

  selectItems(){
    console.log(this.ARRAY);
    let RESULTS = [];
    this.ARRAY.forEach(ITEM=>{
      if(ITEM.isCheck){
        delete ITEM['isCheck'];
        RESULTS.push(ITEM);
      }
    })
    console.log(RESULTS);
    this.dismiss(RESULTS);
  }

  dismiss(RESULTS: any[]){
    this.viewCtrl.dismiss(RESULTS)
  }

}

export interface iPart {
  EN: string,
  VI: string
}
