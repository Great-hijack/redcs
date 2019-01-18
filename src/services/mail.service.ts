import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()


export class MailService {
    constructor(private httpClient: HttpClient) {

    }

    sendEmail() {
        let endpointURL = 'https://cluboto.net/webservice/service_post.php'
        let body = new HttpParams({
            fromObject: {
                act: 'sending-email',
                receiver: 'tho@enablecode.vn',
                subject: 'subject',
                textbody: 'text-body'
            }
        })
        return this.httpClient.post(endpointURL, body)
    }

}