import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { iPatient } from '../interfaces/patient.interface';
@Injectable()


export class DateService {
    constructor(
        private crudService: CrudService
    ) { }



    updatePatient(PAT: iPatient) {
        return this.crudService.patientUpdate(PAT)
    }

    convertDateFormat(DATE: string) {
        let newDate = '2019-02-14';
        if (typeof (DATE) !== 'undefined') {
            newDate = DATE.replace('/', '-');
            console.log(newDate);
        }
        return newDate;
    }


}