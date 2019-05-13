import { Injectable } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular';
import { LangService } from './lang.service';


@Injectable()


export class LoadingService {
    loading: any;
    count: number = 0;
    isLoading: boolean = false;
    constructor(
        private loadingCtrl: LoadingController,
        private langService: LangService
    ) { }

    startLoading() {
        let _content = this.langService.LANG == 'EN' ? 'Please wait ...' : 'Vui lòng chờ ...'
        if (!this.isLoading) {
            this.loading = this.loadingCtrl.create({
                content: _content,
                spinner: 'crescent'
            });
            // this.count++;
            this.isLoading = true;
            this.loading.present().then((res) => {

                console.log('loading start', this.count, this.isLoading);
                setTimeout(() => {
                    console.log('loading stop after timeout', this.count, this.isLoading);
                    this.hideLoading();
                    // alert('Please turn on internet and location permission. Then open app again')
                }, 5000)
            })
                .catch((err) => {
                    console.log(err);
                })
        }

    }

    hideLoading() {
        this.loading.dismiss()
            .then((res) => {
                // this.count = 0;
                this.isLoading = false;
                console.log('loading stop', res, this.count, this.isLoading);
            })
            .catch((err) => { console.log(err) });
    }
}