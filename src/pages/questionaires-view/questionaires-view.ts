import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CrudService } from '../../services/crud.service';
import { iQuestForm } from '../../interfaces/questform.interface';
import { iUsr } from '../../interfaces/usr.interface';

@IonicPage()
@Component({
  selector: 'page-questionaires-view',
  templateUrl: 'questionaires-view.html',
})
export class QuestionairesViewPage {
  QUESTIONAIRES: iQuestForm[] = [];
  data: any;
  USER: iUsr;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private crudService: CrudService
  ) {
    this.data = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionairesViewPage');
    if(typeof(this.data.USER) !=='undefined'){
      this.getQuestionaires();
      this.USER = this.data.USER;
    }else{
      this.navCtrl.setRoot('HomePage');
    }
    

  }

  getQuestionaires() {
    this.crudService.questionairesAllGet().then((res: any) => {
      console.log(res);
      this.QUESTIONAIRES = res.QUESTIONAIRES;
    }).catch(err => console.log(err));
  }

  go2QuestionaireEdit(Q: iQuestForm){
    console.log(Q);
    this.navCtrl.push('QuestionaireEditPage',{QUESTIONAIRE: Q, ACTION: 'VIEW', USER: this.USER});
  }

}
