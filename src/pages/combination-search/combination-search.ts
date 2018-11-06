import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CrudService } from '../../services/crud.service';


@IonicPage()
@Component({
  selector: 'page-combination-search',
  templateUrl: 'combination-search.html',
})
export class CombinationSearchPage {
  COMBINATION = {
    PAT_YoB: '',
    PAT_AMP_DATE: '',
    PAT_SP: ''
  }

  SERVICEPROVIDERS = [ 'SP1', 'SP2', 'SP3']
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private crudService: CrudService
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CombinationSearchPage');
  }

  searchCombination(){
    console.log(this.COMBINATION);
    this.crudService.getPatientsWithCombination(this.COMBINATION.PAT_YoB,this.COMBINATION.PAT_AMP_DATE,this.COMBINATION.PAT_SP)
    .then(res=>{
      console.log(res);
    })
  }

}
