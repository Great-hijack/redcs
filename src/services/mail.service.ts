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
                sender: 'Tho Tran Phuoc',
                subject: 'New appointment',
                textbody: '<strong>Hi</strong>, New message'
            }
        })
        return this.httpClient.post(endpointURL, body)
    }

}